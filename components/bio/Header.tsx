import { FunctionComponent } from "react";
import styles from "./Header.module.css";

const Header: FunctionComponent = () => {
  const textClasses = `font-bold text-4xl sm:text-6xl leading-normal sm:leading-normal text-center whitespace-nowrap ${styles.text}`;
  const nameDivs = Array.from("Adam Lansley").map((char, index) => (
    <div
      key={index}
      style={{ animationDelay: `${index / 10}s` }}
      className={char === " " ? "w-4" : undefined}
    >
      {char}
    </div>
  ));
  return (
    <div className="flex justify-center py-3">
      <div className={textClasses}>{nameDivs}</div>
    </div>
  );
};

export default Header;
