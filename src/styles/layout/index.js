import styled from 'styled-components';

export const HeaderStyles = styled.header`
  padding: 20px;
  background-color: #128277;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;

  .navbar__header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: center;
    margin: 0 100px;
  }

  .logo {
    position: relative;
  }

  .logo h3 { 
    padding: 10px 0 0 0;
    margin: 0;
    color: #eeeeee;
  }

  .settings, .settings__buttons {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: space-around;
  }

  .settings__buttons {
    min-width: 160px
  }

`;

export const UserProfile = styled.li`
  position: relative;

  .dropdown {
    position: absolute;
    left: 18px;
    top: 5px;
    min-width: 60px;
    background-color: #ffffff;
    padding: 5px;
    color: #000000;
    font-size: 14px;
    border-radius: 
    z-index: 1;
    display: ${props => props.showLogout ? 'inline-block' : 'none'};
    cursor: pointer;
    text-align: center
  }

  .dropdown:hover {
    background: #f2f2f2;
  }

`;

export const SidebarStyles = styled.section`
  width: 320px;
  height: calc(100vh - 50%);
  height: 100%;
  padding-top: 10px;
  position: fixed;
  top: 78px;
  background: #fdfdfd;
  border-right: 1px solid #f1f1f1

  hr {
    margin: 13px 0;
    border-color: #fefefe;
  }

  .sidebar__mini__items {
    display: flex;
    padding: 1px 0 1px 24px;
    border-radius: 0 25px 25px 0;
    min-height: 42px;
    flex-wrap: wrap;
    align-content: center;
    cursor: pointer;
    line-height: 45px;
  }

  .sidebar__mini__items:hover {
    background-color: #f2f2f2;
  }
  
  .sidebar__mini__items.active {
    background-color: #128277;
    background-color: #20948B;
  }

  .sidebar__column__text {
    padding-left: 24px;
  }

  .sidebar__middle > li {
    padding: 12px 20px;
    box-sizing: border-box;
  }
  
  .sidebar__middle > li > div {
    display: flex;

  }  

  .sidebar__middle > li span {
    cursor: pointer;
  }

  .sidebar__middle > li:hover {
    background: #f3f3f3;
  }

  .sidebar__middle > li .title {
    flex-grow: 1;
    padding-left: 25px;
  }

`;

export const SidebarSubSections = styled.div`
  display: flex;
  flex-direction: column;
  height: ${props => props.isTabOpen ? 'auto' : '0px'}
  overflow-x: hidden

  .sect {
    width: 100%;
    border-bottom: 1px solid #eee;
    padding: 10px 0px 10px 80px;
    vertical-align: middle;
    background: white;
    cursor: pointer;
  }

  .sect:hover {
    background: #f2f2f2;
    color: red
  }
`;

export const MainContentWrapper = styled.div`
  margin-left: 320px;
  display: flex;
  justify-content: center

  .main {
    padding: 25px;
    width: 100%  
  }
  
  .input__add__item {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 500px;
    padding: 8px 20px;
    border: 1px solid lightgrey;
    border-radius: 5px;
    box-shadow: 0 1px #FFFFFF inset, 0 1px 3px rgba(34, 25, 25, 0.4);
  }
  
  .editable {
    line-height: 30px;
    font-size: 18px;
    outline: none;
    border: none;
    font-family: lato;
    background: transparent;
    word-break: break-word;
    resize: none;
  }

  [contentEditable=true]:empty:not(:focus):before {
    content:attr(data-text)
  }

  .options {
    display: flex
    height: 0px;
    overflow-x: hidden;
    justify-content: space-between;
    width: 100%;
    background: transparent;
  }

  .options > div {
    display: flex;
    align-items: flex-end;
    flex-grow: 1;
  }

  .options > div > span {
    margin-right: 12px
  }

  .options .add_project,
  .options .add_label {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #eee;
    border-radius: 12px;
    padding: 3px 10px 4px 3px;
    height: 23px;
    cursor: pointer;
    vertical-align: middle
  }
  
  .options span > * {
    vertical-align: middle;
  }

  .options .add_project:hover,
  .options .add_label:hover {
    background: #ddd;
  }

  .options .done {
    border: none;
    border-radius: 4px;
    outline: none;
    padding: 6px 13px;
    cursor: pointer;
    background: #eee;
  }

  .options .done:hover {
    background: #ddd;
  }

`;

export const SearchBarStyles = styled.div`
  .search {
    font-size: 17px;
    margin: 0 15px;
    color: #d2d2f2;
    background: transparent;
    border: 1px solid #80BD9E;
    padding: 8px 25px 8px 50px;
    border-radius: 5px;
    width: 350px;
    -webkit-appearance: textfield;

  }
  .search:focus {
    border-color: #fafafa;
  }

  .search:focus ~ label {
    background: #20948B;
    border-radius: 4px 0 0 4px;
  }
  
  .search__container {
    position: relative;
  }
  
  label {
    position: absolute;
    box-sizing: border-box
    padding: 7.5px;
    left: 17px;
    top: 1px
  }
`;
