This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started.

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

##

## [Carmerce custom]

## -snippets for vscode (재연 2021.10.18) https://react.vlpt.us/basic/27-useful-tools.html#snippet

개발 시 자주 쓰이는 코드 조각들의 작성을 빠르게 쓸 수 있도록 하는 단축키입니다.

[세팅방법]

1. vscode우측 하단에 언어 설정된 부분을 클릭 후 typescript react로 바꿔주세요.
2. Code > Preferences > User snippets 에서 typescriptreact.json 파일로 이동 후
3. 설정 json파일을 넣어주세요.

[세팅 후 사용법]

- !api : 파일 이름을 기반으로한 api.ts 파일을 작성해줍니다.
- !fc : functional component의 틀을 생성해줍니다.
- !fcp : functional component를 default export하는 페이지의 틀을 작성해줍니다.
- !us : 선택된 단어를 name으로 하는 useState를 작성해줍니다.
- !ue : 선택된 단어를 deps로 하는 useEffect를 작성해줍니다.
- !pop : 선택된 단어를 변수로 갖는 Popup component를 작성해줍니다.
- !toa : 선택된 단어를 변수로 갖는 Toast component를 작성해줍니다.

* !뒤에 1을 적으면 해당 snippet을 위한 import가 함께 세팅됩니다.

## \TODO & FIXME (재연 2021.10.18)

개발 시 필요한 작업들을 리스트로 관리해줄수 있는 주석 방법입니다.

1. 해야할 작업이 있는 부분에
   // \TODO: 할 일
   이라고 작성합니다.
2. 고쳐야하는 작업이 있는 부분에
   // \FIXME: 고칠 부분
   이라고 작성합니다.
3. intelliJ) 하단 툴바에서 TODO탭을 통해 작업들을 관리할 수 있습니다.
4. vscode) extention에서 todo tree를 설치 후 User > ... > Library > Application Support > Code > User > setting.json 에서 스타일을 설정합니다(선택). 이 때 todo tree가 잘 안된다면 vscode version을 확인해주세요.


