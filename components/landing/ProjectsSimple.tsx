import { FunctionComponent } from "react";

const ProjectsSimple: FunctionComponent = () => {
  return (
    <div className="max-w-screen-2xl m-auto h-screen flex justify-center flex-col">
      <h1 className="text-5xl mb-2 bg-[color:var(--bg-colour)]">
        My Project Name
      </h1>
      <div className="w-full h-4/5 themed-background p-2 flex flex-col rounded-2xl rounded-tl-none">
        <div className="py-8 h-full bg-[color:var(--bg-colour)] px-4 overflow-auto rounded-xl rounded-tl-none">
          <div className="h-screen">Projects Content</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSimple;
