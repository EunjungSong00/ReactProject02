import React, {useEffect} from 'react';
import styled from '@emotion/styled';
import {Wrapper} from '@components/atoms';
import Txt from '@components/atoms/Txt';
import theme from '@public/theme';

interface IVehicleRegPopup {
  visible: boolean;
  title: string;
  onClose: any;
  onOk: any;
}

function VehicleRegPopup({onClose, onOk, visible, title}: IVehicleRegPopup): any {
  const onMaskClick = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper onClick={onMaskClick} tabIndex={-1} visible={visible}>
        <ModalInner tabIndex={0} className="modal-inner">
          <Wrapper p="45px 0 0" column h height="194px">
            <Txt type="bold" fontSize="24px" color="#222">
              {title}
            </Txt>
            <Txt type="regular" fontSize="18px" color="#0073e8" mt="25px"lineHeight="1.78" textAlign={'center'}>
              판금, 용접 시, <BoldSpan>사고이력 “있음”</BoldSpan> 으로 표기됩니다.
            </Txt>
          </Wrapper>
          <Wrapper flex height="58px">
            <BottomBtn
              style={{
                background: '#ccc'
              }}
              onClick={onClose}
            >
              취소
            </BottomBtn>
            <BottomBtn onClick={onOk} style={{background: '#0073e8'}}>
              확인
            </BottomBtn>
          </Wrapper>
        </ModalInner>
      </ModalWrapper>
    </>
  );
}

const ModalWrapper = styled.div<any>`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div<any>`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  border-radius: 2px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  border: solid 1px #222;
  background-color: #fff;
  width: 500px;
`;
const BottomBtn = styled.button`
  width: 250px;
  border-radius: 0px;
  border-width: 0;
  /* background: '#0073e8'; */
  font-size: 16px;
  font-family: ${theme.font.bold};
  color: white;
  cursor: pointer;
`;
const BoldSpan = styled.span`
  font-family: ${theme.font.black};
  text-decoration: underline;
`;

export default VehicleRegPopup;
