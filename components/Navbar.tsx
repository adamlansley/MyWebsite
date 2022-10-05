import { mdiAccount, mdiPhone, mdiStarFourPoints } from "@mdi/js";
import Chip, { ChipDetails } from "components/layout/Chip";
import type { NextPage } from "next";

const navChipData: ChipDetails[] = [
  {
    iconPath: mdiAccount,
    colourName: "about",
    hideUntilHover: true,
    text: "About",
    href: "/about",
  },
  {
    iconPath: mdiStarFourPoints,
    colourName: "projects",
    hideUntilHover: true,
    text: "Projects",
    href: "/projects",
  },
  {
    iconPath: mdiPhone,
    colourName: "contact",
    hideUntilHover: true,
    text: "Contact",
    href: "/contact",
  },
];

const Navbar: NextPage = () => {
  const navChips = navChipData.map((data, idx) => {
    return (
      <li
        key={idx}
        className="hover:-translate-x-5 py-2 relative hover:ease-out duration-300"
      >
        <Chip {...data} />
      </li>
    );
  });

  return (
    <nav className="absolute h-screen right-0 pr-5">
      <ul className="h-full flex flex-col pt-10 text-xl">{navChips}</ul>
    </nav>
  );
};

export default Navbar;
