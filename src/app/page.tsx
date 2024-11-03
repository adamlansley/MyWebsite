import styles from './page.module.css';
import { HeroPage } from '@/app/homePages/HeroPage';
import { ExperiencePage } from '@/app/homePages/ExperiencePage';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HeroPage />
        <ExperiencePage />
      </main>
    </div>
  );
}
