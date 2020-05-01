import React from 'react';
import { Calendar, List, Typography } from 'antd';
import { Link } from 'react-router-dom';
import styles from './style.module.less';
import { DateCellRender } from './dateCellRender';
import { MonthCellRender } from './monthCellRender';

const data = [
  { title: "Calendar", path: "/calendar" },
  { title: "Recent", path: "/recent" }
];

export const CalenderComponent = () => {

  return (
    <section className={styles['Calendar_container']}>

      <article className={styles["Left_article"]}>
        <List
          bordered
          size="small"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <Typography.Text>
                <Link to={`${item.path}`}>{item.title}</Link>
              </Typography.Text>
              {/* <Link to={`${item.path}`}>{item.title}</Link> */}
            </List.Item>
          )}
        />
      </article>

      <article className={styles["Right_article"]}>
        <Calendar
          dateCellRender={DateCellRender}
          monthCellRender={MonthCellRender}
          className={styles['Calendar']}
        />
      </article>

    </section>
  );
};
