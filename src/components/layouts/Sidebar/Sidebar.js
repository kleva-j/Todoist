import React, { useContext } from 'react';
import {
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from 'react-icons/fa';

import { SubSection } from './SubSection'
import { SidebarStyles } from '../../../styles/layout';
import { SettingsContext } from '../../../contexts';

export const Sidebar = () => {
  const { settings: { subsections } } = useContext(SettingsContext);
  const Subsections = Object.keys(subsections);

  return (
    <SidebarStyles>
      <ul className="">
        <li className="sidebar__mini__items">
          <span>
            <FaInbox />
          </span>
          <span className="sidebar__column__text">Inbox</span>
        </li>
  
        <li className="sidebar__mini__items active">
          <span>
            <FaRegCalendar />
          </span>
          <span className="sidebar__column__text">Today</span>
        </li>
  
        <li className="sidebar__mini__items">
          <span>
            <FaRegCalendarAlt />
          </span>
          <span className="sidebar__column__text">Next 7 days</span>
        </li>
      </ul>
  
      <hr />
  
      <ul className="sidebar__middle">
        {Subsections.map((item, index) => <SubSection key={index} title={item} />)}
      </ul>

      <hr />
  
      <ul className="sidebar__projects">

      </ul>
    </SidebarStyles>
  );
};

