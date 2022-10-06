import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
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
  const [leftPos, setLeftPos] = useState<number>();
  const [width, setWidth] = useState<number>();
  const navClasses = `px-8 py-4`;

  const navSlider = `${styles["nav-slider"]}`;

  const navBarStyle = leftPos
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
  return (
    <nav className="flex justify-between flex-row text-xl items-center relative overflow-hidden">
      <p>A Logo</p>
      <div className="flex flex-row -mr-8">{navLinks}</div>
      <div className={navSlider} style={navBarStyle} />
    </nav>
  );
};

export default Navbar;
