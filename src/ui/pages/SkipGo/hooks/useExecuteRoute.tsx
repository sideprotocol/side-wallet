import useSkipClient from './useSkipClient';

export default function useExecuteRoute() {
  const { skipClient } = useSkipClient();

  const executeRoute = async () => {
    try {
      if (!skipClient) return;

      // await skipClient.executeRoute({})
    } catch {}
  };

  return { executeRoute };
}
