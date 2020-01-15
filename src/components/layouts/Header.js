import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { IoMdSettings } from 'react-icons/io';
import { TiThLargeOutline, TiThMenuOutline } from 'react-icons/ti';
import { FaRegUserCircle } from 'react-icons/fa';
import { IconContext } from 'react-icons';

import { SearchBar } from '../Searchbar';
import { HeaderStyles } from '../../styles/layout';
import { SettingsContext, AuthContext } from '../../contexts';
import { UserProfile} from '../../styles/layout';
import { FirebaseApp } from '../../services'

export const Header = withRouter((props) => {
  const { settings: { isRow }, dispatch } = useContext(SettingsContext);
  const { setCurrentUser } = useContext(AuthContext);
  const [state, setState] = useState({
    showLogout: false,
  });
  const style = {
    color: 'white',
    fontSize: '22px',
    cursor: 'pointer',
  };

  const toggleLogout = () => {
    setState({ ...state, showLogout: !state.showLogout });
  };

  const logout = () => {
    FirebaseApp.auth.signOut().then(() => {
      setCurrentUser(null);
      return props.history.push('/login');
    }).catch(console.log);
  };

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
              <li><IoMdSettings /></li>
              { isRow ? (<li onClick={() => dispatch({type: 'SET_ROW'})}><TiThMenuOutline title='Listview' /></li>) :
              (<li onClick={() => dispatch({type: 'SET_ROW'})}><TiThLargeOutline title="Gridview" /></li>) }
              <UserProfile showLogout={state.showLogout}>
                <FaRegUserCircle onClick={toggleLogout} />
                <p className="dropdown" onClick={logout}>Logout</p>
              </UserProfile>
            </ul>
          </IconContext.Provider>
        </div>
      </nav>
    </HeaderStyles>
  )
});
