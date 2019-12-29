import styled from 'styled-components';

export const HeaderStyles = styled.header`
  padding: 20px;
  background-color: #128277;
  position: fixed;
  top: 0;
  width: 100%

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
    border-color: #fdfdfd;
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
    display: flex;
    box-sizing: border-box;
  }

  .sidebar__middle > li span {
    cursor: pointer;
  }

  .sidebar__middle > li:hover {
    background: #f3f3f3;
  }

  .sidebar__middle > li span:nth-child(2) {
    flex-grow: 1;
    padding-left: 25px;
  }

`;

export const MainContentWrapper = styled.div`
  margin-left: 320px;

  .main {
    text-align: center;
    padding: 25px;
  }

  .input__add__item {
    width: 600px;
    line-height: 28px;
    font-size: 18px;
    padding: 8px 20px;
    outline: none;
    border: 1px solid lightgrey;
    border-radius: 5px;
  }
  
  .input__add__item:focus {
    box-shadow: 0 1px #FFFFFF inset, 0 1px 3px rgba(34, 25, 25, 0.4);
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
    width: 350px
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
