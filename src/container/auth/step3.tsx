import React, {memo, useCallback, useState} from 'react';
import {useRouter} from 'next/router';
import {setCookie} from 'nookies';
import {Text} from '@components/atoms';
import Wrapper from '@components/atoms/Wrapper';
import ButtonNew from '@components/atoms/ButtonNew';
import {Dialog, Popup} from '@components/organisms';
import {PopupType} from '@components/organisms/Popup';
import getPartnerApi from '@api/auth/getPartnerApi';

const Step3 = () => {
  const [dialogMessage, setDialogMessage] = useState<number | undefined>(undefined);
  const [corporationName, setCorporationName] = useState<string>('OOO');
  const [popupContent, setPopupContent] = useState<PopupType>(undefined);
  const router = useRouter();

  const checkAccount = useCallback((account: boolean) => {
    if (account) {
      setDialogMessage(1);
    } else {
      router.push('/account');
    }
  }, []);

  const clickOk = useCallback(() => {
    getPartnerApi().then((res) => {
      if (res) {
        if (res.response?.errors) {
          setPopupContent(res.response.errors[0].message.toString());
        } else {
          // localStorage.setItem('user', JSON.stringify(res));
          setCookie(null, 'carPartnerUserInfo', JSON.stringify(res?.getPartner), {
            maxAge: 30 * 24 * 60 * 60,
            path: '/'
          });
          setCorporationName(res.getPartner?.dealer.companyName);
          checkAccount(res.getPartner?.registerSettlementAccount);
        }
      }
    });
  }, []);

  return (
    <>
      <Wrapper mt={'40px'}>
        <Wrapper flex justifyContent={'center'} mb={'15px'}>
          <Text size={'xl'} weight={'3'}>
            카머스&nbsp;
          </Text>
          <Text size={'xl'} weight={'5'}>
            회원가입이 가입완료&nbsp;
          </Text>
          <Text size={'xl'} weight={'3'}>
            되었습니다.
          </Text>
        </Wrapper>
        <Text size={'xs'} color={'darkgray'} lineHeight={'24px'}>
          확인 버튼을 눌러 카머스를 시작하세요!
        </Text>
        <ButtonNew children={'확인'} large mt={30} onClick={clickOk} />
      </Wrapper>
      {dialogMessage && (
        <Dialog title="알림" dialogOpen={dialogMessage} setDialogClose={setDialogMessage} width={420} height={250} okText="확인" onClickDialogEnter={() => router.replace('/home')}>
          근무처로 등록하신 {corporationName}의 정산대금 입금계좌는 이미 등록 되어있습니다.
          <br />
          정산대금의 출금은 소속 근무처에 요청하실 수 있습니다.
        </Dialog>
      )}
      <Popup content={popupContent} setContent={setPopupContent} okText="확인" onClickPopupEnter={() => router.replace('/home')} />
    </>
  );
};

export default memo(Step3);
