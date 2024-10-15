'use client';

import ImageComponent from '@/components/ImageComponent';
import { useIllustrations } from '../../../hooks/useIllustrations';
import { IllustrationType } from '@/types/illustration';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

const Home = () => {
  const { illustrations } = useIllustrations();

  const makers = illustrations.reduce<Record<string, string>>(
    (acc, ill: IllustrationType) => {
      if (!acc[ill.principalOrFirstMaker]) {
        acc[ill.principalOrFirstMaker] = ill.url;
      }
      return acc;
    },
    {}
  );

  const router = useRouter();

  const handleClick = useCallback(
    (maker: string) => {
      router.push(`/maker?maker=${maker.replaceAll(' ', '+')}`);
    },
    [router]
  );

  return (
    <div className="m-4 relative h-full">
      <h1 className="text-3xl font-bold font-norms">Makers</h1>

      <div className="flex flex-wrap justify-center gap-4 overflow-auto p-4 max-h-[calc(100vh-140px)] scroll-container">
        <div className="grid grid-cols-2 w-full gap-4 h-full">
          {Object.entries(makers).map(([maker, url], key: number) => (
            <div
              key={key}
              className="relative cursor-pointer transition-all scale-100 hover:scale-105"
              onClick={() => handleClick(maker)}
            >
              <ImageComponent src={url} className="h-40" />
              <div className="absolute top-0 left-0 w-full h-full text-center text-white text-xl bg-black bg-opacity-30 flex justify-center items-center rounded-lg">
                {maker}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
