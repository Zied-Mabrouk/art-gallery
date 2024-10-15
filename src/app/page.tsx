'use client';

import { useCallback } from 'react';
import { useIllustrations } from '../../hooks/useIllustrations';
import Preview from '@/components/Preview';
import { useRouter } from 'next/navigation';

const Home = () => {
  const { illustrations } = useIllustrations();

  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push('/illustrations');
  }, [router]);

  return (
    <div className="p-4 relative h-full">
      <h1 className="text-3xl font-bold font-norms">Boards</h1>
      <p className="mt-2 mb-4 font-bold text-gray-400 text-sm">
        Following galleries to power up your art career
      </p>
      {illustrations.length > 0 && (
        <Preview
          onClick={handleClick}
          illustrations={illustrations}
          title="illustrations"
        />
      )}
    </div>
  );
};

export default Home;
