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
  }

`;

export const TaskItem = styled.div`
  box-shadow: 0 0.5px 0 0 #e2e2e2 inset, 0 1px 2px 0 #B3B3B3;
  width: ${props => props.width};
  max-width: 600px;
  margin: 10px;
  padding: 15px
  text-align: start
  display: flex;
  border-radius: 5px;
  
  h4 {
    padding: 0 10px;
    margin: 0;
    font-size: 17px;
    font-family: Lato;
    font-weight: 400;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap; 
    text-overflow: ellipsis;
  }

  h4:hover {
    color: red;
  }
`;