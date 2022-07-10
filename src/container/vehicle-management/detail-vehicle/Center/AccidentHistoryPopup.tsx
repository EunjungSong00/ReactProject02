import styled from '@emotion/styled';
import {Wrapper, Image} from '@components/atoms';
import theme from '@public/theme';
import {observer, inject} from 'mobx-react';
import {getCommas} from '@modules/replaceStrings';
import moment from 'moment';
import * as table from './table';

const TopTitle = styled(Wrapper)`
  text-align: center;
`;
const TopTit = styled.div`
  font-weight: 700;
  font-size: 20px;
  letter-spacing: -1px;
`;
const TopStit = styled(TopTit)`
  font-size: 16px;
  margin-top: 20px;
`;
const TopDate = styled(TopTit)`
  font-weight: normal;
  font-size: 14px;
  margin-top: 10px;
`;
const Section = styled(Wrapper)`
  margin-top: 50px;
`;
const SecTitle = styled(Wrapper)`
  background: ${theme.color.main};
  padding: 12px;
  box-sizing: border-box;
  font-weight: 700;
  font-size: 14px;
  color: #fff;
  letter-spacing: -1px;
`;
const ResultList = styled(Wrapper)`
  margin-top: 40px;
`;
const ResultItem = styled.div`
  float: left;
  width: calc(25% - 9px);
  margin-left: 12px;
  margin-top: 12px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  padding: 20px;
  text-align: center;
  &:nth-of-type(-n + 4) {
    margin-top: 0;
  }
  &:nth-of-type(4n + 1) {
    margin-left: 0;
  }
`;
const Icon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto;
`;
const ListTit = styled.div`
  font-size: 14px;
  letter-spacing: -1px;
  margin-top: 15px;
`;
const Price = styled(ListTit)`
  font-weight: 700;
  color: #ff003b;
  margin-top: 8px;
`;
const InfoTit = styled(Wrapper)<any>`
  width: 100%;
  margin-top: 40px;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: -1px;
  text-align: center;
  line-height: 1.4;
  span {
    display: inliness;
    color: #ff003b;
    vertical-align: top;
  }
  ${(props: any) =>
    props.mt &&
    `
      margin-top:50px;
    `}
`;
const InfoTxt = styled.div<any>`
  margin-top: 20px;
  font-size: 14px;
  letter-spacing: -1px;
  line-height: 1.5;
  span {
    display: inline;
    color: #ff003b;
    vertical-align: top;
  }
  ${(props: any) =>
    props.center &&
    `
      text-align:center;
    `}
  ${(props: any) =>
    props.big &&
    `
      font-size:18px;
      margin-top:40px;
    `}
`;
const TbArea = styled(Wrapper)`
  margin-top: 30px;
`;
const TbBox = styled.div`
  float: left;
  width: calc(50% - 10px);
  margin-left: 20px;
  border-top: 1px solid #ccc;
  &:first-of-type {
    margin-left: 0;
  }
`;
const TbItem = styled.div`
  display: table;
  width: 100%;
  border-bottom: 1px solid #ccc;
`;
const Th = styled.div`
  display: table-cell;
  width: 30%;
  padding: 16px 0;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: -1px;
`;
const Td = styled(Th)`
  width: 70%;
  color: #ff003b;
`;
const InfoList = styled(ResultList)<any>`
  text-align: center;
  ${(props: any) =>
    props.mt &&
    `
      margin:60px 0 30px;
    `}
`;
const InfoItem = styled.div<any>`
  float: left;
  width: calc(33.3333333% - 8px);
  margin-left: 12px;
  text-align: center;
  &:first-of-type {
    margin-left: 0;
  }
  ${(props: any) =>
    props.dob &&
    `
      float:none;
      display:inline-block;
    `}
`;
const ResponsiveTable = styled.div`
  display: table;
  table-layout: fixed;
  width: 100%;
  margin-top: 30px;
  border-collapse: collapse;
`;
const TbHead = styled.div`
  display: table-row;
`;
const TbBody = styled.div`
  display: table-row;
  border-bottom: 1px solid #ccc;
`;
const TbTh = styled.div<any>`
  display: table-cell;
  width: 25%;
  height: 50px;
  background: #f7f7f7;
  vertical-align: middle;
  text-align: center;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: -1px;
  ${(props: any) =>
    props.hidden &&
    `
      display:none;
    `}
`;
const TbTd = styled.div<any>`
  display: table-cell;
  width: 25%;
  height: 50px;
  vertical-align: middle;
  text-align: center;
  font-weight: 700;
  font-size: 14px;
  color: #ff1349;
  letter-spacing: -1px;
  ${(props: any) =>
    props.date &&
    `
      color:#000;
    `}
`;
const TermsBox = styled(Wrapper)`
  position: relative;
  margin-top: 50px;
  padding: 40px;
  box-sizing: border-box;
  background: #f7f7f7;
