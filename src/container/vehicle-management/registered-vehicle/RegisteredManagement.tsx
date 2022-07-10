import {useState, useEffect, Fragment, ReactElement} from 'react';
import {Section} from '@components/molecules';
import {Text, Wrapper, Input, Line, Image, Txt, Checkbox} from '@components/atoms';
import theme, {medium, whiteBlue} from '@public/theme';
import styled from '@emotion/styled';
import Table from '@components/organisms/Table';
import useInput from '@modules/hooks/useInput';
import getVehicleStatusListApi from '@api/vehicle/getVehicleStatusListApi';
import {useRouter} from 'next/router';
import Dialog from '@components/organisms/Dialog';
import {replaceVehicleColumns, formattedDate, convertColumnsToOption, getVehicleStatus} from '@modules/replaceStrings';
import setVehicleColumnList from '@api/vehicle/setVehicleColumnListApi';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import Toast from '@components/organisms/Toast';
import useQuery, {IQuery} from '@modules/hooks/useQuery';
import updateVehicleSaleHoldStatusApi from '@api/vehicle/updateVehicleSaleHoldStatusApi';
import VehicleRegPopup from '@components/organisms/VehicleRegPopup';
import usePopup from '@modules/hooks/usePopup';
import useCalendarPairEl from '@modules/hooks/useCalendarEl/useCalendarPairEl';
import {Dash} from '@modules/hooks/useCalendarEl/useCalendarElStyle';
import useButtonEl from '@modules/hooks/useButtonEl';

