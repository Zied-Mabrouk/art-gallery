'use client';
import { IllustrationType } from '@/types/illustration';
import { useContext, createContext } from 'react';

export interface IllustrationContextProps {
  activeIllustration: IllustrationType | null;
  setActiveIllustration: (activeIllustration: IllustrationType | null) => void;
}

export const ActiveIllustrationContext =
  createContext<IllustrationContextProps>({
    activeIllustration: null,
    setActiveIllustration: () => {},
  });

export const useActiveIllustration = (): IllustrationContextProps => {
  const context = useContext(ActiveIllustrationContext);
  if (!context) {
    throw new Error('useActiveIllustration must be used within a DataProvider');
  }
  return context;
};
