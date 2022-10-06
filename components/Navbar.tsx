import type { NextPage } from "next";
import Link from "next/link";
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
  const navClasses = `nav-link px-8 py-4 ${styles["nav-link"]}`;
  const navLinks = navLinksData.map((data, idx) => (
    <Link key={idx} href={data.href}>
      <a className={navClasses}>{data.text}</a>
    </Link>
  ));
  return (
    <nav className="flex justify-between flex-row text-xl items-center">
      <p>A Logo</p>
      <div className="flex flex-row -mr-8 relative">{navLinks}</div>
    </nav>
  );
};

export default Navbar;
