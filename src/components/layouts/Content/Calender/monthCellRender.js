import React from 'react';
import styles from './style.module.less';

const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

export const MonthCellRender = (value) => {
  const num = getMonthData(value);
  return num ? (
    <div className={styles["notes-month"]}>
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
};
