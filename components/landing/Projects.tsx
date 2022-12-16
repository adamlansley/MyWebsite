import { FunctionComponent } from "react";

const Projects: FunctionComponent = () => {
  return (
    <div className="max-w-screen-2xl m-auto h-screen flex justify-center flex-col">
      <h1 className="text-5xl mb-4 bg-[color:var(--bg-colour)]">
        My Project Name
      </h1>
      <div className="w-full h-4/5 themed-background p-2 flex flex-col rounded-xl rounded-tl-none">
        <div className="h-full bg-[color:var(--bg-colour)] p-4 rounded-lg rounded-tl-none">
          Projects Content
        </div>
      </div>
    </div>
  );
};

export default Projects;
