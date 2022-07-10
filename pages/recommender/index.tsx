import {useCallback, useEffect, useState, ReactElement} from 'react';
import {GetServerSideProps} from 'next';
import useInput from '@hooks/useInput';
import {validateEmail} from '@modules/checkValidity';
import {autoPhoneHypen} from '@modules/replaceStrings';
import invitePartnerByEmailApi from '@api/recommender/invitePartnerByEmailApi';
import getPartnerInvitationHistoryApi from '@api/recommender/getPartnerInvitationHistoryApi';
import {Wrapper, Text, Input} from '@components/atoms';
import {EasyVehicleRegistration} from '@components/organisms';
import {Section} from '@components/molecules';
import Button from '@components/atoms/Button';
import Popup, {PopupType} from '@components/organisms/Popup';
import Table from '@components/organisms/Table';
import ButtonNew from '@components/atoms/ButtonNew';
import theme from 'public/theme';
import useQuery, {IQuery} from '@modules/hooks/useQuery';

const dataOptions = [
  {
    dataKey: 'email',
    dataName: '이메일',
    options: {
      width: '200px'
    }
  },
  {
    dataKey: 'phoneNumber',
    dataName: '전화번호',
    options: {
      width: '200px',
      formatter(val: string) {
        return <Text>{val ? autoPhoneHypen(val) : '-'}</Text>;
      }
    }
  },
  {
    dataKey: 'name',
    dataName: '이름'
  },
  {
    dataKey: 'dealerNumber',
    dataName: '사원증 번호',
    options: {
      width: '100px'
    }
  },
  {
    dataKey: 'loginId',
    dataName: '계정 정보'
  },
  {
    dataKey: 'complexName',
    dataName: '소속 매매단지'
  },
  {
    dataKey: 'companyName',
    dataName: '소속 매매상사'
  },
  {
    dataKey: 'partnerYN',
    dataName: '가입 여부'
  }
];

const queryDefault = {
  pageNo: 0,
  keyword: ''
};

const Recommender = ({pageProps}: {pageProps: any}): ReactElement => {
  const propsQuery = pageProps?.query;
  const [email, onChangeEmail, setEmail] = useInput('');
  const [content, setContent] = useState<PopupType>('');
  const [keyword, onChangeKeyword] = useInput(propsQuery?.keyword || '');
  const [pagesAmount, setPagesAmount] = useState<number>(1);
  const [list, setList] = useState<any>([]);
  const [tableHeight, setTableHeight] = useState<undefined | number>(undefined);

  const invitationQuery: IQuery = {
    response: pageProps?.response,
    value: {keyword},
    api: getPartnerInvitationHistoryApi
  };

  const [res, runInvitationListApi, Pagination] = useQuery(invitationQuery, pagesAmount);

  useEffect(() => {
    const result = res?.getPartnerInvitationHistory;
    setRecommenderList(result);
  }, [res]);

  const setRecommenderList = (res: any) => {
    setList(res?.results);
    const total = res?.totalPages;
    setPagesAmount(total);
    if (total > 1) {
      setTableHeight(667);
    } else {
      setTableHeight(undefined);
    }
  };

  const clickButton = useCallback(() => {
    if (email === '') {
      setContent('이메일을 입력하세요.');
    } else if (!validateEmail(email)) {
      inviteEmailApi();
    }
  }, [email]);

  const inviteEmailApi = useCallback(() => {
    invitePartnerByEmailApi(email).then((res: any) => {
      if (res.invitePartnerByEmail) {
        setContent('초대 이메일을 전송했습니다.');
        setEmail('');
      } else {
        setContent(res.errors[0].message);
      }
    });
  }, [email]);

  const searchClick = useCallback(() => {
    runInvitationListApi();
  }, [keyword]);

  const submitByEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        searchClick();
      }
    },
    [keyword]
  );

  return (
    <>
      <EasyVehicleRegistration />
      <Popup content={content} setContent={setContent} />
      <Section>
        <Text type="sectionHeading4">딜러 등록요청</Text>
        <Wrapper flex padding={'40px 0'}>
          <Wrapper flexNum={1}>
            <Wrapper display={'inline-block'}>
              {/* <Text size={'xs'} color={theme.color.black} textAlign={'left'}>
                이메일 초대
              </Text> */}
              <Wrapper flex mt={'13px'}>
                <Wrapper width={'235px'} mr={'8px'}>
                  <Input placeholder="이메일" value={email} onChange={onChangeEmail} message={validateEmail(email)} />
                </Wrapper>
                <Wrapper width={'92px'}>
                  <Button type="primary" height={'50px'} onClick={clickButton}>
                    초대하기
                  </Button>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </Section>
      <Wrapper backgroundColor={theme.color.white}>
        <Section>
          <Text type="sectionHeading4">딜러 초대 내역</Text>
          <Wrapper h mt={40}>
            <Wrapper width={'235px'}>
              <Input type={'squareInputSearchSmall'} placeholder="이메일, 전화번호" value={keyword} onChange={onChangeKeyword} onKeyPress={(e) => submitByEnter(e)} />
            </Wrapper>
            <ButtonNew children={'검색'} small line ml={'20px'} onClick={() => searchClick()} />
          </Wrapper>
        </Section>
        <Wrapper>
          {list?.length > 0 ? (
            <>
              <Wrapper>
                <Table data={[list, dataOptions]} heightFix={tableHeight} />
              </Wrapper>
              <Wrapper w pt={25} pb={80}>
                <Pagination />
              </Wrapper>
            </>
          ) : (
            <>
              <Text type={'listZero'}>등록된 딜러가 없습니다.</Text>
            </>
          )}
        </Wrapper>
      </Wrapper>
    </>
  );
};

export default Recommender;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const contextQuery = context.query;
  const queryResult = contextQuery.pageNo ? contextQuery : queryDefault;
  const response = await getPartnerInvitationHistoryApi(queryResult, context);
  return response;
};
