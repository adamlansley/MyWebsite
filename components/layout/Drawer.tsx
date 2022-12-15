import { NextPage } from "next";
import { PropsWithChildren } from "react";
import styles from "./Drawer.module.scss";
import ReactDOM from "react-dom";

const Drawer: NextPage<PropsWithChildren> = ({ children }) => {
  return ReactDOM.createPortal(
    <div
      className={
        "w-screen h-screen fixed top-0 left-0 z-50 " + styles["drawer"]
      }
    >
      {children}
    </div>,
    document.body
  );
};

export default Drawer;
