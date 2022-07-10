import {gql, GraphQLClient} from 'graphql-request';
import graphQLClientRequest from '@api/graphQLClientRequest';

export enum SearchType {
  TITLE_CONTENT,
  TITLE,
  CONTENT
}

type NoticeType = {
  pageNo?: number;
  keyword?: string;
  searchType?: SearchType | string;
}

export default async function getNoticeListApi({pageNo, keyword, searchType}: NoticeType, context?:any): Promise<any> {
  const query = gql`
    query{
      getNoticeList(
      request: {
          pageNo: ${Number(pageNo) ? Number(pageNo) - 1 : 0}
          pageSize: 10
          ${keyword ? `keyword: "${keyword}"` : ''}
          ${keyword ? `searchType: ${searchType || SearchType[0]}` : ''}
        }
      ){
        total
        totalPages
        pageSize
        pageNo
        results {
          content
          title
          createdDate
          id
          status 
        }
      }
    }
  `;
  const response = await graphQLClientRequest(query, context);
  return response && response;
}
