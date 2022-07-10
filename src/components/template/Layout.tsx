import {Header, LeftSide, RightSide} from '@components/organisms';
import {Wrapper} from '@components/atoms';
import styled from '@emotion/styled';
import theme from 'public/theme';
import {ReactElement, useEffect, useRef} from 'react';
import {useRouter} from 'next/router';
import useWindowSize from '@modules/hooks/useWindowSize';

const Layout = ({children}: any): ReactElement => {
  const size = useWindowSize();
  const router = useRouter();
  const mainRef = useRef<any>(null);
  const onScrollTop = () => {
    // console.info('mainRef', mainRef);
    mainRef.current.scrollTop = 0;
  };
  useEffect(() => {
    onScrollTop();
  }, [router.pathname]);
  // useEffect(() => {
  //   console.log(size.width);
  //   console.log(typeof size.width);
  // }, [size]);

  return (
    <Wrapper>
      <Header />
      {/* <div>{size.width}</div> */}
      <MainWrapper>
        <LeftSide />
        <MainCont ref={mainRef}>{children}</MainCont>
        {size.width > 1677 && <RightSide />}
      </MainWrapper>
    </Wrapper>
  );
};
export default Layout;

const MainWrapper = styled.div`
  background: ${theme.color.bg};
  display: flex;
  /* justify-content: space-between; */
  max-height: calc(100vh - 52px);
  min-height: calc(100vh - 52px);
  min-width: 1200px;
`;
const MainCont = styled.div`
  min-width: 955px;
  max-height: calc(100vh - 52px);
  width: 100%;
  /* margin: 0 10px; */
  /* padding-left: 10px; */
  /* padding-right: 10px; */
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    padding: 10px 0;
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${theme.color.scrollColor};
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: none;
  }
  overflow-x: hidden;
`;
