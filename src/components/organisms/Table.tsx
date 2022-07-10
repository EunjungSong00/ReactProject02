import React, {Dispatch, SetStateAction, useState, ReactElement} from 'react';
import {Checkbox, Image, Wrapper} from '@components/atoms';
import styled from '@emotion/styled';
import theme from 'public/theme';
import Txt from '@components/atoms/Txt';

interface ITable {
  className?: string;
  data: [[], ITableDataOptions[]];
  sort?: string;
  setSort?: Dispatch<SetStateAction<string>>;
  direction?: 'ASC' | 'DESC';
  setDirection?: (direction: 'ASC' | 'DESC') => void;
  setClickedIndex?: Dispatch<SetStateAction<number>>;
  heightFix?: number;
  checkBoxes?: number[];
  setCheckBoxes?: Dispatch<SetStateAction<number[]>>;
  version?: 'old' | 'new';
}

export interface ITableDataOptions {
  dataKey: string;
  dataName: string | ReactElement;
  enable?: boolean;
  options?: {
    width?: string;
    height?: string; // 제일 큰 값으로 적용됩니다.
    sort?: string;
    textAlign?: 'left' | 'center' | 'right';
    formatter?(val: string | number | any): string | number | React.ReactElement | any;
  };
}

function Arrow({toggle, direction}: {toggle: boolean; direction: 'ASC' | 'DESC'}): ReactElement {
  return (
    <>
      {toggle && direction === 'ASC' ? (
        <Wrapper column>
          <Image src="/images/ic-arrow-drop-up-on.svg" mb="3px" />
          <Image src="/images/ic-arrow-drop-down-off.svg" />
        </Wrapper>
      ) : toggle && direction === 'DESC' ? (
        <Wrapper column>
          <Image src="/images/ic-arrow-drop-up-off.svg" mb="3px" />
          <Image src="/images/ic-arrow-drop-down-on.svg" />
        </Wrapper>
      ) : (
        <Wrapper column>
          <Image src="/images/ic-arrow-drop-up-off.svg" mb="3px" />
          <Image src="/images/ic-arrow-drop-down-off.svg" />
        </Wrapper>
      )}
    </>
  );
}

function arrowColumn(column: string | ReactElement, key: string, arrowToggleKey: string, direction: 'ASC' | 'DESC'): ReactElement {
  return (
    <Wrapper h w>
      <Wrapper mr="6px" h>
        {column}
      </Wrapper>
      <Wrapper>
        <Arrow toggle={arrowToggleKey !== 'default' && key === arrowToggleKey} direction={direction} />
      </Wrapper>
    </Wrapper>
  );
}

