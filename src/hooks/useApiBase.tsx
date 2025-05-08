// hooks/useApiBase.ts - Hook base genérico como utilidad para reducir la duplicación de código en otros hooks
import { useState, useCallback } from 'react';

type ApiFunction<T, P = void> = (params: P) => Promise<T>;

export function useApiBase<T, P = void>(
  apiFunction: ApiFunction<T, P>,
  initialData: T
) {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(
    async (params: P) => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiFunction(params);
        setData(result);
        return result;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  return { data, loading, error, fetchData, setData };
}