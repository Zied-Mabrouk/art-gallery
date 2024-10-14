'use client';

import ImageComponent from '@/components/ImageComponent';
import { useIllustrations } from '../../../hooks/useIllustrations';
import Image from 'next/image';
import { useActiveIllustration } from '../../../hooks/useActiveIllustration';
import { IoIosArrowBack } from 'react-icons/io';

const Home = () => {
  const { illustrations } = useIllustrations();
  const { activeIllustration, setActiveIllustration } = useActiveIllustration();
  return (
    <>
      <div className="m-4 relative h-full">
        <h1 className="text-3xl font-bold">Illustrations</h1>
        <p className="mt-2 mb-4 font-semibold text-gray-500 tracking-widest">
          CURATED GALERIES
        </p>
        <div className="flex flex-wrap justify-center gap-4 overflow-auto p-4 h-[calc(100vh-200px)] scroll-container">
          {illustrations.length > 0 && (
            <>
              <ImageComponent
                illustration={illustrations[0]}
                setActiveIllustration={setActiveIllustration}
              />
              <div className="grid grid-cols-2 w-full gap-4 h-full">
                {illustrations.slice(1).map((illustration, key) => (
                  <ImageComponent
                    setActiveIllustration={setActiveIllustration}
                    illustration={illustration}
                    key={key}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div
        className={`absolute top-0 left-0 transition-all duration-1000 w-full h-screen rounded-lg ${
          activeIllustration ? '' : 'translate-y-full'
        } bg-white`}
      >
        <div className="relative h-full w-full">
          <div
            className="absolute top-4 left-4 z-20 cursor-pointer"
            onClick={() => setActiveIllustration(null)}
          >
            <IoIosArrowBack className="text-white text-3xl" />
          </div>
          {activeIllustration && (
            <Image
              src={activeIllustration.url}
              layout="fill"
              className="object-cover"
              alt=""
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
