import Chip from "components/layout/Chip";
import { FunctionComponent, useState } from "react";
import { technologies } from "components/bio/ProjectTechnologies";

const { github, linkedin } = technologies;

const Header: FunctionComponent = () => {
  const textClasses = `font-bold text-5xl sm:text-7xl pb-3 relative flex linear-swipe`;

  const [isHovering, setHovering] = useState(false);

  const technologyChips = [github, linkedin]?.map((technology, index) => (
    <Chip
      {...technology}
      key={index}
      isHovering={isHovering}
      hideUntilHover
      reverse={false}
    />
  ));

  return (
    <div className="flex h-full justify-center items-center flex-col">
      <div className={textClasses}>Adam Lansley</div>
      <div className="text:xl sm:text-2xl pb-6">Frontend Developer</div>
      <div
        className="flex space-x-3"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {technologyChips}
      </div>
    </div>
  );
};

export default Header;
