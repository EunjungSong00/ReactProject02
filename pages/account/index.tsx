import React, {memo, ReactElement, useCallback, useEffect, useState} from 'react';
import {GetServerSideProps} from 'next';
import {useRouter} from 'next/router';
import useInput from '@hooks/useInput';
import getBanksApi from '@api/account/getBanksApi';
import createCorporationSettlementAccountApi from '@api/account/createCorporationSettlementAccountApi';
import {Text, Wrapper} from '@components/atoms';
import {Dialog, Header, Popup, Toast} from '@components/organisms';
import Input, {StyledInputValidation} from '@components/atoms/Input';
import ButtonNew from '@components/atoms/ButtonNew';
import SelectImg from '@components/atoms/SelectImg';
import {PopupType} from '@components/organisms/Popup';
import getCorporationSettlementAccount from '@api/account/getCorporationSettlementAccountApi';
import updateCorporationSettlementAccountApi from '@api/account/updateCorporationSettlementAccountApi';
import checkBankAccountAfterSendOtpApi from '@api/account/checkBankAccountAfterSendOtpApi';
import confirmOtpApi from '@api/account/confirmOtpApi';
import {primary, white} from '@public/theme';
import useButtonEl from '@modules/hooks/useButtonEl';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await getCorporationSettlementAccount({context});
  if (response?.props?.response?.errors) {
    console.log(response?.props?.response?.errors[0].message);
    return {props: {}};
  }
  return response;
};

