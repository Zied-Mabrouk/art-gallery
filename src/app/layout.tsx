'use client';
import './globals.css';
import { useCallback, useMemo, useState } from 'react';
import { IllustrationType } from '../types/illustration';
import { IllustrationContext } from '../../hooks/useIllustrations';
import Navbar from '@/components/Navbar';
import { ActiveIllustrationContext } from '../../hooks/useActiveIllustration';
import { FavIllustrationContext } from '../../hooks/useFavIllustrations';
import { useActiveBreakpoints } from '../../hooks/useActiveBreakpoints';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [illustrations, setIllustrations] = useState<IllustrationType[]>([]);
  const [favIllustrations, setFavIllustrations] = useState<IllustrationType[]>(
    []
  );
  const [activeIllustration, setActiveIllustration] =
    useState<IllustrationType | null>(null);

  const { sm } = useActiveBreakpoints();

  const { removeFavIllustration, addFavIllustration } = useMemo(() => {
    return {
      removeFavIllustration: (illustration: IllustrationType) =>
        setFavIllustrations(prevFavIllustrations =>
          prevFavIllustrations.filter(ill => illustration.id !== ill.id)
        ),
      addFavIllustration: (illustration: IllustrationType) =>
        setFavIllustrations(prev => [...prev, illustration]),
    };
  }, []);

  const handleChangeIllustration = useCallback(
    (illustration: IllustrationType | null) => {
      setActiveIllustration(illustration);
      if (!illustration) return;

      fetch(
        `https://www.rijksmuseum.nl/api/en/collection/${illustration.objectNumber}?key=${process.env.NEXT_PUBLIC_RIJKSMUSEUM_API_KEY}`
      )
        .then(data => data.json())
        .then(data =>
          setActiveIllustration({
            ...illustration,
            description: data.artObjectPage.plaqueDescription,
          })
        );
    },
    []
  );

  return (
    <html lang="en" className="bg-white p-1 h-fit">
      <body className="antialiased p-1 bg-background rounded-lg border border-gray-300 border-opacity-20 min-h-screen overflow-hidden">
        <IllustrationContext.Provider
          value={{ illustrations, setIllustrations }}
        >
          <ActiveIllustrationContext.Provider
            value={{
              activeIllustration,
              setActiveIllustration: handleChangeIllustration,
            }}
          >
            <FavIllustrationContext.Provider
              value={{
                favIllustrations,
                removeFavIllustration,
                addFavIllustration,
              }}
            >
              {sm ? (
                <>
                  <h1 className="text-5xl font-bold">
                    Please switch to mobile
                  </h1>
                  <h2 className="text-4xl font-semibold">(less than 640px)</h2>
                </>
              ) : (
                <>
                  <Navbar />
                  {children}
                </>
              )}
            </FavIllustrationContext.Provider>
          </ActiveIllustrationContext.Provider>
        </IllustrationContext.Provider>
      </body>
    </html>
  );
}
