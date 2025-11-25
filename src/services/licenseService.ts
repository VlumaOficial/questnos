/**
 * 🔐 SERVIÇO DE LICENCIAMENTO
 * 
 * Controle de licenças e validação de uso autorizado
 * para o sistema white-label.
 */

import { supabase } from '@/lib/supabase';

export interface ClientLicense {
  id: string;
  client_id: string;
  client_name: string;
  allowed_domains: string[];
  licensed_features: {
    questionnaire: boolean;
    admin: boolean;
    reports: boolean;
    maxCandidates: number;
    maxAdminUsers: number;
  };
  valid_from: string;
  valid_until?: string;
  usage_stats: {
    totalCandidates: number;
    totalAssessments: number;
    lastActivity?: string;
  };
  is_active: boolean;
  is_suspended: boolean;
  suspension_reason?: string;
  created_at: string;
  updated_at: string;
  last_validation_at?: string;
}

export interface LicenseValidationResult {
  valid: boolean;
  reason?: string;
  features?: any;
  validUntil?: string;
  usage?: any;
}

class LicenseService {
  private currentDomain: string;
  private clientId: string;

  constructor() {
    this.currentDomain = window.location.hostname;
    this.clientId = this.getClientId();
  }

  /**
   * Obter ID do cliente (pode vir de configuração ou ser detectado)
   */
  private getClientId(): string {
    // Prioridade: variável de ambiente > localStorage > padrão
    return import.meta.env.VITE_CLIENT_ID || 
           localStorage.getItem('clientId') || 
           'questnos-master';
  }

  /**
   * Validar licença atual
   */
  async validateLicense(domain?: string): Promise<LicenseValidationResult> {
    try {
      const targetDomain = domain || this.currentDomain;
      
      const { data, error } = await supabase
        .rpc('validate_client_license', {
          p_client_id: this.clientId,
          p_domain: targetDomain
        });

      if (error) {
        console.error('Erro na validação de licença:', error);
        return { valid: false, reason: 'Erro na validação' };
      }

      // Atualizar estatísticas de uso se válida
      if (data.valid) {
        await this.updateUsageStats();
      }

      return data;
    } catch (error) {
      console.error('Erro no validateLicense:', error);
      return { valid: false, reason: 'Erro interno' };
    }
  }