const Account = (props: any): ReactElement => {
  const pageProps = props?.pageProps;
  const response = pageProps?.response;
  const initialBank = {
    value: response?.getCorporationSettlementAccount?.bank?.id,
    id: response?.getCorporationSettlementAccount?.bank?.id,
    index: response?.getCorporationSettlementAccount?.bank?.id - 1,
    label: response?.getCorporationSettlementAccount?.bank?.name
  };
  const [bankId, setBankId] = useState<any>(initialBank?.id ? initialBank : undefined); // 은행
  const [bankMessage, setBankMessage] = useState<string>('');
  const [accountHolder, onChangeAccountHolder] = useInput<string>(response?.getCorporationSettlementAccount?.accountHolder || ''); // 예금주
  const [accountNumber, setAccountNumber] = useState<string>(response?.getCorporationSettlementAccount?.number || ''); // 계좌번호
  const [accountNumberMessage, setAccountNumberMessage] = useState<string>('');
  const [certificationNumber, onChangeCertificationNumber] = useInput<string>('', 'textNumber'); // 인증번호
  const [certificationNumberDisabled, setCertificationNumberDisabled] = useState<boolean>(true);
  const [certificationDisabled, setCertificationDisabled] = useState<boolean>(false);
  const [dialogMessage, setDialogMessage] = useState<number | undefined>(undefined);
  const [dialogMessageText, setDialogMessageText] = useState<string>('');
  const [popupContent, setPopupContent] = useState<PopupType>(undefined);
  const router = useRouter();
  const isUpdate = !!response?.getCorporationSettlementAccount?.number;
  const [bankResult, setBankResult] = useState<any>();
  const [certificationToken, setCertificationToken] = useState<string>('');
  const [confirmToken, setConfirmToken] = useState<string>('');
  const [toast, setToast] = useState<string>('');
  const [toastType, setToastType] = useState<'success' | 'warn' | 'error'>('warn');

  const MessageSendBtn = useButtonEl('1원 송금');
  const CertificationBtn = useButtonEl('인증하기');
  const ConfirmBtn = useButtonEl(isUpdate ? '수정' : '확인');

  // 설명 텍스트 돔
  const DescriptionTextDom = useCallback(
    ({children, ...props}: any) => (
      <Text size={'xs'} lineHeight={'1.5'} mb={2} color={props?.color}>
        {children}
      </Text>
    ),
    []
  );

  // 설명 돔
  const DescriptionDom = useCallback(
    ({children, ...props}: any) => (
      <>
        <Wrapper flex>
          <DescriptionTextDom color={props?.color}>{props?.number}.&nbsp;</DescriptionTextDom>
          <DescriptionTextDom color={props?.color}>{children}</DescriptionTextDom>
        </Wrapper>
      </>
    ),
    []
  );

  const onChangeBank = useCallback((e) => {
    setBankId(e);
  }, []);

  // 인증보내기 버튼 클릭시
  const clickMessageSend = useCallback(async () => {
    if (bankId && accountHolder && accountNumber) {
      // console.log(bankId.id, accountHolder, accountNumber);
      await checkBankAccountAfterSendOtpApi(accountNumber, accountHolder, bankId.id).then((res: any) => {
        if (res?.errors) {
          // setDialogMessage(1);
          // setDialogMessageText(res?.errors[0]?.message);
          setToastType('warn');
          setToast(res?.errors[0]?.message);
        } else {
          // console.log(res?.checkBankAccountAfterSendOtp?.token);
          setCertificationToken(res?.checkBankAccountAfterSendOtp?.token);
          setCertificationNumberDisabled(false);
          // setDialogMessage(1);
          // setDialogMessageText('인증번호를 입력해주세요.');
          setToastType('success');
          setToast('입금하신 계좌로 1원이 송금되었습니다. 인증번호를 입력해주세요.');
        }
      });
    } else {
      !bankId && setBankMessage('은행을 선택하세요.');
      !accountNumber && setAccountNumberMessage('예금주와 계좌번호를 입력하세요.');
    }
  }, [bankId, accountHolder, accountNumber]);

  // 인증하기 버튼 클릭시
  const clickCertification = useCallback(async () => {
    // console.log(certificationNumber, certificationToken);
    if (certificationNumber && certificationToken) {
      // console.log(bankId.id, accountHolder, accountNumber, certificationToken);
      await confirmOtpApi(certificationNumber, certificationToken).then((res: any) => {
        if (res?.errors) {
          // setDialogMessage(1);
          // setDialogMessageText(res?.errors[0]?.message);

          setToastType('warn');
          setToast(res?.errors[0]?.message);
        } else {
          console.log(res?.confirmOtp?.token);
          setConfirmToken(res?.confirmOtp?.token);
          // setDialogMessage(1);
          // setDialogMessageText('인증이 완료되었습니다.');
          setToastType('success');
          setToast('계좌 인증에 성공했습니다.');
          setCertificationDisabled(true);
        }
      });
    } else {
      !bankId && setBankMessage('은행을 선택하세요.');
      !accountNumber && setAccountNumberMessage('예금주와 계좌번호를 입력하세요.');
    }
  }, [certificationNumber, certificationToken]);

  // 계좌번호 입력시
  const onChangeAccountNumber = useCallback((e: {target: {value: React.SetStateAction<string>}}) => {
    let result = `${e.target.value}`;
    result = result.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'); // 숫자만 입력되도록
    setAccountNumber(result);
  }, []);

  // 확인 버튼 클릭시
  const clickConfirm = useCallback(() => {
    if (!certificationNumberDisabled) {
      const query = {
        accountHolder,
        accountNumber,
        bankId: bankId.value,
        token: confirmToken
      };
      isUpdate ? updateBanks(query) : createBanks(query);
    }
  }, [certificationNumberDisabled, accountHolder, accountNumber, bankId, confirmToken]);

  const createBanks = useCallback(
    (query) => {
      createCorporationSettlementAccountApi(query).then((res) => {
        if (res) {
          console.log('createBanks', res);
          if (res?.errors) {
            // setDialogMessage(1);
            // setDialogMessageText(res?.errors[0]?.message);
            setToastType('warn');
            setToast(res?.errors[0]?.message);
          } else {
            // setPopupContent('등록이 완료되었습니다.');
            setToastType('success');
            setToast('등록이 완료되었습니다.');
          }
        }
      });
    },
    [accountHolder, accountNumber, bankId]
  );

  const updateBanks = useCallback(
    (query) => {
      updateCorporationSettlementAccountApi(query).then((res) => {
        if (res) {
          if (res?.errors) {
            setToastType('warn');
            setToast(res?.errors[0]?.message);
          } else {
            setToastType('success');
            setToast('수정이 완료되었습니다.');
          }
        }
      });
    },
    [accountHolder, accountNumber, bankId]
  );

  const goHome = useCallback(() => {
    router.replace('/home');
  }, []);

  const getBanks = async () => {
    const banks: any = await getBanksApi();
    const bankList: any[] = banks?.getBanks;
    const formattedBankList = bankList?.map((item: any, index: number) => ({
      ...item,
      label: item.name,
      value: item.id,
      index
    }));
    // console.log('formattedBankList', formattedBankList);
    setBankResult(formattedBankList);
  };

  useEffect(() => {
    getBanks();
  }, []);

  return (
    <>
      <Wrapper h column background="#f1f3f5" color="#303236" width="100%" height="100vh">
        <Header title="정산대금 입금계좌" />
        <Wrapper column h mt={60}>
          <Text weight={'5'} size="32px">
            정산대금 입금계좌
          </Text>
          <Text mt={18}>판매대금을 정산받기 위한 입금계좌를 입력해 주십시오.</Text>
          <Wrapper width={500} mt={40}>
            <SelectImg
              value={bankId}
              options={bankResult}
              onChange={onChangeBank}
              placeholder={<p style={{color: '#93969f', fontSize: '12px'}}>은행 선택</p>}
              isDisabled={!certificationNumberDisabled}
              type={'bank'}
            />
            {bankMessage && <StyledInputValidation>{bankMessage}</StyledInputValidation>}
            <Wrapper flex mt={10} between>
              <Wrapper style={{flex: 'none'}} width={'130px'}>
                <Input
                  version="b"
                  whcbr={['100%', 50, white]}
                  placeholder="예금주"
                  value={accountHolder}
                  onChange={onChangeAccountHolder}
                  maxLength={20}
                  disabled={!certificationNumberDisabled}
                />
              </Wrapper>
              <Wrapper style={{flex: 'none'}}>
                <Wrapper flex>
                  <Wrapper width={'265px'}>
                    <Input
                      version="b"
                      whcbr={['100%', 50, white]}
                      placeholder="'-'없이 계좌번호 입력"
                      value={accountNumber}
                      maxLength={16}
                      onChange={onChangeAccountNumber}
                      disabled={!certificationNumberDisabled}
                    />
                  </Wrapper>
                  <Wrapper width={'100px'} h>
                    <MessageSendBtn marginLeft={10} whcbr={['90%', '100%', primary]} onClick={clickMessageSend} disabled={!certificationNumberDisabled} />
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>
            {accountNumberMessage && <StyledInputValidation>{accountNumberMessage}</StyledInputValidation>}
            <Wrapper flex mt={10}>
              <Wrapper width={'400px'}>
                <Input
                  // version="b"
                  // whcbr={['100%', 50, white]}
                  placeholder="인증번호 6자리 숫자를 입력 (유효기간 : 5분)"
                  maxLength={6}
                  value={certificationNumber}
                  onChange={onChangeCertificationNumber}
                  disabled={certificationNumberDisabled || certificationDisabled}
                />
              </Wrapper>
              <Wrapper width={'100px'}>
                <CertificationBtn
                  marginLeft={10}
                  whcbr={['90%', '100%', primary]}
                  onClick={clickCertification}
                  disabled={certificationNumberDisabled || certificationNumber.length < 6 || certificationDisabled} // ff f
                />
              </Wrapper>
            </Wrapper>
            <Wrapper margin={'30px 10px 20px'}>
              <DescriptionDom number={1} color={'red'}>
                소속 매매상사의 계좌만 사용이 가능합니다.
              </DescriptionDom>
              <DescriptionDom number={2}>
                우리은행 / 기업은행 / 국민은행 계좌로 인증시, 평생계좌번호(예: 휴대폰 번호 등) 사용은 불가하오니, 통장 상의 계좌번호를 입력해 주십시오.
              </DescriptionDom>
              <DescriptionDom number={3}>
                구 계좌번호를 입력할 시 입금이 되지 않습니다. 사용 은행에서 신/구계좌번호 여부를 조회한 후 입력해 주세요. <br />
                ex) 신한은행의 경우 구 계좌(조흥은행: 11자리 번호)가 아닌, 신 계좌번호(12자리)를 입력해야 합니다.
              </DescriptionDom>
              <DescriptionDom number={4}>계좌번호 변경은 마이페이지에서 가능합니다.</DescriptionDom>
              <DescriptionDom number={5}>계좌 입력후 인증이 되지 않으시는 경우, 고객센터로 문의해 주시길 바랍니다. (고객센터 000-0000)</DescriptionDom>
            </Wrapper>
          </Wrapper>
          <Wrapper width={'100%'}>
            <Wrapper flex mt={10}>
              <Wrapper flexNum={6} mr={2}>
                <ButtonNew children={'다음에'} flex line onClick={() => goHome()} />
              </Wrapper>
              <Wrapper flexNum={6}>
                <ConfirmBtn whcbr={['100%', '100%', primary]} disabled={!certificationDisabled} onClick={clickConfirm} />
                {/* <ButtonNew children={isUpdate ? '수정' : '확인'} flex gray={certificationNumberDisabled} onClick={clickConfirm} /> */}
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </Wrapper>
      {dialogMessage && (
        <Dialog title="알림" dialogOpen={dialogMessage} setDialogClose={setDialogMessage}>
          {dialogMessageText}
        </Dialog>
      )}
      <Toast toast={toast} setToast={setToast} position="top-center" type={toastType} delay={2500} onClose={!certificationDisabled ? () => null : () => router.push('/home')} />
      <Popup content={popupContent} setContent={setPopupContent} okText="확인" onClickPopupEnter={goHome} />
    </>
  );
};

export default memo(Account);
