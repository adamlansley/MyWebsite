import {
  mdiLanguageTypescript,
  mdiReact,
  mdiTailwind,
  mdiVuejs,
} from "@mdi/js";
import Chip from "components/layout/Chip";
import { FunctionComponent, useState } from "react";

export interface Technology {
  name: string;
  icon: string;
  colourName: string;
}

interface Technologies {
  typescript: Technology;
  react: Technology;
  vue: Technology;
  tailwindcss: Technology;
}

export const technologies: Technologies = {
  typescript: {
    name: "Typescript",
    icon: mdiLanguageTypescript,
    colourName: "typescript",
  },
  react: {
    name: "React",
    icon: mdiReact,
    colourName: "react",
  },
  vue: {
    name: "Vue",
    icon: mdiVuejs,
    colourName: "vue",
  },
  tailwindcss: {
    name: "Tailwindcss",
    icon: mdiTailwind,
    colourName: "tailwindcss",
  },
} as const;

export interface ProjectTecnologies {
  technologies: Technology[];
  rightAligned?: boolean;
}

const ProjectTechnologies: FunctionComponent<ProjectTecnologies> = ({
  technologies,
  rightAligned,
}) => {
  const [isHovering, setHovering] = useState(false);

  const tecnologyChips = technologies?.map((technology, index) => (
    <Chip
      key={index}
      iconPath={technology.icon}
      colourName={technology.colourName}
      isHovering={isHovering}
      text={technology.name}
      hideUntilHover
      reverse={!rightAligned}
    />
  ));

  let containerClasses =
    "w-40 flex flex-col border p-2 space-y-2 justify-center";
  if (rightAligned) {
    containerClasses += " rounded-r-2xl border-l-0";
  } else {
    containerClasses += " rounded-l-2xl border-r-0";
  }

  return (
    <div
      className={containerClasses}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {tecnologyChips}
    </div>
  );
};

export default ProjectTechnologies;
