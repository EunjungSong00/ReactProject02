import styled from '@emotion/styled';
import {Wrapper, Text, Checkbox} from '@components/atoms';
import * as table from './table';
import {getCommas} from '@modules/replaceStrings';
import moment from 'moment';
import {inject, observer} from 'mobx-react';

const SecTit = styled.div`
  display: inline-block;
  width: 100%;
  margin-bottom: 20px;
  vertical-align: top;
  font-weight: 700;
  font-size: 20px;
  color: #000;
  letter-spacing: -1px;
  span {
    float: right;
    margin-top: 2px;
    font-size: 14px;
    color: #666;
  }
`;
const CarDefInfoList = styled.ul`
  display: inline-block;
  width: 100%;
  vertical-align: top;
`;
const CarDefInfoItem = styled.li`
  float: left;
  width: calc(50% - 10px);
  margin-left: 20px;
  padding: 15px 0;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  &:nth-of-type(-n + 2) {
    border-top: 1px solid #ccc;
  }
  &:nth-of-type(2n + 1) {
    margin-left: 0;
  }
`;
const ListTit = styled.div`
  display: inline-block;
  font-weight: 700;
  font-size: 14px;
  color: #000;
  letter-spacing: -1px;
  vertical-align: middle;
`;
const ListTxt = styled(ListTit)`
  font-weight: normal;
  color: #999;
  margin-left: 15px;
`;
const CurrentDistance = styled.div`
  strong {
    font-weight: 700;
    color: #000;
  }
  span {
    margin-left: 15px;
    color: #666;
  }
`;
const GasList = styled.ul`
  display: inline-block;
  width: 100%;
  vertical-align: top;
`;
const GasItem = styled.li`
  display: inline-block;
  width: 33.3333333%;
  vertical-align: top;
  text-align: center;
  span {
    display: inline-block;
    margin-right: 3px;
    vertical-align: top;
  }
  &:first-of-type {
    width: 33.3333334%;
  }
`;
const TitleSet = styled.div`
  display: inline-block;
  width: 100%;
  margin-bottom: 20px;
  vertical-align: top;
  font-size: 20px;
  color: #000;
  letter-spacing: -1px;
  text-align: center;
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: #000;
  letter-spacing: -1px;
  span {
    display: inline-block;
    text-decoration: underline;
    vertical-align: top;
  }
`;
const SubTitle = styled.div<any>`
  display: inline-block;
  width: 100%;
  margin-top: 20px;
  vertical-align: top;
  font-size: 14px;
  color: #666;
  ${(props) =>
    props.mtn &&
    `
    margin-top:0;
  `}
`;
const SignatureSet = styled.div`
  display: inline-block;
  width: 100%;
  margin-top: 80px;
  vertical-align: top;
`;
const STit = styled.div`
  font-weight: 700;
  font-size: 20px;
  color: #000;
  letter-spacing: -1px;
  margin-bottom: 24px;
`;
const PhotoList = styled.ul`
  display: inline-block;
  width: 100%;
  vertical-align: top;
`;
const PhotoItem = styled.li`
  float: left;
  position: relative;
  overflow: hidden;
  width: calc(50% - 10px);
  height: 360px;
  margin-left: 20px;
  background: #f7f7f7;
  &:first-of-type {
    margin-left: 0;
  }
`;
const ImgBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  img {
    position: absolute;
    transform: translate(-50%, -50%);
  }
`;
const NoticeArea = styled.div`
  display: inline-block;
  width: 100%;
  vertical-align: top;
`;
const NoticeCon = styled.div`
  display: inline-block;
  width: 100%;
  margin-top: 30px;
  vertical-align: top;
  &:first-of-type {
    margin-top: 0;
  }
`;
const NoticeTit = styled.div`
  font-weight: 700;
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
`;
const NoticeList = styled.ul`
  display: inline-block;
  width: 100%;
  vertical-align: top;
