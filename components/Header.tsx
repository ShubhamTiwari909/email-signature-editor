"use client";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <header className="lg:px-16 px-4 bg-white flex flex-wrap items-center py-4 shadow-md top-0 fixed w-full">
        <div className="flex-1 flex justify-between items-center">
          <Link href="/" className="text-xl">
            TW-Components
          </Link>
        </div>
        <div className="hidden md:flex md:items-center md:w-auto w-full md:gap-x-8">
          <Link href="/htmleditor" className="navlink">
            <span className="box">Html Editor</span>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
