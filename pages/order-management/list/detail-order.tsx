import {Txt, Wrapper, Image} from '@components/atoms';
import {Section} from '@components/molecules';
import {ReactElement} from 'react';
import {EasyVehicleRegistration} from '@components/organisms';
import theme from '@public/theme';
import {GetServerSideProps} from 'next';
import getPartnerOrderDetailApi from '@api/order/getPartnerOrderDetailApi';
import {getCommas, getDate} from '@modules/replaceStrings';
import Btn from '@components/atoms/Btn';
import {useRouter} from 'next/router';

interface IRowItem {
  title: string;
  contentTxt?: string;
  first?: boolean;
  children?: any;
  large?: boolean;
  colSpan?: number;
  font?: string;
  color?: string;
  thTextAlign?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent';
  thBackground?: string;
  thBr?: boolean;
  thWidth?: string;
}
function RowItem({title, contentTxt, first, children, large, colSpan, font, color, thTextAlign = 'center', thBackground = '#f9fafa', thBr = true, thWidth = '142px'}: IRowItem) {
  return (
    <>
      <th
        style={{
          width: thWidth,
          background: thBackground,
          borderRight: thBr ? '1px inset #d8d8d8' : '',
          borderLeft: !first ? '1px solid #d8d8d8' : '',
          height: `${large ? '70px' : '46px'}`,
          verticalAlign: 'middle',
          textAlign: thTextAlign,
          fontSize: '13px',
          color: '#666666',
          fontFamily: 'SpoqaHanSansNeo-Regular'
        }}
      >
        {title}
      </th>
      <td
        colSpan={colSpan}
        style={{
          color: color || theme.color[6],
          padding: '0 10px',
          verticalAlign: 'middle',
          fontSize: '13px',
          fontFamily: font || theme.font.regular
        }}
      >
        {!contentTxt ? children : contentTxt}
      </td>
    </>
  );
}

function Row({top, children, bottom}: {top?: boolean; children?: any; bottom?: boolean}) {
  return <tr style={{borderBottom: `${bottom ? '' : '1px inset #d8d8d8'}`, borderTop: `${top ? '1px solid #888888' : ''}`}}>{children}</tr>;
}
function replacePhoneNumber(input: string) {
  const step1 = `${input.substring(0, 5)}*${input.substring(5 + 1)}`;
  const step2 = `${step1.substring(0, 6)}*${step1.substring(6 + 1)}`;
  const step3 = `${step2.substring(0, 10)}*${step2.substring(10 + 1)}`;
  return `${step3.substring(0, 11)}*${step3.substring(11 + 1)}`;
}

