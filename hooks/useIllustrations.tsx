'use client';
import { IllustrationType } from '@/types/illustration';
import { useContext, createContext } from 'react';

interface IllustrationContextProps {
  illustrations: IllustrationType[];
  setIllustrations: (illustrations: IllustrationType[]) => void;
}

export const IllustrationContext = createContext<IllustrationContextProps>({
  illustrations: [],
  setIllustrations: () => {},
});

export const useIllustrations = (): IllustrationContextProps => {
  const context = useContext(IllustrationContext);

  if (!context) {
    throw new Error('useIllustrations must be used within a DataProvider');
  }
  return context;
};
