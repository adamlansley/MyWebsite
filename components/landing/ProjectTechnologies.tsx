import {
  mdiGithub,
  mdiLanguageTypescript,
  mdiLinkedin,
  mdiReact,
  mdiTailwind,
  mdiVuejs,
} from "@mdi/js";
import Chip from "components/layout/Chip";
import { FunctionComponent } from "react";

export interface Technology {
  text: string;
  iconPath: string;
  colourName: string;
  href?: string;
}

interface Technologies {
  [key: string]: Technology;
}

export const technologies: Technologies = {
  typescript: {
    text: "Typescript",
    iconPath: mdiLanguageTypescript,
    colourName: "typescript",
  },
  react: {
    text: "React",
    iconPath: mdiReact,
    colourName: "react",
  },
  vue: {
    text: "Vue",
    iconPath: mdiVuejs,
    colourName: "vue",
  },
  tailwindcss: {
    text: "Tailwindcss",
    iconPath: mdiTailwind,
    colourName: "tailwindcss",
  },
  github: {
    text: "Github",
    iconPath: mdiGithub,
    colourName: "github",
    href: "https://github.com/ImSirTea",
  },
  linkedin: {
    text: "LinkedIn",
    iconPath: mdiLinkedin,
    colourName: "linkedin",
    href: "https://www.linkedin.com/in/adam-lansley-993937195/",
  },
} as const;

export interface ProjectTecnologies {
  technologies: Technology[];
}

const ProjectTechnologies: FunctionComponent<ProjectTecnologies> = ({
  technologies,
}) => {
  const tecnologyChips = technologies?.map((technology, index) => (
    <Chip
      key={index}
      iconPath={technology.iconPath}
      colourName={technology.colourName}
      text={technology.text}
    />
  ));

  const containerClasses =
    "w-40 flex flex-col p-2 space-y-2 justify-center rounded-l-2xl";

  return <div className={containerClasses}>{tecnologyChips}</div>;
};

export default ProjectTechnologies;
