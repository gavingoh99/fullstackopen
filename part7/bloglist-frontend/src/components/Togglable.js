import { useState } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: 1px solid;
  background-color: white;
  padding: 10px 20px;
  display: block;
  margin: 5px auto 0 auto;
  font-size: 15px;
  cursor: pointer;
`;
const Togglable = ({ buttonLabel, children }) => {
  const [visibility, setVisibility] = useState(false);
  const toggleVisibility = () => setVisibility(!visibility);
  return (
    <div>
      {visibility ? (
        children
      ) : (
        <StyledButton onClick={toggleVisibility}>{buttonLabel}</StyledButton>
      )}
    </div>
  );
};
export default Togglable;
