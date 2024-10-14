'use client';
import { IllustrationType } from '@/types/illustration';
import { useContext, createContext } from 'react';

interface FavIllustrationContextProps {
  favIllustrations: IllustrationType[];
  addFavIllustration: (illustrations: IllustrationType) => void;
  removeFavIllustration: (illustrations: IllustrationType) => void;
}

export const FavIllustrationContext =
  createContext<FavIllustrationContextProps>({
    favIllustrations: [],
    addFavIllustration: () => {},
    removeFavIllustration: () => {},
  });

export const useFavIllustrations = (): FavIllustrationContextProps => {
  const context = useContext(FavIllustrationContext);
  if (!context) {
    throw new Error('useFavIllustrations must be used within a DataProvider');
  }
  return context;
};
