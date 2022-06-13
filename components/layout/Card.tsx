import { FunctionComponent, PropsWithChildren } from 'react';
import styles from './card.module.css'
import layoutUtils from 'styles/layoutUtils.module.css'

interface CardDetails extends PropsWithChildren {
  title?: string;
  subtitle?: string;
  flat?: boolean;
}

const Card: FunctionComponent<CardDetails> = (props) => {
  const titleElement = props.title ? <h2 className={styles.title}>{props.title}</h2> : undefined;
  const subtitleElement = props.subtitle ? <div className={styles.subtitle}>{props.subtitle}</div> : undefined;
  const containerClasses = [styles.card, layoutUtils['elevation-1']];

  if (props.flat) {
    containerClasses.push(layoutUtils.flat);
  }

  return (
    <div className={containerClasses.join(" ")}>
      <div className={styles.header}>
        {titleElement}
        {subtitleElement}
      </div>
      <div className={styles.content}> {props.children} </div>
    </div>
  )
}

export default Card