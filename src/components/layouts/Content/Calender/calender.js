import React from 'react';
import { Calendar } from 'antd';
import styles from './style.module.less';
import { DateCellRender } from './dateCellRender';
import { MonthCellRender } from './monthCellRender';

export const CalenderComponent = () => {
  return (
    <section className={styles["Calendar_container"]}>
      <Calendar
        dateCellRender={DateCellRender}
        monthCellRender={MonthCellRender}
        className={styles['Calendar']}
      />
    </section>
  );
};
