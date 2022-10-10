import { mdiMenu } from "@mdi/js";
import Icon from "@mdi/react";
import type { NextPage } from "next";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.scss";

const navLinksData = [
  {
    colourName: "home",
    text: "Home",
    href: "/",
  },
  {
    colourName: "about",
    text: "About",
    href: "/about",
  },
  {
    colourName: "projects",
    text: "Projects",
    href: "/projects",
  },
  {
    colourName: "contact",
    text: "Contact",
    href: "/contact",
  },
];

const Navbar: NextPage = () => {
  const lastScrollY = useRef(0);
  const [navIsVisible, setNavIsVisible] = useState(true);
  const [leftPos, setLeftPos] = useState<number>();
  const [width, setWidth] = useState<number>();
  const navClasses = `px-4 py-4`;

  const navSlider = `${styles["nav-slider"]} bottom-0`;

  const navBarStyle =
    leftPos !== undefined
      ? { left: leftPos + "px", width: width + "px" }
      : undefined;

  const navLinks = navLinksData.map((data, idx) => (
    <Link key={idx} href={data.href}>
      <a
        className={navClasses}
        onMouseEnter={(e) => {
          setLeftPos((e.target as HTMLAnchorElement).offsetLeft);
          setWidth((e.target as HTMLAnchorElement).clientWidth);
        }}
        onMouseLeave={() => setLeftPos(undefined)}
      >
        {data.text}
      </a>
    </Link>
  ));

  const handleNavigation = useCallback(
    (e: Event) => {
      const scrollTop = (e.target as Document).documentElement.scrollTop;
      if (lastScrollY.current > scrollTop) {
        setNavIsVisible(true);
      } else if (lastScrollY.current < scrollTop) {
        setNavIsVisible(false);
      }
      lastScrollY.current = scrollTop;
    },
    [lastScrollY]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleNavigation);

    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);

  const navHiddenClass = navIsVisible
    ? "translate-y-0"
    : "md:translate-y-0 -translate-y-full";

  return (
    <header
      className={
        "transition-transform translate-y-0 sticky max-w-screen-2xl mx-auto w-full left-0 right-0 top-0 bg-background z-10 " +
        navHiddenClass
      }
    >
      <nav className="flex justify-between flex-row text-xl items-center relative ">
        <p
          className="px-4 hidden md:block"
          onMouseEnter={(e) => {
            setLeftPos((e.target as HTMLParagraphElement).offsetLeft);
            setWidth((e.target as HTMLParagraphElement).clientWidth);
          }}
          onMouseLeave={() => setLeftPos(undefined)}
        >
          A Logo
        </p>
        <Icon className="md:hidden h-[3.75rem] px-4 py-4" path={mdiMenu} />
        <div className="md:flex hidden flex-row">{navLinks}</div>
        <div className={navSlider} style={navBarStyle} />
      </nav>
    </header>
  );
};

export default Navbar;
