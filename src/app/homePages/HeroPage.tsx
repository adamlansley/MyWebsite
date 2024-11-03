import { PageChunk } from '@/components/page/PageChunk';
import styles from '@/app/homePages/HeroPage.module.css';
import { SkillsScene } from '@/components/scenes/skills/SkillsScene';

export const HeroPage = () => {
  return (
    <PageChunk className={styles.heroPage}>
      <div className={styles.skillsScene}>
        <SkillsScene />
      </div>
      <h1 className={styles.name}>Adam Lansley</h1>
      <p className={styles.hook}>
        Building feature-rich, responsive, and performant web applications.
      </p>
    </PageChunk>
  );
};
