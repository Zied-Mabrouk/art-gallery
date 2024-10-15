'use client';
import { IllustrationRawType, IllustrationType } from '@/types/illustration';
import { useContext, createContext, useEffect } from 'react';

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
  const { illustrations, setIllustrations } = context;
  useEffect(() => {
    try {
      if (illustrations.length === 0) {
        fetch(
          `https://www.rijksmuseum.nl/api/en/collection?key=${process.env.NEXT_PUBLIC_RIJKSMUSEUM_API_KEY}`
        )
          .then(data => data.json())
          .then(data =>
            setIllustrations(
              data.artObjects
                .filter((art: IllustrationRawType) => art.webImage)
                .map((art: IllustrationRawType) => ({
                  ...art,
                  url: art.webImage.url,
                  headerUrl: art.headerImage.url,
                  width: art.webImage.width,
                  height: art.webImage.height,
                })) ?? []
            )
          );
      }
    } catch (err) {
      console.error(err);
    }
  }, [illustrations]);
  if (!context) {
    throw new Error('useIllustrations must be used within a DataProvider');
  }
  return context;
};
