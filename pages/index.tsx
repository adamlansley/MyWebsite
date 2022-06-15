import type { NextPage } from "next";
import Head from "next/head";
import ProjectCard from "components/bio/ProjectCard";
import { technologies, Technology } from "components/bio/ProjectTechnologies";
import Header from "components/bio/Header";

interface ProjectDetails {
  name: string;
  hook?: string;
  description: string;
  technologies: Technology[];
}

const { typescript, react, tailwindcss, vue } = technologies;

const projects: ProjectDetails[] = [
  {
    name: "Final Year Project",
    hook: "A performant grid for Premier Systems",
    description: "",
    technologies: [typescript, vue],
  },
  {
    name: "Website",
    hook: "My own website built using NextJS",
    description: "",
    technologies: [typescript, react, tailwindcss],
  },
  {
    name: "Another Project",
    hook: "NO REAL, REMOVE",
    description: "",
    technologies: [typescript, react],
  },
  {
    name: "Another Project",
    hook: "NO REAL, REMOVE",
    description: "",
    technologies: [typescript, react],
  },
];

const Home: NextPage = () => {
  const projectCards = projects.map(
    ({ name, hook, description, technologies }, index) => (
      <ProjectCard
        title={name}
        subtitle={hook}
        technologies={technologies}
        key={index}
        rightAligned={!!(index % 2)}
        index={index}
      >
        {description}
      </ProjectCard>
    )
  );
  return (
    <div>
      <Head>
        <title>Adam Lansley - Front End Developer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
      </header>

      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 grid-cols-1">
        {projectCards}
      </main>
    </div>
  );
};

export default Home;