const OrderDetail = ({pageProps}: {pageProps: any}): ReactElement => {
  const router = useRouter();
  const data = pageProps?.response?.getPartnerOrderDetail;
  return (
    <>
      <EasyVehicleRegistration />
      <Section padding="30px 36px" border="1px solid #cccccc">
        <Txt type="medium" fontSize="24px" style={{letterSpacing: '-1px'}}>
          ?????? ?????? ??????
        </Txt>
        <Txt mt={15} mb={10} type="medium" fontSize="13px" color={theme.color[3]}>
          ?????? ?????? ??????
        </Txt>
        <table style={{width: '100%', borderTop: 'solid 1px #888888'}}>
          <tbody>
            <Row top>
              <RowItem first title="?????? ??????">
                <Wrapper flex h>
                  <Txt mr={15}>{data?.order?.orderNumber || '-'}</Txt>
                  <Wrapper w h color="#fd3636" width={64} height={29} border="solid 1px #fd3636" borderRadius="14.5px">
                    <Txt type="medium" fontSize="12px">
                      ?????????
                    </Txt>
                  </Wrapper>
                </Wrapper>
              </RowItem>
            </Row>
            <Row>
              <RowItem first title="?????? ??????" contentTxt={data?.order?.orderDate ? getDate(data?.order?.orderDate) : '-'} />
            </Row>
          </tbody>
        </table>
        <Txt mt={25} mb={10} type="medium" fontSize="13px" color={theme.color[3]}>
          ?????? ?????? ??????
        </Txt>
        <table style={{width: '100%', borderTop: 'solid 1px #888888'}}>
          <tbody>
            <Row top>
              <RowItem first title="?????? ??????" contentTxt="-" />
            </Row>
            <Row>
              <RowItem first title="????????????">
                <Txt>
                  {(data?.vehicle?.salePrice && getCommas(data?.vehicle?.salePrice)) || '-'} ??????{' '}
                  <Txt span color="#fd3636">
                    ???????????? ???????????? D-4
                  </Txt>
                </Txt>
              </RowItem>
            </Row>
            <Row>
              <RowItem first title="????????? ??????">
                {data?.order?.usedAmount ? `${getCommas(data?.order?.usedAmount)} ?????? ` : '-'}
                <Txt span color="#fd3636">
                  ????????? ????????????
                </Txt>
              </RowItem>
            </Row>
          </tbody>
        </table>
        <Txt mt={25} mb={10} type="medium" fontSize="13px" color={theme.color[3]}>
          ????????? / ????????? ??????
        </Txt>
        <table style={{width: '100%', borderTop: 'solid 1px #888888'}}>
          <tbody>
            <Row top>
              <RowItem first title="?????????" contentTxt="-" />
            </Row>
            <Row>
              <RowItem first title="?????????" contentTxt="-" />
            </Row>
            <Row>
              <RowItem first title="?????????" contentTxt={data?.order?.recipientName} />
            </Row>
            <Row>
              <RowItem first title="?????????" contentTxt={data?.order?.phoneNumber && replacePhoneNumber(data?.order?.phoneNumber)} />
            </Row>
            <Row>
              <RowItem first title="?????? ??????" contentTxt={`${data?.order?.address || '-'} ${data?.order?.detailAddress || ''}`} />
            </Row>
            <Row>
              <RowItem first title="?????? ??????" contentTxt={data?.order?.memo || '-'} />
            </Row>
            <Row>
              <RowItem first large title="?????????">
                <Txt>
                  {data?.consignment?.driverName || '-'} {data?.consignment?.driverPhoneNumber}
                </Txt>
                <Txt mt={10}>
                  {data?.consignment?.consignmentName || '-'} {data?.consignment?.consignmentPhoneNumber} {data?.consignment?.consignmentAddress}
                </Txt>
              </RowItem>
            </Row>
          </tbody>
        </table>
        <Txt mt={25} mb={10} type="medium" fontSize="13px" color={theme.color[3]}>
          ?????? ?????? ??????
        </Txt>
        <Wrapper flex borderTop="1px solid gray" borderBottom="1px solid gray" height={211}>
          <Image width={120} height={92} mr={30} mt={28} src={'/images/gr-photo-frame-1.svg'} />
          <table width="100%" style={{marginTop: '13px', height: '184px'}}>
            <colgroup>
              <col width="75px" />
              <col width="172px" />
              <col width="75px" />
              <col width="calc(100% - 382px)" />
            </colgroup>
            <tbody>
              <Row>
                <RowItem first thBr={false} thWidth="75px" thBackground="white" thTextAlign="left" title="????????????">
                  <Txt type="bold">{data?.vehicle?.number || '-'}</Txt>
                </RowItem>
              </Row>
              <Row>
                <RowItem first thBr={false} thWidth="75px" thBackground="white" thTextAlign="left" title="?????????" contentTxt={data?.vehicle?.manufacturer || '-'} />
                <RowItem
                  first
                  thBr={false}
                  thWidth="75px"
                  thBackground="white"
                  thTextAlign="left"
                  title="?????????"
                  contentTxt={data?.vehicle?.createdDate ? getDate(data?.vehicle?.createdDate) : '-'}
                />
              </Row>
              <Row>
                <RowItem first thBr={false} thWidth="75px" thBackground="white" thTextAlign="left" title="??????" contentTxt={data?.vehicle?.modelYear || '-'} />
                <RowItem first thBr={false} thWidth="75px" thBackground="white" thTextAlign="left" title="?????????" contentTxt={data?.vehicle?.modelTrim || '-'} />
              </Row>
              <Row bottom>
                <RowItem first thBr={false} thWidth="75px" thBackground="white" thTextAlign="left" title="?????????" contentTxt={data?.vehicle?.modelName || '-'} />
                <RowItem
                  first
                  thBr={false}
                  thWidth="75px"
                  thBackground="white"
                  thTextAlign="left"
                  title="????????????"
                  contentTxt={data?.vehicle?.mileage ? `${getCommas(data?.vehicle?.mileage)}km` : '-'}
                />
              </Row>
            </tbody>
          </table>
        </Wrapper>
        <Wrapper mt={40} flex justifyContent="right" width="100%">
          <Btn type="squareButtonBlack" onClick={() => router.back()}>
            ??????
          </Btn>
        </Wrapper>
      </Section>
    </>
  );
};

export default OrderDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context?.query;
  const id = query?.id;
  const response = await getPartnerOrderDetailApi(Number(id), context);
  return response;
};
