import styles from './TimelineEntry.module.css';
import { Chip } from '@/components/chip/Chip';

type ExperienceTimelineEntry = {
  title: string;
  tags: string[];
  keyPoints: string[];
  description: string;
  periodOfTime: string;
};

export const TimelineEntry = ({
  title,
  tags,
  keyPoints,
  description,
  periodOfTime,
}: ExperienceTimelineEntry) => {
  return (
    <div className={styles.timelineEntry}>
      <span className={styles.timelinePeriodOfTime}>{periodOfTime}</span>
      <h3 className={styles.timelineTitle}>{title}</h3>
      <div className={styles.timelineTags}>
        {tags.map((tag) => (
          <Chip key={tag}>{tag}</Chip>
        ))}
      </div>
      <div className={styles.timelineDescription}>
        <p>{description}</p>
      </div>
      <ul className={styles.timelineKeyPoints}>
        {keyPoints.map((keyPoint) => (
          <li key={keyPoint}>{keyPoint}</li>
        ))}
      </ul>
    </div>
  );
};
