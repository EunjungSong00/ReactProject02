import React, {memo, useState, useEffect, ReactElement, useRef, Fragment, useCallback} from 'react';
import styled from '@emotion/styled';
import {Image, Text, Wrapper} from '@components/atoms';
import useInput from '@modules/hooks/useInput';
import getComplexVehicleList from '@api/vehicle/getComplexVehicleListApi';
import {getCommas} from '@modules/replaceStrings';
import {useRouter} from 'next/router';
import {parseCookies} from 'nookies';
import theme from '../../../public/theme';
import Popup, {PopupType} from './Popup';

const RightSide = (): ReactElement => {
  const cookies = parseCookies();
  const user = JSON.parse(cookies?.carPartnerUserInfo || 'false');
  const isRegularMember = user?.level === 'REGULAR';
  const [arrowToggleKey, setArrowToggleKey] = useState<number>(-1);
  const [lastSearch, setLastSearch] = useState<string>('');
  const [search, onChangeSearch, setSearch] = useInput<string>('');
  const [sort, setSort] = useState<'SALE' | 'MILEAGE' | 'MODEL_NAME'>('SALE');
  const [direction, setDirection] = useState<'ASC' | 'DESC'>('ASC');
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState<number>(0);
  const [popupContent, setPopupContent] = useState<PopupType>(undefined);
  const router = useRouter();
  const size = 10; // 10
  const rowsRef = useRef<HTMLDivElement>(null);

  const submitByEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && setPage(0);
    e.key === 'Enter' && searchVehicleList(0, size, true);
  };

  const searchVehicleList = async (pageNo: number, pageSize: number, newSearch?: boolean) => {
    newSearch && setLastSearch(search);
    const complexVehicleList = await getComplexVehicleList({pageNo, pageSize, modelName: newSearch ? search : lastSearch, sort, sortDirection: direction});
    // console.info('complexVehicleList', complexVehicleList);
    complexVehicleList?.getComplexVehicleList &&
      setData(
        complexVehicleList && Array.isArray(complexVehicleList.getComplexVehicleList) && complexVehicleList.getComplexVehicleList.map((el: any, index: number) => ({...el, index}))
      );
  };

  const getMoreList = async (pageNo: number) => {
    const complexVehicleList = await getComplexVehicleList({pageNo, pageSize: page, modelName: lastSearch, sort, sortDirection: direction});
    const dataTemp = data;
    const newListTemp =
      complexVehicleList &&
      Array.isArray(complexVehicleList.getComplexVehicleList) &&
      complexVehicleList.getComplexVehicleList.map((el: any, index: number) => ({...el, index: index + size * page}));
    dataTemp && newListTemp && setData(dataTemp.concat(newListTemp));
    scrollToBottom();
  };

  const scrollToBottom = useCallback(() => {
    if (rowsRef.current) {
      rowsRef.current.scrollTop = rowsRef.current.scrollHeight;
    }
  }, [rowsRef]);

  useEffect(() => {
    // searchVehicleList(0, size * (page + 1)); // 버그발생
    searchVehicleList(0, size);
    setPage(0);
  }, [sort, direction]);

  useEffect(() => {
    page && getMoreList(page);
  }, [page]);

  const Columns = useCallback(() => {
    const onClickColumn = useCallback(
      (arrowToggleKey: number, _sort: 'SALE' | 'MILEAGE' | 'MODEL_NAME') => {
        if (data && data[0] !== undefined) {
          setArrowToggleKey(arrowToggleKey);
          setSort(_sort);
          setDirection(sort === _sort && direction === 'ASC' ? 'DESC' : 'ASC');
        } else {
          setPopupContent('카머스의 기능을 사용하시려면 추가 인증이 필요합니다. 추가 인증을 진행하시겠습니까?');
        }
      },
      [data, sort, direction]
    );
    return (
      <_Columns h>
        <Wrapper className="column sort" onClick={() => onClickColumn(1, 'MODEL_NAME')} style={{width: '50%'}}>
          {arrowColumn('모델명', 1, arrowToggleKey)}
        </Wrapper>
        <Wrapper className="column sort" onClick={() => onClickColumn(2, 'MILEAGE')} style={{width: '25%'}}>
          {arrowColumn('주행거리', 2, arrowToggleKey)}
        </Wrapper>
        <Wrapper className="column sort" onClick={() => onClickColumn(3, 'SALE')} style={{width: '25%'}}>
          {arrowColumn('판매가', 3, arrowToggleKey)}
        </Wrapper>
      </_Columns>
    );
  }, [sort, direction, arrowToggleKey, data]);

  const Trim = useCallback(
    ({value}: {value: string}) => (
      <_Trim title={value}>
        <Text size="13px" pb="1px" color={theme.color.darkgray} style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
          {value}
        </Text>
      </_Trim>
    ),
    []
  );

  const checkNull = (val: string | number): string | number => val ?? '-';

  const Rows = useCallback(() => {
    const parsedData = data && data?.map((vehicle: any) => JSON.stringify(vehicle));
    const noDup: any = parsedData && new Set(parsedData);
    const noDupData = noDup && [...noDup].map((stringVehicle) => JSON.parse(stringVehicle));
    return (
      noDupData &&
      noDupData.map((_data: any, index: number) => {
        const [active, setActive] = useState(false);
        return (
          <Fragment key={index}>
            <tr className="click" onClick={() => setActive((ac) => !ac)}>
              <td style={{width: '50%', padding: '0 20px'}}>
                <Wrapper column>
                  <Text size="15px" mb="10px" color={theme.color.black}>
                    {checkNull(_data.modelYear)}년{` ${checkNull(_data.modelName)}`}
                  </Text>
                  <Text size="15px" color={theme.color.lightgray}>
                    {checkNull(_data.manufacturer)}
                  </Text>
                </Wrapper>
              </td>
              <td className="td-right-align" style={{textAlign: 'right', width: '25%'}}>
                <Text size="15px" color={theme.color.black}>
                  {`${getCommas(checkNull(_data.mileage))} km`}
                </Text>
              </td>
              <td className="td-right-align" style={{textAlign: 'right', width: '25%'}}>
                <Text size="15px" color={theme.color.black}>
                  {`${getCommas(checkNull(_data.salePrice))}만원`}
                </Text>
              </td>
            </tr>
            <tr className="tr-drawer">
              <td colSpan={3}>
                <DrawerWrapper>
                  <Wrapper className={`drawer ${active ? 'active' : ''}`}>
                    <Wrapper h padding="5px 20px 20px">
                      <Image mr="20px" src="/images/img-none.svg" />
                      <Wrapper column height="fit-content">
                        <Wrapper mb="15px" column>
                          <Wrapper flex mb="5px" height="fit-content">
                            <Text weight="4" mr="5px" size="15px" color={theme.color.black}>
                              {checkNull(_data.number)}
                            </Text>
                            <Text>{`(${checkNull(_data.dealerName)})`}</Text>
                          </Wrapper>
                          <Text size="15px" color={theme.color.black}>
                            {checkNull(_data.companyName)}
                          </Text>
                        </Wrapper>
                        <Wrapper flex>
                          {_data.fuel && (
                            <Wrapper mr="5px">
                              <Trim value={checkNull(_data.fuel).toString()} />
                            </Wrapper>
                          )}
                          {_data.displacement && (
                            <Wrapper mr="5px">
                              <Trim value={`${getCommas(checkNull(_data.displacement))}cc`} />
                            </Wrapper>
                          )}
                          {_data.modelTrim && (
                            <Wrapper mr="5px">
                              <Trim value={checkNull(_data.modelTrim).toString()} />
                            </Wrapper>
                          )}
                        </Wrapper>
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>
                </DrawerWrapper>
              </td>
            </tr>
          </Fragment>
        );
      })
    );
  }, [data]);

  function Arrow({toggle, direction}: {toggle: boolean; direction: 'ASC' | 'DESC'}) {
    return (
      <>
        {toggle && direction === 'ASC' ? (
          <Wrapper w column>
            <Image mb="3px" src="/images/ic-arrow-drop-up-on.svg" />
            <Image src="/images/ic-arrow-drop-down-off.svg" />
          </Wrapper>
        ) : toggle && direction === 'DESC' ? (
          <Wrapper w column>
            <Image mb="3px" src="/images/ic-arrow-drop-up-off.svg" />
            <Image src="/images/ic-arrow-drop-down-on.svg" />
          </Wrapper>
        ) : (
          <Wrapper w column>
            <Image mb="3px" src="/images/ic-arrow-drop-up-off.svg" />
            <Image src="/images/ic-arrow-drop-down-off.svg" />
          </Wrapper>
        )}
      </>
    );
  }

  function arrowColumn(column: string, key: number, arrowToggleKey: number) {
    return (
      <Wrapper h w>
        <Wrapper h mr="6px">
          {column}
        </Wrapper>
        <Wrapper>
          <Arrow toggle={arrowToggleKey !== -1 && key === arrowToggleKey} direction={direction} />
        </Wrapper>
      </Wrapper>
    );
  }

  const MoreBtn = useCallback(() => {
    const [moreBtnText, setMoreBtnText] = useState<string>('더보기');
    useEffect(() => {
      if (!isRegularMember) {
        setMoreBtnText('정회원 인증을 해주세요.');
      }
    }, [isRegularMember]);

    useEffect(() => {
      if (!data) {
        setMoreBtnText('조회결과가 없습니다.');
      } else if (data.length % size !== 0 || data.length < (page + 1) * size) {
        setMoreBtnText('모든데이터를 불러왔습니다');
      } else if (data.length % size === 0) {
        setMoreBtnText('더보기');
      }
    }, [data, page]);

    return (
      <tr>
        <td style={{padding: 0, height: '60px'}} colSpan={3}>
          <_MoreBtn
            onClick={() =>
              data.length % size === 0 && data.length === (page + 1) * size
                ? setPage(page + 1)
                : !isRegularMember
                ? setPopupContent('카머스의 기능을 사용하시려면 추가 인증이 필요합니다. 추가 인증을 진행하시겠습니까?')
                : null
            }
            style={{cursor: data.length === 0 || !data || data.length % size !== 0 || data.length < (page + 1) * size ? 'not-allowed' : 'pointer'}}
          >
            <Text weight="2" size="15px" color={theme.color.darkgray}>
              {moreBtnText}
            </Text>
          </_MoreBtn>
        </td>
      </tr>
    );
  }, [isRegularMember, page, size, data]);

  const HelperTable = useCallback(
    () => (
      <_Table className="table-wrapper" mt="30px">
        <Columns />
        <Wrapper overflowY ref={rowsRef} style={{maxHeight: 'calc(100vh - 269px)', overflowX: 'hidden'}}>
          <table>
            <tbody>
              <Rows />
              <MoreBtn />
            </tbody>
          </table>
        </Wrapper>
      </_Table>
    ),
    [data]
  );

  // const HelperTable = memo(() => (
  //   <_Table className="table-wrapper" mt="30px">
  //     <Columns />
  //     <Wrapper overflowY ref={rowsRef} style={{maxHeight: 'calc(100vh - 269px)', overflowX: 'hidden'}}>
  //       <table>
  //         <tbody>
  //           <Rows ref={rowsRef} />
  //           <MoreBtn />
  //         </tbody>
  //       </table>
  //     </Wrapper>
  //   </_Table>
  // ));

  return (
    <RightContent overflowY>
      <Wrapper padding="30px 20px">
        <Wrapper h mb={18}>
          <Text size="18px">
            <Icon />
            단지 매물 검색
            <AreaText style={{paddingBottom: 9}}>{user?.dealer?.complexName || '-'}</AreaText>
          </Text>
          <button
            onClick={() => searchVehicleList(0, size)}
            title="데이터 새로고침"
            style={{
              marginLeft: 'auto',
              marginRight: 0,
              width: 30,
              height: 30,
              background: 'none',
              cursor: 'pointer',
              padding: 0,
              border: '2px solid white',
              borderRadius: 5
            }}
          >
            <Image src="/images/refresh.png" width={20} />
          </button>
        </Wrapper>
        {/* Search 컴포넌트로 뺄 경우 useInput 버그 발생 */}
        <SearchWrapper h>
          <SearchInput
            placeholder="예) 그랜저"
            maxLength={60}
            value={search}
            onChange={onChangeSearch}
            onKeyPress={(e) => submitByEnter(e)}
            onClick={() => isRegularMember || setPopupContent('카머스의 기능을 사용하시려면 추가 인증이 필요합니다. 추가 인증을 진행하시겠습니까?')}
          />
          <button className="delete-button" style={search ? undefined : {pointerEvents: 'none'}} onClick={() => (search ? setSearch('') : null)}>
            {search && <img src="/images/ic-close-14-px.svg" />}
          </button>
          <button
            className="search-button"
            onClick={() => {
              isRegularMember ? searchVehicleList(0, size, true) : setPopupContent('카머스의 기능을 사용하시려면 추가 인증이 필요합니다. 추가 인증을 진행하시겠습니까?');
            }}
          >
            <img src="/images/icon-search-26-px.png" />
          </button>
        </SearchWrapper>
        <HelperTable />
      </Wrapper>
      <Popup title="추가인증이 필요합니다" content={popupContent} setContent={setPopupContent} okText="인증" cancelText="닫기" onClickPopupEnter={() => router.push('/auth')} />
    </RightContent>
  );
};

