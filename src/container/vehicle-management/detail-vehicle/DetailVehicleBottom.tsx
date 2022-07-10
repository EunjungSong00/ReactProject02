import {Button, Input, Select, Text, Wrapper, Line} from '@components/atoms';
import InputUnit from '@components/atoms/InputUnit';
import {Section} from '@components/molecules';
import theme from '@public/theme';
import {useState, useEffect} from 'react';
import {observer, inject} from 'mobx-react';
import DatePicker from 'react-datepicker';
import {CalendarWrapper} from '@components/atoms/Input';
import setVehicleDetail from '@api/vehicle/setVehicleDetail';
import {formattedDate, getCommas, getOnlyNumber, getOnlyNumberDot} from '@modules/replaceStrings';
import {getTotalCost} from '@modules/calculateCosts';
import router from 'next/router';
import Toast from '@components/organisms/Toast';

const opt = [
  {
    value: 'FINANCE',
    label: '금융사 차입'
  },
  {
    value: 'COMPANY',
    label: '상사 차입'
  }
];

const DetailVehicleBottom = (props: any) => {
  const store = props.detailVehicleMgtStore;
  const {status} = props.data;
  const now = new Date();
  const [user, setUser] = useState<any>();
  const [cost, setCost] = useState<any>([]);
  const [isSold, setIsSold] = useState(false);
  const [toast, setToast] = useState('');
  const [okToast, setOkToast] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) setUser(JSON.parse(user));
    if (status === 'SALE_COMPLETED') setIsSold(true);
  }, []);

  useEffect(() => {
    if (store) {
      const temp = store.vehicleFinanceList;
      const list = temp && temp.map((item: any) => ({...item, date: new Date(item.date)}));
      if (list) setCost(list);
    }
  }, [store.vehicleFinanceList]);

  const addCost = () => {
    setCost([
      ...cost,
      {
        company: null,
        date: new Date(now.setHours(0, 0, 0)),
        interestRate: 0,
        loan: 0,
        type: 'FINANCE'
        // interest: ''
      }
    ]);
  };

  const removeCost = (i: number) => {
    setCost(cost.filter((item: any, index: number) => index !== i));
  };

  function InputLable({title}: {title: string}) {
    return (
      <Text size="14px" mb="8px">
        {title}
      </Text>
    );
  }

  const totalCost = getTotalCost(
    {
      sheetMetal: Number(getOnlyNumber(store.sheetMetal) || 0),
      repair: Number(getOnlyNumber(store.repair) || 0),
      inspection: Number(getOnlyNumber(store.inspection) || 0),
      consignment: Number(getOnlyNumber(store.consignment) || 0),
      advertisement: Number(getOnlyNumber(store.advertisement) || 0),
      etc: Number(getOnlyNumber(store.etc) || 0),
      loss: Number(getOnlyNumber(store.loss) || 0)
    },
    Number(getOnlyNumber(store.purchaseOffer) || 0),
    Number(getOnlyNumber(store.purchase) || 0),
    cost
  );

  const onChangeType = (e: any, i: number) => {
    const {value} = e.target;
    if (value === 'COMPANY') {
      const {companyName} = user.dealer;
      setCost(cost.map((item: any, index: number) => (index === i ? {...item, type: value, company: companyName} : item)));
    } else {
      setCost(cost.map((item: any, index: number) => (index === i ? {...item, type: value, company: ''} : item)));
    }
  };

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>, i?: number) => {
    const {name, value} = e.target;
    // // console.info(name, value);
    if (name === 'company') {
      setCost(cost.map((item: any, index: number) => (index === i ? {...item, [name]: value} : item)));
    } else if (name === 'interestRate') {
      // // console.info('interestRate');
      setCost(cost.map((item: any, index: number) => (index === i ? {...item, [name]: getOnlyNumberDot(e)} : item)));
      // console.info('interestRate getOnlyNumberDot', getOnlyNumberDot(e));
    } else {
      setCost(cost.map((item: any, index: number) => (index === i ? {...item, [name]: getOnlyNumber(e)} : item)));
    }
  };

  const onChangeDatePic = (d: any, index: number) => {
    // console.info('d', formattedDate(d));
    setCost(cost.map((item: any, i: number) => (i === index ? {...item, date: d} : item)));
  };

  const getInterest = (startDate: any, loan: number, interestRate: number) => {
    // console.info(tempdate, loan, interestRate);
    const date: any = new Date(startDate);
    const difDay: any = Math.floor(Math.abs(+new Date() - date) / (1000 * 3600 * 24));
    const interestCost = Math.round((((loan * interestRate) / 100) * difDay) / 360);
    return interestCost;
  };

  return (
    <Section>
      <Wrapper h width="100%">
        <Text type="sectionHeading4">매입/매출 정보</Text>
      </Wrapper>
      <Line sectionTitleLine />
      <Text type="sectionSubTitle" mt={35}>
        매입
      </Text>
      <Wrapper width="100%" between padding="0px 20px">
        <Wrapper mt="20px" width="265px">
          <InputLable title="매입제시가" />
          <InputUnit
            disabled={isSold}
            unit="만원"
            height="50px"
            right
            value={store.purchaseOffer ? getCommas(store.purchaseOffer) : ''}
            onChange={(e: any) => {
              store.setPurchaseOffer(getOnlyNumber(e));
            }}
          />
        </Wrapper>
        <Wrapper mt="20px" width="265px">
          <InputLable title="매입비" />
          <InputUnit
            disabled={isSold}
            unit="만원"
            height="50px"
            right
            value={store.purchase ? getCommas(store.purchase) : ''}
            onChange={(e: any) => {
              store.setPurchase(getOnlyNumber(e));
            }}
          />
        </Wrapper>
        <Wrapper mt="20px" width="265px">
          <InputLable title="희망판매가" />
          <InputUnit
            unit="만원"
            height="50px"
            right
            value={store.sale ? getCommas(store.sale) : ''}
            onChange={(e: any) => {
              store.setSale(getOnlyNumber(e));
            }}
          />
        </Wrapper>
      </Wrapper>

      <Wrapper flex alignItems="baseline">
        <Text type="sectionSubTitle" mt="50px">
          원가항목&nbsp;
        </Text>
        <Text mt="50px" size="14px">
          (세금계산서, 현금영수증 발행)
        </Text>
      </Wrapper>
      <Wrapper width="100%" between padding="0px 20px">
        <Wrapper mt="20px" width="265px">
          <InputLable title="판금비" />
          <InputUnit
            disabled={isSold}
            unit="만원"
            height="50px"
            right
            value={store.sheetMetal ? getCommas(store.sheetMetal) : ''}
            onChange={(e: any) => {
              store.setSheetMetal(getOnlyNumber(e));
            }}
          />
        </Wrapper>
        <Wrapper mt="20px" width="265px">
          <InputLable title="수리비" />
          <InputUnit
            disabled={isSold}
            unit="만원"
            height="50px"
            right
            value={store.repair ? getCommas(store.repair) : ''}
            onChange={(e: any) => {
              store.setRepair(getOnlyNumber(e));
            }}
          />
        </Wrapper>
        <Wrapper mt="20px" width="265px">
          <InputLable title="성능점검비" />
          <InputUnit
            disabled={isSold}
            unit="만원"
            height="50px"
            right
            value={store.inspection ? getCommas(store.inspection) : ''}
            onChange={(e: any) => {
              store.setInspection(getOnlyNumber(e));
            }}
          />
        </Wrapper>
      </Wrapper>

      <Wrapper width="100%" between padding="0px 20px" mt="15px">
        <Wrapper mt="20px" width="265px">
          <InputLable title="탁송비" />
          <InputUnit
            disabled={isSold}
            unit="만원"
            height="50px"
            right
            value={store.consignment ? getCommas(store.consignment) : ''}
            onChange={(e: any) => {
              store.setConsignment(getOnlyNumber(e));
            }}
          />
        </Wrapper>
        <Wrapper mt="20px" width="265px">
          <InputLable title="광고비" />
          <InputUnit
            disabled={isSold}
            unit="만원"
            height="50px"
            right
            value={store.advertisement ? getCommas(store.advertisement) : ''}
            onChange={(e: any) => {
              store.setAdvertisement(getOnlyNumber(e));
            }}
          />
        </Wrapper>
        <Wrapper mt="20px" width="265px">
          <InputLable title="기타비용" />
          <InputUnit
            disabled={isSold}
            unit="만원"
            height="50px"
            right
            value={store.etc ? getCommas(store.etc) : ''}
            onChange={(e: any) => {
              store.setEtc(getOnlyNumber(e));
            }}
          />
        </Wrapper>
      </Wrapper>

      <Wrapper flex alignItems="baseline">
        <Text type="sectionSubTitle" mt="50px">
          비원가항목&nbsp;
        </Text>
        <Text mt="50px" size="14px">
          (세금계산서, 현금영수증 미발행)
        </Text>
      </Wrapper>
      <Wrapper width="100%" between padding="0px 20px">
        <Wrapper mt="20px" width="265px">
          <InputLable title="잡손실" />
          <InputUnit
            disabled={isSold}
            unit="만원"
            height="50px"
            right
            value={store.loss ? getCommas(store.loss) : ''}
            onChange={(e: any) => {
              store.setLoss(getOnlyNumber(e));
            }}
            // onKeyUp={(e: any) => {
            //   store.setLoss(allowNumbersOnly(e));
            // }}
          />
        </Wrapper>
      </Wrapper>

      <Wrapper flex h mt="50px">
        <Text type="sectionSubTitle">금융비용&nbsp;</Text>
        {!isSold && (
          <Button width="100px" height="40px" onClick={addCost}>
            추가
          </Button>
        )}
      </Wrapper>
      <Wrapper flex mt="48px">
        {/* <Wrapper>
            <Select width="200px" height="50px" options={opt} placeholder="추가" />
          </Wrapper> */}
        <Wrapper width="100%" padding="0px 20px" column>
          {cost.map((item: any, index: number) => (
            <Wrapper flex height="80px" key={index}>
              <Wrapper style={{flex: 1}} padding="0px 10px">
                <Text mb="10px" size="14px">
                  구분
                </Text>
                <Select disabled={isSold} height="50px" options={opt} value={cost[index].type || ''} onChange={(e: any) => onChangeType(e, index)} />
              </Wrapper>
              <Wrapper style={{flex: 1}} padding="0px 10px">
                <Text mb="10px" size="14px">
                  이름
                </Text>
                <Input
                  disabled={cost[index].type === 'COMPANY' || isSold}
                  height="50px"
                  value={cost[index].type === 'COMPANY' ? user.dealer.companyName : cost[index].company}
                  name="company"
                  onChange={(e: any) => onChangeValue(e, index)}
                />
              </Wrapper>
              <Wrapper style={{flex: 1}} padding="0px 10px">
                <Text mb="10px" size="14px">
                  실행금액
                </Text>
                <InputUnit
                  disabled={isSold}
                  height="50px"
                  unit="만원"
                  right
                  // value={store.loss ? getOnlyNumber(store.loss, true) : ''}
                  value={cost[index].loan ? getCommas(cost[index].loan) : ''}
                  name="loan"
                  onChange={(e: any) => onChangeValue(e, index)}
                />
              </Wrapper>
              <Wrapper style={{flex: 1}} padding="0px 10px">
                <Text mb="10px" size="14px">
                  실행일
                </Text>
                {/* <Input height="50px" width="100%" type="calendar" name="date" date={startDate} setDate={setStartDate} /> */}
                <CalendarWrapper height="50px">
                  {/* <DatePicker value={formattedEndDate(startDate)} selected={startDate} onChange={(date: any) => setStartDate(date)} locale="ko" /> */}
                  <DatePicker
                    disabled={isSold}
                    maxDate={new Date()}
                    value={formattedDate(cost[index].date)}
                    selected={cost[index].date}
                    onChange={(date: any) => onChangeDatePic(date, index)}
                    locale="ko"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                </CalendarWrapper>
              </Wrapper>
              <Wrapper style={{flex: 1}} padding="0px 10px">
                <Text mb="10px" size="14px">
                  금융이자
                </Text>
                <InputUnit
                  disabled={isSold}
                  height="50px"
                  unit="%"
                  maxLength={4}
                  right
                  value={cost[index].interestRate ?? cost[index].interestRate}
                  name="interestRate"
                  onChange={(e: any) => onChangeValue(e, index)}
                />
              </Wrapper>
              <Wrapper style={{flex: 1}} padding="0px 10px">
                <Text mb="10px" size="14px">
                  이자
                </Text>
                {/* <InputUnit height="50px" unit="만원" right value={cost[index].interest || 0} name="interest" onChange={(e: any) => onChangeValue(e, index)} /> */}
                <Input height="50px" disabled value={`${getCommas(getInterest(cost[index].date, Number(getOnlyNumber(cost[index].loan)), cost[index].interestRate))} 만원`} />
              </Wrapper>
              {!isSold && (
                <Wrapper h style={{flex: 0.5}} padding="0px 10px">
                  <Button height="40px" type="white" onClick={() => removeCost(index)}>
                    삭제
                  </Button>
                </Wrapper>
              )}
            </Wrapper>
          ))}
        </Wrapper>
      </Wrapper>

      <Wrapper flex border="1px solid #93969f" mt="50px" width="100%" height="123px">
        <Wrapper width="50%" height="100%" borderRight="1px solid #93969f">
          <Text mt="20px" ml="25px">
            총 비용
          </Text>
          <Wrapper height="44px" mt="10px" justifyContent="flex-end" w alignItems="baseline">
            <Text mr="10px" size="30px" weight="5">
              {getCommas(totalCost)}
            </Text>
            <Text mr="35px" size="16px" color="#6d6e71">
              만원
            </Text>
          </Wrapper>
        </Wrapper>
        <Wrapper width="50%" height="100%">
          <Text mt="20px" ml="25px">
            예상수익
          </Text>
          <Wrapper height="44px" mt="10px" justifyContent="flex-end" w alignItems="baseline">
            <Text mr="10px" size="30px" weight="5" color={theme.color.main}>
              {getCommas(store.sale - totalCost)}
            </Text>
            <Text mr="35px" size="16px" color="#6d6e71">
              만원
            </Text>
          </Wrapper>
        </Wrapper>
      </Wrapper>
      <Wrapper mt="20px" mb="65px" justifyContent="flex-end" w>
        <Button type="white" width="162px" mr="8px">
          삭제하기
        </Button>
        <Button
          width="162px"
          onClick={() => {
            if (cost.length > 0) {
              let sumLoan = 0;
              cost.map((item: any) => (sumLoan += item.loan));
              if (sumLoan > store.purchaseOffer) {
                setToast('실행금액의 합이 매입제시가를 초과 할 수 없습니다.');
                return;
              }
            }

            if (cost) store.setVehicleFinanceList(cost);
            setVehicleDetail(store).then((res) => {
              setOkToast('성공적으로 저장되었습니다.');
            });
          }}
        >
          저장하기
        </Button>
      </Wrapper>
      <Toast toast={toast} setToast={setToast} position="top-center" type="warn" delay={2500} />
      <Toast toast={okToast} setToast={setOkToast} position="top-center" delay={1500} onClose={() => router.back()} />
    </Section>
  );
};

export default inject('detailVehicleMgtStore')(observer(DetailVehicleBottom));
