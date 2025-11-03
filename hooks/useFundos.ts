import { consultarSaldo, FundoDetalhe } from '@/services/fundos.service';
import { useEffect, useState } from 'react';

export function useFundos() {
  const [fundos, setFundos] = useState<FundoDetalhe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function carregarFundos() {
      try {
        setIsLoading(true);
        setError(null);
        const saldoData = await consultarSaldo();
        setFundos(saldoData.listaFundos);
      } catch (err: any) {
        console.error("Erro ao carregar fundos:", err);
        const errorMessage = err.message || "Não foi possível carregar os fundos.";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
    carregarFundos();
  }, []);

  return { fundos, isLoading, error };
}