import React from 'react';
import {Wrapper, Txt} from '@components/atoms';
import theme from '@public/theme';

const VehicleInspectionRecordNotice = () => (
    <Wrapper h column p="50px 30px">
      <Txt mb="15px" type="medium" fontSize="24px">유의사항</Txt>
      <Txt mb="29px" type="medium" fontSize="16px" color={theme.font[3]}>중고자동차성능ㆍ상태점검의 보증에 관한 사항 등</Txt>
      <Txt mb="15px" type="regular" fontSize="13px" lineHeight='22px' color={theme.color[4]}>
        1. 자동차 매매업자는 성능·상태점검기록부(가격조사·산정 부분 제외)에 기재된 내용을 고지하지 아니하거나 거짓으로 고지함으로써 매수인에게 재산상 손해가 발생한 경우에는 그 손해를 배상할 책임을 집니다.<br/>
        자동차성능상태점검자가 거짓 또는 오류가 있는 성능상태점검 내용을 제공하여 아래의 보증기간 또는 보증거리 이내에 자동차의 실제 성능·상태가 다른 경우, 자동차매매업자는 매수인의 재산상 손해를 배상할 책임을 지며, 자동차성능상태점검자에게 이를 구상할 수 있습니다.<br/>
        (매수인이 성능상태점검자가 가입한 책임보험 등을 통해 별도로 배상받는 경우는 제외)<br/>
        자동차인도일부터 보증기간은 ( )일, 보증거리는 ( )킬로미터로 합니다.<br/>
        (보증기간은 30일 이상, 보증거리는 2천킬로미터 이상이어야 하며, 그 중 먼저 도래한 것을 적용)<br/>
        자동차매매업자는 중고자동차 성능·상태점검기록부를 매수인에게 고지할 때 현행 자동차성능·상태점검자의 보증범위(국토교통부 고시)를 첨부하여 고지하여야 합니다. 동 보증범위는 '자동차성능·상태점검자의 보증범위'(국토교통부 고시)에 따르며, 법제처 국가법령정보센터 또는 국토교통부 홈페이지에서 확인할 수 있습니다.
        - 자동차의 리콜에 관한 사항은 자동차리콜센터(www.car.go.kr)에서 확인할 수 있습니다.<br/>
        - 자동차365(www.car365.go.kr)에서 실매물 조회 및 정비이력 확인을 할 수 있습니다.<br/>
        자동차365 &gt; 자동차 실매물검색 &gt; 차량번호 입력<br/>
        자동차365 &gt; 자동차 이력조회 &gt; 매매용차량조회 &gt; 자동차등록번호 검색
      </Txt>

      <Txt width="100%" mb="15px" type="regular" fontSize="13px" lineHeight='22px' color={theme.color[4]}>
        2. 중고자동차의 구조ㆍ장치 등의 성능ㆍ상태를 고지하지 아니한 자, 거짓으로 점검하거나 거짓 고지한 자는 「자동차관리법」 제 80조 제 6호 및 제 7호에 따라 2년 이하의 징역 또는 2천만원 이하의 벌금에 처합니다.
      </Txt>
      <Txt mb="15px" type="regular" fontSize="13px" lineHeight='22px' color={theme.color[4]}>
        3. 성능ㆍ상태점검자(자동차정비업자)가 거짓으로 성능ㆍ상태 점검을 하거나 점검한 내용과 다르게 자동차매매업자에게 알린 경우 「자동차관리법 제21조제2항 등의 규정에 따른 행정처분의 기준과 절차에 관한 규칙」 제5조제1항에 따라 1차 사업정지 30일, 2차 사업정지 90 일, 3차 등록취소의 행정처분을 받습니다.
      </Txt>
      <Txt mb="15px" type="regular" fontSize="13px" lineHeight='22px' color={theme.color[4]}>
        4. 사고이력 인정은 사고로 자동차 주요 골격 부위의 판금, 용접수리 및 교환이 있는 경우로 한정합니다. 단, 쿼터패널, 루프패널, 사이드 실패널 부위는 절단, 용접시에만 사고로 표기합니다. (후드, 프론트휀더, 도어, 트렁크리드 등 외판 부위 및 범퍼에 대한 판금, 용접수리 및 교환은 단순수리로서 사고에 포함되지 않습니다)
      </Txt>
      <Txt width="100%" mb="15px" type="regular" fontSize="13px" lineHeight='22px' color={theme.color[4]}>
        5. 성능ㆍ상태점검은 국토교통부장관이 정하는 자동차검사방법에 따라야 합니다.
      </Txt>
      <Txt width="100%" mb="30px" type="regular" fontSize="13px" lineHeight='22px' color={theme.color[4]}>
        6. 체크항목 판단기준 <br />
        - 미세누유(미세누수): 해당부위에 오일(냉각수)이 비치는 정도로서 부품 노후로 인한 현상<br />
        - 누유(누수): 해당부위에서 오일(냉각수)이 맺혀서 떨어지는 상태<br />
        - 부식: 차량하부와 외판의 금속표면이 화학반응에 의해 금속이 아닌 상태로 상실되어 가는 현상<br />
        (단순히 녹슬어 있는 상태는 제외합니다)<br />
        - 침수: 자동차의 원동기, 변속기 등 주요장치 일부가 물에 잠긴 흔적이 있는 상태
      </Txt>

      <Txt mb="30px" type="medium" fontSize="16px" color={theme.font[3]}>중고자동차성능ㆍ상태점검의 보증에 관한 사항 등</Txt>
      <Txt width="100%" mb="15px" type="regular" fontSize="13px" lineHeight='22px' color={theme.color[4]}>
        7. 가격조사·산정자는 아래의 보증기간 또는 보증거리 이내에 중고자동차성능·상태점검기록부(가격조사·산정부분 한정)에 기재된 내용에 허위 또는 오류가 있는 경우 계약 또는 관계 법령에 따라 매수인에 대하여 책임을 집니다.<br />
        - 자동차인도일부터 보증기간은 (30)일, 보증거리는 (2천)킬로미터로 합니다.<br />
        (보증기간은 30일 이상, 보증거리는 2천킬로미터 이상이어야 하며, 그 중 먼저 도래한 것을 적용합니다)
      </Txt>
      <Txt width="100%" mb="15px" type="regular" fontSize="13px" lineHeight='22px' color={theme.color[4]}>
        8. 매매업자는매수인이 가격조사·산정을 원할 경우 가격조사·산정자가 해당 자동차가격을 조사·산정하여 결과를 이 서식에 적도록 한 후, 매매계약을 체결하기전에 매수인에게 서면으로 고지하여야 합니다. 이경우 매매업자는 가격조사·산정자에게 가격조사·산정을 의뢰하기 전에 매수인에게 가격조사·산정 비용을 안내하여야 합니다.
      </Txt>
      <Txt width="100%" mb="15px" type="regular" fontSize="13px" lineHeight='22px' color={theme.color[4]}>
        9. 차가격은 보험개발원이 정한 차량기준가액을 기준가격으로 조사·산정하되, 기준서는 『자동차관리법』제58조의4제1호에 해당하는 자는 기술사회에서 발행한 기준서를, 제2호에 해당하는 자는 한국자동차진단보증협회에서 발행한 기준서를 각각 적용하여야 하며, 기준가격과 기준서는 산정일 기준 가장 최근에 발행된 것을 적용합니다.
      </Txt>
      <Txt width="100%" mb="20px" type="regular" fontSize="13px" lineHeight='22px' color={theme.color[4]}>
        10. 특기사항란은 가격조사·산정자의 자동차 성능·상태에 대한 견해가 성능·상태점검자의 견해와 다를 경우 표시합니다.
      </Txt>
      <Txt width="100%" mb="10px" type="medium" fontSize="14px" lineHeight='22px' color={theme.color[3]}>
        * 자동차가격조사·산정이란?
      </Txt>
      <Txt width="100%" mb="20px" type="regular" fontSize="13px" lineHeight='22px' color={theme.color[4]}>
        "가격조사·산정"은 소비자가 매매계약을 체결함에 있어 중고차 가격의 적절성 판단에 참고할 수 있도록 법령에 의한 절차와 기준에 따라 전문 가격조사·산정인이 객관적으로 제시한 가액입니다. 따라서 "가격조사·산정"은 소비자의 자율적 선택에 따른 유료 서비스이며, 가격조사·산정 결과는 중고차가격판단에 관하여 법적 구속력은 없고 소비자의구매여부 결정에 참고자료로 활용됩니다.
      </Txt>
    </Wrapper>
  );

export default VehicleInspectionRecordNotice;
