import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

/**
 * 🔐 CONFIGURAÇÃO VITE PARA BUILD PROTEGIDO
 * 
 * Esta configuração é usada para gerar builds protegidos
 * para clientes, com obfuscação e remoção de informações sensíveis.
 */

export default defineConfig(({ mode }) => {
  // Carrega variáveis de ambiente
  const env = loadEnv(mode, process.cwd(), '');
  
  const supabaseUrl = env.VITE_SUPABASE_URL;
  const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;
  
  const isProtectedBuild = mode === 'production' || process.env.BUILD_PROTECTED === 'true';
  
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    
    // Configurações específicas para build protegido
    build: {
      // Minificação extrema
      minify: isProtectedBuild ? 'terser' : true,
      
      // Configurações do Terser para obfuscação
      terserOptions: isProtectedBuild ? {
        compress: {
          // Remover console.log em produção
          drop_console: true,
          drop_debugger: true,
          // Otimizações agressivas
          passes: 3,
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
          // Remover código morto
          dead_code: true,
          unused: true,
        },
        mangle: {
          // Obfuscar nomes de variáveis e funções
          toplevel: true,
          properties: {
            // Obfuscar propriedades (cuidado com APIs externas)
            regex: /^_/
          }
        },
        format: {
          // Remover comentários
          comments: false,
        }
      } : undefined,
      
      // Configurações de rollup
      rollupOptions: {
        output: {
          // Nomes de arquivos obfuscados
          entryFileNames: isProtectedBuild ? 'assets/[hash].js' : 'assets/[name]-[hash].js',
          chunkFileNames: isProtectedBuild ? 'assets/[hash].js' : 'assets/[name]-[hash].js',
          assetFileNames: isProtectedBuild ? 'assets/[hash].[ext]' : 'assets/[name]-[hash].[ext]',
          
          // Configurações de mangling
          manualChunks: isProtectedBuild ? undefined : {
            vendor: ['react', 'react-dom'],
            ui: ['@radix-ui/react-dialog', '@radix-ui/react-button'],
          }
        },
        
        // Plugins adicionais para build protegido
        plugins: isProtectedBuild ? [
          // Plugin customizado para remover informações sensíveis
          {
            name: 'remove-sensitive-info',
            generateBundle(options, bundle) {
              // Remover source maps
              Object.keys(bundle).forEach(fileName => {
                if (fileName.endsWith('.map')) {
                  delete bundle[fileName];
                }
              });
              
              // Processar arquivos JS para remover informações sensíveis
              Object.keys(bundle).forEach(fileName => {
                const file = bundle[fileName];
                if (file.type === 'chunk' && fileName.endsWith('.js')) {
                  // Remover comentários que possam conter informações sensíveis
                  file.code = file.code
                    .replace(/\/\*[\s\S]*?\*\//g, '')
                    .replace(/\/\/.*$/gm, '');
                }
              });
            }
          }
        ] : []
      },
      
      // Desabilitar source maps em build protegido
      sourcemap: !isProtectedBuild,
      
      // Configurações de chunk
      chunkSizeWarningLimit: isProtectedBuild ? 1000 : 500,
    },
    
    // Definir variáveis de ambiente
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(supabaseUrl),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(supabaseAnonKey),
      // Remover informações de debug em produção
      'import.meta.env.DEV': JSON.stringify(!isProtectedBuild),
      'process.env.NODE_ENV': JSON.stringify(isProtectedBuild ? 'production' : mode),
    },
    
    // Otimizações adicionais
    esbuild: isProtectedBuild ? {
      // Remover console.log e debugger
      drop: ['console', 'debugger'],
      // Minificar identificadores
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
    } : undefined,
    
    // Configurações de preview para testes
    preview: {
      port: 4173,
      host: true
    }
  };
});
