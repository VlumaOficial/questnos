import { useState, useMemo } from 'react';
import { Check, ChevronsUpDown, Search, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface Candidate {
  id: string;
  full_name: string;
  email: string;
}

interface CandidateComboboxProps {
  candidates: Candidate[];
  selectedCandidateId: string | null;
  onSelectCandidate: (candidateId: string | null) => void;
}

export default function CandidateCombobox({
  candidates,
  selectedCandidateId,
  onSelectCandidate,
}: CandidateComboboxProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // Encontrar candidato selecionado
  const selectedCandidate = candidates.find((c) => c.id === selectedCandidateId);

  // Filtrar candidatos pela pesquisa
  const filteredCandidates = useMemo(() => {
    if (!searchValue) return candidates;
    
    const search = searchValue.toLowerCase();
    return candidates.filter(
      (candidate) =>
        candidate.full_name.toLowerCase().includes(search) ||
        candidate.email.toLowerCase().includes(search)
    );
  }, [candidates, searchValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            {selectedCandidate ? (
              <div className="flex flex-col items-start">
                <span className="font-medium">{selectedCandidate.full_name}</span>
                <span className="text-xs text-muted-foreground">{selectedCandidate.email}</span>
              </div>
            ) : (
              <span>Visão Geral (Todos os Candidatos)</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0" align="start">
        <Command>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              placeholder="Pesquisar por nome ou email..."
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <CommandEmpty>Nenhum candidato encontrado.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-auto">
            {/* Opção: Visão Geral */}
            <CommandItem
              value="all"
              onSelect={() => {
                onSelectCandidate(null);
                setOpen(false);
                setSearchValue('');
              }}
              className="cursor-pointer"
            >
              <Check
                className={cn(
                  'mr-2 h-4 w-4',
                  selectedCandidateId === null ? 'opacity-100' : 'opacity-0'
                )}
              />
              <div className="flex flex-col">
                <span className="font-medium">Visão Geral</span>
                <span className="text-xs text-muted-foreground">
                  Todos os candidatos
                </span>
              </div>
            </CommandItem>

            {/* Lista de Candidatos */}
            {filteredCandidates.map((candidate) => (
              <CommandItem
                key={candidate.id}
                value={candidate.id}
                onSelect={() => {
                  onSelectCandidate(candidate.id);
                  setOpen(false);
                  setSearchValue('');
                }}
                className="cursor-pointer"
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    selectedCandidateId === candidate.id ? 'opacity-100' : 'opacity-0'
                  )}
                />
                <div className="flex flex-col">
                  <span className="font-medium">{candidate.full_name}</span>
                  <span className="text-xs text-muted-foreground">{candidate.email}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
