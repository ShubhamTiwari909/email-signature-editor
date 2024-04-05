"use client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  return (
    <>
      <header className="lg:px-16 px-4 bg-white flex flex-wrap items-center py-4 shadow-md">
        <div className="flex-1 flex justify-between items-center">
          <Link href="#" className="text-xl">
            Anywhere
          </Link>
        </div>
        <div
          className="hidden md:flex md:items-center md:w-auto w-full md:gap-x-8"
          id="menu"
        >
          <Link href="/signatures/htmleditor" className="navlink">
            <span className="box">Html Editor</span>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex justify-center items-center w-full px-6 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none">
              Brands
              <svg
                className="w-4 h-4 ml-2 -mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10 12l-5-5h10l-5 5z" />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                {" "}
                <Link
                  href="/signatures/wr"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 leading-5 rounded-full font-semibold "
                >
                  Wellreceived
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
                <Link
                  href="/signatures/sf"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 leading-5 rounded-full font-semibold "
                >
                  Serviceforge
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
};

export default Header;
