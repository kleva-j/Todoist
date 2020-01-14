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
    // box-shadow: inset 1px 1px 0 rgba(0,0,0,.1), inset 0 -1px 0 rgba(0,0,0,.07)
  }

`;

export const TaskItem = styled.div`
  box-shadow: 0 0.5px 0 0 #e2e2e2 inset, 0 1px 2px 0 #B3B3B3;
  max-width: ${props => props.width};
  margin: 10px;
  padding: 15px
  text-align: start
  display: flex;
  border-radius: 5px;
  background: white;
  
  h4 {
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
  }

  h4:hover {
    color: red;
  }
`;