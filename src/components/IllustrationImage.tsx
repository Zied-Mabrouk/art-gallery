import { IllustrationType } from '@/types/illustration';
import React, { useCallback, useMemo } from 'react';
import { useActiveIllustration } from '../../hooks/useActiveIllustration';
import ImageComponent from './ImageComponent';

type Props = {
  illustration: IllustrationType;
  filter?: string;
};

const IllustrationImage = ({ illustration, filter = '' }: Props) => {
  const { setActiveIllustration } = useActiveIllustration();

  const handleClick = useCallback(() => {
    setActiveIllustration(illustration);
  }, [illustration, setActiveIllustration]);

  const [label, searchedBy] = useMemo(
    () =>
      illustration.principalOrFirstMaker.toLocaleLowerCase().includes(filter)
        ? ['maker', illustration.principalOrFirstMaker]
        : ['title', illustration.title],
    [illustration, filter]
  );

  const parts = useMemo(() => {
    const split = searchedBy.toLocaleLowerCase().split(filter);
    return [split[0] ?? '', filter, split[1] ?? ''];
  }, [filter, searchedBy]);

  return (
    <div
      className="w-full relative rounded-lg overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <ImageComponent
        src={illustration.url}
        className="h-40 transition-all scale-100 hover:scale-105 rounded-lg overflow-hidden"
      />
      {filter && (
        <div className="absolute top-0 left-0 bg-black p-2 bg-opacity-60 w-full h-full text-white rounded-lg">
          <span className="font-bold capitalize">{label}: </span>
          {parts[0]}
          <span className="text-accent1">{parts[1]}</span>
          {parts[2]}
        </div>
      )}
    </div>
  );
};

export default IllustrationImage;
