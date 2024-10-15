'use client';

import { useFavIllustrations } from '../../../hooks/useFavIllustrations';
import ImageComponent from '@/components/ImageComponent';

const Home = () => {
  const { favIllustrations } = useFavIllustrations();

  return (
    <div className="m-4 relative h-full">
      <h1 className="text-3xl font-bold font-norms">Favorite illustrations</h1>

      <div className="flex flex-wrap justify-center gap-4 overflow-auto p-4 max-h-[calc(100lvh-140px)] scroll-container">
        {favIllustrations.length > 0 && (
          <>
            <ImageComponent src={favIllustrations[0].url} className="h-40" />
            <div className="grid grid-cols-2 w-full gap-4 h-full">
              {favIllustrations.slice(1).map((illustration, key) => (
                <ImageComponent
                  src={illustration.url}
                  key={key}
                  className="h-40"
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
