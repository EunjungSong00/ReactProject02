import {Wrapper, Button, Text, Input} from '@components/atoms';
import {Header, Dialog} from '@components/organisms';
import React, {useCallback, memo, useState, useEffect} from 'react';
import useTextarea from '@hooks/useTextarea';
import styled from '@emotion/styled';
import theme from '@public/theme';
import {useRouter} from 'next/router';
import useInput from '@hooks/useInput';
import {validateEmail, validateName, validatePhone} from '@modules/checkValidity';
import {StyledInputValidation} from '@components/atoms/Input';
import createPartnershipApi from '@api/inquiry/createPartnershipApi';

const PartnershipInquiry = () => {
  const router = useRouter();
  const [companyName, onChangeCompanyName] = useInput('');
  const [department, onChangeDepartment] = useInput('');
  const [name, onChangeName] = useInput('');
  const [phoneNumber, onChangePhoneNumber] = useInput('', 'number');
  const [telPhoneNumber, onChangeTelPhoneNumber] = useInput('', 'number');
  const [position, onChangePosition] = useInput('');
  const [mail, onChangeMail] = useInput('');
  const [title, onChangeTitle] = useInput('');
  const [textValue, onChangeTextValue] = useTextarea('');
  const [nullNameMessage, setNullNameMessage] = useState('');
  const [nullPhoneNumberMessage, setNullPhoneNumberMessage] = useState('');
  const [nullMailMessage, setNullMailMessage] = useState('');
  const [nullTitleMessage, setNullTitleMessage] = useState(false);
  const [textValueNull, setTextValueNull] = useState(false);
  const [nullCompanyName, setNullCompanyName] = useState('');
  const [nullDepartment, setNullDepartment] = useState('');
  const [dialogCancel, setDialogCancel] = useState<number | undefined>(undefined);
  const [dialogOk, setDialogOk] = useState<number | undefined>(undefined);
  const [dialogAlert, setDialogAlert] = useState<number | undefined>(undefined);
  const [passAll, setPassAll] = useState(false);
  const [firstSubmit, setFirstSubmit] = useState(true);

  // 입렵값 pass 체크
  useEffect(() => {
    setPassAll(onPassCheck());
  }, [companyName, department, name, phoneNumber, mail, textValue, title]);

  useEffect(() => {
    title && setTextValueNull(false);
  }, [title]);

  useEffect(() => {
    textValue && setTextValueNull(false);
  }, [textValue]);

  const validateCompanyName = (value: string): string => {
    let bool = false;
    let result = '';
    if (value !== '') {
      bool = value.trim().length >= 1;
      !bool ? (result = '회사명을 입력해주세요') : '';
    }
    return result;
  };

  const validateDepartment = (value: string): string => {
    let bool = false;
    let result = '';
    if (value !== '') {
      bool = value.trim().length >= 1;
      !bool ? (result = '부서명을 입력해주세요') : '';
    }
    return result;
  };

  const ClickOk = useCallback(() => {
    setDialogOk(1);
  }, []);

  const ClickAlert = useCallback(() => {
    setDialogAlert(1);
  }, []);

  const onPassCheck = (): any => {
    const isPass = (
      companyName &&
      name &&
      phoneNumber &&
      department &&
      mail &&
      title &&
      textValue &&
      !(
        validateCompanyName(companyName) ||
        validateName(name) ||
        validatePhone(phoneNumber) ||
        validateDepartment(department) ||
        validateEmail(mail)
      )
    );
    return isPass;
  };

  const onSubmit = useCallback(() => {
    createPartnershipApi(textValue, companyName, department, mail, name, phoneNumber, title, telPhoneNumber, position).then((res) => {
      if (res) {
        // console.info('createPartnershipApi res', res);
        // console.info('문의내역이 전송되었습니다.');
        ClickOk();
      }
    });
  }, [name, mail, title, textValue, phoneNumber, companyName, department, telPhoneNumber, position]);

  const ClickCancel = useCallback(() => {
    setDialogCancel(1);
  }, []);

  const onClickYet = useCallback(() => {
    setFirstSubmit(false);
    ClickAlert();
    setDialogAlert(1);
  }, [name, mail, department, companyName, phoneNumber, title, textValue]);

  useEffect(() => {
    !firstSubmit && name === '' && setNullNameMessage('이름을 입력해주세요');
    !firstSubmit && phoneNumber === '' && setNullPhoneNumberMessage('휴대폰번호를 입력해주세요');
    !firstSubmit && mail === '' && setNullMailMessage('메일주소를 입력해주세요');
    !firstSubmit && companyName === '' && setNullCompanyName('회사명을 입력해주세요');
    !firstSubmit && department === '' && setNullDepartment('부서명을 입력해주세요');
    !firstSubmit && title === '' ? setNullTitleMessage(true) : setNullTitleMessage(false);
    !firstSubmit && textValue === '' ? setTextValueNull(true) : setTextValueNull(false);
  }, [name, mail, companyName, department, phoneNumber, title, textValue, firstSubmit]);

  return (
    <Wrapper center background={'#f1f3f5'} height={'100vh'} overflowY="scroll">
      <Header title={'제휴문의'} />
      <Wrapper maxWidth="554px" minWidth="310px" margin="0 auto">
        <Wrapper pt={60}>
          <Text weight="5" size="32px">
            제휴문의 작성
          </Text>
          <Wrapper mt={50}>
            <Wrapper w h between>
              <Text type="sectionHeading4" textAlign="left" mb={20}>
                문의자 정보
              </Text>
              <Text type="sectionInfo">필수 값*</Text>
            </Wrapper>
            <Wrapper between>
              <Input
                value={companyName}
                onChange={onChangeCompanyName}
                message={companyName ? validateCompanyName(companyName) : nullCompanyName}
                placeholder={'회사명 *'}
                width="49%"
              />
              <Input value={department} onChange={onChangeDepartment} message={department ? validateDepartment(department) : nullDepartment} placeholder={'부서명 *'} width="49%" />
            </Wrapper>
            <Input value={name} onChange={onChangeName} message={name ? validateName(name) : nullNameMessage} placeholder={'이름 *'} mt="8px" />
            <Wrapper between mt="8px">
              <Input
                value={phoneNumber}
                maxLength={11}
                onChange={onChangePhoneNumber}
                message={phoneNumber ? validatePhone(phoneNumber) : nullPhoneNumberMessage}
                placeholder={'휴대폰번호 *'}
                width="49%"
              />
              <Input value={mail} onChange={onChangeMail} message={mail ? validateEmail(mail) : nullMailMessage} placeholder={'이메일 *'} width="49%" />
            </Wrapper>
            <Wrapper between mt="8px">
              <Input
                value={telPhoneNumber}
                maxLength={11}
                type="number"
                onChange={onChangeTelPhoneNumber}
                placeholder={'전화번호'}
                width="49%"
              />
              <Input value={position} onChange={onChangePosition} placeholder={'직위'} width="49%" />
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

export default memo(PartnershipInquiry);

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
