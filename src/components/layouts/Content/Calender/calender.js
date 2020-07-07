import React from 'react';
import { Calendar } from 'antd';
import { motion } from 'framer-motion';

import styles from './style.module.less';
import { DateCellRender } from './dateCellRender';
import { MonthCellRender } from './monthCellRender';
import { SEOHeader } from '../../../Reuseables/Header';

export const CalenderComponent = () => {
  return (
    <motion.section
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={styles["Calendar_container"]}>
      <SEOHeader pageTitle="Calendar" pageDesc="Taskaider calendar page" currentURL="/calendar" />
      <Calendar
        dateCellRender={DateCellRender}
        monthCellRender={MonthCellRender}
        className={styles['Calendar']}
      />
    </motion.section>
  );
};