const _RegisteredManagement = ({pageProps}: {pageProps: any}): ReactElement => {
  interface ItemType {
    id: number;
    keyLabel: string;
    keyName: string;
    filtered?: boolean;
  }
  const responses = pageProps?.response;
  const queries = pageProps?.query;
  const [filterIndex, setFilterIndex] = useState<number>(-1);
  const route = useRouter();
  const [pagesAmount, setPagesAmount] = useState<number>(1);
  const [[start, end], [StartCalendar, EndCalendar], [setStart, setEnd]] = useCalendarPairEl(
    queries?.start ? new Date(queries?.start) : undefined,
    queries?.end ? new Date(queries?.end) : undefined
  );
  const [keyword, onChangeKeyword, setKeyword] = useInput<string>(queries.keyword); // 검색조건: 검색어(차량번호, 모델)
  const [sort, setSort] = useState(queries.sort || 'CREATE_DATE');
  const [direction, setDirection] = useState(queries.direction || 'DESC');
  const [isMyVehicle, setIsMyVehicle] = useState<boolean>(queries.isMyVehicle === 'true');
  const [clickedIndex, setClickedIndex] = useState<number>(-1);
  const [totalElements, setTotalElements] = useState<number>(Number(responses?.getVehicleStatusList?.list?.total));
  const [status, setStatus] = useState<any[]>(responses?.getVehicleStatusList?.status);
  const [data, setData] = useState<any>(responses?.getVehicleStatusList?.list?.results);
  const [dialogNum, setDialogNum] = useState<number | undefined>(undefined);
  const [visibledColumns, setVisibledColumns] = useState<any>(responses?.getVehicleStatusList?.columns || ['modelTrim', 'mileage', 'appearanceType', 'salePrice']);
  const [dialogContent, setDialogContent] = useState<string | React.ReactElement>('');
  const [domReady, setDomReady] = useState<boolean>(false);
  const initialDataOptions: any = convertColumnsToOption(responses?.getVehicleStatusList?.columns || ['modelTrim', 'mileage', 'appearanceType', 'salePrice']);
  const [dataOptions, setDataOptions] = useState<any>(initialDataOptions);
  const [totalColumns, setTotalColumns] = useState<ItemType[]>([]);
  const [saleCompleteBtns, setSaleCompleteBtns] = useState<any>();
  const [saledToastSuccess, setSaledToastSuccess] = useState<string>();
  const [saledToastError, setSaledToastError] = useState<string>();
  const [saleLoading, setSaleLoading] = useState(false);
  const [salePopupEnable, setSalePopupEnable] = useState<boolean>(false);
  const [saleVehicle, setSaleVehicle] = useState<any>();
  const [setErrPopup, ErrPopup] = usePopup();
  const SearchButton = useButtonEl('검색');
  const TotalSearchButton = useButtonEl('전체 조회');
  const EditColumnsButton = useButtonEl('항목 수정');
  const ToggleSaleButton = useButtonEl();
  const router = useRouter();

  const saleCompleteBtnsOption = [
    {
      dataKey: 'status',
      dataName: '상태',
      options: {
        width: '80px'
      }
    },
    {
      dataKey: 'saleable',
      dataName: '전환',
      options: {
        width: '120px'
      }
    }
  ];

  // 차량 등록시 등록일 기준 내림차순 정렬을 통해 등록된 차량을 맨위로 보여줘야함
  useEffect(() => {
    domReady && router.asPath === '/vehicle-management/registration' && setDirection('DESC');
    domReady && router.asPath === '/vehicle-management/registration' && setSort('CREATE_DATE');
  }, [router.asPath]);

  const value = {keyword, start, end, sort, direction, isMyVehicle: isMyVehicle ? 'true' : 'false'};
  const vehicleListQuery: IQuery = {
    response: responses,
    value,
    api: getVehicleStatusListApi
  };
  const [res, runVehicleListApi, Pagination, useQueryOptions] = useQuery(vehicleListQuery, pagesAmount);
  const submitEditColumns = async () => {
    let requestArr: string[] = [];
    totalColumns.map((column: ItemType) => {
      requestArr.push(column.keyName);
    });
    requestArr = requestArr.slice(0, filterIndex);
    const vehicleColumnList = await setVehicleColumnList(requestArr);
    vehicleColumnList.setVehicleColumnList
      ? useQueryOptions &&
        useQueryOptions.setRes &&
        useQueryOptions.setRes(
          await getVehicleStatusListApi({keyword, start: formattedDate(start), end: formattedDate(end), sort, direction, isMyVehicle: isMyVehicle ? 'true' : 'false'})
        )
      : route.reload();
    setDialogContent('수정이 완료되었습니다');
    setDialogNum(2);
  };

  const handleSaleStatus = async (id: number) => {
    setSaleLoading(true);
    const response = await updateVehicleSaleHoldStatusApi(id);
    const responsedStatus = response && response.updateVehicleSaleHoldStatus && response.updateVehicleSaleHoldStatus.status;
    setSaleLoading(false);
    response && useQueryOptions && useQueryOptions.apiTrigger && useQueryOptions?.apiTrigger();
    responsedStatus === 'SALE_HOLD'
      ? setSaledToastSuccess('판매보류 처리 되었습니다')
      : responsedStatus === 'SALE'
      ? setSaledToastSuccess('판매중 처리 되었습니다')
      : response && response?.errors[0]
      ? setSaledToastError(response?.errors[0].message)
      : setSaledToastError(`상태 변경이 가능한 차량이 아닙니다 (상태: ${getVehicleStatus(responsedStatus)})`);
    setSalePopupEnable(false);
  };
  const submitByEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runVehicleListApi();
    }
  };
  const onChangePosition = (result: any) => {
    if (!result.destination) return;
    const items = [...totalColumns];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTotalColumns(items);
  };

  useEffect(() => {
    setDomReady(true);
  }, []);

  useEffect(() => {
    res && res?.getVehicleStatusList && res?.getVehicleStatusList?.status && setStatus(res.getVehicleStatusList.status);
    res && res?.getVehicleStatusList && res?.getVehicleStatusList?.list && res?.getVehicleStatusList?.list?.total && setTotalElements(res.getVehicleStatusList.list.total);
    res && res?.getVehicleStatusList && res?.getVehicleStatusList?.list && res?.getVehicleStatusList?.list?.results && setData(res.getVehicleStatusList.list.results);
    res && res?.getVehicleStatusList && res?.getVehicleStatusList?.list && res?.getVehicleStatusList?.list?.totalPages
      ? setPagesAmount(res.getVehicleStatusList.list.totalPages)
      : setPagesAmount(1);
    res && res?.getVehicleStatusList && res?.getVehicleStatusList?.columns && setVisibledColumns(res.getVehicleStatusList.columns);
    res?.errors && setErrPopup(res?.errors[0]?.message);
  }, [res]);
  useEffect(() => {
    const arrTemp: any = [];

    data &&
      data.forEach((list: any) => {
        const canHandleSaleHold = list?.status === 'SALE' || list?.status === 'SALE_HOLD';

        arrTemp.push({
          status: getVehicleStatus(list?.status),
          saleable: (
            <ToggleSaleButton
              whcbr={[100, 36, 'white', '1px solid #0073e8', 2]}
              style={canHandleSaleHold ? {color: '#0073eb'} : undefined}
              className={canHandleSaleHold ? 'saleable-button' : 'unsaleable-button'}
              loading={saleLoading}
              onClick={() => {
                canHandleSaleHold && setSaleVehicle(list);
                canHandleSaleHold && setSalePopupEnable(true);
              }}
              // TODO: useButton에 로딩 넣기(재연)
              // loading={saleLoading}
              children={list?.status === 'SALE' ? '판매보류 전환' : list?.status === 'SALE_HOLD' ? '판매중 전환' : '-'}
            />
          )
        });
      });
    setSaleCompleteBtns(arrTemp);
  }, [data]);

  useEffect(() => {
    setTotalColumns([]);
    // 테이블에 활성화할 dataOption 할당
    setDataOptions(convertColumnsToOption(visibledColumns));
    // edit columns를 위해 활성화된 dataOption에 filter 붙이기
    visibledColumns &&
      visibledColumns.map((visibledColumn: string, key: number) =>
        setTotalColumns((visibledColumns: any) => [...visibledColumns, {id: key, keyLabel: replaceVehicleColumns(visibledColumn), keyName: visibledColumn}])
      );
    // edit columns를 위해 비활성화된 dataOption 붙이기
    visibledColumns && setTotalColumns((visibledColumn: any) => [...visibledColumn, {id: visibledColumns.length, keyLabel: '', keyName: '', filtered: true}]);
    ['modelTrim', 'mileage', 'salePrice', 'parkingLocation', 'appearanceType'].map(
      (keyName: string, key: number) =>
        visibledColumns &&
        !visibledColumns.includes(keyName) &&
        setTotalColumns((visibledColumn: any) => [...visibledColumn, {id: key, keyLabel: replaceVehicleColumns(keyName), keyName}])
    );
  }, [visibledColumns]);

  useEffect(() => {
    clickedIndex >= 0 && route.push(`/vehicle-management/registration/detail-vehicle?id=${data[clickedIndex].id}&vehicleId=${data[clickedIndex].jatoVehicleId}`);
  }, [clickedIndex]);

  useEffect(() => {
    domReady && runVehicleListApi();
  }, [sort, direction]);

  useEffect(() => {
    domReady && router.asPath !== '/vehicle-management/registration' && setDirection('ASC');
  }, [sort]);

  useEffect(() => {
    setFilterIndex(totalColumns.findIndex((el) => el.filtered));
  }, [totalColumns.findIndex((el) => el.filtered)]);

  useEffect(() => {
    domReady && useQueryOptions && useQueryOptions.updateAsPath && useQueryOptions.updateAsPath();
  }, [isMyVehicle]);

  return (
    <>
      <_Section padding="30px 36px" border="1px solid #cccccc">
        <Wrapper>
          <Txt type="medium" fontSize="24px" style={{letterSpacing: '-1px'}}>
            등록 차량 관리
          </Txt>
          <Wrapper mt={30} flex>
            <Wrapper flex>
              <Input
                version="b"
                whcbr={['100%', 42, 'transparent', '1px solid #d8d8d8', 2]}
                mr="10px"
                value={keyword}
                onChange={onChangeKeyword}
                placeholder="차량번호 모델"
                onKeyPress={submitByEnter}
                maxWidth="235px"
                minWidth="150px"
                maxLength={20}
              />
              <Wrapper h>
                <StartCalendar placeholder="매입 기간" width={'140px'} />
                <Dash />
                <EndCalendar placeholder="매입 기간" width={'140px'} />
              </Wrapper>
            </Wrapper>
            <Wrapper width="100%" ml={10} flex between>
              <Wrapper width="250px">
                <SearchButton whcbr={[120, 42, '#0073e8', 'none', 2]} onClick={runVehicleListApi} loading={useQueryOptions?.loading} />
                <TotalSearchButton
                  whcbr={[medium, whiteBlue]}
                  style={{color: '#0073e8'}}
                  loading={useQueryOptions?.loading}
                  onClick={() =>
                    useQueryOptions &&
                    useQueryOptions.resetPage &&
                    useQueryOptions.resetPage([
                      () => setKeyword(''),
                      () => setStart(undefined),
                      () => setEnd(undefined),
                      () => setSort('CREATE_DATE'),
                      () => setDirection('ASC'),
                      () => setIsMyVehicle(false)
                    ])
                  }
                  ml={10}
                />
              </Wrapper>
              <EditColumnsButton whcbr={[medium, whiteBlue]} onClick={() => setDialogNum(1)} style={{color: '#0073e8'}} ml={10} />
            </Wrapper>
          </Wrapper>
          <Wrapper mt={30} flex>
            <Image src="/images/ic-description-24-px.svg" mr="10px" />
            {[
              ['등록중', status ? status[status.findIndex((el: any) => el.status === 'REGISTER')]?.count.toString() ?? '0' : '0'],
              ['판매중', status ? status[status.findIndex((el: any) => el.status === 'SALE')]?.count.toString() ?? '0' : '0'],
              ['결제진행중', status ? status[status.findIndex((el: any) => el.status === 'PAYMENT_PROGRESS')]?.count.toString() ?? '0' : '0'],
              ['판매 보류', status ? status[status.findIndex((el: any) => el.status === 'SALE_HOLD')]?.count.toString() ?? '0' : '0']
            ].map((elem: string[], index: number) => (
              <Fragment key={index}>
                <Wrapper flex>
                  {index !== 0 && <Line vertical mr="10px" />}
                  <Wrapper mr="10px" flex>
                    <Text color={theme.color.darkgray} mr="5px">
                      {elem[0]}
                    </Text>
                    <Text color={theme.color.main} weight="5">
                      {elem[1]}
                    </Text>
                  </Wrapper>
                </Wrapper>
              </Fragment>
            ))}
          </Wrapper>
          <Wrapper width="100%" flex mt={10} between>
            <Wrapper>
              <Text type="sectionInfo">안내) 차량 정보의 삭제는 차량별 상세 페이지에서만 가능합니다.</Text>
              <Text type="sectionInfo">안내) 차량의 판매 상태 변경(판매 중/판매 보류)을 원하시면 차량별 상세 페이지 혹은 전환 영역 하단의 버튼을 이용해주세요.</Text>
            </Wrapper>
            <Wrapper flex>
              <Checkbox isChk={isMyVehicle} onChange={() => setIsMyVehicle((val) => !val)} name="isMyVehicle" />
              <Txt mt="3px" color={'#6d6e71'}>
                내 담당만 모아보기
              </Txt>
            </Wrapper>
          </Wrapper>
        </Wrapper>
        <Wrapper mt="23px" height="668px">
          {totalElements === 0 ? (
            <Wrapper w h height="100%">
              <Text type="listZero">등록된 차량이 없습니다</Text>
            </Wrapper>
          ) : (
            <Wrapper flex width="100%">
              <Table
                data={[data, dataOptions]}
                sort={sort}
                setSort={setSort}
                direction={direction}
                setDirection={setDirection}
                setClickedIndex={setClickedIndex}
                heightFix={643}
                className="main-table"
              />
              <Wrapper ml="2px" width="242px">
                <Table data={[saleCompleteBtns, saleCompleteBtnsOption]} heightFix={668} className="sub-table" />
              </Wrapper>
            </Wrapper>
          )}
        </Wrapper>
        <Wrapper w mt={25} mb={85}>
          <Pagination />
        </Wrapper>
        <VehicleRegPopup
          onClose={() => setSalePopupEnable(false)}
          onOk={() => handleSaleStatus(saleVehicle?.id)}
          visible={salePopupEnable}
          data={{
            number: saleVehicle?.number,
            manufacturer: saleVehicle?.manufacturer,
            modelYear: saleVehicle?.modelYear,
            modelName: saleVehicle?.modelName
          }}
          title={saleVehicle?.status === 'SALE' ? '판매보류' : '판매중'}
          content={saleVehicle?.status === 'SALE' ? '해당 차량의 판매를 보류하시겠습니까?' : '해당 차량을 판매중으로 전환하시겠습니까?'}
        />
        <Toast toast={saledToastSuccess} setToast={setSaledToastSuccess} />
        <Toast type="error" toast={saledToastError} setToast={setSaledToastError} />
        <ErrPopup title="오류" onClickPopupEnter={() => setErrPopup(undefined)} okText="확인" cancelText="닫기" />
      </_Section>
      {dialogNum === 1 ? (
        <Dialog title="항목 수정" onClickDialogEnter={submitEditColumns} okText="수정하기" dialogOpen={dialogNum} setDialogClose={setDialogNum} width={435} height={685}>
          <_EditColumns overflowY column h filterIndex={filterIndex}>
            <Wrapper mb="10px">
              <Wrapper width="328px" column>
                <Wrapper height="fit-content" column style={{borderRadius: '5px', border: '1px solid #d1d3d4', borderTop: 'none', boxShadow: '0px 1px 4px #d1d3d4'}}>
                  {/* 고정된 항목 수정 부분 */}
                  {['차량번호', '브랜드', '연형', '모델명', '등록일', '담당딜러'].map((item, key) => (
                    <FixedColumnWrapper w h key={key} className="column-wrapper">
                      <Wrapper width="10%" w>
                        <Text size="6px" color="#c3c3c3">
                          {key + 1}
                        </Text>
                      </Wrapper>
                      <Wrapper w width="80%">
                        <Text lineHeight={'40px'} color="#c3c3c3">
                          {item}
                        </Text>
                      </Wrapper>
                      <Wrapper width="10%">
                        <Text lineHeight={'40px'} color={theme.color.darkgray}></Text>
                      </Wrapper>
                    </FixedColumnWrapper>
                  ))}
                  {domReady ? (
                    <DragDropContext onDragEnd={onChangePosition}>
                      <Droppable droppableId="droppable">
                        {(provided) => (
                          <Wrapper className="react-sortable-wrapper" {...provided.droppableProps} ref={provided.innerRef}>
                            {totalColumns.map(({keyLabel, filtered}: ItemType, key) => (
                              <Draggable key={`${key}`} draggableId={`${key}`} index={key} isDragDisabled={filtered}>
                                {(provided) => (
                                  <ColumnWrapper
                                    width={'100%'}
                                    w
                                    h
                                    className={`column-wrapper${filtered ? ' filtered' : ''}`}
                                    ref={provided.innerRef}
                                    {...provided.dragHandleProps}
                                    {...provided.draggableProps}
                                  >
                                    <Wrapper width={'10%'} w style={filtered ? {display: 'none'} : undefined}>
                                      <Text size="6px" color={theme.color.darkgray}>
                                        {filterIndex < key + 1 || key + fixedColumnsAmount + 1}
                                      </Text>
                                    </Wrapper>
                                    <Wrapper
                                      className="edit-text-wrapper"
                                      w
                                      width={filtered ? '100%' : '80%'}
                                      background={filtered ? theme.color.main : 'none'}
                                      style={filtered ? {zIndex: 3} : undefined}
                                    >
                                      <Text lineHeight={'40px'} color={theme.color.darkgray}>
                                        {keyLabel}
                                      </Text>
                                    </Wrapper>
                                    <Wrapper width={'10%'} style={filtered ? {display: 'none'} : undefined}>
                                      <Text lineHeight={'40px'} color={theme.color.darkgray}>
                                        =
                                      </Text>
                                    </Wrapper>
                                  </ColumnWrapper>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </Wrapper>
                        )}
                      </Droppable>
                    </DragDropContext>
                  ) : (
                    <></>
                  )}
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper column ml="25px" mr="auto">
              <Text type="sectionInfo" mb="2px">
                ※ 항목은 최대 10개까지 등록 가능합니다
              </Text>
              <Text type="sectionInfo">※ 차량번호, 브랜드, 연형, 모델명, 등록일, 담당딜러는 제외가 불가능 합니다</Text>
            </Wrapper>
          </_EditColumns>
        </Dialog>
      ) : (
        dialogNum === 2 && (
          <Dialog
            title="알림"
            dialogOpen={dialogNum}
            setDialogClose={setDialogNum}
            onClickDialogEnter={() => {
              setDialogNum(undefined);
            }}
          >
            {dialogContent}
          </Dialog>
        )
      )}
    </>
  );
};

export default _RegisteredManagement;

const _Section = styled(Section)`
  .unsaleable-button {
    color: ${theme.color.lineGray};
    border-color: ${theme.color.lineGray};
    cursor: not-allowed;
    &:hover {
      background: none;
    }
  }
  .saled-calendar {
    .react-datepicker-popper {
      transform: translate(36px, 82px) !important;
    }
    input {
      background-color: ${theme.color.white};
    }
  }
  .main-table {
    width: 100%;
  }
  .sub-table {
    td {
      padding: 0;
    }
  }
`;
const fixedColumnsAmount = 6;
const _EditColumns = styled(Wrapper)<any>`
  .filtered {
    width: 100%;
    height: 40px;
    cursor: text !important;
    .edit-text-wrapper p {
      color: ${theme.color.white} !important;
      &::after {
        ${({filterIndex}) =>
          filterIndex === 10 - fixedColumnsAmount
            ? "content: '항목은 최대 10개까지 등록 가능합니다';"
            : `content: '불필요한 항목은 드래그하여 내려주세요 (${filterIndex + fixedColumnsAmount}/10)';`}
      }
    }
  }
  .column-wrapper {
    height: 40px;
    margin-bottom: -1px;
    cursor: grab;
    &:active {
      cursor: grabbing;
    }
  }
  .react-sortable-wrapper {
    ${({filterIndex}) =>
      filterIndex > 9 - fixedColumnsAmount && `div:nth-of-type(n + ${filterIndex + fixedColumnsAmount - 4}){background: #f7f7f7; pointer-events: none; p{color:#c3c3c3;}}`};
  }
`;
const FixedColumnWrapper = styled(Wrapper)`
  background-color: #f7f7f7;
  border-top: 1px solid #ececec;
  border-bottom: 1px solid #ececec;
  cursor: text !important;
`;

const ColumnWrapper = styled(Wrapper)`
  background-color: #fff;
  border-top: 1px solid #ececec;
  border-bottom: 1px solid #ececec;
`;
