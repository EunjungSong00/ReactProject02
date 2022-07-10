import React, {memo, useCallback} from 'react';
import styled from '@emotion/styled';
import DaumPostcode from 'react-daum-postcode';
import Wrapper from '@components/atoms/Wrapper';
import Text from '@components/atoms/Text';
import {Image} from '@components/atoms';
import theme from '@public/theme';

interface IPostCodePopup {
  closePostCode: any;
  handleChangeAddress: any;
}

const _PostCodePopup = ({closePostCode, handleChangeAddress}: IPostCodePopup) => {
  const handlePostCode = useCallback((data: {address: any; addressType: string; bname: string; buildingName: string; zonecode: any}) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    // console.info(data);
    // console.info(fullAddress);
    // console.info(data.zonecode);
    handleChangeAddress(fullAddress, data.zonecode);
    closePostCode();
  }, []);

  return (
    <>
      <PostCodeBox>
        <PostCodeHeader>
          <Wrapper between>
            <TextBox>
              <Text>주소찾기</Text>
            </TextBox>
            <CloseBtn
              onClick={() => {
                closePostCode();
              }}
            >
              <Image width={12} height={12} src="/images/close-icon.svg" />
            </CloseBtn>
          </Wrapper>
        </PostCodeHeader>
        <DaumPostcode style={{width: '600px', height: '600px', display: 'block', margin: '0 auto'}} onComplete={handlePostCode} />
      </PostCodeBox>
    </>
  );
};

export default memo(_PostCodePopup);

const PostCodeBox = styled.div`
  position: fixed;
  width: 600px;
  height: 600px;
  border: 1px solid lightgray;
  top: 50%;
  left: 50%;
  margin-top: -400px;
  margin-left: -300px;
  overflow: hidden;
`;

const PostCodeHeader = styled.div`
  background: #fff;
  padding: 25px 20px;
`;

const TextBox = styled.div`
  display: inline-block;
`;

const CloseBtn = styled.button`
  background-color: #fff;
  border: none;
  cursor: pointer;
`;