export default memo(RightSide);

const SearchWrapper = styled(Wrapper)`
  width: 100%;
  border: 2px solid ${theme.color.lightgray};
  height: 56px;
  border-radius: 28px;
  img {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
  button {
    border: none;
    background: none;
    cursor: pointer;
    &:hover {
      background: #f5f4f4;
    }
  }
  .search-button {
    width: 66px;
    height: 100%;
    border-radius: 8px 28px 28px 8px;
  }
  .delete-button {
    height: 25px;
    width: 25px;
    border-radius: 7px;
    padding: 2px;
    img {
      margin-top: 2px;
      margin-right: 1px;
    }
  }
`;

const SearchInput = styled.input`
  height: 100%;
  width: calc(100% - 80px);
  border-radius: 28px 0 0 28px;
  border: none;
  padding: 0 25px;
  font-size: ${theme.fontSize.sm};
  font-family: ${theme.font[3]};
  color: ${theme.color.black};
  &::placeholder {
    color: ${theme.color.lightgray};
    font-family: ${theme.font[3]};
    font-size: ${theme.fontSize.sm};
  }
  &:focus {
    outline: none;
  }
`;

const _Trim = styled.div`
  background: #f9f9f9;
  border: 1px solid ${theme.color.borderColor};
  padding: 3px 6px;
  height: 25px;
  width: fit-content;
  align-items: center;
  display: flex;
  max-width: 190px;
`;

