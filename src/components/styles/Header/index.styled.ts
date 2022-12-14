import styled from "styled-components";

export const Header = styled.header`
  background-color: hsl(0, 0%, 93%);
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: center;
  padding: 2em;
`;

export const AppName = styled.div`
  color: #f65261;
  font-size: 1.5em;
  font-weight: medium;
`;

export const AppSearch = styled.div`
  font-weight: normal;
  color: red;
  margin-left: auto;
`;
