import React, {useEffect} from 'react';
import styled from '@emotion/styled';
import {Wrapper} from '@components/atoms';
import Txt from '@components/atoms/Txt';
import theme from '@public/theme';

/*
  <VehicleRegPopup
    visible={}
    title=""
    content=""
    data={}
    onClose={}
    onOk={}
  />
*/

interface IVehicleRegPopup {
  visible: boolean;
  title: string;
  content?: string;
  data: {number?: string; manufacturer?: string; modelYear?: string; modelName?: string};
  onClose: any;
  onOk: any;
}

function VehicleRegPopup({onClose, onOk, visible, data, title, content}: IVehicleRegPopup): any {
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
          <Wrapper p="45px 0 0" column h height="320px">
            <Txt type="bold" fontSize="24px" color="#222">
              {title}
            </Txt>
            <Txt type="regular" fontSize="18px" color="#0073e8" mt="15px">
              {content}
            </Txt>
            <SaleHoldWrapper mt="25px">
              <table style={{width: '100%', height: '100%'}} className="saleHold-table">
                <tbody style={{width: '100%'}}>
                  <tr>
                    <th>• 차량번호</th>
                    <td>{data?.number || '-'}</td>
                  </tr>
                  <tr>
                    <th>• 브랜드</th>
                    <td>{data?.manufacturer || '-'}</td>
                  </tr>
                  <tr>
                    <th>• 연형</th>
                    <td>{data?.modelYear || '-'}</td>
                  </tr>
                  <tr>
                    <th>• 모델명</th>
                    <td>{data?.modelName || '-'}</td>
                  </tr>
                </tbody>
              </table>
            </SaleHoldWrapper>
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
  height: 380px;
`;
const BottomBtn = styled.button`
  width: 250px;
  border-radius: 0px;
  border-width: 0;
  /* background: '#0073e8'; */
  font-size: '16px';
  font-family: ${theme.font.bold};
  color: white;
  cursor: pointer;
`;
const SaleHoldWrapper = styled(Wrapper)`
  height: 140px;
  width: 360px;
  border-top: 1px solid #333333;
  border-bottom: 1px solid #333333;
  .saleHold-table {
    height: 100%;
    td,
    th {
      display: flex;
      align-items: center;
      font-size: 15px;
      font-family: SpoqaHanSansNeo-Light;
      color: #222;
    }
    tr {
      height: 25%;
      display: flex;
      border-bottom: 1px solid #dddddd;
    }
    td {
      padding-left: 20px;
    }
    th {
      width: 110px;
      padding-left: 5px;
      border-right: 1px solid #dddddd;
    }
  }
`;

export default VehicleRegPopup;