`;
const NoticeItem = styled.li`
  display: inline-block;
  position: relative;
  width: 100%;
  vertical-align: top;
  font-size: 14px;
  color: #666;
  letter-spacing: -1px;
  line-height: 1.6;
`;
const NoticeNum = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;
const NoticeTxt = styled.div<any>`
  width: 100%;
  padding-left: 20px;
  box-sizing: border-box;
  ${(props) =>
    props.none &&
    `
        font-size:14px;
        color:#666;
        letter-spacing:-1px;
        line-height:1.6;
        padding:0;
`}
`;
const LastSignSet = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  vertical-align: top;
  text-align: center;
`;
const BuyDateSet = styled.div``;
const DateSet = styled.div`
  display: inline-block;
  width: 50px;
  vertical-align: top;
  span {
    display: inline-block;
    margin-right: 3px;
    vertical-align: top;
  }
`;
const BuySignSet = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;
const Performance = (props: any) => {
  const {detailVehicleMgtStore} = props;
  const {data} = props;
  const store = detailVehicleMgtStore;
  const {vehicle} = props;
  // const {performanceHistoryList} = vehicle;
  const performance = data?.performanceHistoryList ?? data.performanceHistoryList[0];
  return (
    <>
      <SecTit>
        <Text width="200px" mt={50}>
          자동차 기본정보
        </Text>
        <span style={{marginRight: '10px'}}>발행번호 제 호</span>
      </SecTit>
      <CarDefInfoList>
        <CarDefInfoItem>
          <ListTit>차명</ListTit>
          <ListTxt>
            {store?.manufacturer} {store?.modelDetail}
          </ListTxt>
        </CarDefInfoItem>
        <CarDefInfoItem>
          <ListTit>연식</ListTit>
          <ListTxt>{store?.modelYear || '-'}</ListTxt>
        </CarDefInfoItem>
        <CarDefInfoItem>
          <ListTit>자동차번호</ListTit>
          <ListTxt>{store?.number || '-'}</ListTxt>
        </CarDefInfoItem>
        <CarDefInfoItem>
          <ListTit>차대번호</ListTit>
          <ListTxt>{store?.vehicleIdentityNumber || '-'}</ListTxt>
        </CarDefInfoItem>
        <CarDefInfoItem>
          <ListTit>최초등록일</ListTit>
          <ListTxt>{performance?.firstRegisterDate || '-'}</ListTxt>
        </CarDefInfoItem>
        <CarDefInfoItem>
          <ListTit>검사 유효기간</ListTit>
          <ListTxt>{`${moment(performance?.validPeriodStartDate).format('YYYY-MM-DD')} ~ ${moment(performance?.validPeriodEndDate).format('YYYY-MM-DD')}`}</ListTxt>
        </CarDefInfoItem>
        <CarDefInfoItem>
          <ListTit>변속기 종류</ListTit>
          <ListTxt>{store?.transmissionType || '-'}</ListTxt>
        </CarDefInfoItem>
        <CarDefInfoItem>
          <ListTit>사용연료</ListTit>
          <ListTxt>{store?.fuelTypeA || '-'}</ListTxt>
        </CarDefInfoItem>
        <CarDefInfoItem>
          <ListTit>보증유형</ListTit>
          <ListTxt>-</ListTxt>
        </CarDefInfoItem>
        <CarDefInfoItem>
          <ListTit>가격산정 기준가격</ListTit>
          <ListTxt>{getCommas(store?.retailPrice || '-')} 만원</ListTxt>
        </CarDefInfoItem>
        <CarDefInfoItem>
          <ListTit>원동기 형식</ListTit>
          <ListTxt>{store?.drivenWheels || '-'}</ListTxt>
        </CarDefInfoItem>
      </CarDefInfoList>

      <SecTit>
        <Text width="200px" mt={50}>
          자동차 종합상태
        </Text>
      </SecTit>
      <table.Table>
        <table.TableColgroup>
          <col width="25%" />
          <col width="40%" />
          <col width="35%" />
        </table.TableColgroup>
        <table.TableHead>
          <table.TableRow>
            <table.TableTh>사용이력</table.TableTh>
            <table.TableTh>상태</table.TableTh>
            <table.TableTh>항목/해당부품</table.TableTh>
          </table.TableRow>
        </table.TableHead>
        <table.TableBody>
          <table.TableRow>
            <table.TableTh>주행거리 계기상태</table.TableTh>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
            <table.TableTd rowSpan={2}>
              <CurrentDistance>
                <strong>현재주행거리</strong>
                <span>{`${getCommas(store?.mileage || '-')} km`}</span>
              </CurrentDistance>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTh>주행거리 상태</table.TableTh>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="많음" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="보통" name="save" isChk={false} onChange={() => null} />
                <Checkbox mr="10px" labelText="적음" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTh>배출가스</table.TableTh>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="일산화수소" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="탄산수소" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
            <table.TableTd>
              <GasList>
                <GasItem>
                  <span>%</span>
                </GasItem>
                <GasItem>
                  <span>ppm</span>
                </GasItem>
              </GasList>
            </table.TableTd>
            <table.TableTd> </table.TableTd>
            <table.TableTd>&nbsp;</table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTh>차대번호표기</table.TableTh>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
            <table.TableTd> </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTh>특별이력</table.TableTh>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
            <table.TableTd> </table.TableTd>
            <table.TableTd>&nbsp;</table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTh>용도변경</table.TableTh>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
            <table.TableTd> </table.TableTd>
            <table.TableTd> </table.TableTd>
            <table.TableTd>&nbsp;</table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTh>색상</table.TableTh>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="무채색" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="유채색" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
            <table.TableTd> </table.TableTd>
            <table.TableTd> </table.TableTd>
            <table.TableTd>&nbsp;</table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTh>주요옵션</table.TableTh>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="있음" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="없음" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
            <table.TableTd> </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTh>리콜대상</table.TableTh>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="해당없음" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="해당" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
            <table.TableTd> </table.TableTd>
          </table.TableRow>
        </table.TableBody>
      </table.Table>

      <SecTit>
        <Text mt={50} width="200px">
          자동차 세부상태
        </Text>
      </SecTit>
      <table.Table>
        <table.TableColgroup>
          <col width="15%" />
          <col width="20%" />
          <col width="20%" />
          <col width="45%" />
          {/* <col width="15%" /> */}
          {/* <col width="15%" /> */}
        </table.TableColgroup>
        <table.TableHead>
          <table.TableRow>
            <table.TableTh>주요장치</table.TableTh>
            <table.TableTh colSpan={2}>항목/해당부품</table.TableTh>
            <table.TableTh>상태</table.TableTh>
            {/* <TableTh>가격조사ㆍ산정액</TableTh> */}
            {/* <TableTh>특기사항</TableTh> */}
          </table.TableRow>
        </table.TableHead>
        <table.TableBody>
          <table.TableRow>
            <table.TableTh rowSpan={1}>작동상태(공회전)</table.TableTh>
            <table.TableTd colSpan={2}> </table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
            <table.TableTd rowSpan={2}> </table.TableTd>
            <table.TableTd rowSpan={2}>&nbsp;</table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTh rowSpan={2}>자기진단</table.TableTh>
            <table.TableTd colSpan={2}>원동기</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
            <table.TableTd rowSpan={2}> </table.TableTd>
            <table.TableTd rowSpan={2}>&nbsp;</table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd colSpan={2}>변속기</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTh rowSpan={9}>원동기</table.TableTh>
            <table.TableTd rowSpan={3}>오일누유</table.TableTd>
            <table.TableTd>로커암 커버</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="없음" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="미세누유" name="save" isChk={false} onChange={() => null} />
                <Checkbox mr="10px" labelText="누유" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
            <table.TableTd rowSpan={9}> </table.TableTd>
            <table.TableTd rowSpan={9}>&nbsp;</table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd>실린더헤드/가스켓</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="없음" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="미세누유" name="save" isChk={false} onChange={() => null} />
                <Checkbox mr="10px" labelText="누유" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd>오일팬</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="없음" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="미세누유" name="save" isChk={false} onChange={() => null} />
                <Checkbox mr="10px" labelText="누유" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd colSpan={2}>오일 유량</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd rowSpan={4}>냉각수 누수</table.TableTd>
            <table.TableTd>실린더헤드/가스켓</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="없음" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="미세누유" name="save" isChk={false} onChange={() => null} />
                <Checkbox mr="10px" labelText="누유" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd>워터펌프</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="없음" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="미세누유" name="save" isChk={false} onChange={() => null} />
                <Checkbox mr="10px" labelText="누유" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd>라디에이터</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="없음" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="미세누유" name="save" isChk={false} onChange={() => null} />
                <Checkbox mr="10px" labelText="누유" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd>냉각수 수량</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="적정" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="부족" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd colSpan={2}>고압펌프(커먼레일) - 디젤엔진</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTh rowSpan={7}>변속기</table.TableTh>
            <table.TableTd rowSpan={3}>자동변속기(A/T)</table.TableTd>
            <table.TableTd>오일누유</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="없음" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="미세누유" name="save" isChk={false} onChange={() => null} />
                <Checkbox mr="10px" labelText="누유" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
            <table.TableTd rowSpan={7}> </table.TableTd>
            <table.TableTd rowSpan={7}>&nbsp;</table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd>오일유량 및 상태</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="적정" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="부족" name="save" isChk={false} onChange={() => null} />
                <Checkbox mr="10px" labelText="과다" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd>작동상태(공회전)</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd rowSpan={4}>수동변속기(M/T)</table.TableTd>
            <table.TableTd>오일누유</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="없음" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="미세누유" name="save" isChk={false} onChange={() => null} />
                <Checkbox mr="10px" labelText="누유" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd>기어변속장치</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd>오일유량 및 상태</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="적정" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="부족" name="save" isChk={false} onChange={() => null} />
                <Checkbox mr="10px" labelText="과다" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd>작동상태(공회전)</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTh rowSpan={4}>동력전달</table.TableTh>
            <table.TableTd colSpan={2}>클러치 어셈블리</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
            <table.TableTd rowSpan={3}> </table.TableTd>
            <table.TableTd rowSpan={3}>&nbsp;</table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd colSpan={2}>등속죠인트</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd colSpan={2}>추진축 및 베어링</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd colSpan={2}>디퍼렌셜기어</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTh rowSpan={6}>조향</table.TableTh>
            <table.TableTd colSpan={2}>동력조향 작동 오일 누유</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="없음" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="미세누유" name="save" isChk={false} onChange={() => null} />
                <Checkbox mr="10px" labelText="누유" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
            <table.TableTd rowSpan={4}> </table.TableTd>
            <table.TableTd rowSpan={4}>&nbsp;</table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd rowSpan={5}>작동상태</table.TableTd>
            <table.TableTd>스티어링 기어</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd>스티어링 펌프</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd>스티어링 조인트</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd>파워고압호스</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd>타이로드엔드 및 볼 조인트</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTh rowSpan={3}>제동</table.TableTh>
            <table.TableTd colSpan={2}>브레이크 마스터 실린더오일 누유</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="없음" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="미세누유" name="save" isChk={false} onChange={() => null} />
                <Checkbox mr="10px" labelText="누유" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
            <table.TableTd rowSpan={3}> </table.TableTd>
            <table.TableTd rowSpan={3}>&nbsp;</table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd colSpan={2}>브레이크 오일 누유</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="없음" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="미세누유" name="save" isChk={false} onChange={() => null} />
                <Checkbox mr="10px" labelText="누유" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd colSpan={2}>배력장치 상태</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTh rowSpan={6}>전기</table.TableTh>
            <table.TableTd colSpan={2}>발전기 출력</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
            <table.TableTd rowSpan={6}> </table.TableTd>
            <table.TableTd rowSpan={6}>&nbsp;</table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd colSpan={2}>시동 모터</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd colSpan={2}>와이퍼 모터 기능</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd colSpan={2}>실내송풍 모터</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd colSpan={2}>라디에이터 팬 모터</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd colSpan={2}>윈도우 모터</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTh rowSpan={3}>고전원 전기장치</table.TableTh>
            <table.TableTd colSpan={2}>충전구 절연 상태</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
            <table.TableTd rowSpan={3}> </table.TableTd>
            <table.TableTd rowSpan={3}>&nbsp;</table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd colSpan={2}>구동축전지 격리 상태</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTd colSpan={2}>고전원전기배선 상태</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>

          <table.TableRow>
            <table.TableTh>기타</table.TableTh>
            <table.TableTd colSpan={2}>연료누출(LP가스포함)</table.TableTd>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
            <table.TableTd> </table.TableTd>
            <table.TableTd>&nbsp;</table.TableTd>
          </table.TableRow>
        </table.TableBody>
      </table.Table>

      <SecTit>
        <Text mt={50} width="200px">
          자동차 기타정보
        </Text>
      </SecTit>
      <table.Table>
        <table.TableColgroup>
          <col width="15%" />
          <col width="20%" />
          <col width="10%" />
          <col width="15%" />
          <col width="10%" />
          <col width="30%" />
          {/* <col width="15%" /> */}
        </table.TableColgroup>
        <table.TableHead>
          <table.TableRow>
            <table.TableTh>항목/해당부품</table.TableTh>
            <table.TableTh colSpan={5}>수리필요/보유상태</table.TableTh>
            {/* <TableTh>가격조사ㆍ산정액</TableTh> */}
          </table.TableRow>
        </table.TableHead>
        <table.TableBody>
          <table.TableRow>
            <table.TableTh>외장</table.TableTh>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
            <table.TableTd colSpan={4} align="left">
              &nbsp;
            </table.TableTd>
            <table.TableTd rowSpan={8}> </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTh>내장</table.TableTh>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
            <table.TableTd colSpan={4} align="left">
              &nbsp;
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTh>광택</table.TableTh>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
            <table.TableTd colSpan={4} align="left">
              &nbsp;
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTh>룸 크리닝</table.TableTh>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
            <table.TableTd colSpan={4} align="left">
              &nbsp;
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTh>휠</table.TableTh>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
            <table.TableTh>운전석</table.TableTh>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="전" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="후" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
            <table.TableTh>동반석</table.TableTh>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="전" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="후" name="save" isChk={false} onChange={() => null} />
                <Checkbox mr="10px" labelText="응급" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTh>타이어</table.TableTh>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
            <table.TableTh>운전석</table.TableTh>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="전" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="후" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
            <table.TableTh>동반석</table.TableTh>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="전" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="후" name="save" isChk={false} onChange={() => null} />
                <Checkbox mr="10px" labelText="응급" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTh>유리</table.TableTh>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
            <table.TableTd colSpan={4} align="left">
              &nbsp;
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTh>기본품목</table.TableTh>
            <table.TableTd align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="양호" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="불량" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
            <table.TableTd colSpan={4} align="left">
              <Wrapper flex>
                <Checkbox mr="10px" labelText="사용설명서" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="안전삼각대" name="save" isChk={false} onChange={() => null} />
                <Checkbox mr="10px" labelText="잭" name="save" isChk={true} onChange={() => null} />
                <Checkbox mr="10px" labelText="스패너" name="save" isChk={false} onChange={() => null} />
              </Wrapper>
            </table.TableTd>
          </table.TableRow>
        </table.TableBody>
      </table.Table>
      <table.Table mt="40px">
        <table.TableColgroup>
          <col width="15%" />
          <col width="20%" />
          <col width="65%" />
        </table.TableColgroup>
        <table.TableBody>
          <table.TableRow>
            <table.TableTh bg="#ccc" rowSpan={2}>
              특기사항 및<br />
              점검자의 의견
            </table.TableTh>
            <table.TableTh brt>성능ㆍ상태 점검자</table.TableTh>
            <table.TableTd align="left" brt>
              {' '}
            </table.TableTd>
          </table.TableRow>
          <table.TableRow>
            <table.TableTh>가격ㆍ조정 산정자</table.TableTh>
            <table.TableTd align="left">&nbsp;</table.TableTd>
          </table.TableRow>
        </table.TableBody>
      </table.Table>
      <Wrapper mt={50}></Wrapper>
      <TitleSet>
        <Title>
          최종 가격조사ㆍ산정 금액&nbsp;
          <span>{getCommas(store?.retailPrice || '-')}</span> 만원
        </Title>
        <SubTitle>이 가격조사 · 산정가격은 보험개발원의 차량기준가액을 바탕으로 한 기준가격과 기준서를 적용하였음</SubTitle>
      </TitleSet>
      {/* <SignatureSet>
    <STit>점검장면 촬영사진</STit>
    <PhotoList>
      <PhotoItem>
        <ImgBox>{car && car.carFrontImg && <ImgSet src={car.carFrontImg} />}</ImgBox>
      </PhotoItem>
      <PhotoItem>
        <ImgBox>{car && car.carRearImg && <ImgSet src={car.carRearImg} />}</ImgBox>
      </PhotoItem>
    </PhotoList>
  </SignatureSet> */}
      <SignatureSet>
        {/* <STit>서명</STit> */}
        <table.Table>
          <table.TableColgroup>
            <col width="50%" />
            <col width="50%" />
          </table.TableColgroup>
          <table.TableBody>
            <table.TableRow>
              <table.TableTd colSpan={2} lh brbn padding="15px 10px 30px 10px">
                「자동차관리법」 제58조 제1항 및 같은법 시행규칙 제120조에 따라 중고자동차의 성능 · 상태를 점검, 자동차가격조사 · 산정하였음을 확인합니다.
              </table.TableTd>
            </table.TableRow>
            <table.TableRow>
              <table.TableTd align="left" brbn>
                중고자동차 성능ㆍ상태 점검자
              </table.TableTd>
              <table.TableTd align="right" brbn>
                (인)
              </table.TableTd>
            </table.TableRow>
            <table.TableRow>
              <table.TableTd align="left" brbn>
                자동차가격조사ㆍ산정자
              </table.TableTd>
              <table.TableTd align="right" brbn>
                (인)
              </table.TableTd>
            </table.TableRow>
            <table.TableRow>
              <table.TableTd align="left" brbn>
                중고자동차 성능ㆍ상태 고지자
              </table.TableTd>
              <table.TableTd align="right" brbn>
                (인)
              </table.TableTd>
            </table.TableRow>
            {/* <TableRow>
          <TableTd colSpan={2} lh brbn padding="30px 10px 15px 10px">
            본인은 위 중고자동차성능ㆍ상태점검기록부 ({" "}
            <SignCheck inline signMt name={"mo63"} id={"mo63-1"}>
              자동차가격조사ㆍ산정 선택
            </SignCheck>{" "}
            )를 교부받은 사실을 확인합니다.
          </TableTd>
        </TableRow> */}
            <table.TableRow>
              <table.TableTd colSpan={2} align="right" brbn>
                <LastSignSet>
                  <BuyDateSet>
                    <DateSet>
                      <span>0</span>년
                    </DateSet>
                    <DateSet>
                      <span>0</span>월
                    </DateSet>
                    <DateSet>
                      <span>0</span>일
                    </DateSet>
                  </BuyDateSet>
                  <BuySignSet>
                    {/* <BuyCmt>매수인</BuyCmt>
                <SignTxt>
                  <span></span>(서명 또는 인)
                </SignTxt> */}
                  </BuySignSet>
                </LastSignSet>
              </table.TableTd>
            </table.TableRow>
          </table.TableBody>
        </table.Table>
      </SignatureSet>
      <SignatureSet>
        <STit>유의사항</STit>
        <NoticeArea>
          <NoticeCon>
            <NoticeTit>중고자동차성능ㆍ상태점검의 보증에 관한 사항 등</NoticeTit>
            <NoticeList>
              <NoticeItem>
                <NoticeNum>1.</NoticeNum>
                <NoticeTxt>
                  <p>
                    성능ㆍ상태점검자 및 매매업자는 아래의 보증기간 또는 보증거리 이내에 중고자동차 성능ㆍ상태점검기록부(가격조사ㆍ산정 부분 제외)에 기재된 내용과 자동차의 실제
                    성능ㆍ상태가 다른 경우 계약 또는 관계법령에 따라 매수인에 대하여 책임을 집니다.
                  </p>
                  <p>
                    - 자동차인도일부터 보증기간은 (30)일, 보증거리는 (2,000)킬로미터로 합니다. (보증기간은 30일 이상, 보증거리는 2천킬로미터 이상이어야 하며, 그 중 먼저 도래한 것을
                    적용합니다)
                  </p>
                </NoticeTxt>
              </NoticeItem>
              <NoticeItem>
                <NoticeNum>2.</NoticeNum>
                <NoticeTxt>
                  <p>
                    중고자동차의 구조ㆍ장치 등의 성능ㆍ상태를 고지하지 아니한 자, 거짓으로 점검하거나 거짓 고지한 자는 「자동차관리법」 제 80조 제 6호 및 제 7호에 따라 2년 이하의
                    징역 또는 2천만원 이하의 벌금에 처합니다.
                  </p>
                </NoticeTxt>
              </NoticeItem>
              <NoticeItem>
                <NoticeNum>3.</NoticeNum>
                <NoticeTxt>
                  <p>
                    성능ㆍ상태점검자(자동차정비업자)가 거짓으로 성능ㆍ상태 점검을 하거나 점검한 내용과 다르게 자동차매매업자에게 알린 경우 「자동차관리법 제21조제2항 등의 규정에
                    따른 행정처분의 기준과 절차에 관한 규칙」 제5조제1항에 따라 1차 사업정지 30일, 2차 사업정지 90 일, 3차 등록취소의 행정처분을 받습니다.
                  </p>
                </NoticeTxt>
              </NoticeItem>
              <NoticeItem>
                <NoticeNum>4.</NoticeNum>
                <NoticeTxt>
                  <p>
                    사고이력 인정은 사고로 자동차 주요 골격 부위의 판금, 용접수리 및 교환이 있는 경우로 한정합니다. 단, 쿼터패널, 루프패널, 사이드 실패널 부위는 절단, 용접시에만
                    사고로 표기합니다. (후드, 프론트휀더, 도어, 트렁크리드 등 외판 부위 및 범퍼에 대한 판금, 용접수리 및 교환은 단순수리로서 사고에 포함되지 않습니다)
                  </p>
                </NoticeTxt>
              </NoticeItem>
              <NoticeItem>
                <NoticeNum>5.</NoticeNum>
                <NoticeTxt>
                  <p>성능ㆍ상태점검은 국토교통부장관이 정하는 자동차검사방법에 따라야 합니다.</p>
                </NoticeTxt>
              </NoticeItem>
              <NoticeItem>
                <NoticeNum>6.</NoticeNum>
                <NoticeTxt>
                  <p>체크항목 판단기준</p>
                  <p>- 미세누유(미세누수): 해당부위에 오일(냉각수)이 비치는 정도로서 부품 노후로 인한 현상</p>
                  <p>- 누유(누수): 해당부위에서 오일(냉각수)이 맺혀서 떨어지는 상태</p>
                  <p>- 부식: 차량하부와 외판의 금속표면이 화학반응에 의해 금속이 아닌 상태로 상실되어 가는 현상(단순히 녹슬어 있는 상태는 제외합니다)</p>
                  <p>- 침수: 자동차의 원동기, 변속기 등 주요장치 일부가 물에 잠긴 흔적이 있는 상태</p>
                </NoticeTxt>
              </NoticeItem>
            </NoticeList>
          </NoticeCon>
          <NoticeCon>
            <NoticeTit>중고자동차성능ㆍ상태점검의 보증에 관한 사항 등</NoticeTit>
            <NoticeList>
              <NoticeItem>
                <NoticeNum>1.</NoticeNum>
                <NoticeTxt>
                  <p>
                    가격조사ㆍ산정자는 아래의 보증기간 또는 보증거리 이내에 중고자동차 성능ㆍ상태점검기록부(가격조사ㆍ산정 부분 한정)에 기재된 내용에 허위 또는 오류가 있는 경우
                    계약 또는 관계법령에 따라 매수인에 대하여 책임을 집니다.
                  </p>
                  <p>
                    - 자동차인도일부터 보증기간은 ()일, 보증거리는 ()킬로미터로 합니다. (보증기간은 30일 이상, 보증거리는 2천킬로미터 이상이어야 하며, 그 중 먼저 도래한 것을
                    적용합니다)
                  </p>
                </NoticeTxt>
              </NoticeItem>
              <NoticeItem>
                <NoticeNum>2.</NoticeNum>
                <NoticeTxt>
                  <p>
                    매매업자는 매수인이 가격조사ㆍ산정을 원할 경우 가격조사ㆍ산정자가 해당 자동차 가격을 조사ㆍ산정하여 결과를 이 서식에 적도록 한 후, 반드시 매매계약을 체결하기
                    전에 매수인에게 서면으로 고지하여야 합니다. 이경우 매매업자는 가격조사ㆍ산정자에게 가격조사ㆍ산정을 의뢰하기 전에 매수인에게 가격조사ㆍ산정 비용을 안내하여야
                    합니다.
                  </p>
                </NoticeTxt>
              </NoticeItem>
              <NoticeItem>
                <NoticeNum>3.</NoticeNum>
                <NoticeTxt>
                  <p>
                    자동차가격은 보험개발원이 정한 차량기준가액을 기준가격으로 조사ㆍ산정하되, 기준서는 「자동차관리법」 제 58조의 4제 1호에 해당하는 자는 기술사회에서 발행한
                    기준서를, 제2호에 해당하는 자는 한국 자동차진단보증협회에서 발행한 기준서를 각각 적용하여야 하며, 기준 가격과 기준서는 산정일 기준 가장 최근에 발행된 것을
                    적용합니다.
                  </p>
                </NoticeTxt>
              </NoticeItem>
              <NoticeItem>
                <NoticeNum>4.</NoticeNum>
                <NoticeTxt>
                  <p>특기사항란은 가격조사ㆍ산정자의 자동차 성능ㆍ상태에 대한 견해가 성능ㆍ상태점검자의 견해와 다를 경우 표시합니다.</p>
                </NoticeTxt>
              </NoticeItem>
            </NoticeList>
          </NoticeCon>
          <NoticeCon>
            <NoticeTit>자동차가격조사ㆍ산정이란</NoticeTit>
            <NoticeTxt none>
              "가격조사ㆍ산정"은 소비자가 매매계약을 체결함에 있어 중고차 가격의 적절성 판단에 참고할 수 있도록 법령에 의한 절차와 기준에 따라 전문 가격조사ㆍ산정인이 객관적으로
              제시한 가액입니다. 따라서 "가격조사ㆍ산정"은 소비자의 자율적 선택에 따른 유료 서비스이며, 가격조사ㆍ산정 결과는 중고차 가격판단에 관하여 법적 구속력은 없고 소비자의
              구매 여부 결정에 참고자료로 활용됩니다.
            </NoticeTxt>
          </NoticeCon>
        </NoticeArea>
      </SignatureSet>
    </>
  );
};

// export default Center;

export default inject('detailVehicleMgtStore')(observer(Performance));
