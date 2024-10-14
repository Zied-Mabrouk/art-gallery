import React, { useState } from 'react';
import { FiCompass } from 'react-icons/fi';
import { FaLayerGroup } from 'react-icons/fa';
import { LuPenLine } from 'react-icons/lu';
import { MdPersonOutline } from 'react-icons/md';
import { useActiveIllustration } from '../../hooks/useActiveIllustration';

const Navbar = () => {
  const { activeIllustration } = useActiveIllustration();
  const [showOverview, setShowOverview] = useState(false);
  const coefficientCentimeter = 0.0264583333;
  return activeIllustration ? (
    <nav
      className={`fixed left-0 z-10 -bottom-4 w-full flex h-[80vh]  ${
        showOverview
          ? 'transition-all duration-1000'
          : 'translate-y-[calc(100%-104px)]'
      } rounded-3xl px-8 bg-white justify-center gap-8 sm:top-0`}
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
            <span className="font-semibold text-gray-400 tracking-widest mb-2">
              Title
            </span>
            <span className="font-semibold text-black mb-4">
              {activeIllustration.title}
            </span>
            <span className="font-semibold text-gray-400 tracking-widest mb-2">
              Artist
            </span>
            <span className="font-semibold text-black mb-4">
              {activeIllustration.principalOrFirstMaker}
            </span>
            <span className="font-semibold text-gray-400 tracking-widest mb-2">
              Size
            </span>
            <span className="font-semibold text-black mb-4">
              {activeIllustration.width}x{activeIllustration.height} px (
              {(activeIllustration.width * coefficientCentimeter).toFixed(1)}x
              {(activeIllustration.height * coefficientCentimeter).toFixed(1)}{' '}
              cm)
            </span>
            <span className="font-semibold text-gray-400 tracking-widest mb-2">
              Artist
            </span>
            <span className="font-semibold text-black mb-4">
              {activeIllustration.principalOrFirstMaker}
            </span>
            {activeIllustration.description && (
              <>
                <div className="w-full bg-gray-500 bg-opacity-10 rounded-lg my-4 h-[2px]"></div>
                <span className="font-semibold text-gray-400 mb-4 text-justify">
                  {activeIllustration.description}
                </span>
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col w-full py-8">
            <span className="font-semibold w-16 h-3 bg-gray-400  tracking-widest mb-2 rounded-lg opacity-30 p-[0.5px]"></span>
            <span className="font-semibold w-32 h-3 bg-black mb-3 rounded-lg opacity-20 p-[0.5px]"></span>
            <span className="font-semibold w-16 h-3 bg-gray-400  tracking-widest mb-2 rounded-lg opacity-30 p-[0.5px]"></span>
            <span className="font-semibold w-32 h-3 bg-black mb-3 rounded-lg opacity-20 p-[0.5px]"></span>
          </div>
        )}
      </div>
    </nav>
  ) : (
    <nav className="fixed left-0 z-10 -bottom-4 w-full flex rounded-3xl pt-8 pb-12 px-8 bg-white justify-center gap-8 sm:top-0">
      <FiCompass className="text-accent1 text-2xl cursor-pointer" />
      <FaLayerGroup className="text-accent1 text-2xl cursor-pointer" />
      <LuPenLine className="text-accent1 text-2xl cursor-pointer" />
      <MdPersonOutline className="text-accent1 text-2xl cursor-pointer" />
    </nav>
  );
};

export default Navbar;
