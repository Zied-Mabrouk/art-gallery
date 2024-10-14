import { IllustrationType } from '@/types/illustration';
import React, { useCallback } from 'react';
import { useActiveIllustration } from '../../hooks/useActiveIllustration';
import ImageComponent from './ImageComponent';

type Props = {
  illustration: IllustrationType;
};

const IllustrationImage = ({ illustration }: Props) => {
  const { setActiveIllustration } = useActiveIllustration();

  const handleClick = useCallback(() => {
    setActiveIllustration(illustration);
  }, [illustration, setActiveIllustration]);

  return (
    <ImageComponent
      onClick={handleClick}
      src={illustration.url}
      className="h-40 transition-all scale-100 hover:scale-105"
    />
  );
};

export default IllustrationImage;
