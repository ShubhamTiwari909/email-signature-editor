"use client";
import Link from "next/link";

const Header = () => {
  const [toggleNavbar, setToggleNavbar, toggleNavbarOff] = useToggle(false);

  const handleOutsideClick = (event: MouseEvent) => {
    toggleNavbarOff(event);
  };
  useEffect(() => {
    const handleClick = (event: MouseEvent) => handleOutsideClick(event);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <header className="lg:px-16 px-4 bg-white flex flex-wrap items-center py-4 shadow-md">
        <div className="flex-1 flex justify-between items-center">
          <Link href="#" className="text-xl">
            Logo
          </Link>
        </div>

        <label htmlFor="menu-toggle" className="pointer-cursor md:hidden block">
          <svg
            className="fill-current text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>
        <input className="hidden" type="checkbox" id="menu-toggle" />

        <div
          className="hidden md:flex md:items-center md:w-auto w-full md:gap-x-8"
          id="menu"
        >
          <Link href="/signatures/htmleditor" className="navlink">
            <span className="box">Html Editor</span>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
