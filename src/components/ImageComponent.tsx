import Image from 'next/image';
import React, { useState } from 'react';
import Loader from './Loader';

type Props = {
  src: string;
  onClick?: () => void;
  className?: string;
};

const ImageComponent = ({ src, onClick, className = '' }: Props) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      onClick={onClick}
      className={`relative w-full rounded-lg overflow-hidden cursor-pointer ${className}`}
    >
      <Loader loaded={loaded} />
      <Image
        className="object-cover"
        src={src}
        alt=""
        layout="fill"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default ImageComponent;