`;
const TermsCmt = styled.div`
  position: absolute;
  top: -17px;
  left: 40px;
  height: 34px;
  padding: 0 20px;
  background: #ff1349;
  border-radius: 17px;
  line-height: 34px;
  font-weight: 700;
  font-size: 16px;
  color: #fff;
`;
const TermsList = styled.ul``;
const TermsItem = styled.li`
  display: block;
  margin-top: 20px;
  &:first-of-type {
    margin-top: 0;
  }
`;
const TermsTit = styled.div`
  font-weight: 700;
  font-size: 14px;
  letter-spacing: -1px;
`;
const TermsTxt = styled(TermsTit)`
  font-weight: normal;
  margin-top: 5px;
  font-size: 12px;
  line-height: 1.5;
`;
const GryBox = styled(Wrapper)`
  margin-top: 40px;
  padding: 40px;
  box-sizing: border-box;
  background: #f7f7f7;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: -1px;
  text-align: center;
  span {
    display: inline;
    margin-left: 5px;
    color: #ff1349;
    vertical-align: top;
  }
`;
const SubTxt = styled.div<any>`
  margin-top: 25px;
  font-size: 13px;
  letter-spacing: -1px;
  line-height: 1.4;
  span {
    display: inline;
    color: #ff1349;
    vertical-align: top;
  }
  ${(props: any) =>
    props.dash &&
    `
      p{
        position:relative;
        padding-left:15px;
        line-height:1.5;
        &:before{
          content:'-';
          position:absolute;
          top:0;
          left:0;
        }
      }
    `}
`;
const InfoTxtICon = styled(Wrapper)`
  position: relative;
  margin-top: 15px;
  font-size: 12px;
  color: #666;
  letter-spacing: -1px;
  padding-left: 10px;
  line-height: 1.4;
  &:before {
    content: '*';
    position: absolute;
    top: 0;
    left: 0;
  }
`;
const CrashInfo = styled(Wrapper)`
  margin-top: 40px;
`;
const CrashDate = styled.div`
  display: inline-block;
  width: 180px;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: -1px;
  vertical-align: middle;
`;
const CrashArea = styled.div`
  display: inline-block;
  width: calc(100% - 180px);
  vertical-align: middle;
`;
const CrashBox = styled.div`
  float: left;
  width: calc(50% - 10px);
  margin-left: 20px;
  &:first-of-type {
    margin-left: 0;
  }
`;
const ReportTitle = styled.div`
  width: 100%;
  height: 48px;
  line-height: 48px;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: -1px;
  color: #fff;
  background: #ccc;
  text-align: center;
`;
const ReportTb = styled(Wrapper)``;
const ReportHead = styled.div`
  display: table;
  width: 100%;
`;
const ReportBody = styled(ReportHead)`
  border-bottom: 1px solid #ccc;
`;
const Rth = styled.div`
  display: table-cell;
  width: 50%;
  padding: 15px 0;
  text-align: center;
  background: #f7f7f7;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: -1px;
`;
const Rtd = styled.div`
  display: table-cell;
  width: 50%;
  padding: 15px 0;
  height: 140px;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: -1px;
  text-align: center;
  line-height: 1.5;
`;
const SetTit = styled.div`
  font-weight: 700;
  font-size: 14px;
  letter-spacing: -1px;
  text-align: center;
  line-height: 1.4;
  span {
    display: inline;
    color: #ff1349;
    vertical-align: top;
  }
`;
const SetList = styled.div`
  margin-top: 10px;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: -1px;
  text-align: center;
  line-height: 1.4;
  p {
    display: inline-block;
    position: relative;
    padding-left: 12px;
    &:before {
      content: '-';
      position: absolute;
      top: 0;
      left: 0;
    }
  }
`;
const DiscArea = styled(Wrapper)`
  margin-top: 80px;
`;
const DiscList = styled.div`
  float: left;
  width: calc(50% - 15px);
  margin-left: 30px;
  &:first-of-type {
    margin-left: 0;
  }
`;
const DiscTit = styled.div`
  margin-bottom: 15px;
  font-weight: 700;
  font-size: 15px;
  color: #fa183d;
  text-align: center;
  letter-spacing: -1px;
`;
const DiscItem = styled.div`
  font-size: 13px;
  letter-spacing: -1px;
  line-height: 1.5;
  p {
    position: relative;
    padding-left: 10px;
    margin-top: 10px;
    &:first-of-type {
      margin-top: 0;
    }
    &:before {
      content: '∙';
      position: absolute;
      top: 0;
      left: 0;
    }
    &.none {
      padding-left: 0;
      &:before {
        content: none;
      }
    }
    &.dash {
      padding-left: 15px;
      &:before {
        content: '-';
      }
    }
  }
