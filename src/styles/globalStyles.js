import styled, { createGlobalStyle } from 'styled-components';
import bgImage from '../dot-grid.png';

export const GlobalStyle = createGlobalStyle`
  html {
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
       scroll-behavior: smooth;
  }

  *, *:before, *:after {
    -webkit-box-sizing: inherit;
            box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    line-height: 1;
    color: #202124;
    background: url(${bgImage});
    background-attachment: fixed;
    font-family: Lato, 'Roboto', Arial, sans-serif;
    font-size: 16px;
    overflow-x: hidden;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  input:focus {
    outline: none;
  }

  input[type="search"]::placeholder {
    color: #333
  }

  /* Scrollbar */

  body::-webkit-scrollbar {
    width: 7px;
  }
  
  body::-webkit-scrollbar-track {
    border-radius: 10px;
    background: #eee;
  }
  
  body::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: linear-gradient(left, #96A6BF, #63738C);
    background: lightslategrey;
    box-shadow: inset 0 0 1px 1px #5C6670;
  }

`;

export const ContainerWrapper = styled.section`
  .container {
    margin: 75px auto 0;
    display: flex;
    justify-content: start;
  }

  .container > div {
    flex-grow: 1;
  } 
`;
