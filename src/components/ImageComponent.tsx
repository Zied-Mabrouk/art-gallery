import Image from 'next/image';
import React, { useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

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
      {!loaded && (
        <div className="absolute top-0 left-0 w-full h-full z-10 bg-gray-200 flex justify-center items-center">
          <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
        </div>
      )}
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
