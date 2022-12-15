import Chip from "components/layout/Chip";
import { FunctionComponent } from "react";
import { technologies } from "components/landing/ProjectTechnologies";
import Image from "next/image";
import me from "public/picOfMe.png";
import styles from "./Vanity.module.scss";
import FlowDownCanvas from "components/landing/FlowDownCanvas";

const { github, linkedin } = technologies;

const Vanity: FunctionComponent = () => {
  const textClasses = `font-bold text-5xl sm:text-7xl pb-3 relative flex linear-swipe`;

  const pictureBorderClasses = `${styles["picture-border"]} mb-2`;

  const technologyChips = [github, linkedin]?.map((technology, index) => (
    <Chip {...technology} key={index} />
  ));

  return (
    <div className="max-w-screen-2xl mx-auto h-screen flex justify-center items-center flex-col">
      <FlowDownCanvas />
      <div className={pictureBorderClasses}>
        <Image
          src={me}
          alt="A picture of me"
          className="flex"
          width={250}
          height={250}
        />
      </div>
      <div className={textClasses}>Adam Lansley</div>
      <div className="text:xl sm:text-2xl pb-6">Frontend Developer</div>
      <div className="flex space-x-3">{technologyChips}</div>
    </div>
  );
};

export default Vanity;
