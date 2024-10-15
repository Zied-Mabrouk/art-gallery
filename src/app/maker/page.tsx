'use client';

import IllustrationImage from '@/components/IllustrationImage';
import Loader from '@/components/Loader';
import { IllustrationRawType, IllustrationType } from '@/types/illustration';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

const Maker = () => {
  const searchParams = useSearchParams();
  const [illustrations, setIllustrations] = useState<IllustrationType[]>([]);

  const maker = searchParams.get('maker') ?? '';

  console.log(illustrations);

  useEffect(() => {
    fetch(
      `https://www.rijksmuseum.nl/api/en/collection?key=${
        process.env.NEXT_PUBLIC_RIJKSMUSEUM_API_KEY
      }&involvedMaker=${maker.replaceAll(' ', '+')}`
    )
      .then(data => data.json())
      .then(data => {
        console.log(data.artObjects);
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
        );
      });
  }, [maker]);

  return (
    <div className="m-4 relative h-full">
      <h1 className="text-3xl font-bold font-norms">{maker}</h1>

      <div className="flex flex-wrap justify-center gap-4 overflow-auto p-4 h-full max-h-[calc(100vh-250px)] scroll-container">
        {illustrations.length > 0 && (
          <>
            <IllustrationImage illustration={illustrations[0]} />

            <div className="grid grid-cols-2 w-full gap-4 h-full">
              {illustrations.slice(1).map((illustration, key) => (
                <IllustrationImage illustration={illustration} key={key} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default function MakerPage() {
  return (
    <Suspense fallback={<Loader loaded={false} />}>
      <Maker />
    </Suspense>
  );
}