const _MoreBtn = styled('button')<any>`
  width: 100%;
  height: 60px;
  background: #f5f6f9;
  border: none;
  border-top: 1px solid ${theme.color.lineGray};
  &:hover {
    background: #f0f2f5;
  }
`;

const _Columns = styled(Wrapper)`
  overflow-x: hidden;
  width: 100%;
  min-width: fit-content;
  div {
    background: #f5f6f9;
    height: 33px;
    color: ${theme.color.darkgray};
    vertical-align: middle;
    font-family: ${theme.font[3]};
  }
`;

const DrawerWrapper = styled(Wrapper)`
  .drawer {
    max-height: 0;
    transition: max-height 0.3s ease-in-out;
    overflow: hidden;
    visibility: hidden;
    &.active {
      max-height: 300px;
      visibility: visible;
    }
  }

  /* .drawer.active {
    max-height: 300px;
  } */
`;

const _Table = styled(Wrapper)<any>`
  tbody td.td-right-align {
    padding: 0 10px;
  }
  @media screen and (min-width: 1675px) {
    tbody td.td-right-align {
      padding-right: calc(25% - 128px);
    }
  }
  overflow-x: hidden;
  .column {
    cursor: text;
  }
  .sort {
    cursor: pointer;
  }
  .vehicle-color {
    width: 25px;
    height: 25px;
    border-radius: 13px;
  }
  table {
    min-width: 100%;
  }
  tr {
    width: auto;
    td {
      vertical-align: middle;
      font-family: ${theme.font[3]};
    }
  }
  td:not(.tr-drawer td) {
    height: 83px;
    border-top: 1px solid ${theme.color.bg};
    color: ${theme.color.black};
  }
  .sort {
    &:hover {
      background: #f0f2f5;
    }
  }
  .row-tr {
    &:hover {
      background: #fff;
    }
    cursor: text;
  }
  .click {
    &:hover {
      background: #fbfcfd;
    }
    cursor: pointer;
  }
`;

const RightContent = styled(Wrapper)`
  height: calc(100vh - 52px);
  background: #fff;
  width: 30%;
  min-width: 466px;
`;
const Icon = styled.span`
  display: inline-block;
  width: 14px;
  height: 20px;
  background: url(/images/ic-loc.svg) no-repeat;
  background-size: contain;
  padding-right: 20px;
  vertical-align: top;
`;

const AreaText = styled.span`
  display: inline-block;
  font-size: 14px;
  color: ${theme.color.darkgray};
  margin-left: 10px;
  padding-left: 10px;
  position: relative;

  &::before {
    content: '';
    display: inline-block;
    width: 1px;
    height: 14px;
    background: ${theme.color.lineGray};
    position: absolute;
    top: 0;
    left: 0;
  }
`;