export default function Table({
  data,
  sort = 'default',
  setSort,
  className = 'table-wrapper',
  direction,
  setDirection,
  setClickedIndex,
  heightFix,
  checkBoxes,
  setCheckBoxes,
  version = 'old'
}: ITable): ReactElement {
  function Columns({data}: ITable): ReactElement {
    const [checkBox, setCheckBox] = useState<boolean>(false);
    return data[1] ? (
      <>
        {checkBoxes && setCheckBoxes && (
          <th
            style={{
              width: '80px',
              height: '35px'
            }}
          >
            <Checkbox isChk={checkBox} onChange={() => setCheckBox(!checkBox)} name={'total-checkbox'} />
          </th>
        )}
        {Array.isArray(data[1]) &&
          data[1].map(
            (dataOption: ITableDataOptions, index: number) =>
              dataOption.enable === false || (
                <th
                  key={index}
                  className={dataOption.options?.sort ? 'sort' : 'non-sort'}
                  onClick={() => {
                    dataOption.options?.sort && setSort && setSort(dataOption.options.sort);
                    dataOption.options?.sort && setDirection && setDirection(sort === dataOption.options.sort && direction === 'ASC' ? 'DESC' : 'ASC');
                  }}
                  style={{
                    cursor: dataOption.options?.sort ? 'pointer' : 'text',
                    width: dataOption.options?.width ?? '80px',
                    height: dataOption.options?.height ?? '35px'
                  }}
                >
                  {dataOption.options?.sort && direction ? arrowColumn(dataOption?.dataName, dataOption?.options?.sort, sort, direction) : dataOption.dataName}
                </th>
              )
          )}
      </>
    ) : (
      <th>loading...</th>
    );
  }

  function Rows({data}: ITable): ReactElement {
    return data[0] && data[1] && data[0].length !== 0 ? (
      <>
        {Array.isArray(data[0]) &&
          data[0].map((_data: any, dataIndex: number) => (
            <tr key={dataIndex} className={setClickedIndex ? `row-tr click row-no${dataIndex}` : 'row-tr'}>
              {checkBoxes && setCheckBoxes && (
                <td
                  style={{
                    width: '80px',
                    height: '60px'
                  }}
                >
                  <Checkbox
                    isChk={checkBoxes.includes(dataIndex)}
                    onChange={() =>
                      checkBoxes.includes(dataIndex) ? setCheckBoxes(checkBoxes.filter((el: number) => el !== dataIndex)) : setCheckBoxes(checkBoxes.concat([dataIndex]))
                    }
                    name={`${dataIndex}`}
                  />
                </td>
              )}
              {Array.isArray(data[1]) &&
                data[1].map((dataOption: ITableDataOptions, dataOptionIndex: number) => {
                  const _dataKey: string = dataOption.dataKey;
                  const dataValue: any = _dataKey.includes('.') ? _data[_dataKey.split('.')[0]] && _data[_dataKey.split('.')[0]][_dataKey.split('.')[1]] : _data[_dataKey];
                  return (
                    dataOption.enable === false || (
                      <td
                        key={dataOptionIndex}
                        style={{textAlign: dataOption.options?.textAlign ?? 'center', height: dataOption.options?.height ?? '60px'}}
                        onClick={() => setClickedIndex && setClickedIndex(dataIndex)}
                      >
                        {dataOption.options?.formatter ? (dataValue ? dataOption.options.formatter(dataValue) : '-') : dataValue || '-'}
                      </td>
                    )
                  );
                })}
            </tr>
          ))}
      </>
    ) : (
      <></>
    );
  }

  return (
    <_Table className={className} style={{height: heightFix ?? 'auto'}} version={version}>
      <table>
        <thead>
          <tr>
            <Columns data={data} direction={direction} setDirection={setDirection} />
          </tr>
        </thead>
        <tbody>
          <Rows data={data} setClickedIndex={setClickedIndex} />
        </tbody>
      </table>
      {data[0] && data[0].length === 0 && (
        <Wrapper w h height="100%" column>
          <Image src="/images/ic-alert-1.svg" />
          <Txt type="regular" color="#aaaaaa" mt="15px">
            데이터가 존재하지 않습니다.
          </Txt>
        </Wrapper>
      )}
    </_Table>
  );
}

const _Table = styled(Wrapper)<any>`
  overflow-x: scroll;
  overflow-y: hidden;

  img {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
  &::-webkit-scrollbar {
    height: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${theme.color.scrollColor};
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: none;
  }

  ${({version}) => (version === 'old' ? oldTableStyle : newTableStyle)}

  .click {
    &:hover {
      background: #fbfcfd;
    }
    cursor: pointer;
  }
`;

const oldTableStyle = `
  table {
    width: max-content;
    min-width: 100%;
  }
  tr {
    width: auto;
    th,
    td {
      height: 40px;
      vertical-align: middle;
      font-family: ${theme.font[3]};
      font-size: ${theme.fontSize.xs};
    }
  }
  th {
    background: #f5f6f9;
    color: ${theme.color.darkgray};
  }
  td {
    border-bottom: 1px solid ${theme.color.bg};
    color: ${theme.color.black};
    padding: 0 10px;
  }
  .arrow-wrapper {
    display: none;
    width: 10px;
    height: 13px;
    div {
      width: auto;
      height: auto;
    }
  }
  .active {
    display: flex;
    justify-content: center;
    gap: 6px;
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
`;

const newTableStyle = `
  table {
    width: max-content;
    min-width: 100%;
  }
  tr {
    width: auto;
    th,
    td {
      border: 1px solid #d8d8d8;
      vertical-align: middle;
      font-size: 13px;
      color: #666666;
    }
  }
  th {
    background: #f9fafa;
    font-family: ${theme.font.medium};
    color: ${theme.color.darkgray};
    height: 35px;
  }
  td {
    font-family: ${theme.font.regular};
    border-bottom: 1px solid ${theme.color.bg};
    color: ${theme.color.black};
    padding: 0 10px;
    height: 60px;
  }
  .arrow-wrapper {
    display: none;
    width: 10px;
    height: 13px;
    div {
      width: auto;
      height: auto;
    }
  }
  .active {
    display: flex;
    justify-content: center;
    gap: 6px;
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
`;