  /**
   * Obter informações da licença atual
   */
  async getCurrentLicense(): Promise<ClientLicense | null> {
    try {
      const { data, error } = await supabase
        .from('client_licenses')
        .select('*')
        .eq('client_id', this.clientId)
        .single();

      if (error) {
        console.error('Erro ao buscar licença:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Erro no getCurrentLicense:', error);
      return null;
    }
  }

  /**
   * Verificar se funcionalidade está licenciada
   */
  async isFeatureLicensed(feature: string): Promise<boolean> {
    try {
      const license = await this.getCurrentLicense();
      
      if (!license || !license.is_active || license.is_suspended) {
        return false;
      }

      // Verificar validade temporal
      if (license.valid_until && new Date(license.valid_until) < new Date()) {
        return false;
      }

      return license.licensed_features[feature as keyof typeof license.licensed_features] === true;
    } catch (error) {
      console.error('Erro no isFeatureLicensed:', error);
      return false;
    }
  }

  /**
   * Verificar limites de uso
   */
  async checkUsageLimits(): Promise<{ withinLimits: boolean; limits: any; current: any }> {
    try {
      const license = await this.getCurrentLicense();
      
      if (!license) {
        return { withinLimits: false, limits: {}, current: {} };
      }

      // Buscar estatísticas atuais do banco
      const { data: candidateCount } = await supabase
        .from('candidates')
        .select('id', { count: 'exact' });

      const { data: adminCount } = await supabase
        .from('admin_users')
        .select('id', { count: 'exact' })
        .eq('is_active', true);

      const current = {
        candidates: candidateCount?.length || 0,
        adminUsers: adminCount?.length || 0
      };

      const limits = {
        maxCandidates: license.licensed_features.maxCandidates,
        maxAdminUsers: license.licensed_features.maxAdminUsers
      };

      const withinLimits = 
        current.candidates <= limits.maxCandidates &&
        current.adminUsers <= limits.maxAdminUsers;

      return { withinLimits, limits, current };
    } catch (error) {
      console.error('Erro no checkUsageLimits:', error);
      return { withinLimits: false, limits: {}, current: {} };
    }
  }

  /**
   * Atualizar estatísticas de uso
   */
  async updateUsageStats(): Promise<void> {
    try {
      const { withinLimits, current } = await this.checkUsageLimits();
      
      await supabase
        .from('client_licenses')
        .update({
          usage_stats: {
            totalCandidates: current.candidates,
            totalAssessments: current.candidates, // Simplificado
            lastActivity: new Date().toISOString()
          },
          last_validation_at: new Date().toISOString()
        })
        .eq('client_id', this.clientId);

    } catch (error) {
      console.error('Erro no updateUsageStats:', error);
    }
  }

  /**
   * Verificar se domínio está autorizado
   */
  async isDomainAuthorized(domain?: string): Promise<boolean> {
    try {
      const targetDomain = domain || this.currentDomain;
      const license = await this.getCurrentLicense();
      
      if (!license) return false;

      // Domínios especiais sempre autorizados em desenvolvimento
      const devDomains = ['localhost', '127.0.0.1', '0.0.0.0'];
      if (devDomains.includes(targetDomain)) {
        return true;
      }

      return license.allowed_domains.includes(targetDomain);
    } catch (error) {
      console.error('Erro no isDomainAuthorized:', error);
      return false;
    }
  }

  /**
   * Obter status completo da licença
   */
  async getLicenseStatus(): Promise<{
    isValid: boolean;
    license?: ClientLicense;
    validation?: LicenseValidationResult;
    usage?: any;
    warnings: string[];
  }> {
    try {
      const license = await this.getCurrentLicense();
      const validation = await this.validateLicense();
      const usage = await this.checkUsageLimits();
      const warnings: string[] = [];

      // Verificar avisos
      if (license?.valid_until) {
        const daysUntilExpiry = Math.ceil(
          (new Date(license.valid_until).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        );
        
        if (daysUntilExpiry <= 30) {
          warnings.push(`Licença expira em ${daysUntilExpiry} dias`);
        }
      }

      if (!usage.withinLimits) {
        warnings.push('Limites de uso excedidos');
      }

      if (license?.is_suspended) {
        warnings.push(`Licença suspensa: ${license.suspension_reason}`);
      }

      return {
        isValid: validation.valid,
        license,
        validation,
        usage,
        warnings
      };
    } catch (error) {
      console.error('Erro no getLicenseStatus:', error);
      return {
        isValid: false,
        warnings: ['Erro ao verificar status da licença']
      };
    }
  }

  /**
   * Middleware para verificar licença em rotas protegidas
   */
  async checkLicenseMiddleware(requiredFeature?: string): Promise<boolean> {
    try {
      const validation = await this.validateLicense();
      
      if (!validation.valid) {
        console.warn('Acesso negado - licença inválida:', validation.reason);
        return false;
      }

      if (requiredFeature) {
        const hasFeature = await this.isFeatureLicensed(requiredFeature);
        if (!hasFeature) {
          console.warn('Acesso negado - funcionalidade não licenciada:', requiredFeature);
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error('Erro no checkLicenseMiddleware:', error);
      return false;
    }
  }

  /**
   * Registrar tentativa de acesso não autorizado
   */
  async logUnauthorizedAccess(reason: string, details?: any): Promise<void> {
    try {
      await supabase
        .from('activity_logs')
        .insert({
          action: 'unauthorized_access',
          resource_type: 'license',
          details: {
            reason,
            domain: this.currentDomain,
            clientId: this.clientId,
            userAgent: navigator.userAgent,
            ...details
          }
        });
    } catch (error) {
      console.error('Erro ao registrar acesso não autorizado:', error);
    }
  }

  /**
   * Obter informações para exibição no admin
   */
  async getLicenseInfo(): Promise<{
    clientId: string;
    clientName: string;
    domain: string;
    features: string[];
    expiryDate?: string;
    usage: any;
  }> {
    try {
      const license = await this.getCurrentLicense();
      const usage = await this.checkUsageLimits();

      if (!license) {
        return {
          clientId: this.clientId,
          clientName: 'Não identificado',
          domain: this.currentDomain,
          features: [],
          usage: usage.current
        };
      }

      const features = license.licensed_features && Object.keys(license.licensed_features).length > 0 
        ? Object.entries(license.licensed_features)
          .filter(([_, enabled]) => enabled === true)
          .map(([feature, _]) => feature)
        : [];

      return {
        clientId: license.client_id,
        clientName: license.client_name,
        domain: this.currentDomain,
        features,
        expiryDate: license.valid_until,
        usage: usage.current
      };
    } catch (error) {
      console.error('Erro no getLicenseInfo:', error);
      return {
        clientId: this.clientId,
        clientName: 'Erro',
        domain: this.currentDomain,
        features: [],
        usage: {}
      };
    }
  }
}

export const licenseService = new LicenseService();
