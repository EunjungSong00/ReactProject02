import issueTokenApi from '@api/login/issueTokenApi';
import {GraphQLClient} from 'graphql-request';
import cookies from 'next-cookies';

const graphQLClientRequest = async (query: any, context: any, result?: any) : Promise<any> => {
    // TODO: 토큰 만료시 메시지
    // console.info('START graphQLClientRequest');
    const hasCookie = context?.req?.headers?.cookie;
    if (hasCookie) {
      const {token} = cookies(context);
      const endpoint = process.env.NEXT_PUBLIC_API_URL || '';
      const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
          authorization: `Bearer ${result || token}`
        }
      });

      const response = await graphQLClient.request(query).catch(async (error) => {
        const {extensions} = error.response.errors[0];
        const {code} = error.response.errors[0].extensions;
        // TOKEN이 만료된 경우
        if (code === '401') {
          // RT TOKEN을 불러와 issueTokenApi 통해 TOKEN을 새로 불러온다
          const {refreshToken} = cookies(context);
          const result = await issueTokenApi(refreshToken);
          if (result !== '401') {
            // RT TOKEN 갱신한 경우
            return graphQLClientRequest(query, context, result);
          }
          return '401';
        }
        console.error('extensions', extensions);
        return extensions;
      });
      if (response) {
        // console.info('graphQLClientRequest response', response);
      }

      return response && response;
    }
    return '401';
};

export default graphQLClientRequest;
