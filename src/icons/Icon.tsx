import React from "react";
import MenuIcon from "./menuIcon";
import FmyIcon from "./fmyIcon";

type IconType = "menu" | "fmy";
type MenuIconProps = React.ComponentProps<typeof MenuIcon>;
type IconProps = MenuIconProps & { type?: IconType };

export default function Icon({ type = "menu", name, ...rest }: IconProps) {
  if (type === "fmy") {
    return <FmyIcon name={name} {...rest} />;
  }
  return <MenuIcon name={name} {...rest} />;
}
