import { IllustrationType } from '@/types/illustration';
import React, { useMemo } from 'react';
import ImageComponent from './ImageComponent';

type Props = {
  illustrations: IllustrationType[];
  title: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const Preview = ({
  illustrations: incomingIllustrations,
  title,
  onClick,
}: Props) => {
  const illustrations = useMemo(
    () => incomingIllustrations.splice(0, 3),
    [incomingIllustrations]
  );
  return illustrations.length > 0 ? (
    <div
      onClick={onClick}
      className="flex flex-col cursor-pointer rounded-2xl overflow-hidden shadow-lg transition-all scale-100 hover:scale-105"
    >
      <div className="overflow-hidden grid grid-cols-2 gap-1">
        <div className="h-64 relative">
          <ImageComponent src={illustrations[0].url} className="h-full" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-32 relative">
            <ImageComponent src={illustrations[1]?.url} className="h-full" />
          </div>
          <div className="h-32 relative">
            <ImageComponent src={illustrations[2]?.url} className="h-full" />
          </div>
        </div>
      </div>
      <div className="py-4 text-3xl px-2 font-bold font-norms">{title}</div>
    </div>
  ) : (
    <></>
  );
};

export default Preview;
