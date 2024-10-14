import { IllustrationType } from '@/types/illustration';
import Image from 'next/image';
import React, { useCallback } from 'react';
import { IllustrationContextProps } from '../../hooks/useActiveIllustration';

type Props = {
  illustration: IllustrationType;
  setActiveIllustration: IllustrationContextProps['setActiveIllustration'];
};

const ImageComponent = ({ illustration, setActiveIllustration }: Props) => {
  const handleClick = useCallback(() => {
    setActiveIllustration(illustration);
  }, [illustration, setActiveIllustration]);
  return (
    <div
      onClick={handleClick}
      className="relative w-full h-40 rounded-lg overflow-hidden transition-all scale-100 hover:scale-105 cursor-pointer"
    >
      <Image
        className="object-cover"
        src={illustration.url}
        alt=""
        layout="fill"
      />
    </div>
  );
};

export default ImageComponent;
