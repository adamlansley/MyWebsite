import { FunctionComponent } from "react";
import styles from "./Projects.module.scss";

const Projects: FunctionComponent = () => {
  const containerClasses = `${styles["projects-container"]} w-full h-4/5 themed-background p-2 flex flex-col`;
  const contentClasses = `${styles["projects-content"]} py-8 h-full bg-[color:var(--bg-colour)] px-4 overflow-auto`;
  return (
    <div className="max-w-screen-2xl m-auto h-screen flex justify-center flex-col">
      <h1 className="text-5xl bg-[color:var(--bg-colour)]">My Project Name</h1>
      <div className={containerClasses}>
        <div className={contentClasses}>
          <div className="h-screen">Projects Content</div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
