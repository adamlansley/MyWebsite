import { PageChunk } from '@/components/page/pageChunk';
import styles from '@/app/homePages/heroPage.module.css';
import { SkillsScene } from '@/components/scenes/skills/SkillsScene';

export const HeroPage = () => {
  return (
    <PageChunk className={styles.heroPage}>
      <div className={styles.skillsScene}>
        <SkillsScene />
      </div>
      {/*<SkillsCanvas className={styles.skills} />*/}
      <h1 className={styles.name}>Adam Lansley</h1>
      <p className={styles.hook}>
        Turning innovative ideas into responsive, feature-rich solutions built
        for today’s digital world.
      </p>
    </PageChunk>
  );
};
