import {Wrapper, Button, Text, Input} from '@components/atoms';
import {Header, Dialog} from '@components/organisms';
import React, {useCallback, memo, useState, ChangeEventHandler, useEffect} from 'react';
import useTextarea from '@hooks/useTextarea';
import styled from '@emotion/styled';
import theme from '@public/theme';
import {useRouter} from 'next/router';
import useInput from '@hooks/useInput';
import {validateEmail, validateName} from '@modules/checkValidity';
import {StyledInputValidation} from '@components/atoms/Input';
import createSignUpQnAApi from '@api/inquiry/createSignUpQnAApi';

const MembershipInquiry = () => {
  const router = useRouter();
  const [name, onChangeName] = useInput('');
  const [mail, onChangeMail] = useInput('');
  const [title, onChangeTitle] = useInput('');
  const [textValue, onChangeTextValue] = useTextarea('');
  const [nullNameMessage, setNullNameMessage] = useState('');
  const [nullMailMessage, setNullMailMessage] = useState('');
  const [nullTitleMessage, setNullTitleMessage] = useState(false);
  const [textValueNull, setTextValueNull] = useState(false);
  const [dialogCancel, setDialogCancel] = useState<number | undefined>(undefined);
  const [dialogOk, setDialogOk] = useState<number | undefined>(undefined);
  const [dialogAlert, setDialogAlert] = useState<number | undefined>(undefined);
  const [passAll, setPassAll] = useState(false);
  const [firstSubmit, setFirstSubmit] = useState(true);

  // setPassAll
  useEffect(() => {
    setPassAll(onPassCheck());
  }, [name, mail, title, textValue]);

  useEffect(() => {
    title && setTextValueNull(false);
  }, [title]);

  useEffect(() => {
    textValue && setTextValueNull(false);
  }, [textValue]);

  const ClickOk = useCallback(() => {
    setDialogOk(1);
  }, []);

  const ClickAlert = useCallback(() => {
    setDialogAlert(1);
  }, []);

  const onSubmit = useCallback(() => {
    createSignUpQnAApi(textValue, mail, name, title).then((res) => {
      if (res) {
        ClickOk();
        // console.info('createSignUpQnAApi res', res);
        // console.info('문의내역이 전송되었습니다.');
      }
    });
  }, [name, mail, title, textValue]);

  const onPassCheck = (): any => {
    const isPass = (
      name &&
      mail &&
      title &&
      textValue &&
      !(
        validateEmail(mail) ||
        validateName(name)
      )
    );
    return isPass;
  };

  const ClickCancel = useCallback(() => {
    setDialogCancel(1);
  }, []);

  const onClickYet = useCallback(() => {
    setFirstSubmit(false);
    ClickAlert();
    setDialogAlert(1);
  }, [name, mail, title, textValue]);

  useEffect(() => {
   !firstSubmit && name === '' && setNullNameMessage('이름을 입력해주세요');
    !firstSubmit && mail === '' && setNullMailMessage('메일주소를 입력해주세요');
    !firstSubmit && title === '' ? setNullTitleMessage(true) : setNullTitleMessage(false);
    !firstSubmit && textValue === '' ? setTextValueNull(true) : setTextValueNull(false);
  }, [name, mail, title, textValue, firstSubmit]);

  return (
    <Wrapper center background={'#f1f3f5'} height={'100vh'} overflowY="scroll">
      <Header title={'가입문의'} />
      <Wrapper maxWidth="554px" minWidth="310px" margin="0 auto">
        <Wrapper pt={60}>
          <Text weight="5" size="32px">
            가입문의 작성
          </Text>
          <Wrapper mt={50}>
            <Text type="sectionHeading4" textAlign="left" mb={20}>
              문의자 정보
            </Text>
            <Wrapper between>
              <Input value={name} onChange={onChangeName} message={name ? validateName(name) : nullNameMessage} placeholder={'이름'} width="49%" />
              <Input value={mail} onChange={onChangeMail} message={mail ? validateEmail(mail) : nullMailMessage} placeholder={'이메일'} width="49%" />
            </Wrapper>
          </Wrapper>
          <Wrapper mt={30}>
            <Text type="sectionHeading4" textAlign="left">
              문의 내용
            </Text>
            <Input value={title} onChange={onChangeTitle} placeholder={'제목을 입력해주세요'} mt={20} />
            {nullTitleMessage && <StyledInputValidation>문의 제목을 입력해주세요</StyledInputValidation>}
            <TextArea placeholder={'내용을 입력해주세요. (최대 300자까지 작성가능)'} maxLength={300} value={textValue} onChange={onChangeTextValue} />
            {textValueNull && <StyledInputValidation>문의 내용을 입력해주세요</StyledInputValidation>}
          </Wrapper>
          <Wrapper mt={40}>
            <Button type="white" width="196px" children={'취소'} onClick={() => ClickCancel()} mr="8px" />
            <Button width="196px" children={'문의하기'} onClick={() => (passAll ? onSubmit() : onClickYet())} />
          </Wrapper>
        </Wrapper>
      </Wrapper>

      {dialogCancel && (
        <Dialog title="알림" dialogOpen={dialogCancel} setDialogClose={setDialogCancel} okText="확인" cancelText="닫기" onClickDialogEnter={() => router.back()}>
          문의하기를 취소하시겠습니까?
        </Dialog>
      )}

      {dialogOk && (
        <Dialog title="알림" dialogOpen={dialogOk} setDialogClose={setDialogOk} onClickDialogEnter={() => router.push('/login/carmerce-index')}>
          문의내역이 전송되었습니다.
        </Dialog>
      )}

      {dialogAlert && (
        <Dialog title="알림" dialogOpen={dialogAlert} setDialogClose={setDialogAlert}>
          입력값을 확인해주세요.
        </Dialog>
      )}
    </Wrapper>
  );
};

export default memo(MembershipInquiry);

const TextArea = styled.textarea`
  font-family: ${theme.font['3']};
  color: ${theme.color.black};
  font-size: 14px;
  resize: none;
  width: 100%;
  height: 386px;
  overflow-y: auto;
  border: solid 1px #e2e6ee;
  border-radius: 4px;
  padding: 12px 15px;
  tab-size: 4;
  line-height: 1.42;
  margin-top: 8px;

  &::placeholder {
    color: #93969f;
  }
  &:focus {
    outline: none;
    border: 1px solid ${theme.color.primary};
  }
`;
