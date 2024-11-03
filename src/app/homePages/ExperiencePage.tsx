import { PageChunk } from '@/components/page/PageChunk';
import styles from './ExperiencePage.module.css';
import { TimelineEntry } from '@/components/timeline/TimelineEntry';

export const ExperiencePage = () => {
  return (
    <PageChunk className={styles.experiencePage}>
      <h2>Experience</h2>
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
          'Implemented bundle-size optimizations reducing some paths by up to 18%',
          'Increased codebase test coverage by over 15% within the first few months',
        ]}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          ullamcorper, lorem eu fringilla ultrices, arcu odio molestie purus,
          sed congue justo ligula a ante. Duis maximus lobortis congue. Morbi
          nec mattis eros. Quisque pellentesque quam est, vel pretium nisl
          mollis a."
        periodOfTime="July 2024 - Present"
      />
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
          'Implemented a type-safe grid system on top of existing work, identifying over 20 bugs immediately',
          'Lead the development of a NextJS website displaying tens of thousands of map entries efficiently',
        ]}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          ullamcorper, lorem eu fringilla ultrices, arcu odio molestie purus,
          sed congue justo ligula a ante. Duis maximus lobortis congue. Morbi
          nec mattis eros. Quisque pellentesque quam est, vel pretium nisl
          mollis a."
        periodOfTime="July 2023 - July 2024"
      />
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
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          ullamcorper, lorem eu fringilla ultrices, arcu odio molestie purus,
          sed congue justo ligula a ante. Duis maximus lobortis congue. Morbi
          nec mattis eros. Quisque pellentesque quam est, vel pretium nisl
          mollis a."
        periodOfTime="August 2020 - July 2023"
      />
    </PageChunk>
  );
};
