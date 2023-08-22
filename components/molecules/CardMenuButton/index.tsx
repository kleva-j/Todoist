import { MdDelete, MdOutlineContentCopy } from "react-icons/md";
import { BsThreeDots, BsPencilFill } from "react-icons/bs";
import {
  useColorModeValue,
  MenuButtonProps,
  MenuButton,
  IconButton,
  MenuItem,
  MenuList,
  Menu,
} from "@chakra-ui/react";

import { RadioButtons } from "components/atoms/Radio";

type Props = MenuButtonProps & {
  variant?: string;
};

export const MenuButtons = (props: Props) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<BsThreeDots />}
        variant="outline"
        isRound={true}
        fontSize="18px"
        size="sm"
        data-capture="menu"
        onClick={(event) => event.stopPropagation()}
        {...props}
      />
      <MenuList minWidth="150px" onClick={(event) => event.stopPropagation()}>
        <MenuItem
          py="8px"
          pl="20px"
          color={useColorModeValue("gray.600", "gray.200")}
          icon={<MdOutlineContentCopy fontSize="18px" />}
        >
          Duplicate
        </MenuItem>
        <MenuItem
          py="8px"
          pl="20px"
          color={useColorModeValue("gray.600", "gray.200")}
          icon={<BsPencilFill fontSize="18px" />}
        >
          Edit
        </MenuItem>
        <MenuItem
          py="8px"
          color="red"
          icon={<MdDelete fontSize="24px" color="red" />}
        >
          Delete
        </MenuItem>

        {/* <RadioButtons defaultValue="red" /> */}
      </MenuList>
    </Menu>
  );
};
