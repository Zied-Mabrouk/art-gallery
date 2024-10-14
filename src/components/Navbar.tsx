import React, { useEffect, useState } from 'react';
import { FiCompass } from 'react-icons/fi';
import { FaLayerGroup } from 'react-icons/fa';
import { LuPenLine } from 'react-icons/lu';
import { MdPersonOutline } from 'react-icons/md';
import { useActiveIllustration } from '../../hooks/useActiveIllustration';
import Link from 'next/link';

const Navbar = () => {
  const { activeIllustration } = useActiveIllustration();
  const [showOverview, setShowOverview] = useState(false);

  useEffect(() => {
    if (!activeIllustration) setShowOverview(false);
  }, [activeIllustration]);

  const coefficientCentimeter = 0.0264583333;
  return activeIllustration ? (
    <nav
      className={`fixed left-0 z-10 -bottom-4 w-full flex h-[80vh] transition-all duration-1000 ${
        showOverview ? 'translate-y-0' : 'translate-y-[calc(100%-104px)]'
      } rounded-3xl px-8 bg-white justify-center gap-8`}
    >
      <div className="w-full h-full relative flex justify-center">
        <div
          onClick={() => setShowOverview(prev => !prev)}
          className="linear-accent rounded-lg absolute -top-3 cursor-pointer py-1 px-4 text-white text-lg"
        >
          Overview
        </div>
        {showOverview ? (
          <div className="flex flex-col w-full py-8">
            <span className="font-semibold text-gray-400 italic tracking-widest mb-2">
              Title
            </span>
            <span className="font-semibold text-black mb-5">
              {activeIllustration.title}
            </span>
            <span className="font-semibold text-gray-400 italic tracking-widest mb-2">
              Artist
            </span>
            <span className="font-semibold text-black mb-5">
              {activeIllustration.principalOrFirstMaker}
            </span>
            <span className="font-semibold text-gray-400 italic tracking-widest mb-2">
              Size
            </span>
            <span className="font-semibold text-black mb-5">
              {activeIllustration.width}x{activeIllustration.height} px (
              {(activeIllustration.width * coefficientCentimeter).toFixed(1)}x
              {(activeIllustration.height * coefficientCentimeter).toFixed(1)}{' '}
              cm)
            </span>

            {activeIllustration.description && (
              <>
                <div className="w-full bg-gray-500 bg-opacity-10 rounded-lg my-4 h-[2px]"></div>
                <span className="font-semibold text-gray-400 mb-5 text-justify">
                  {activeIllustration.description}
                </span>
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col w-full py-8">
            <span className="font-semibold w-16 h-3 bg-gray-400  tracking-widest mb-2 rounded-md opacity-20 p-[0.5px]"></span>
            <span className="font-semibold w-20 h-3 bg-gray-800 mb-5 rounded-md opacity-20 p-[0.5px]"></span>

            <span className="font-semibold w-12 h-3 bg-gray-400  tracking-widest mb-2 rounded-lg opacity-20 p-[0.5px]"></span>
            <span className="font-semibold w-44 h-3 bg-gray-800 mb-5 rounded-lg opacity-20 p-[0.5px]"></span>

            <span className="font-semibold w-20 h-3 bg-gray-400  tracking-widest mb-2 rounded-lg opacity-30 p-[0.5px]"></span>
            <span className="font-semibold w-32 h-3 bg-gray-800 mb-5 rounded-lg opacity-20 p-[0.5px]"></span>

            <span className="font-semibold w-24 h-3 bg-gray-400  tracking-widest mb-2 rounded-lg opacity-30 p-[0.5px]"></span>
            <span className="font-semibold w-40 h-3 bg-gray-800 mb-5 rounded-lg opacity-20 p-[0.5px]"></span>
          </div>
        )}
      </div>
    </nav>
  ) : (
    <nav className="fixed left-0 z-10 -bottom-4 w-full flex rounded-3xl pt-8 pb-12 px-8 bg-white justify-center gap-8">
      <Link
        href={'/'}
        className="p-2 hover:bg-gray-200 rounded-full hover:bg-opacity-60"
      >
        <FiCompass className="text-accent1 text-2xl cursor-pointer" />
      </Link>
      <Link
        href={'/illustrations'}
        className="p-2 hover:bg-gray-200 rounded-full hover:bg-opacity-60"
      >
        <FaLayerGroup className="text-accent1 text-2xl cursor-pointer" />
      </Link>
      <span className="p-2 hover:bg-gray-200 rounded-full hover:bg-opacity-60">
        <LuPenLine className="text-accent1 text-2xl cursor-pointer" />
      </span>
      <Link
        href={'/profile'}
        className="p-2 hover:bg-gray-200 rounded-full hover:bg-opacity-60"
      >
        <MdPersonOutline className="text-accent1 text-2xl cursor-pointer" />
      </Link>
    </nav>
  );
};

export default Navbar;
