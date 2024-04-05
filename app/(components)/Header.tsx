"use client";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <header className="lg:px-16 px-4 bg-white flex flex-wrap items-center py-4 shadow-md">
        <div className="flex-1 flex justify-between items-center">
          <Link href="#" className="text-xl">
            Logo
          </Link>
        </div>
        <div
          className="hidden md:flex md:items-center md:w-auto w-full md:gap-x-8"
        >
        </div>
      </header>
    </>
  );
};

export default Header;
