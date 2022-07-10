import {RegisteredManagement, QuickRegist} from '@container/vehicle-management/index';
import Banner from '@components/organisms/Banner';
import {Wrapper, Text} from '@components/atoms';
import styled from '@emotion/styled';
import {GetServerSideProps} from 'next';
import {ReactElement} from 'react';
import getVehicleStatusListApi from '@api/vehicle/getVehicleStatusListApi';

const RegisteredVehicleManagement = ({pageProps}: {pageProps: any}): ReactElement => {
  const Ad = () => (
    <BannerWrapper width="100%" height="61px" h>
      <Text ml="30px" size="22px">
        카머스 이벤트
      </Text>
      <Text ml="10px" size="22px" color="#0075e5">
        지인 초대해서 혜택받자~
      </Text>
    </BannerWrapper>
  );
  return (
    <>
      <Banner>
        <Ad />
      </Banner>
      <QuickRegist />
      <RegisteredManagement pageProps={pageProps} />
    </>
  );
};

export default RegisteredVehicleManagement;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {query} = context;
  const response = getVehicleStatusListApi(query, context);
  return response;
};

const BannerWrapper = styled(Wrapper)`
  background: url(/images/icon-banner@2x.png) no-repeat;
  background-size: 139px;
  background-position: 90% 0;
  background-color: #d2efff;
`;
