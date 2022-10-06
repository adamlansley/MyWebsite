import { FunctionComponent } from "react";
import Icon from "@mdi/react";
import Link from "next/link";

export interface ChipDetails {
  iconPath?: string;
  colourName?: string;
  reverse?: boolean;
  hideUntilHover?: boolean;
  isHovering?: boolean;
  text?: string;
  href?: string;
}

const Chip: FunctionComponent<ChipDetails> = ({
  iconPath,
  colourName,
  reverse,
  text,
  href,
}) => {
  const icon = iconPath ? (
    <Icon className={`w-7 p-0.5 text-${colourName}`} path={iconPath} />
  ) : undefined;

  const textElement = text ? <div>{text}</div> : undefined;

  let containerClasses = `space-x-1 relative flex items-center border border-${colourName} hover:bg-${colourName}/10 rounded-full pb-0.5 pl-2 pr-3 cursor-pointer`;

  if (reverse) {
    containerClasses += " flex-row-reverse space-x-reverse";
  }

  const containerElement = href ? (
    <Link href={href}>
      <a className={containerClasses}>
        {icon} {textElement}
      </a>
    </Link>
  ) : (
    <div className={containerClasses}>
      {icon} {textElement}
    </div>
  );

  return containerElement;
};

export default Chip;
