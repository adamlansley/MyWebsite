import styles from '@/components/page/PageChunk.module.css';
import clsx from 'clsx';

type PageProps = React.PropsWithChildren &
  Pick<React.HTMLAttributes<HTMLDivElement>, 'className'>;

export const PageChunk = ({ children, className }: PageProps) => {
  return <section className={clsx(styles.page, className)}>{children}</section>;
};
