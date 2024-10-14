'use client';

import IllustrationImage from '@/components/IllustrationImage';
import { useIllustrations } from '../../../hooks/useIllustrations';
import Image from 'next/image';
import { useActiveIllustration } from '../../../hooks/useActiveIllustration';
import { IoIosArrowBack } from 'react-icons/io';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { useFavIllustrations } from '../../../hooks/useFavIllustrations';
import { useCallback, useMemo, useState } from 'react';

const Home = () => {
  const { illustrations } = useIllustrations();
  const { activeIllustration, setActiveIllustration } = useActiveIllustration();
  const { favIllustrations, addFavIllustration, removeFavIllustration } =
    useFavIllustrations();

  const [filter, setFilter] = useState('');

  const isFav = useMemo(
    () => favIllustrations.some(ill => activeIllustration?.id === ill.id),
    [favIllustrations, activeIllustration]
  );

  const handleAddToFav = useCallback(() => {
    if (activeIllustration) addFavIllustration(activeIllustration);
  }, [activeIllustration, addFavIllustration]);

  const handleRemoveFromFav = useCallback(() => {
    if (activeIllustration) removeFavIllustration(activeIllustration);
  }, [activeIllustration, removeFavIllustration]);

  const filteredIllustrations = useMemo(() => {
    return illustrations.filter(
      ill =>
        ill.principalOrFirstMaker
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase()) ||
        ill.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  }, [illustrations, filter]);

  return (
    <>
      <div className="m-4 relative h-full">
        <h1 className="text-3xl font-bold">Illustrations</h1>
        <p className="mt-2 mb-4 font-semibold text-gray-500 tracking-widest">
          CURATED GALERIES
        </p>
        <input
          type="text"
          className="w-full p-2 mb-4"
          placeholder="Search for illustrations"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
        <div className="flex flex-wrap justify-center gap-4 overflow-auto p-4 h-full max-h-[calc(100vh-250px)] scroll-container">
          {filteredIllustrations.length > 0 && (
            <>
              <IllustrationImage illustration={filteredIllustrations[0]} />

              <div className="grid grid-cols-2 w-full gap-4 h-full">
                {filteredIllustrations.slice(1).map((illustration, key) => (
                  <IllustrationImage illustration={illustration} key={key} />
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
          <div className="absolute top-4 right-4 z-20 cursor-pointer">
            {isFav ? (
              <GoHeartFill
                className="text-white text-3xl"
                onClick={handleRemoveFromFav}
              />
            ) : (
              <GoHeart
                className="text-white text-3xl"
                onClick={handleAddToFav}
              />
            )}
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
