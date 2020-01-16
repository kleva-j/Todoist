import React, { useState, forwardRef } from 'react';

export const DeleteModal = forwardRef(({id, taskId, deleteTask}, ref) => {
  const [opacity, setOpacity] = useState(0);

  return (
    <div ref={ref} role="dialog" className="deleteModal" id={id} style={{opacity}} tabIndex="0" 
      onBlur={() => setOpacity(0)} onFocus={() => setOpacity(1)} onClick={() => deleteTask(taskId, id, { deleted: true })} >
      Delete
    </div>
  );
});
