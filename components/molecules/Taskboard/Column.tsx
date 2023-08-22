import { Draggable } from "react-beautiful-dnd";
import { ItemList } from "./ListItem";
import { memo } from "react";

export const Column = memo(({ column, index }: any) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className="column"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <h3 className="column-title" {...provided.dragHandleProps}>
            {column.title}
          </h3>
          <ItemList column={column} index={index} />
        </div>
      )}
    </Draggable>
  );
});

Column.displayName = "Column";
