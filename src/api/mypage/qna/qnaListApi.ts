import graphQLClientRequest, {ContextType} from '@api/graphQLClientRequest';

export enum SearchType {
  TITLE_CONTENT,
  TITLE,
  CONTENT
}

// export enum CategoryType {
//   ETC,
//   IMAGE_UPLOAD,
//   NEARBY_VEHICLES,
//   PROCESS_IMPROVEMENT,
//   VEHICLE_OWNER_NAME,
//   VEHICLE_REGISTRATION,
//   VEHICLE_SEARCH_RESULT
// }

type QueryType = {
  pageNo?: number;
  keyword?: string;
  searchType?: SearchType | undefined;
  category?: string;
};

export default function qnaListApi({pageNo, keyword, searchType, category}: QueryType, context?: ContextType): any {
  const query = `
      query{
          getQnAList(
            request: {
              pageNo: ${Number(pageNo) ? Number(pageNo) - 1 : 0}
              pageSize: 10
              ${keyword ? `searchType: ${searchType || SearchType[0]}` : ''}
              ${keyword ? `keyword: "${keyword}"` : ''}
              ${category ? `category: "${category}"` : ''}
            }
          ) {
            total
            totalPages
            pageSize
            pageNo
            results {
              id
              partner {
                id
                name
              }
              category
              title
              content
              answer
              answerUser
              status
              createdDate
            }
          }
      }
  `;

  // console.log('qnaListApi query', query);
  const response = graphQLClientRequest(query, context);
  return response;
}
