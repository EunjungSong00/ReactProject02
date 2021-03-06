import getJatoDetailApi from '@api/vehicle/getJatoDetailApi';
import getTrimListApi from '@api/vehicle/getTrimListApi';
import {Wrapper, Text, Button, Input, Line, Select} from '@components/atoms';
import InputUnit from '@components/atoms/InputUnit';
import Section from '@components/molecules/Section';
import {Dialog, EasyVehicleRegistration} from '@components/organisms';
import styled from '@emotion/styled';
import {getCommas, getOnlyNumber, getVehicleStatus} from '@modules/replaceStrings';
import {appearanceTypeOpt, statusOpt} from '@public/selectArr';
import theme from '@public/theme';
import Cookies from 'js-cookie';
import {observer, inject} from 'mobx-react';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

interface IDetailInput {
  title: string;
  unit?: string;
  calendar?: boolean;
  appearance?: boolean;
  value?: string;
  onChange?: any;
  children?: any;
}

export const TitleSection = styled(Section)`
  margin-bottom: 0;
  border-bottom: 1px solid ${theme.color.lineGray};
`;

const DetailVehicleManagement = (props: any) => {
  const {detailVehicleMgtStore} = props;
  const {data} = props;
  const {status} = props.data;
  const store = detailVehicleMgtStore;
  const router = useRouter();
  const {id} = router.query;
  const [openUpdateTrim, setOpenUpdateTrim] = useState(false);
  const [trimList, setTrimList] = useState([]);
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  // const [state, setState] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [isSold, setIsSold] = useState(false);
  const [dealerName, setDealerName] = useState();
  useEffect(() => {
    if (status === 'SALE_COMPLETED') setIsSold(true);
    const user: any = Cookies.get('user');
    user && setDealerName(JSON.parse(user).identityAuthentication.name);
  }, []);
  // const imgref = useRef<HTMLInputElement>(null);
  // const [imgurl, setImgurl] = useState<any>();

  function DetailText({title, content}: {title: string; content: string}) {
    return (
      <Wrapper flex h>
        <Text width="50px" lineHeight="28px" mr="20px" letterSpacing="0.32px" size="13px" color={theme.color.lightgray}>
          {title}
        </Text>
        <Wrapper ellipsis style={{fontSize: '13px', textAline: 'center'}} maxWidth="140px">
          {content}
        </Wrapper>
      </Wrapper>
    );
  }

  function DetailInputLabel({title}: IDetailInput) {
    return (
      <Text width="50px" lineHeight="28px" mr="20px" letterSpacing="0.32px" size="13px" color={theme.color.lightgray}>
        {title}
      </Text>
    );
  }

  useEffect(() => {
    store.setPurchaseDate(startDate);
  }, [startDate]);
  useEffect(() => {
    store.setSaleDate(endDate);
  }, [endDate]);

  const onClickTrimSelect = async () => {
    // setLoading(true);
    // await getTrimListApi(id).then((res) => {
    //   if (res.length) {
    //     setTrimList(res);
    //     setOpenUpdateTrim(true);
    //   } else {
    //     alert('?????????????????? ???????????? ????????????.');
    //   }
    // });
    // setLoading(false);
  };

  const onClickTrimItem = async (item: any) => {
    // await getJatoDetailApi(item.jatoVehicleId, store);
    store.setVehicleId(item.jatoVehicleId);
    setOpenUpdateTrim(false);
  };

  // const onChangeImg = (event: any) => {
  //   event.preventDefault();
  //   let reader = new FileReader();
  //   let file = event.target.files[0];
  //   reader.onloadend = () => {
  //     setImgurl(reader.result);
  //   };
  //   if (file) reader.readAsDataURL(file);
  // };
  return (
    <>
      <EasyVehicleRegistration />
      {/* * ?????? ?????? ?????? * */}

      {/* * ?????? ?????? * */}
      <Section>
        <Wrapper h width="100%">
          <Wrapper h width="50%">
            <Text type="sectionHeading4"> ?????? ?????? ?????? </Text>
            <Line vertical height="13px" width="1px" margin="0 10px" />
            {/* TODO : ????????? ?????? */}
            <Text size="13px" mr="10px">
              ????????? ?????? ????????? ????????? ?????????????
            </Text>
            <Text hover size="13px" color={theme.color.main} style={{textDecoration: 'underline'}}>
              ??????
            </Text>
          </Wrapper>
          <Wrapper width="50%" justifyContent="flex-end" flex>
            {/* <Select
              disabled
              width="140px"
              height="32px"
              options={statusOpt}
              value={store.status ? store.status : 'REGISTER'}
              onChange={(e: any) => store.setStatus(e.target.value)}
            /> */}
            <Text weight="5" size="14px">
              {store.status ? getVehicleStatus(store.status) : '-'}
            </Text>
          </Wrapper>
        </Wrapper>
        <Line sectionTitleLine />
        <Text mt={30} type="sectionDetailTitle" lineHeight="44px" minHeight="44px">
          {data?.modelYear} {data?.manufacturer} {data?.modelDetail}
        </Text>
        <Wrapper h mt="7px">
          <Text type="sectionDetailTitle" color={theme.color.main} mr="16px" lineHeight="44px">
            {store?.modelTrim}
          </Text>
          {!isSold && (
            <Button width="90px" height="36px" onClick={onClickTrimSelect} loading={loading}>
              ????????????
            </Button>
          )}
        </Wrapper>
        <Text size="18px" mt="15px">
          ????????? : {getCommas(store?.retailPrice)} ??????
        </Text>
        <Wrapper width="100%" flex mt={11}>
          {/* * ?????? ??? ?????? * */}
          <Wrapper width="60%">
            <Wrapper mt="54px" flex>
              <Wrapper width="230px">
                <DetailText title="????????????" content={dealerName || '-'} />
                <DetailText title="?????????" content={store?.transmissionType} />
                <DetailText title="????????????" content={`${store?.maximumPowerHp} hp/ps`} />
                <DetailText title="?????????" content={`${getCommas(store?.cc)} cc`} />

                <Wrapper flex column mt="20px">
                  {/* <DetailInput title="??????" appearance /> */}
                  <Wrapper h flex mb="8px">
                    <DetailInputLabel title="??????" />
                    <Wrapper width="130px">
                      <Select
                        disabled={isSold}
                        width="130px"
                        height="36px"
                        options={appearanceTypeOpt}
                        value={store.appearanceType ? store.appearanceType : ''}
                        onChange={(e: any) => store.setAppearanceType(e.target.value)}
                      />
                    </Wrapper>
                  </Wrapper>
                  <Wrapper h flex mb="8px">
                    <DetailInputLabel title="?????????" />
                    <Wrapper width="130px">
                      <Input
                        disabled={isSold}
                        width="130px"
                        type="calendar"
                        date={(store.purchaseDate && new Date(store.purchaseDate)) || undefined}
                        placeholder="????????? ??????"
                        setDate={setStartDate}
                      />
                    </Wrapper>
                  </Wrapper>
                  <Wrapper h flex>
                    <DetailInputLabel title="????????????" />
                    <Wrapper width="130px">
                      <Input disabled width="130px" type="squareInputSmall" value={store.number || ''} onChange={(e: any) => store.setNumber(e.target.value)} />
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
              <Wrapper width="230px">
                <DetailText title="????????????" content={store?.vehicleIdentityNumber || '-'} />
                <DetailText title="??????" content={store?.fuelTypeA || '-'} />
                <DetailText title="??????" content={`${store?.fuelConsumption || '-'} km/L`} />
                <DetailText title="????????????" content={store?.drivenWheels || '-'} />

                <Wrapper flex column mt="20px">
                  <Wrapper h flex mb="8px">
                    <DetailInputLabel title="????????????" />
                    <Wrapper width="130px">
                      <InputUnit
                        disabled={isSold}
                        maxLength={7}
                        unit={'km'}
                        height="36px"
                        value={getCommas(store?.mileage) || ''}
                        onChange={(e: any) => store.setMileage(getOnlyNumber(e))}
                      />
                    </Wrapper>
                  </Wrapper>
                  <Wrapper h flex mb="8px">
                    <DetailInputLabel title="?????????" />
                    <Wrapper width="130px">
                      <Input disabled={isSold} width="130px" type="calendar" date={(store.saleDate && new Date(store.saleDate)) || new Date()} setDate={setEndDate} />
                    </Wrapper>
                  </Wrapper>
                  <Wrapper h flex>
                    <DetailInputLabel title="????????????" />
                    <Wrapper width="130px">
                      <Input
                        disabled={isSold}
                        width="130px"
                        type="squareInputSmall"
                        value={store.parkingLocation || ''}
                        onChange={(e: any) => store.setParkingLocation(e.target.value)}
                      />
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Wrapper>

          {/* * ????????? ?????? * */}
          <Wrapper width="40%" column alignItems="flex-end">
            {/* {imgurl ? (
                <img className="profile_preview" src={imgurl} style={{width: 315, height: 280, border: '1px solid lightgray', borderRadius: '4px'}}></img>
              ) : (
                <Wrapper width={315} height={280} bg="white" borderRadius={4} border="1px solid lightgray"></Wrapper>
              )}
              <Button
                onClick={(event: any) => {
                  event.preventDefault();
                  imgref.current?.click();
                }}
                width="91px"
                height="36px"
                mt={15}
              >
                ?????? ??????
              </Button>
              <input ref={imgref} onChange={onChangeImg} type="file" accept="image/*" style={{display: 'none'}} /> */}
          </Wrapper>
        </Wrapper>
      </Section>

      {openUpdateTrim && (
        <Dialog width={400} height={400} nonButton title="????????????" dialogOpen={openUpdateTrim} setDialogClose={() => setOpenUpdateTrim(false)}>
          <Wrapper column mt="20px">
            {trimList.map((item: any, index: number) => (
              <Button key={index} type="white" onClick={() => onClickTrimItem(item)} mb="10px">
                {item.modelTrim}
              </Button>
            ))}
          </Wrapper>
        </Dialog>
      )}
    </>
  );
};

export default inject('detailVehicleMgtStore')(observer(DetailVehicleManagement));
