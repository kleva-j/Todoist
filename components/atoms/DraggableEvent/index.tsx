import { Draggable } from "react-beautiful-dnd";
import { Box } from "@chakra-ui/react";

interface IProps {
  item: {
    id: string;
    text: string;
  };
  index: number;
}

export const Event = (props: IProps) => {
  const { item, index } = props;
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...{ snapshot }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          height="30px"
          borderLeft="3px solid"
          borderLeftColor="orange"
        >
          {item.text}
        </Box>
      )}
    </Draggable>
  );
};

Event.displayName = "Event";
