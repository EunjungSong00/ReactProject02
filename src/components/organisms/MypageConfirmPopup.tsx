import React, {ReactElement, useEffect} from 'react';
import styled from '@emotion/styled';
import {Wrapper} from '@components/atoms';
import Txt from '@components/atoms/Txt';
import theme from '@public/theme';

interface IMypagePopup {
  visible: boolean;
  title: string;
  onClose?: any;
  onOk?: any;
  content: string | ReactElement;
  negativeBtn?: boolean;
  oneButton?: boolean;
}

function MypagePopup({onClose, onOk, visible, title, content, negativeBtn, oneButton}: IMypagePopup): any {
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
            <Txt type="medium" fontSize="18px" color="#0073e8" mt="25px"lineHeight="1.78" textAlign={'center'}>
              {content}
            </Txt>
          </Wrapper>
          {oneButton ? (
            <OneButton onClick={onClose} style={{background: '#0073e8'}}>
              확인
            </OneButton>
          ) : (
            <>
            {negativeBtn
              ? (
                <Wrapper flex height="58px">
                  <BottomBtn style={{background: '#ccc'}} onClick={onOk}>
                    확인
                  </BottomBtn>
                  <BottomBtn onClick={onClose} style={{background: '#0073e8'}}>
                    취소
                  </BottomBtn>
                </Wrapper>
              ) : (
                <Wrapper flex height="58px">
                  <BottomBtn onClick={onClose} style={{background: '#ccc'}}>
                    취소
                  </BottomBtn>
                  <BottomBtn style={{background: '#0073e8'}} onClick={onOk}>
                    확인
                  </BottomBtn>
                </Wrapper>
              )}
            </>
          )}

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

const OneButton = styled.button`
  width: 100%;
  height: 58px;
  border-radius: 0px;
  border-width: 0;
  /* background: '#0073e8'; */
  font-size: 16px;
  font-family: ${theme.font.bold};
  color: white;
  cursor: pointer;
`;
export default MypagePopup;
