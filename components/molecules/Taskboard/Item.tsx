export function Item({ provided, item, style, isDragging }: any) {
  return (
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      className={`item ${isDragging ? "is-dragging" : ""}`}
    >
      {item.text}
    </div>
  );
}
