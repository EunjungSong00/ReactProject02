import {Wrapper, Text, Image, Button} from '@components/atoms';
import styled from '@emotion/styled';
import theme from '@public/theme';
import {useRouter} from 'next/router';
import React, {useEffect, useState, ReactElement} from 'react';
import {Dialog} from '@components/organisms';
import TermsOfService from '@public/texts/TermsOfService';

const CarmerceIndex = (): ReactElement => {
  const router = useRouter();
  const [dialogNum, setDialogNum] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [btnStatus, setBtnStatus] = useState(false);
  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    if (scrollY > 50) {
      setBtnStatus(true);
    } else {
      setBtnStatus(false);
    }
  };

  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setScrollY(0);
    setBtnStatus(false);
  };

  // useEffect(() => {
  //   // console.info('scrollY is', scrollY);
  // }, [scrollY]);

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow);
    };
  }, [handleTop]);

  type InfoProps = {
    text: string;
    onClickMore?: React.MouseEventHandler<any>;
  };

  function InfoMore({text, onClickMore}: InfoProps) {
    return (
      <>
        <InfoTxt style={{margin: '0 15px 0 0'}} onClick={onClickMore}>
          {text}
        </InfoTxt>
      </>
    );
  }

  type listItemType = {
    id: number;
    imgUrl: string;
    title: string;
    subTitle: React.ReactElement;
  };

  const listItem: listItemType[] = [
    {
      id: 1,
      imgUrl: '/images/icon-1@2x.png',
      title: '편리한 기능',
      subTitle: (
        <>
          차량번호 입력 만으로 매입한 차량 정보를 확인 할 수 있는
          <br />
          간편 등록 서비스
        </>
      )
    },
    {
      id: 2,
      imgUrl: '/images/icon-2@2x.png',
      title: '직관적 데이터',
      subTitle: (
        <>
          이용자의 재고현황 비용현황 손익현황을
          <br />
          보여주는 데이터 섹션
        </>
      )
    },
    {
      id: 3,
      imgUrl: '/images/icon-3@2x.png',
      title: '간편한 등록',
      subTitle: (
        <>
          클릭 한 번으로 리스팅 사이트에
          <br /> 등록할 수 있는 간편 등록 기능
        </>
      )
    }
  ];

  return (
    <>
      <IndexHeader width="100vw" height={79}>
        <h1>
          <span>카머스</span>
        </h1>
      </IndexHeader>
      <Wrapper maxWidth={1200} minWidth={1020} margin="0 auto 80px">
        <Wrapper between>
          <Wrapper width="45%">
            <MainText mt={120}>
              판매자의 성공을 돕는
              <br />
              합리적인 서비스
              <br />
              <span>카머스 스마트 카센터</span>
            </MainText>
            <Text type="sectionSubTitle" mt={25} lineHeight={'1.6'}>
              중고차 상품화부터 광고 차량등록 세무 하나로 통합된 차량 관리 플랫폼
            </Text>
            <Wrapper mt={65}>
              <Button width="196px" height="60px" mr="8px" children={'회원가입'} onClick={() => router.push('/login/signup')} />
              <Button type="white" width="196px" height="60px" children={'로그인'} onClick={() => router.push('/login')} />
            </Wrapper>
          </Wrapper>
          <MainImgWrapper>
            <img src={'/images/img-index-main@2x.png'} />
          </MainImgWrapper>
        </Wrapper>
      </Wrapper>
      <Wrapper center width={'100vw'} minWidth={1020} background="#f1f3f5" padding="120px 0 130px">
        <Wrapper maxWidth={1200} minWidth={1020} margin="0 auto">
          <SubText>
            차량번호 입력 만으로 매입한 차량 정보를 확인 할 수 있는 <br />
            간편 등록 서비스
          </SubText>
          <Text textAlign={'center'} mt={30}>
            카머스에서는 차량번호 입력만으로 차량모델, 제원정보, 사괴력, 성능점검기록 등 상세 정보를 확인할 수 있습니다.
          </Text>
          <Wrapper maxWidth={1050} minWidth={1020} margin="60px auto 0">
            <Image width="100%" src={'/images/main-img@2x.png'} />
          </Wrapper>
        </Wrapper>
      </Wrapper>
      <Wrapper w justifyContent={'space-around'} maxWidth={1200} minWidth={1020} margin="0 auto" padding="100px 0 190px">
        {listItem.map((item) => (
          <Wrapper key={item.id} width="33.333%" center>
            <Image width={100} height={100} src={item.imgUrl} />
            <ItemTitle size="20px" letterSpacing="-0.5px" mt={28}>
              {item.title}
            </ItemTitle>
            <Text size="15px" lineHeight="1.73" letterSpacing="-0.38px" textAlign="center" mt={14}>
              {item.subTitle}
            </Text>
          </Wrapper>
        ))}
      </Wrapper>
      <Wrapper width="100%" background="#161717db" padding={'70px 0 90px'}>
        <Wrapper column center pt={40}>
          <InquiryButton width="190px" height="60px" children={'가입문의'} margin="0 auto 40px" onClick={() => router.push('/login/membership-inquiry')} />
          <Text size="xs" weight={'2'} color="#fff">
            업체명: (주) 핸들 &nbsp;&nbsp;|&nbsp;&nbsp; 주소 : 용인시 기흥구 중부대로 242 오토허브 1F 09호 &nbsp;&nbsp;|&nbsp;&nbsp; 사업자 등록번호 : 312-81-87267
            &nbsp;&nbsp;|&nbsp;&nbsp; 대표이사 : 안인성 &nbsp;&nbsp;|&nbsp;&nbsp; e-mail : isahn@autohub.co.kr
          </Text>
          <Text size="xs" weight={'2'} mt={15} color="#fff">
            <InfoMore text={'개인정보 처리방침'} onClickMore={() => setDialogNum(1)} />
            |&nbsp;&nbsp;&nbsp; Copyright © 2021
            <span style={{fontFamily: theme.font[3]}}> Carmerce Inc </span>
            ALL RIGHTS RESERVED
          </Text>
        </Wrapper>
      </Wrapper>
      {dialogNum > 0 && (
        <Dialog title="개인정보 처리방침" dialogOpen={dialogNum} setDialogClose={setDialogNum} width={500} height={800}>
          <TermsOfService content="개인정보 수집 및 이용 동의" />
        </Dialog>
      )}

      {/*  floatingMenu */}
      <FloatingWrapper>
        <InquiryWrapper onClick={() => router.push('/login/partnership-inquiry')} />
        {btnStatus && (
          <TopWrapper>
            <div className={btnStatus ? 'btn active' : 'btn'} onClick={handleTop}></div>
          </TopWrapper>
        )}
      </FloatingWrapper>
    </>
  );
};

