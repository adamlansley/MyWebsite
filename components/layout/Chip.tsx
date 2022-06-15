import { FunctionComponent } from "react";
import Icon from "@mdi/react";

interface ChipDetails {
  iconPath?: string;
  colourName?: string;
  reverse?: boolean;
  hideUntilHover?: boolean;
  isHovering?: boolean;
  text?: string;
}

const Chip: FunctionComponent<ChipDetails> = ({
  iconPath,
  colourName,
  reverse,
  text,
}) => {
  const icon = iconPath ? (
    <Icon className={`w-7 p-0.5 text-${colourName}`} path={iconPath} />
  ) : undefined;

  const textElement = text ? <div>{text}</div> : undefined;

  let containerClasses = `space-x-1 relative flex bg-${colourName}-light hover:bg-${colourName}-dark rounded-full py-0.5 px-2 cursor-pointer`;

  if (reverse) {
    containerClasses += " flex-row-reverse space-x-reverse";
  }

  return (
    <div className={containerClasses}>
      {icon} {textElement}
    </div>
  );
};

export default Chip;
