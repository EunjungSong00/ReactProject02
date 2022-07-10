import styled from '@emotion/styled';

interface ILoginWrapper {
  children?: any;
  onClick?: () => void;
}

const StyledWrapper = styled.div`
  width: 355px;
  margin: 0 auto;
  text-align: center;
  justify-content: center;
`;

const LoginWrapper = ({children, ...props}: ILoginWrapper) => {
  return (
    <>
      <StyledWrapper>{children}</StyledWrapper>
    </>
  );
};

export default LoginWrapper;
