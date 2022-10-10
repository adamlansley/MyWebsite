import ProjectTechnologies, {
  ProjectTecnologies,
} from "components/bio/ProjectTechnologies";
import Card, { CardDetails } from "components/layout/Card";
import { FunctionComponent } from "react";

interface ProjectCardDetails extends CardDetails, ProjectTecnologies {
  index?: number;
}

const ProjectCard: FunctionComponent<ProjectCardDetails> = ({
  technologies,
  index,
  ...others
}) => {
  let containerClasses = "flex flex-1  lg:pr-0 pr-5";

  if (index) {
    // Always apply to our 3rd and beyond
    if (index >= 2) {
      containerClasses += " -mt-px";
    } else {
      // Apply only if we are at the right screen size
      containerClasses += " -mt-px lg:mt-0";
    }
  }

  return (
    <div className={containerClasses}>
      <ProjectTechnologies technologies={technologies} />
      <Card flat {...others}></Card>
    </div>
  );
};

export default ProjectCard;
