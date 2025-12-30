import { PageChunk } from '@/components/page/PageChunk';
import styles from './ExperiencePage.module.css';
import { TimelineEntry } from '@/components/timeline/TimelineEntry';
import { FadeIn } from '@/components/animations/FadeIn';

export const ExperiencePage = () => {
  return (
    <PageChunk className={styles.experiencePage}>
      <h2>Experience</h2>
      <div className={styles.experienceTimeline}>
        <FadeIn>
          <TimelineEntry
            title="Full-stack Software Engineer · GivEnergy"
            tags={[
              'Node',
              'React',
              'Tailwind',
              'Jest',
              'AWS',
              'SST',
              'Performance',
              'Optimizations',
            ]}
            keyPoints={[
              'Designed and documented the architecture for a new sales tool for the company, keeping it updated with versions for each iteration, helping to create the AWS infrastructure needed to build the website end-to-end.',
              'Developed an entire TypeScript React application independently using tools like Vitest and React Query, resulting in a stable and scalable application with high test coverage to ensure long-term reliability.',
              'Iterated on Figma designs to optimise for accessibility, usability, and functionality on the application, while ensuring that the underlying components and architecture were atomic and reusable throughout the codebase.',
              'Built typesafe serverless backend APIs which integrated with third-party APIs in TypeScript using SST, AWS, Vitest, to manage the infrastructure in code and ensure resilience between changes and deployments.',
              'Collected multiple streams of monitoring and feedback across the stack, using HotJar and Sentry for the frontend to understand user interactions and monitor errors or UX issues. Set up alarms and monitoring for the API, giving visibility on server errors, both internal and user-driven.',
              'Iterated on and implemented UI/UX changes based on collected feedback and analysis, improving the overall functionality and performance of the application.',
            ]}
            description="Designed, architected, and implemented a solar and battery comparison tool, allowing users to see their potential savings if they were to use one. The backend used AWS, SST, and TypeScript to create services for these calculations. The frontend used React and Tailwind."
            periodOfTime="April 2025 - Present"
          />
        </FadeIn>
        <FadeIn>
          <TimelineEntry
            title="Software Engineer · Bright Sites"
            tags={[
              'React',
              'CSS',
              'Jest',
              'SEO',
              'Ads',
              'Performance',
              'Optimizations',
              'Core Web Vitals',
            ]}
            keyPoints={[
              'Reimplemented a user management system using Amazon Cognito and TypeScript, saving the client money and improving the resilience of the system.',
              'Worked seamlessly and independently with third parties, such as Google and Amazon, to implement new features on The Standard’s Website. This included cutting-edge technology such as GeminiAI for summaries of their articles, modern web technologies like the View Transitions API, and the Speculation Rules.',
              'Implemented a swipe-to-next article feature, also leveraging the previously mentioned features, which increased user retention on the site.',
              'Increased the codebase’s test coverage, increasing total coverage by 10% within the first few months, adding more reliability and confidence when making changes.',
            ]}
            description="Managed a high-traffic news site, focusing on improving testing, performance, size optimisations, and a complete rewrite of the user accounts system. While there, I increased their test coverage massively and worked to move their entire codebase from JavaScript to TypeScript. I also worked on size optimisations, setting up code-splitting for their hydrated pages."
            periodOfTime="July 2024 - April 2025"
          />
        </FadeIn>
        <FadeIn>
          <TimelineEntry
            title="Software Engineer · Digital Wonderlab"
            tags={[
              'React',
              'Capacitor',
              'Ionic',
              'NextJS',
              'Performance',
              'Optimizations',
            ]}
            keyPoints={[
              'Created a NextJS website, using its caching, routing, and new patterns to support an interactive MapBox map handling over 60,000 pins effortlessly.',
              'Investigated and developed a new mobile app using TypeScript, Capacitor, and Ionic; implementing core functionality and providing technical oversight on how to architect sharing packages with an associated NextJS website, using TurboRepo.',
              'Using ApexCharts, I created a type-safe, generic chart-building component and system, allowing quick development of a wide range of pages and reports to display statistics and data to our end users.',
            ]}
            description="Created a range of websites and mobile apps for a range of customers. One app was a PWA focused on offline usability, where I implemented core parts of offline functionality, and another website where I created a generic chart system allowing dynamic and easy-to-use graphs to be set-up quickly."
            periodOfTime="July 2023 - July 2024"
          />
        </FadeIn>
        <FadeIn>
          <TimelineEntry
            title="Software Engineer · Premier Systems"
            tags={[
              'Vue',
              'Vite',
              'Vitest',
              'Cypress',
              'Performance',
              'Optimizations',
            ]}
            keyPoints={[
              'Improved page load times by over 30% on the slowest loading pages',
              'Implemented a scheduling tool with drag and drop functionality helping users to outline their monthly timings',
            ]}
            description="Maintained a SaaS brewery management website, and helped to implement new features and a new PWA app. Throughout my time, I also investigated and resolved performance issues."
            periodOfTime="August 2020 - July 2023"
          />
        </FadeIn>
      </div>
    </PageChunk>
  );
};
