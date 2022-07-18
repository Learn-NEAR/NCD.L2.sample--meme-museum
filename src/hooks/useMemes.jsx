import { getMemes, getMeme } from '../services/near';
import { useState, useCallback, useEffect } from 'react';
import { useContract } from '../context/ContractProvider';

export const useMemes = () => {
  const { contractId, setApiError } = useContract();

  const [memes, setMemes] = useState([]);
  const [memeIds, setMemeIds] = useState([]);

  const updateValues = useCallback(async () => {
    try {
      const memeIdsData = await getMemes();
      setMemeIds(memeIdsData);
      const memesData = await Promise.all(
        memeIdsData.reverse().map(async (id) => {
          const memeData = await getMeme(id);
          return { ...memeData, id };
        })
      );
      setMemes(memesData);
    } catch (error) {
      setApiError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractId]);

  useEffect(() => {
    updateValues();
  }, [updateValues]);

  return {
    memes,
    memeIds,
  };
};
