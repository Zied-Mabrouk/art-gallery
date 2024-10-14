'use client';

import ImageComponent from '@/components/ImageComponent';
import { useFavIllustrations } from '../../../hooks/useFavIllustrations';
import { useActiveIllustration } from '../../../hooks/useActiveIllustration';

const Home = () => {
  const { favIllustrations } = useFavIllustrations();
  const { setActiveIllustration } = useActiveIllustration();

  return (
    <div className="m-4 relative h-full">
      <h1 className="text-3xl font-bold">Favorite illustrations</h1>

      <div className="flex flex-wrap justify-center gap-4 overflow-auto p-4 max-h-[calc(100vh-200px)] scroll-container">
        {favIllustrations.length > 0 && (
          <>
            <ImageComponent
              illustration={favIllustrations[0]}
              setActiveIllustration={setActiveIllustration}
            />
            <div className="grid grid-cols-2 w-full gap-4 h-full">
              {favIllustrations.slice(1).map((illustration, key) => (
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
  );
};

export default Home;
