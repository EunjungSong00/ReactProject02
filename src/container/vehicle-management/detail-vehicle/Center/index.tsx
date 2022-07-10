import {Line, Wrapper, Text, Image, Checkbox} from '@components/atoms';
import {Section} from '@components/molecules';
import {Dialog} from '@components/organisms';
import styled from '@emotion/styled';
import {useEffect, useState} from 'react';
import {inject, observer} from 'mobx-react';
import AccidentHistory from './AccidentHistory';
import DetailedOptions from './DetailedOptions';
import Performance from './Performance';
import React from 'react';

const Center = (props: any) => {
  const {detailVehicleMgtStore} = props;
  const store = detailVehicleMgtStore;
  const {data} = props;
  const [openPerfor, setOpenPerfor] = useState(false);
  const [openOption, setOpenOption] = useState(false);
  const [openAccident, setOpenAccident] = useState(false);
  const [vehicle, setVehicle] = useState();

  // React.useEffect(() => {
  //   if (store?.id) {
  //     getVehicleApi(store.id).then((res) => {
  //       setVehicle(res?.getVehicle);
  //       // console.info(res?.getVehicle);
  //     });
  //   }
  // }, [store]);

  return (
    <Section padding="0px" height="109px">
      <Wrapper flex height="100%">
        <FlexWrapper onClick={() => setOpenPerfor(true)}>
          <Wrapper height="24px" flex h>
            <Image mr="8px" width="20px" height="20px" src="/images/icon-library-books.svg" />
            <Text size="16px" width="124px" mr="120px">
              성능점검표 보기
            </Text>
            <Image width="7px" height="12px" src="/images/icon-more@2x.png" />
          </Wrapper>
          <Wrapper mt="10px" ml="30px" flex h>
            <Text size="14px" color="#93969f">
              교환 :&nbsp;
            </Text>
            <Text size="14px">0회</Text>
            <Line vertical height="14px" width="2px" ml="10px" mr="10px" />
            <Text size="14px" color="#93969f">
              판금 :&nbsp;
            </Text>
            <Text size="14px">0회</Text>
            <Line vertical height="14px" width="2px" ml="10px" mr="10px" />
            <Text size="14px" color="#93969f">
              부식 :&nbsp;
            </Text>
            <Text size="14px">0회</Text>
          </Wrapper>
        </FlexWrapper>
        <Line vertical width="2px" />
        <FlexWrapper
          onClick={() => {
            // console.info('store.insuranceHistoryList', store.insuranceHistoryList);
            if (store.insuranceHistoryList.length) {
              setOpenAccident(true);
            } else {
              alert('사고이력정보가 없습니다');
            }
          }}
        >
          <Wrapper height="24px" flex h>
            <Image mr="8px" width="25px" height="25px" src="/images/icon-directions-car.svg" />
            <Text size="16px" width="124px" mr="120px">
              사고이력정보 보기
            </Text>
            <Image width="7px" height="12px" src="/images/icon-more@2x.png" />
          </Wrapper>
          <Wrapper mt="10px" ml="30px" flex h>
            <Text size="14px" color="#93969f">
              내차 피해 :&nbsp;
            </Text>
            <Text size="14px">0회</Text>
            <Line vertical height="14px" width="2px" ml="10px" mr="10px" />
            <Text size="14px" color="#93969f">
              타차 피해 :&nbsp;
            </Text>
            <Text size="14px">0회</Text>
          </Wrapper>
        </FlexWrapper>
        <Line vertical width="2px" />
        {/* <FlexWrapper> */}
        <FlexWrapper onClick={() => setOpenOption(true)}>
          <Wrapper height="24px" flex h>
            <Image mr="8px" width="22px" height="22px" src="/images/icon-search-19-px.svg" />
            <Text size="16px" width="124px" mr="120px">
              상세옵션 보기
            </Text>
            <Image width="7px" height="12px" src="/images/icon-more@2x.png" />
          </Wrapper>
        </FlexWrapper>
        {openPerfor && (
          <Dialog width={1000} height={1000} nonButton title="성능점검기록부" dialogOpen={openPerfor} setDialogClose={() => setOpenPerfor(false)}>
            <Performance store={store} vehicle={vehicle} data={data} />
          </Dialog>
        )}
        {openAccident && (
          <Dialog width={1000} height={1000} nonButton title="사고이력정보" dialogOpen={openAccident} setDialogClose={() => setOpenAccident(false)}>
            <AccidentHistory data={data} />
          </Dialog>
        )}
        {openOption && (
          <Dialog width={700} height={1000} nonButton title="상세옵션" dialogOpen={openOption} setDialogClose={() => setOpenOption(false)}>
            {/* <AccidentHistory />
             */}
            <DetailedOptions store={store} data={data} />
          </Dialog>
        )}
      </Wrapper>
    </Section>
  );
};

// export default Center;

export default inject('detailVehicleMgtStore')(observer(Center));

const FlexWrapper = styled(Wrapper)`
  flex: 1;
  height: 100%;
  cursor: pointer;
  &:focus-within {
    border: 1px solid red;
  }
  padding: 25px 0 25px 30px;
`;
