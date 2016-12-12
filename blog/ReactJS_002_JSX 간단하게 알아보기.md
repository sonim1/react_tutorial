# JSX란?
JSX의 단어 유래부터 알아봅시다.
Javascript + XML을 합쳐서 탄생한 기존 자바스크립트의 확장 문법입니다.

합쳐서 얻는 장점은??

개발자가 자바스크립트 내부에 마크업 코드를 작성해 줄 수 있게 해줍니다.
단순히 XML만 아니라 변수나 프로퍼티의 바인딩 기능도 제공합니다

## JSX 한번 봅시다.
```javascript
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```
이전 포스트를 보시면 렌더해 주는 부분에서 위와 같은 코드를 보셨을 겁니다.

h1태그 부분을 따로 변수로 저장해서 아래와 같이 쓸 수 도 있습니다

```javascript
const element = <h1>Hello, world!</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

자바스크립트 내부에 마크업 코드를 작성한다는게 무슨 말인지 감이 오시나요?

오신다면 이번 포스트 안보셔도 될 것 같습니다.
그래도 제가 수고해서 작성한 포스트니 마저 봐주세요.. 후후

하지만 이것만으로는 동적인 웹페이지를 만들 수 없겠죠?

## JSX에 표현식 포함하기
그래서 지원하는게 바로 중괄호를 이용해서 변수, 함수 등 여러 표현식을 사용 할 수 있습니다.

```javascript
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>Hello, {formatName(user)}!</h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```
## JSX를 안 쓴다면?
우리가 작성한 JSX 코드는 작성한 그대로 쓰는게 아닌, 바벨에서 한번 컴파일을 해주게 됩니다.

```javascript
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```
이 코드는 컴파일 되면 아래와 같이 변형됩니다.
```javascript
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

아래와 같이 쓰면 가독성도 떨어지고 점점 눈이 침침해지고 고생하겠죠? JSX를 익히면 그런 고민 할 필요 없습니다!


# 마치며
더 깊게 알아보고 싶지만 JSX에 집중하다가 빨리 지치면 안되기 떄문에 JSX에 대해서는 추후에 깊게 다뤄볼 예정입니다!

다음 포스트로 넘어가봅시다.



# 참고
http://webframeworks.kr/getstarted/reactjs/
