import styles from './Chip.module.css';

type ChipProps = React.PropsWithChildren;

export const Chip = ({ children }: ChipProps) => {
  return <div className={styles.chip}>{children}</div>;
};
