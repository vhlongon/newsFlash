import { useEffect, useState } from 'react';

export const useWithRefresh = (fetching: boolean) => {
  const [isRefreshing, setisRefreshing] = useState(false);
  useEffect(() => {
    if (!fetching) {
      setisRefreshing(false);
    }
  }, [fetching]);

  return { isRefreshing, setisRefreshing };
};
