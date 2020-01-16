import styled from 'styled-components';

export const TaskContainerStyles = styled.div`

  .task__container {
    display: flex;
    flex-direction: ${props => props.flex_direction};
    margin: 20px auto;
    flex-wrap: wrap;
    align-content: ${props => props.flex_direction === 'row' ? '' : 'center'};
  }

  .task__item:hover {
    box-shadow: 0 1px #e2e2e2 inset, 0 1px 3px rgba(34, 25, 25, 0.4);
    // box-shadow: inset 1px 1px 0 rgba(0,0,0,.1), inset 0 -1px 0 rgba(0,0,0,.07);
  }

`;

export const TaskItem = styled.div`
  box-shadow: 0 0.5px 0 0 #e2e2e2 inset, 0 1px 2px 0 #B3B3B3;
  max-width: ${props => props.isRow ? '300px' : '500px' };
  margin: 10px;
  padding: 15px
  text-align: start
  display: flex;
  border-radius: 5px;
  background: white;
  position: relative;

  .deleteModal {
    padding: 8px;
    position: absolute;
    top: 66%;
    right: -50px;
    width: 70px;
    text-align: center;
    vertical-align: middle;
    background: white;
    box-shadow: 0 1px #e2e2e2 inset, 0 1px 3px rgba(34, 25, 25, 0.4);
    cursor: pointer;
    z-index: 2;
    outline: none;
  }
  
  .deleteModal:hover {
    background: #f3f3f3;
  }


  .title {
    padding: 3px 10px 0;
    margin: 0;
    font-size: 17px;
    font-family: Lato;
    font-weight: 400;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap; 
    text-overflow: ellipsis;
    vertical-align: middle
    flex-grow: 1
  }

  title:hover {
    color: red;
  }

  .delete__button {
    color: red;
    font-size: 20px;
    cursor: pointer;
    border-radius: 50%
  }
  
  .delete__button:hover {
    background-color: #f1f1f1
  }

  .more__options {
    color: black;
    font-size: 20px;
    cursor: pointer;
  }

`;