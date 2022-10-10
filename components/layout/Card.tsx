import { FunctionComponent, PropsWithChildren } from "react";

export interface CardDetails extends PropsWithChildren {
  title?: string;
  subtitle?: string;
  flat?: boolean;
}

const Card: FunctionComponent<CardDetails> = ({
  title,
  subtitle,
  flat,
  children,
}) => {
  const titleElement = title ? (
    <h2 className="font-light text-4xl">{title}</h2>
  ) : undefined;

  const subtitleElement = subtitle ? (
    <div className="font-light text-xl">{subtitle}</div>
  ) : undefined;

  let containerClasses = " rounded p-4 flex-1";

  if (flat) {
    containerClasses = containerClasses.replace("rounded ", "");
  }

  return (
    <div className={containerClasses}>
      <div className="pb-4">
        {titleElement}
        {subtitleElement}
      </div>
      <div> {children} </div>
    </div>
  );
};

export default Card;
