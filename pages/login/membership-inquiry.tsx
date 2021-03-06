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
        // console.info('??????????????? ?????????????????????.');
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
   !firstSubmit && name === '' && setNullNameMessage('????????? ??????????????????');
    !firstSubmit && mail === '' && setNullMailMessage('??????????????? ??????????????????');
    !firstSubmit && title === '' ? setNullTitleMessage(true) : setNullTitleMessage(false);
    !firstSubmit && textValue === '' ? setTextValueNull(true) : setTextValueNull(false);
  }, [name, mail, title, textValue, firstSubmit]);

  return (
    <Wrapper center background={'#f1f3f5'} height={'100vh'} overflowY="scroll">
      <Header title={'????????????'} />
      <Wrapper maxWidth="554px" minWidth="310px" margin="0 auto">
        <Wrapper pt={60}>
          <Text weight="5" size="32px">
            ???????????? ??????
          </Text>
          <Wrapper mt={50}>
            <Text type="sectionHeading4" textAlign="left" mb={20}>
              ????????? ??????
            </Text>
            <Wrapper between>
              <Input value={name} onChange={onChangeName} message={name ? validateName(name) : nullNameMessage} placeholder={'??????'} width="49%" />
              <Input value={mail} onChange={onChangeMail} message={mail ? validateEmail(mail) : nullMailMessage} placeholder={'?????????'} width="49%" />
            </Wrapper>
          </Wrapper>
          <Wrapper mt={30}>
            <Text type="sectionHeading4" textAlign="left">
              ?????? ??????
            </Text>
            <Input value={title} onChange={onChangeTitle} placeholder={'????????? ??????????????????'} mt={20} />
            {nullTitleMessage && <StyledInputValidation>?????? ????????? ??????????????????</StyledInputValidation>}
            <TextArea placeholder={'????????? ??????????????????. (?????? 300????????? ????????????)'} maxLength={300} value={textValue} onChange={onChangeTextValue} />
            {textValueNull && <StyledInputValidation>?????? ????????? ??????????????????</StyledInputValidation>}
          </Wrapper>
          <Wrapper mt={40}>
            <Button type="white" width="196px" children={'??????'} onClick={() => ClickCancel()} mr="8px" />
            <Button width="196px" children={'????????????'} onClick={() => (passAll ? onSubmit() : onClickYet())} />
          </Wrapper>
        </Wrapper>
      </Wrapper>

      {dialogCancel && (
        <Dialog title="??????" dialogOpen={dialogCancel} setDialogClose={setDialogCancel} okText="??????" cancelText="??????" onClickDialogEnter={() => router.back()}>
          ??????????????? ?????????????????????????
        </Dialog>
      )}

      {dialogOk && (
        <Dialog title="??????" dialogOpen={dialogOk} setDialogClose={setDialogOk} onClickDialogEnter={() => router.push('/login/carmerce-index')}>
          ??????????????? ?????????????????????.
        </Dialog>
      )}

      {dialogAlert && (
        <Dialog title="??????" dialogOpen={dialogAlert} setDialogClose={setDialogAlert}>
          ???????????? ??????????????????.
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
