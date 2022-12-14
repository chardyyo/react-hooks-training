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
  font-weight: bold;
`;

export const AppSearch = styled.div`
  font-weight: normal;
  color: red;
  margin-left: auto;
`;
