import {Wrapper} from '@components/atoms';
import styled from '@emotion/styled';
import {useRouter} from 'next/router';
import {parseCookies} from 'nookies';
import {ReactElement, useCallback} from 'react';
import url from './url.json';

const DevTool = (): ReactElement => {
  const cookies = parseCookies();
  const isLocalHost = process.env.NEXT_PUBLIC_DOMAIN === 'http://localhost:8010';
  const router = useRouter();

  const QuickCopyToken = useCallback(
    () =>
      isLocalHost ? (
        <CopyWrapper w h pt="2px" mr="70px" width="15px" height="15px" onClick={copyTokenOnClipBoard}>
          T
        </CopyWrapper>
      ) : (
        <></>
      ),
    [isLocalHost]
  );

  const UrlBadges = useCallback(
    () =>
      isLocalHost ? (
        <Wrapper flex>
          <UrlBadgesWrapper w h pt="2px" mr="30px" width="15px" height="15px" onClick={() => router.push(url.eo)}>
            E
          </UrlBadgesWrapper>
          <UrlBadgesWrapper w h pt="2px" mr="30px" width="15px" height="15px" onClick={() => router.push(url.kim)}>
            K
          </UrlBadgesWrapper>
          <UrlBadgesWrapper w h pt="2px" mr="30px" width="15px" height="15px" onClick={() => router.push(url.song)}>
            S
          </UrlBadgesWrapper>
          <UrlBadgesWrapper w h pt="2px" mr="70px" width="15px" height="15px" onClick={() => router.push(url.park)}>
            P
          </UrlBadgesWrapper>
        </Wrapper>
      ) : (
        <></>
      ),
    [isLocalHost]
  );

  const copyTokenOnClipBoard = useCallback(async () => {
    try {
      const accessToken = cookies.carPartnerAccessToken;
      await navigator.clipboard.writeText(`{"authorization": "Bearer ${accessToken}"}`);
      console.group('token copy');
      console.info('토큰헤더를 클립보드에 복사했습니다');
      console.info(`{"authorization": "Bearer ${accessToken}"}`);
      console.groupEnd();
    } catch (error) {
      console.group('token copy');
      console.error('토큰헤더 복사가 실패되었습니다');
      console.error(error);
      console.groupEnd();
    }
  }, []);

  return (
    <Wrapper width={'100%'}>
      <Wrapper flex style={{float: 'right'}}>
        <UrlBadges />
        <QuickCopyToken />
      </Wrapper>
    </Wrapper>
  );
};

export default DevTool;

const CopyWrapper = styled(Wrapper)`
  cursor: pointer;
  border: 2px solid #ffffff;
  border-radius: 20px;
  font-size: 10px;
  color: #ffffff;
  &:active {
    border: 2px solid #d2d2d2;
    color: #d2d2d2;
    cursor: context-menu;
  }
`;

const UrlBadgesWrapper = styled(Wrapper)`
  cursor: pointer;
  border: 2px solid #ffffff;
  border-radius: 20px;
  font-size: 10px;
  color: #ffffff;
  &:active {
    border: 2px solid #d2d2d2;
    color: #d2d2d2;
  }
`;
