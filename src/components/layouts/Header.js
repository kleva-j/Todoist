import React, { useContext } from 'react';
import { IoMdAdd, IoMdSettings } from 'react-icons/io';
import { TiThLargeOutline, TiThMenuOutline } from 'react-icons/ti';
import { IconContext } from 'react-icons';

import { SearchBar } from '../searchbar';
import { HeaderStyles } from '../../styles/layout';
import { SettingsContext } from '../../contexts'

export const Header = () => {
  const state = useContext(SettingsContext);
  const { isRow, setRow } = state;
  const style = {
    color: 'white',
    fontSize: '22px',
    cursor: 'pointer',
  }

  return (
    <HeaderStyles>
        <nav className="navbar__header">
          <div className="logo">
            <h3>TASKAIDER </h3>
          </div>

          <SearchBar />

          <div className="settings">
            <IconContext.Provider value={{ style }}>
              <ul className="settings__buttons">
                <li><IoMdAdd /></li>
                <li><IoMdSettings /></li>
                { isRow ? (<li onClick={setRow}><TiThMenuOutline title='Listview' /></li>) :
                (<li onClick={setRow}><TiThLargeOutline title="Gridview" /></li>) }
              </ul>
            </IconContext.Provider>
          </div>
        </nav>
    </HeaderStyles>
  )
};
