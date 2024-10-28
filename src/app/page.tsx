import styles from './page.module.css';
import { HeroPage } from '@/app/homePages/heroPage';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HeroPage />
      </main>
    </div>
  );
}
