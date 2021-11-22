/* eslint-disable react/display-name */
import React from "react";
import { Icon, IconButton } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { CgMenuGridO } from "react-icons/cg";
import { RiGridFill } from "react-icons/ri";
import { IconType } from "react-icons/lib";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
interface IconProps {
  w?: number;
  viewBox?: string;
  color?: string;
  focusable?: boolean;
  children?: React.ReactElement;
  [key: string]: any;
}

interface ButtonProps {
  fontsize?: string;
  isRound?: boolean;
  colorScheme?: string;
  isActive?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  size?: string;
  spinner?: React.ReactElement;
  variant?: string;
  iconProps?: IconProps;
}

const generateIcon = (icon: IconType) => (props: IconProps) =>
  <Icon as={icon} fontSize="18px" {...props} />;

export const Profile = generateIcon(CgProfile);
export const SearchIcon = generateIcon(FiSearch);
export const MenuGridIcon = generateIcon(CgMenuGridO);
export const SettingsIcon = generateIcon(IoSettingsOutline);

export const SearchIconButton = (props: ButtonProps) => (
  <IconButton
    {...props}
    aria-label="Search board"
    icon={<SearchIcon {...props.iconProps} />}
  />
);

export const MenuGridButton = (props: ButtonProps) => (
  <IconButton
    {...props}
    aria-label="menu grid"
    icon={<MenuGridIcon {...props.iconProps} />}
  />
);
