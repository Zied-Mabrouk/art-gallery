'use client';
import './globals.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IllustrationRawType, IllustrationType } from '../types/illustration';
import { IllustrationContext } from '../../hooks/useIllustrations';
import Navbar from '@/components/Navbar';
import { ActiveIllustrationContext } from '../../hooks/useActiveIllustration';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [illustrations, setIllustrations] = useState<IllustrationType[]>([]);
  const [activeIllustration, setActiveIllustration] =
    useState<IllustrationType | null>(null);

  const api = useMemo(() => process.env.NEXT_PUBLIC_RIJKSMUSEUM_API_KEY, []);
  useEffect(() => {
    fetch(`https://www.rijksmuseum.nl/api/en/collection?key=${api}`)
      .then(data => data.json())
      .then(data =>
        setIllustrations(
          data.artObjects.map((art: IllustrationRawType) => ({
            id: art.id,
            objectNumber: art.objectNumber,
            title: art.title,
            hasImage: art.hasImage,
            principalOrFirstMaker: art.principalOrFirstMaker,
            longTitle: art.longTitle,
            url: art.webImage.url,
            headerUrl: art.headerImage.url,
            width: art.webImage.width,
            height: art.webImage.height,
          })) ?? []
        )
      );
  }, []);

  const handleChangeIllustration = useCallback(
    (illustration: IllustrationType | null) => {
      setActiveIllustration(illustration);
      if (!illustration) return;
      fetch(
        `https://www.rijksmuseum.nl/api/en/collection/${illustration.objectNumber}?key=${api}`
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
            <Navbar />
            {children}
          </ActiveIllustrationContext.Provider>
        </IllustrationContext.Provider>
      </body>
    </html>
  );
}
