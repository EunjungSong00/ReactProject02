import issueTokenApi from '@api/login/issueTokenApi';
import {GraphQLClient} from 'graphql-request';
import {GetServerSidePropsContext} from 'next';
import {ParsedUrlQuery} from 'querystring';
import nookies, {parseCookies} from 'nookies';
import router from 'next/router';

const TOKEN_EXPRIED_CODE = '401';
// TODO: getParsedResponse 모듈에 'nonTokenRedirect'로 전달하기
const redirect = {redirect: {permanent: false, destination: '/login'}, props: {}};

export type PageRequestType = {
  pageNo?: number;
  pageSize?: number;
};

export type ApiOptionsType = {
  context?: GetServerSidePropsContext<ParsedUrlQuery>;
  getGql?: boolean;
};

export type ContextType = GetServerSidePropsContext<ParsedUrlQuery>;

const graphQLClientRequest = async (query: string, context?: ContextType, newAccessToken?: string): Promise<any> => {
  // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  // const httpsAgent = new https.Agent({rejectUnauthorized: false});
  const cookies = context ? nookies.get(context) : parseCookies();
  const accessToken = cookies.carPartnerAccessToken;
  if (accessToken) {
    const endpoint = process.env.NEXT_PUBLIC_API_URL || '';
    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${newAccessToken || accessToken}`,
        'carmerce-partner-meta':
          process.env.NEXT_PUBLIC_DOMAIN?.includes('stage.') || process.env.NEXT_PUBLIC_DOMAIN?.includes('dev.') || process.env.NEXT_PUBLIC_DOMAIN?.includes('localhost')
            ? 'skip-validation'
            : ''
      }
      // fetch: (url: any, init: any) => fetch(url, {agent: httpsAgent, ...init})
      // agent: httpsAgent,
    });
    const response = await graphQLClient.request(query).catch(async (error) => {
      const extensions: any = error?.response?.errors[0]?.extensions;
      if (extensions?.code === TOKEN_EXPRIED_CODE || extensions?.uniqueCode === '171') {
        // console.log('엑세스 토큰 만료');
        const refreshToken = cookies.carPartnerRefreshToken;
        const newTokens = await issueTokenApi(refreshToken);
        const newAccessToken = newTokens.accessToken;
        const newRefreshToken = newTokens.refreshToken;
        if (newTokens !== TOKEN_EXPRIED_CODE && newTokens !== '500') {
          // console.log('엑세스 토큰 발급');
          nookies.set(context || null, 'carPartnerAccessToken', newAccessToken, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/'
          });
          nookies.set(context || null, 'carPartnerRefreshToken', newRefreshToken, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/'
          });
          return graphQLClientRequest(query, context, newAccessToken);
        }
        // console.log('리프레시 토큰 만료');
        return TOKEN_EXPRIED_CODE;
      }
      console.log('error.response', error);
      return error.response;
    });
    if (response === TOKEN_EXPRIED_CODE) return context ? redirect : router.push('/login');
    // console.log('성공');
    return context ? (newAccessToken ? response : {props: {response: response || '', query: context.query, cookies: nookies.get(context)}}) : response;
  }
  return context ? redirect : router.push('/login');
};

export default graphQLClientRequest;