export default CarmerceIndex;

const IndexHeader = styled(Wrapper)`
  h1 {
    background: url(/images/invalid-name@2x.png) no-repeat;
    background-size: contain;
    width: 170px;
    height: 26px;
    margin-top: 35px;
    margin-left: 30px;
    span {
      display: inline-block;
      text-indent: -9999em;
    }
  }
`;

const MainText = styled(Text)`
  font-size: 48px;
  font-family: ${theme.font['2']};
  line-height: 1.33;
  letter-spacing: -1.2px;
  span {
    font-family: ${theme.font['5']};
  }
`;

const MainImgWrapper = styled(Wrapper)`
  max-width: 554px;
  img {
    object-fit: contain;
    max-width: 100%;
    overflow: hidden;
  }
`;

const SubText = styled(Text)`
  font-size: 34px;
  font-family: ${theme.font['4']};
  line-height: 1.56;
  text-align: center;
`;

const ItemTitle = styled(Text)`
  text-align: center;
  font-family: ${theme.font['5']};
`;

export const InfoTxt = styled.span`
  font: ${theme.font['3']};
  letter-spacing: -0.68px;
  color: ${theme.color.white};
  margin-top: 16px;
  cursor: pointer;
`;

const InquiryButton = styled(Button)`
  background-color: transparent;
  border: 1px solid #fff;

  &:hover {
    background-color: #606060;
  }
`;

const FloatingWrapper = styled.div`
  position: fixed;
  top: 50%;
  right: 80px;
  width: 60px;
  height: 180px;
`;

const InquiryWrapper = styled.div`
  width: 49px;
  height: 49px;
  border-radius: 30px;
  background-color: #6d6e71;
  background-image: url(/images/icon-btn-counsel@2x.png);
  background-repeat: no-repeat;
  background-size: 18px;
  background-position: 15px 15px;
  transition: width ease-in-out 0.3s;
  position: relative;
  cursor: pointer;

  &:hover {
    width: 120px;
    transition: width ease-in-out 0.3s;

    &::after {
      content: '제휴문의';
      font-size: 15px;
      color: #fff;
      display: inline-block;
      position: absolute;
      left: 46px;
      top: 18px;
      width: 90px;
      overflow: hidden;
    }
  }
`;

const TopWrapper = styled.div`
  .btn {
    position: fixed;
    top: -10px;
    right: 91px;
    margin-top: 20px;
    width: 49px;
    height: 49px;
    background: url(/images/bt-top@2x.png) no-repeat;
    background-size: contain;
    cursor: pointer;
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s ease-in;
    &.active {
      top: 54%;
      opacity: 1;
      z-index: 80;
      transition: opacity 0.3s ease-in;
    }
  }
`;
