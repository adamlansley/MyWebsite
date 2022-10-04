import {
  mdiGithub,
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
  href?: string;
}

interface Technologies {
  [key: string]: Technology;
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
  github: {
    name: "Github",
    icon: mdiGithub,
    colourName: "github",
    href: "https://github.com/ImSirTea",
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

  let containerClasses = "w-40 flex flex-col p-2 space-y-2 justify-center";
  if (rightAligned) {
    containerClasses += " rounded-r-2xl";
  } else {
    containerClasses += " rounded-l-2xl";
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
