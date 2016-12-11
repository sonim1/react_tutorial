# React 시작하기
React로 사이트를 간단하게 만들어도 잘 이해가 되지 않거나 하는 부분이 있어서 시작부터 해보자 하고 작성하는 포스트 입니다.

아래 두 내용을 듣고 영감을 받아서 시작하게 되었습니다.
[React가 당신을 슬프게 하나](https://github.com/ehrudxo/react-makes-you-sad)
[React 배우는 법](https://github.com/ehrudxo/react-howto/blob/master/README-ko.md#learning-react-itself)

유익한 내용이니 한번 보고 오시면 좋을 듯 합니다.

## 들어가며
저 글들을 보고 내린 결론은 바로..!

Redux? Flux? 이런거 신경쓰지 말고 페이스북 문서에서 제공하는 기본적인 기능부터 접근을 하자!

네 그렇습니다. 벌써 웹팩이니 겊프니 뭐니 여러고민 하지 않고 기초 부터 시작해보도록 하겠습니다.
(물론 어느정도 HTML이나 자바스크립트에 대한 지식은 있으셔야 합니다. 여기서 초보는 React 초보..! 정말정말 기초부터 하시는 분들은 About Javascript나 HTML Basic 카테고리를 참고해 주세요!)

공식문서를 참고하지만 최대한 단순하게 설명하는게 목표이기 때문에 사실... 공식문서를 반드시 보시는걸 추천드립니다!

하지만 이 블로그의 포스트를 보고 보시는 것도 나쁘지 않을 겁니다.

# 1. 설치
React는 새로운 어플리케이션을 만들 수도 있고 기존 사이트에 특정 컴퍼넌트에만 적용 할 수 있습니다.

Angular같은 웹 프레임워크가 아니기 때문에 기존소스에 라이브러리처럼 사용 할 수 있습니다.

## 단일 페이지 응용프로그램 만들기
React에서는 create-react-app을 통해서 간단하게 React 작업환경을 설정 할 수 있습니다.

Redux를 개발한 Dan Abramov가 Ember진영에 작업환경을 쉽게 설정해주는 Ember CLI를 보고 감명을 받아서 만들었다고 합니다.

우선 npm에 전역으로 create-react-app을 설치해 줍시다.
```shell
npm install -g create-react-app
create-react-app hello-world
cd hello-world
npm start
```

```shell
sudo npm install -g create-react-app
```
권한문제가 있으면 sudo 추가해주시는것도 잊지마세요

`npm start`이후에는 http://localhost:3000/ 으로 단일 페이지 응용프로그램에 접속 할 수 있습니다.

## Hello World
우리는 4줄만으로 기본적인 웹어플리케이션을 만들었습니다!!
하지만 아직은 create-react-app을 사용하진 않을겁니다. 위에서 생성한 폴더는 닫아주시고 새로운 폴더에 index.html파일을 하나 생성해 줍시다.

기본 HTML 구조에 body 내용을 추가해 줍시다. script 태그에도 필요한 라이브러리를 우선 추가해 줍시다.

```html
<body>
    <div id="root"></div>
    <script src="https://unpkg.com/react@latest/dist/react.js"></script>
    <script src="https://unpkg.com/react-dom@latest/dist/react-dom.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
    <script src="./js/app.js" type="text/babel"></script>
</body>
```
script들 중 맨 아래에는 app.js도 추가되어있습니다.
 js/app.js 파일을 만들어서 아래 내용을 추가해 줍시다.

 ```javascript
 ReactDOM.render(
   <h1>Hello, world!</h1>,
   document.getElementById('root')
 );
 ```

Hello World 가 보이시나요?

역시 시작은 헬로월드가 제맛이죠. 
오늘은 간단하게 여기까지~ 다음 포스트에서 계속 알아보도록 하겠습니다.








# 참고
https://facebook.github.io/react/docs/installation.html
https://velopert.com/2037
