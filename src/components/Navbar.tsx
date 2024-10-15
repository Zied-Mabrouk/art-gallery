import React, { useEffect, useMemo, useState } from 'react';
import { FiCompass } from 'react-icons/fi';
import { FaLayerGroup } from 'react-icons/fa';
import { LuPenLine } from 'react-icons/lu';
import { useActiveIllustration } from '../../hooks/useActiveIllustration';
import Link from 'next/link';
import { RiArrowUpDoubleFill } from 'react-icons/ri';
import { useSwipeable } from 'react-swipeable';
import { usePathname } from 'next/navigation';
import Tooltip from './Tooltip';
import { GoHeart } from 'react-icons/go';

const Navbar = () => {
  const { activeIllustration, setActiveIllustration } = useActiveIllustration();
  const [showOverview, setShowOverview] = useState(false);

  const router = usePathname();

  const [closeShowOverview, openShowOverview, switchShowOverview] = useMemo(
    () => [
      () => setShowOverview(() => false),
      () => setShowOverview(() => true),
      () => setShowOverview(prev => !prev),
    ],
    []
  );

  useEffect(() => {
    closeShowOverview();
    setActiveIllustration(null);
  }, [router, closeShowOverview, setActiveIllustration]);

  const handlers = useSwipeable({
    onSwipedUp: openShowOverview,
    onSwipedDown: closeShowOverview,
    trackTouch: true, // Ensures the swipe event is tracked using touch
  });

  useEffect(() => {
    if (!activeIllustration) closeShowOverview();
  }, [activeIllustration, closeShowOverview]);

  const coefficientCentimeter = 0.0264583333;
  return activeIllustration ? (
    <>
      <div
        onClick={closeShowOverview}
        className={`fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-80 ${
          showOverview ? 'z-10' : 'z-0 hidden'
        }`}
      ></div>

      <nav
        className={`fixed left-0 z-10 -bottom-4 w-full flex h-[80vh] transition-all duration-1000 ${
          showOverview ? 'translate-y-0' : 'translate-y-[calc(100%-104px)]'
        } rounded-3xl px-8 bg-white justify-center gap-8`}
      >
        <div className="w-full h-full relative flex justify-center">
          <div
            {...handlers}
            onClick={switchShowOverview}
            draggable
            className="linear-accent rounded-lg absolute -top-3 cursor-pointer text-white text-lg flex flex-col"
          >
            <div className="py-3 px-4 relative flex justify-center">
              <div
                className={`z-0 absolute transition-all ${
                  showOverview ? 'rotate-180 -top-[10px]' : '-top-[10px]'
                }`}
              >
                <RiArrowUpDoubleFill className="text-white text-3xl" />
              </div>
              <span>Overview</span>
            </div>
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
    </>
  ) : (
    <nav className="fixed left-0 z-10 -bottom-4 w-full flex rounded-3xl pt-6 pb-8 px-8 bg-white justify-center gap-8">
      <Tooltip label="home">
        <Link
          href={'/'}
          className="p-2 hover:bg-accent1 group rounded-full hover:bg-opacity-60"
        >
          <FiCompass className="text-accent1 text-2xl cursor-pointer group-hover:text-white" />
        </Link>
      </Tooltip>

      <Tooltip label="illustrations">
        <Link
          href={'/illustrations'}
          className="p-2 hover:bg-accent1 group rounded-full hover:bg-opacity-60"
        >
          <FaLayerGroup className="text-accent1 text-2xl cursor-pointer group-hover:text-white" />
        </Link>
      </Tooltip>

      <Tooltip label="Pen">
        <div className="p-2 hover:bg-accent1 group rounded-full hover:bg-opacity-60">
          <LuPenLine className="text-accent1 text-2xl cursor-pointer group-hover:text-white" />
        </div>
      </Tooltip>
      <Tooltip label="favorites">
        <Link
          href={'/favorites'}
          className="p-2 hover:bg-accent1 group rounded-full hover:bg-opacity-60"
        >
          <GoHeart className="text-accent1 text-2xl cursor-pointer group-hover:text-white" />
        </Link>
      </Tooltip>
    </nav>
  );
};

export default Navbar;
