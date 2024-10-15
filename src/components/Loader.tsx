import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type Props = {
  loaded: boolean;
};

const Loader = ({ loaded }: Props) => {
  return loaded ? (
    <></>
  ) : (
    <div className="absolute top-0 left-0 w-full h-full z-10 bg-gray-200 flex justify-center items-center">
      <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
    </div>
  );
};

export default Loader;