`;
const BotTxt = styled(Wrapper)`
  margin: 100px 0 50px;
  text-align: center;
  & > * {
    display: block;
  }
  span {
    font-size: 14px;
  }
  strong {
    margin-top: 10px;
    font-size: 30px;
  }
`;

const AccidentHistoryPopup = (props: any) => {
  const modelTypes = ['', '승용', '승합', '화물', '특수'];
  const useTypes = ['', '관용', '자가용', '영업용', '개인택시'];
  const {data} = props;
  const {manufacturer, modelDetail, insuranceHistory} = data;
  const {
    // 1. 중고차 사고이력 정보(요약)
    generalTotalLossAccidentCount,
    theftTotalLossAccidentCount,
    floodedAccidentCount,
    rentalCommercialHistory,
    generalCommercialHistory,
    selfAccidentCount,
    selfAccidentInsuranceMoney,
    otherAccidentCount,
    otherAccidentInsuranceMoney,
    ownerChangeCount,
    vehicleInformationChangeCount,
    // # 2. 자동차 일반 사양 정보
    modelYear,
    bodyStyle,
    displacement,
    useType,
    modelType,
    fuel,
    initialInsuranceSubscriptionDate,
    // # 3. 자동차 특수 용도 이력 정보
    officialHistory,
    // # 4. 자동차 번호/소유자 변경이력 정보
    vehicleInformationChangeList,
    ownerChangeList,
    accidentList,

    unsubscribedDate
  } = insuranceHistory;

  return (
    <Wrapper flex column>
      <TopTitle>
        <TopTit>중고차 사고이력정보 보고서</TopTit>
        <TopStit>
          {/* {car.r005} */}
          {/* {carXml && carXml.R107._cdata} / {car.r002} {carXml && carXml.R101._text} */}
        </TopStit>
        {/* {!carXml && <TopDate>정보조회일자 : {UDateFormat.toSeoulFormatDate(car.r001, 'yyyy-MM-DD')}</TopDate>} */}
      </TopTitle>
      <Section>
        <SecTitle>1. 중고차 사고이력 정보(요약)</SecTitle>
        <ResultList>
          <ResultItem>
            <Icon>
              <Image width="100%" src="/images/history/history-ico1@2x.png" />
            </Icon>
            <ListTit>전손 보험사고</ListTit>
            <Price>{generalTotalLossAccidentCount > 0 ? '있음' : '없음'}</Price>
            {/* {dataType === 'JSON' && <Price>{car.r405 === 0 ? '없음' : '있음'}</Price>} */}
            {/* {dataType === 'XML' && <Price>{carXml && carXml.R212 && carXml.R212._text === '0' ? '없음' : '있음'}</Price>} */}
          </ResultItem>
          <ResultItem>
            <Icon>
              <Image width="90px" src="/images/history/history-ico2@2x.png" />
            </Icon>
            <ListTit>도난 보험사고</ListTit>
            <Price>{theftTotalLossAccidentCount > 0 ? '있음' : '없음'}</Price>
            {/* {dataType === 'JSON' && <Price>{car.r409 === 0 ? '없음' : '있음'}</Price>} */}
            {/* {dataType === 'XML' && <Price>{carXml && carXml.R210 && carXml.R210._text === '0' ? '없음' : '있음'}</Price>} */}
          </ResultItem>
          <ResultItem>
            <Icon>
              <Image width="90px" src="/images/history/history-ico3@2x.png" />
            </Icon>
            <ListTit>침수 보험사고</ListTit>
            <Price>{generalTotalLossAccidentCount > 0 ? '있음' : '없음'}</Price>
            {/* {dataType === 'JSON' && <Price>{car.r407 === 0 ? '없음' : '있음'}</Price>} */}
            {/* {dataType === 'XML' && <Price>{carXml.R214._text === '0' && carXml.R215._text === '0' ? '없음' : '있음'}</Price>} */}
          </ResultItem>
          <ResultItem>
            <Icon>
              <Image width="90px" src="/images/history/history-ico4@2x.png" />
            </Icon>
            <ListTit>특수 용도 이력</ListTit>
            <Price>-</Price>
          </ResultItem>
          <ResultItem>
            <Icon>
              <Image width="90px" src="/images/history/history-ico5@2x.png" />
            </Icon>
            <ListTit>내차 피해</ListTit>
            <Price>{selfAccidentCount > 0 ? `있음 (${getCommas(selfAccidentInsuranceMoney)} 원)` : '없음'}</Price>
            {/* {dataType === 'JSON' && <Price>{car.r401 === 0 ? '없음' : car.r401 + '회 (' + UNumber.toCommas(car.r402) + ' 원)'}</Price>}
            {dataType === 'XML' && <Price>{carXml.R201._text === '0' ? '없음' : carXml.R201._text + '회 (' + UNumber.toCommas(carXml.R202._text) + ' 원)'}</Price>} */}
          </ResultItem>
          <ResultItem>
            <Icon>
              <Image width="90px" src="/images/history/history-ico6@2x.png" />
            </Icon>
            <ListTit>상대차 피해</ListTit>
            <Price>{otherAccidentCount > 0 ? `있음 (${getCommas(otherAccidentInsuranceMoney)} 원)` : '없음'}</Price>
            {/* {dataType === 'JSON' && <Price>{car.r403 === 0 ? '없음' : car.r403 + '회 (' + UNumber.toCommas(car.r404) + ' 원)'}</Price>}
            {dataType === 'XML' && <Price>{carXml.R203._text === '0' ? '없음' : carXml.R203._text + '회 (' + UNumber.toCommas(carXml.R204._text) + ' 원)'}</Price>} */}
          </ResultItem>
          <ResultItem>
            <Icon>
              <Image width="90px" src="/images/history/history-ico7@2x.png" />
            </Icon>
            <ListTit>소유자 변경</ListTit>
            <Price>{ownerChangeCount > 0 ? '있음' : '없음'}</Price>
            {/* {dataType === 'JSON' && <Price>{car.r204 === 0 ? '없음' : car.r204 + '회'}</Price>}
            {dataType === 'XML' && <Price>{carXml.R303._text === '0' ? '없음' : carXml.R303._text + '회'}</Price>} */}
          </ResultItem>
          <ResultItem>
            <Icon>
              <Image width="90px" src="/images/history/history-ico8@2x.png" />
            </Icon>
            <ListTit>차량번호 변경</ListTit>
            <Price>{vehicleInformationChangeCount > 0 ? '있음' : '없음'}</Price>
            {/* {dataType === 'JSON' && <Price>{car.r201 === 0 ? '없음' : car.r201 + '회'}</Price>}
            {dataType === 'XML' && <Price>{carXml.R301._text === '0' ? '없음' : carXml.R301._text + '회'}</Price>} */}
          </ResultItem>
        </ResultList>
      </Section>
      <InfoTit>
        자동차보험 사고기록이 없었다고 해서 반드시 <span>무사고</span>라고 할 수는 없습니다.
      </InfoTit>

      <Section>
        <SecTitle>2. 자동차 일반 사양 정보</SecTitle>
        <InfoTxt>자동차의 일반적인 사양 정보를 제공합니다.</InfoTxt>
        <TbArea>
          <TbBox>
            <TbItem>
              <Th>제조사</Th>
              <Td>{manufacturer || '-'}</Td>
            </TbItem>
            <TbItem>
              <Th>자동차명</Th>
              <Td>{modelDetail || '-'}</Td>
            </TbItem>
            <TbItem>
              <Th>배기량</Th>
              <Td>{`${getCommas(displacement)} cc` || '-'}</Td>
            </TbItem>
            <TbItem>
              <Th>사용연료</Th>
              <Td>{fuel || '-'}</Td>
            </TbItem>
          </TbBox>
          <TbBox>
            <TbItem>
              <Th>연식</Th>
              <Td>{modelYear || '-'}</Td>
            </TbItem>
            <TbItem>
              <Th>차체형상</Th>
              <Td>{bodyStyle || '-'}</Td>
            </TbItem>
            <TbItem>
              <Th>용도 및 차종</Th>
              <Td>{`${useTypes[useType] || '-'} ${modelTypes[modelType] || '-'}`}</Td>
            </TbItem>
            <TbItem>
              <Th>최초 보험 가입일자</Th>
              <Td>{initialInsuranceSubscriptionDate || '-'}</Td>
            </TbItem>
          </TbBox>
        </TbArea>
      </Section>

      <Section>
        <SecTitle>3. 자동차 특수 용도 이력 정보</SecTitle>
        <InfoTxt>
          과거 자동차번호 변경기록을 모두 검색하여 제공하는 것으로 <span>대여용(렌트카), 영업용(택시 등)으로 사용된 적이 있는지</span> 확인할 수 있습니다.
        </InfoTxt>
        <InfoList>
          <InfoItem>
            <Icon>
              <Image width="90px" src="/images/history/history-ico9@2x.png" />
            </Icon>
            <ListTit>대여용도 사용이력(렌터카)</ListTit>
            <Price>{rentalCommercialHistory === 'Y' ? '있음' : '없음'}</Price>
            {/* {dataType === 'JSON' && <Price>{car.r303 && car.r303 === 'Y' ? '있음' : '없음'}</Price>}
            {dataType === 'XML' && <Price>{carXml.R403._text && carXml.R403._text === '1' ? '있음' : '없음'}</Price>} */}
          </InfoItem>
          <InfoItem>
            <Icon>
              <Image width="90px" src="/images/history/history-ico10@2x.png" />
            </Icon>
            <ListTit>영업용도 사용이력</ListTit>
            <Price>{generalCommercialHistory === 'Y' ? '있음' : '없음'}</Price>
            {/* {dataType === 'JSON' && <Price>{car.r302 && car.r302 === 'Y' ? '있음' : '없음'}</Price>} */}
            {/* {dataType === 'XML' && <Price>{carXml.R402._text && carXml.R402._text === '1' ? '있음' : '없음'}</Price>} */}
          </InfoItem>
          <InfoItem>
            <Icon>
              <Image width="90px" src="/images/history/history-ico11@2x.png" />
            </Icon>
            <ListTit>관용용도 사용이력</ListTit>
            <Price>{officialHistory === 'Y' ? '있음' : '없음'}</Price>
            {/* {dataType === 'JSON' && <Price>{car.r301 && car.r301 === 'Y' ? '있음' : '없음'}</Price>} */}
            {/* {dataType === 'XML' && <Price>{carXml.R401._text && carXml.R401._text === '1' ? '있음' : '없음'}</Price>} */}
          </InfoItem>
        </InfoList>
      </Section>

      <Section>
        <SecTitle>4. 자동차 번호/소유자 변경이력 정보</SecTitle>
        <InfoTxt>
          소유자 변경이력 정보는 <span>개인 간의 소유 변경 이외에도 매매상사 간 변경(상품용)까지 모두 포함된 횟수로 제공됩니다.</span> 참고해주시기 바랍니다.
        </InfoTxt>
        <ResponsiveTable>
          <TbHead>
            <TbTh>변경 등록일</TbTh>
            <TbTh>소유자 변경</TbTh>
            <TbTh>차량번호</TbTh>
            <TbTh>차량용도</TbTh>
          </TbHead>
          {vehicleInformationChangeList.map((item: any, index: number) => (
            <TbBody key={index}>
              <TbTd date>{item.date}</TbTd>
              <TbTh hidden>소유자 변경</TbTh>
              <TbTd>{item.type === '04' ? '변경' : '-'}</TbTd>
              <TbTh hidden>차량번호</TbTh>
              <TbTd></TbTd>
              <TbTh hidden>차량용도</TbTh>
              <TbTd>{`${useTypes[item.useType]} ${modelTypes[item.modelType]}`}</TbTd>
            </TbBody>
          ))}
          {ownerChangeList.map((item: any, index: number) => (
            <TbBody key={index}>
              <TbTd date>{item.date}</TbTd>
              <TbTh hidden>소유자 변경</TbTh>
              <TbTd>{item.type === '04' ? '변경' : '-'}</TbTd>
              <TbTh hidden>차량번호</TbTh>
              <TbTd></TbTd>
              <TbTh hidden>차량용도</TbTh>
              <TbTd>{`${useTypes[item.useType]} ${modelTypes[item.modelType]}`}</TbTd>
            </TbBody>
          ))}
        </ResponsiveTable>
      </Section>

      <Section flex column>
        <SecTitle>5. 자동차 특수 사고 이력 정보</SecTitle>
        <InfoTxt>
          자동차보험에서 보험금이 지급된 자동차사고기록 중 자동차품질에 특별히 영향을 미칠 가능성이 있는 사고
          <span>(전손, 도난, 침수사고)</span>를 확인할 수 있습니다.
        </InfoTxt>
        <InfoList>
          <InfoItem>
            <Icon>
              <Image width="90px" src="/images/history/history-ico1@2x.png" />
            </Icon>
            <ListTit>전손 보험사고</ListTit>
            <Price>{generalTotalLossAccidentCount > 0 ? '있음' : '없음'}</Price>
            {/* {dataType === 'JSON' && <Price>{car.r405 === 0 ? '없음' : '있음'}</Price>}
            {dataType === 'XML' && <Price>{carXml && carXml.R212 && carXml.R212._text === '0' ? '없음' : '있음'}</Price>} */}
          </InfoItem>
          <InfoItem>
            <Icon>
              <Image width="90px" src="/images/history/history-ico2@2x.png" />
            </Icon>
            <ListTit>도난 보험사고</ListTit>
            <Price>{theftTotalLossAccidentCount > 0 ? '있음' : '없음'}</Price>
            {/* {dataType === 'JSON' && <Price>{car.r409 === 0 ? '없음' : '있음'}</Price>}
            {dataType === 'XML' && <Price>{carXml.R210._text === '0' ? '없음' : '있음'}</Price>} */}
          </InfoItem>
          <InfoItem>
            <Icon>
              <Image width="90px" src="/images/history/history-ico3@2x.png" />
            </Icon>
            <ListTit>침수 보험사고(분손)</ListTit>
            <Price>{floodedAccidentCount > 0 ? '있음' : '없음'}</Price>
            {/* {dataType === 'JSON' && <Price>{car.r407 === 0 ? '없음' : '있음'}</Price>}
            {dataType === 'XML' && <Price>{carXml.R214._text === '0' && carXml.R215._text === '0' ? '없음' : '있음'}</Price>} */}
          </InfoItem>
        </InfoList>
        <TermsBox flex>
          <TermsCmt>용어설명</TermsCmt>
          <TermsList>
            <TermsItem>
              <TermsTit>전손 보험사고</TermsTit>
              <TermsTxt>
                손상된 자동차의 수리비용이 자동차가치(보험회사에서 적정하다고 인정한)를 초과한 경우(추정전손) 및 손상된 자동차의 수리가 불가능하거나 수리를 하더라도 자동차로서의
                기능을 다할 수 없는 경우(절대전손)로 자동차보험에서 보상처리 받은 사고
              </TermsTxt>
            </TermsItem>
            <TermsItem>
              <TermsTit>도난 보험사고</TermsTit>
              <TermsTxt>자동차를 도난 당하여 경찰서에 신고한지 30일이 지나도록 도난 당한 자동차를 찾지 못하여 자동차 보험에서 보상처리 받은 사고</TermsTxt>
            </TermsItem>
            <TermsItem>
              <TermsTit>침수 보험사고</TermsTit>
              <TermsTxt>자동차를 운행하던 중 자동차 내부로 물이 들어와 시동이 꺼지거나, 주차 중 엔진 등에 물이 들어가 운행이 불가능하게 되어 자동차에 손해가 발생한 경우</TermsTxt>
            </TermsItem>
          </TermsList>
        </TermsBox>
      </Section>

      <Section>
        <SecTitle>6. 보험사고이력 상세 정보</SecTitle>
        <InfoTit>
          {/* {car && car.r002} {carXml && carXml.R101._text} 차량이 자기차량손해담보에 */}
          <br />
          <span>가입하지 않은 동안에는 내 보험으로 처리한 사고이력정보의 제공이 불가능</span>합니다.
        </InfoTit>
        <GryBox>미가입기간 : {<span>{unsubscribedDate}</span>}</GryBox>
        <SubTxt>
          <p>
            보험금 및 수리(견적)비 출처에 따라서 <span>'가입한 보험사에서 지급된 경우(내차 보험)'와 '다른 차량 보험에서 지급된 경우(상대 보험)'로 나뉘어 제공</span>됩니다.
          </p>
          <p>
            자동차사고로 상대 차량 또는 재물에 발생한 <span>손해를 내 보험금에서 지급된 경우의 정보를 제공</span>합니다.
          </p>
        </SubTxt>
        <InfoTxtICon>
          쌍방과실로 해당 자동차의 손상, 수리 기록이 내차 보험과 상대 보험에서 동시에 처리된 경우에는 '내차 보험’ 에만 표시되고 '상대 보험'에서는 생략됩니다.
        </InfoTxtICon>
        {accidentList.map((item: any, index: number) => (
          <CrashInfo key={index}>
            <CrashDate>{moment(item.date).format('YYYY년 MM월 DD일')}</CrashDate>
            <CrashArea>
              <CrashBox>
                <ReportTitle>내 차 사고 발생 (피해)</ReportTitle>
                <ReportTb>
                  <ReportHead>
                    <Rth>내 차 보험 (처리)</Rth>
                    <Rth>상대 보험 (처리)</Rth>
                  </ReportHead>
                  <ReportBody>
                    <Rtd>
                      {item.accidentType === '1' && (
                        <>
                          {item.insuranceMoney !== '0' && (
                            // zeroCheckXml(
                            //   carXml['R308-04'][index]._text,
                            //   carXml['R308-05'][index]._text,
                            //   carXml['R308-06'][index]._text,
                            // ) &&
                            <SetTit>
                              지급보험금 :<br />
                              <span>{getCommas(item.insuranceMoney)}</span> 원
                            </SetTit>
                          )}

                          <SetList>
                            {item.partCost !== '0' && <p>부품 : {getCommas(item.partCost)} 원</p>}
                            {<br />}
                            {item.laborCost !== '0' && <p>공임 : {getCommas(item.laborCost)} 원</p>}
                            {<br />}
                            {item.paintCost !== '0' && <p>도장 : {getCommas(item.paintCost)} 원</p>}
                          </SetList>
                        </>
                      )}
                    </Rtd>
                    <Rtd>
                      {item.accidentType === '2' && (
                        <>
                          {item.insuranceMoney !== '0' && (
                            // zeroCheckXml(
                            //   carXml['R308-04'][index]._text,
                            //   carXml['R308-05'][index]._text,
                            //   carXml['R308-06'][index]._text,
                            // ) &&
                            <SetTit>
                              지급보험금 :<br />
                              <span>{getCommas(item.insuranceMoney)}</span> 원
                            </SetTit>
                          )}

                          <SetList>
                            {item.partCost !== '0' && <p>부품 : {getCommas(item.partCost)} 원</p>}
                            {<br />}
                            {item.laborCost !== '0' && <p>공임 : {getCommas(item.laborCost)} 원</p>}
                            {<br />}
                            {item.paintCost !== '0' && <p>도장 : {getCommas(item.paintCost)} 원</p>}
                          </SetList>
                        </>
                      )}
                    </Rtd>
                  </ReportBody>
                </ReportTb>
              </CrashBox>
              <CrashBox>
                <ReportTitle>상대 차 사고 발생 (피해)</ReportTitle>
                <ReportTb>
                  <ReportHead>
                    <Rth>내 차 보험 (처리)</Rth>
                  </ReportHead>
                  <ReportBody>
                    <Rtd>
                      {item.accidentType === '3' && (
                        <>
                          {item.insuranceMoney !== '0' && (
                            // zeroCheckXml(
                            //   carXml['R308-04'][index]._text,
                            //   carXml['R308-05'][index]._text,
                            //   carXml['R308-06'][index]._text,
                            // ) &&
                            <SetTit>
                              지급보험금 :<br />
                              <span>{getCommas(item.insuranceMoney)}</span> 원
                            </SetTit>
                          )}

                          <SetList>
                            {item.partCost !== '0' && <p>부품 : {getCommas(item.partCost)} 원</p>}
                            {<br />}
                            {item.laborCost !== '0' && <p>공임 : {getCommas(item.laborCost)} 원</p>}
                            {<br />}
                            {item.paintCost !== '0' && <p>도장 : {getCommas(item.paintCost)} 원</p>}
                          </SetList>
                        </>
                      )}
                    </Rtd>
                  </ReportBody>
                </ReportTb>
              </CrashBox>
            </CrashArea>
          </CrashInfo>
        ))}
        <SubTxt dash>
          <p>
            <span>카히스토리 자료수집 방법상 일부 오류가 발생 할 수 있습니다.</span> 의심되는 사항이 있으시면 전화주시기 바랍니다.
          </p>
          <p>
            위 ‘수리(견적)비용’은 보험사가 지급하는 보험금 중에서 대차료, 휴차료 등 간접손해와 과실상계액 등을 제외한 수리 및 견적(부품/공임/도장) 비용으로{' '}
            <span>실제 지급된 보험금과 차이가 있습니다.</span>
          </p>
          <p>
            보험사고 이력은 <span>최근 10건의 사고만 표시</span> 등됩니다.
          </p>
        </SubTxt>
        <TermsBox>
          <TermsCmt>용어설명</TermsCmt>
          <TermsList>
            <TermsItem>
              <TermsTit>수리(견적)비용</TermsTit>
              <TermsTxt>
                자동차사고로 자동차가 손상된 경우 보험회사가 지급하는 보험금 중에서 자동차 운반비, 대차료(렌트비용), 휴차료 등의 간접손해와 과실상계액 등을 제외한, 자동차를
                수리하는데 소요되는 비용 또는 견적으로 부품비용, 공임 및 도장료로 이루어집니다.
              </TermsTxt>
            </TermsItem>
            <TermsItem>
              <TermsTit>미가입기간</TermsTit>
              <TermsTxt>자기차량손해담보 미가입기간으로 해당기간에 대해서는 자기차량손해담보에 의해 지급된 자동차수리비 정보를 제공할 수 없는 기간</TermsTxt>
            </TermsItem>
            <TermsItem>
              <TermsTit>내 차 보험</TermsTit>
              <TermsTxt>내 보험으로 처리한 내 차 사고 (대인사고 제외)</TermsTxt>
            </TermsItem>
            <TermsItem>
              <TermsTit>상대 보험</TermsTit>
              <TermsTxt>다른 차량 보험으로 처리한 내 차 사고 (대인사고 제외)</TermsTxt>
            </TermsItem>
            <TermsItem>
              <TermsTit>상대 보험</TermsTit>
              <TermsTxt>내 보험으로 처리한 상대 차 사고 (대인사고 제외)</TermsTxt>
            </TermsItem>
          </TermsList>
        </TermsBox>
      </Section>

      <Wrapper flex column>
        <SecTitle>7. 동일차종 부가정보</SecTitle>
        <InfoTxt>
          부가정보는 본 차종에 대한 일반정보로서, 외부기관에서 제공받은 자료를 사용합니다. 또한, <span>개별 차량에 대한 해당 여부는 별도의 확인이 필요함</span>을 알려드립니다.
        </InfoTxt>
        <InfoList>
          <InfoItem dob>
            <Icon>
              <Image width="90px" src="/images/history/history-ico11@2x.png" />
            </Icon>
            <ListTit>신차정보</ListTit>
            <Price>없음</Price>
          </InfoItem>
          <InfoItem dob>
            <Icon>
              <Image width="90px" src="/images/history/history-ico12@2x.png" />
            </Icon>
            <ListTit>리콜정보</ListTit>
            <Price>없음</Price>
          </InfoItem>
        </InfoList>
        <DiscArea>
          <DiscList>
            <DiscTit>부가 이용정보</DiscTit>
            <DiscItem>
              <p>본 중고차 사고이력정보는 정보조회일자를 기준으로 작성된 것입니다.</p>
              <p>본 정보는 자동차 일반정보로서 조회 차량을 확인하기 위하여 참고로 제공하는 것이며, 일부 차량의 경우, 정보의 누락이나 오류가 있을 수 있습니다.</p>
              <p>침수사고에는 경미한 부분침수도 포함되며, 자료의 누락으로 ‘이력 없음’ 으로 표시되는 경우가 있습니다.</p>
              <p>카히스토리 자료수집 방법상 오류가 발생할 수 있으니 의심되는 사항이 있으시면 전화 주시기 바랍니다.</p>
              <p>수리비용은 보험사에서 지급되는 보험금 산정을 위하여 책정된 차량 수리 관련 항목만의 비용으로 실제 지급받은 보험금과 차이가 있을 수 있습니다.</p>
            </DiscItem>
          </DiscList>
          <DiscList>
            <DiscTit>서비스 이용 제한 안내</DiscTit>
            <DiscItem>
              <p className="none">
                중고차 사고이력정보 서비스는 자동차 보험을 취급하는 11개 손해보험사의 자동차 보험수리 지급기록(1996년 이후)에 근거하여 제공하고 있습니다. 따라서 다음과 같은 경우는
                중고차 이력정보 서비스를 제공할 수 없습니다.
              </p>
              <p>사고가 있었다 하더라도 보험회사에서 사고신고를 하지 않고 자비로 처리한 경우</p>
              <p className="dash">사고신고를 하였더라도 면책, 취소 등의 사유로 지급되지 않은 경우</p>
              <p className="dash">사고신고 후 자비로 처리한 경우</p>
              <p>자동차보험이 아닌 운수 공제(택시공제, 화물공제, 버스공제 등)에 가입되어 운수공제로 부터 자동차의 피해에 대한 손해를 보상받은 경우 등</p>
              <p className="none">
                본 중고차 사고이력 정보는 중고차 품질확인은 위한 보조정보이며 결정적 판단자료로 사용되어서는 아니됩니다. 따라서 정밀한 중고차 품질확인을 윈하시면 차량진단
                전문업체의 진단을 받아보시기 바랍니다.
              </p>
            </DiscItem>
          </DiscList>
        </DiscArea>
        <InfoTit mt>중고차사고이력정보서비스는?</InfoTit>
        <InfoTxt center>
          중고차사고이력정보서비스는 중고차 거래의 활성화와 중고차 매매시장의 투명성을 높이기 위하여,
          <br />
          보험개발원에서 보유하고 있거나 수집한 1996년 이후의 자동차관련 정보를 기초로 제공되는 온라인 서비스입니다.
          <br />
          본 정보는 중고차품질확인을 위한 보조정보로서 자동차와 관련된 모든 사고의 발생 여부나 품질확인을 위한 결정적인 판단자료로 사용 되어서는 아니 됩니다.
          <br />
          따라서 본 정보의 확대해석이나 오·남용으로 발생하는 사항에 대해서 보험개발원은 어떤 책임도 부담하지 아니합니다.
        </InfoTxt>
        <InfoList mt>
          <InfoItem dob>
            <Icon>
              <Image width="90px" src="/images/history/history-ico13@2x.png" />
            </Icon>
            <ListTit>중고차 거래 활성화</ListTit>
          </InfoItem>
          <InfoItem dob>
            <Icon>
              <Image width="90px" src="/images/history/history-ico14@2x.png" />
            </Icon>
            <ListTit>매매시장 투명성</ListTit>
          </InfoItem>
        </InfoList>
        <InfoTxt center big>
          보험개발원(www.kidi.or.kr)은 보험입법 제176조에 의하여 설립된
          <br />
          보험요율산출기관이며, 중고차사고이력정보서비스(www.carhistory.or.kr)는
          <br />
          보험업법시행령 제86조 제1호 근거하여 제공합니다.
        </InfoTxt>
        <BotTxt>
          {/* {car && car.r001 && <span>{UDateFormat.toSeoulFormatDate(car.r001, 'yyyy-MM-DD')}</span>} */}
          {/* <span>2020.05.25</span> */}
          <strong>보험개발원</strong>
        </BotTxt>
      </Wrapper>
    </Wrapper>
  );
};

export default AccidentHistoryPopup;
