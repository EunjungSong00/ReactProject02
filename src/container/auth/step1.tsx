import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {useRouter} from 'next/router';
import getNiceCheckRequestApi from '@api/auth/getNiceCheckRequestApi';
import getNiceCheckSuccessApi from '@api/auth/getNiceCheckSuccessApi';
import getNiceCheckFailApi from '@api/auth/getNiceCheckFailApi';
import {Text, Wrapper} from '@components/atoms';
import ButtonNew from '@components/atoms/ButtonNew';
import {Dialog} from '@components/organisms';
import Popup, {PopupType} from '@components/organisms/Popup';

const Step1 = ({...props}: any) => {
  const [encode, setEncode] = useState('');
  const [success, setSuccess] = useState('');
  const [fail, setFail] = useState('');
  const [dialogNum, setDialogNum] = useState<number | undefined>(undefined);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [popup, setPopup] = useState<PopupType>();
  const popTitle = 'carmerceNice';

  useEffect(() => {
    const receiveMessage = async (e: any) => {
      // eslint-disable-next-line no-prototype-builtins
      if (e.data.hasOwnProperty('EncodeData')) {
        console.log('e.data.EncodeData', e.data.EncodeData);
        setSuccess(e.data.EncodeData);
      }
      // eslint-disable-next-line no-prototype-builtins
      if (e.data.hasOwnProperty('niceError')) {
        setFail(e.data.niceError);
      }
    };
    window.addEventListener('message', receiveMessage, false);
    document.addEventListener('message', receiveMessage, false);

    return () => {
      window.removeEventListener('message', receiveMessage);
      document.removeEventListener('message', receiveMessage);
    };
  }, []);

  useEffect(() => {
    if (success) {
      niceCheckSuccess();
    }
  }, [success]);

  useEffect(() => {
    if (fail) {
      niceCheckFail();
    }
  }, [fail]);

  // 본인인증 성공시
  const niceCheckSuccess = useCallback(() => {
    console.log('success', success);
    getNiceCheckSuccessApi(success)
      .then((res) => {
        console.log('res', res);
        console.log('res.getNiceCheckSuccess', res.getNiceCheckSuccess);
        res.getNiceCheckSuccess && props.setNiceUser(res.getNiceCheckSuccess);
        res.getNiceCheckSuccess ? props.setStepNum(1) : res.errors ? setPopup(res.errors[0].message) : setPopup('인증 중 오류가 발생했습니다. 관리자에게 문의해주세요.');
        console.log('res', res);
      })
      .catch((err) => {
        console.log('error', err);
        setPopup('인증 중 오류가 발생했습니다. 관리자에게 문의해주세요.');
        // console.log('catch');
        // console.log(err);
      });
  }, [success]);

  // 본인인증 실패시
  const niceCheckFail = useCallback(() => {
    // console.log('fail', fail);
    getNiceCheckFailApi(fail)
      .then((res) => {
        res.errors ? setPopup(res.errors[0].message) : setPopup('인증 중 오류가 발생했습니다. 관리자에게 문의해주세요.');
        // console.log(res);
      })
      .catch((err) => {
        console.log('error', err);
        setPopup('인증 중 오류가 발생했습니다. 관리자에게 문의해주세요.');
      });
  }, [fail]);

  const clickNextBtn = useCallback(() => {
    setDialogNum(1);
  }, []);

  // 본인인증 버튼 클릭시
  const checkNiceBtn = useCallback(() => {
    getNiceCheckRequestApi()
      .then((res) => {
        const encodeData = res.getNiceCheckRequest;
        setEncode(encodeData);
        window.open('', popTitle, 'width=500,height=500');
        formRef.current && formRef.current.submit();
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      {(dialogNum || dialogNum === 0) && (
        <Dialog title="알림" dialogOpen={dialogNum} setDialogClose={setDialogNum}>
          본인 인증을 완료하세요.
        </Dialog>
      )}
      <Wrapper mt={40}>
        <Wrapper flex justifyContent={'center'} mb={'10px'}>
          <Text size={'xl'} weight={'3'}>
            카머스&nbsp;
          </Text>
          <Text size={'xl'} weight={'5'}>
            최초인증
          </Text>
        </Wrapper>
        <Text size={'xs'} lineHeight={'24px'} color={'darkgray'}>
          입력하신 개인정보는 본인의 동의 없이 제 3자에게 제공되지 않으며,
          <br />
          개인정보 취급방침에 따라 안전하게 보호됩니다.
        </Text>
      </Wrapper>
      <Wrapper left width={'400px'} margin={'40px auto'}>
        <ButtonNew children={'휴대폰 본인 인증'} line nice flex large mb={'20px'} onClick={checkNiceBtn} />
        {/* nice 서버에 submit할 form */}
        <form name="form_chk" method="post" ref={formRef} target={popTitle} action={'https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb'}>
          <input type="hidden" name="m" value="checkplusService" />
          <input type="hidden" name="EncodeData" value={encode} />
        </form>
        <Wrapper flex>
          <Wrapper flexNum={1} mr={'4px'}>
            <ButtonNew white flex large arrowLeft onClick={() => router.back()}>
              이전
            </ButtonNew>
          </Wrapper>
          <Wrapper flexNum={1} ml={'4px'}>
            <ButtonNew flex large arrowRight onClick={() => clickNextBtn()}>
              다음
            </ButtonNew>
          </Wrapper>
        </Wrapper>
        <Popup content={popup} setContent={setPopup} />
      </Wrapper>
    </>
  );
};

export default memo(Step1);
