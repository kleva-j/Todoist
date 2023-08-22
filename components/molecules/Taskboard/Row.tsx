import { Draggable } from "react-beautiful-dnd";
import { areEqual } from "react-window";
import { Item } from "./Item";
import { memo } from "react";

export const Row = memo((props: any) => {
  const { data: items, index, style } = props;
  const item = items[index];

  if (!item) return null;

  return (
    <Draggable draggableId={item.id} index={index} key={item.id}>
      {(provided) => <Item provided={provided} item={item} style={style} />}
    </Draggable>
  );
}, areEqual);

Row.displayName = "Row";
