import {EasyVehicleRegistration} from '@components/organisms';
import {Inventory, DailyCost, DailyPnl} from '@container/vehicle-management';
import {useState, ReactElement} from 'react';
import {Wrapper} from '@components/atoms';
import Popup, {PopupType} from '@components/organisms/Popup';
import {useRouter} from 'next/router';
import {GetServerSideProps} from 'next';
import {graphQLClientMultipleRequest} from '@modules/replaceStrings';
import getVehicleDashBoardInventoryApi from '@api/home/getVehicleDashBoardInventoryApi';
import getVehicleDashBoardLossApi from '@api/home/getVehicleDashBoardLossApi';
import getVehicleDashBoardSaleApi from '@api/home/getVehicleDashBoardSaleApi';

const Index = ({pageProps}: {pageProps: any}): ReactElement => {
  const user = JSON.parse(pageProps.cookies?.carPartnerUserInfo || 'false');
  const isRegularMember = user?.level === 'REGULAR';
  const [popupContent, setPopupContent] = useState<PopupType>(undefined);
  const router = useRouter();
  return (
    <>
      <Wrapper
        onClick={() => {
          if (!isRegularMember) {
            setPopupContent('카머스의 기능을 사용하시려면 추가 인증이 필요합니다. 추가 인증을 진행하시겠습니까?');
          }
        }}
      >
        <Wrapper column style={{pointerEvents: isRegularMember ? 'all' : 'none'}}>
          <EasyVehicleRegistration />
          <Inventory response={pageProps.response} />
          <DailyPnl response={pageProps.response} query={pageProps.query} />
          <DailyCost response={pageProps.response} query={pageProps.query} />
        </Wrapper>
      </Wrapper>
      <Popup title="추가인증이 필요합니다" content={popupContent} setContent={setPopupContent} okText="인증" cancelText="닫기" onClickPopupEnter={() => router.push('/auth')} />
    </>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {query} = context;
  const getGql = true;
  const response = graphQLClientMultipleRequest(
    [
      getVehicleDashBoardInventoryApi({getGql}),
      getVehicleDashBoardLossApi(Number(query.lossTerm) || 0, {getGql}),
      getVehicleDashBoardSaleApi(Number(query.saleTerm) || 0, {getGql})
    ],
    context
  );

  return response;
};
