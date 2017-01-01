# Status와 LifeCycle

오늘은 Status와 생명주기에 대해서 알아보려고 합니다.

하지만 그전에 지난 소스를 클래스화 하는것 부터 시작해 봅시다.

지난 포스트 중 시간이 바뀌는 소스가 기억나시나요
3번 렌더링 요소 포스트입니다 내용은 아래 링크로 보실 수 있습니다.

[소스보기](https://github.com/sonim1/react_tutorial/tree/master/source/react_start_003)
[데모보기](https://rawgit.com/sonim1/react_tutorial/master/source/react_start_003/index.html)

tick메서드를 호출해서 계속 렌더링 시켜주는 소스였죠?

```javascript
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

위와같은 코드 였습니다.

이 단순 무식한? 코드를 캡슐화와 재사용할 수 있게 수정해 보고 클래스화까지 해보겠습니다.


## 1. 시간표시하는 Element를 Component화
```javascript
function Clock(props){
    return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

Clock으로 렌더링 할 Element를 컴퍼넌트화 시켰습니다.

Clock 컴퍼넌트가 현재는 함수로 되어있는 걸 보실 수 있습니다.

## 2. Function으로 만든 Component를 클래스화
현재 Clock이 함수로 되어있습니다.

이를 ES6 Class로 변환 시켜보도록 합시다.

```javascript
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

Clock 클래스는 React.Component를 상속받고 render()에서 Element를 반환해주고 있습니다.

## 클래스에 Local State 추가 하기
지금까지 Clock 컴퍼넌트를 함수에서 클래스화 시켜보았습니다.
자 이제 date Props를 Local State로 변경해 보겠습니다.

그런데..? Props는 컴퍼넌트가 받는 불변값. 즉 함수에 인자같은 거라는걸 알겠는데 State는 무엇일까요?

요약하면 컴퍼넌트 내에서 변경이 가능한 데이터입니다. 물론 마음대로변경 하는건 아니고 setState(nextState)비동기 함수를 통해서 변경합니다.

### State와 Props의 차이
Props는 부모컴퍼넌트에서 자식 컴퍼넌트로 단반향으로 내려가는 불변의 데이터라고 보시면 됩니다.

State는 컴퍼넌트의 상태를 저장하고 컴퍼넌트내에서 상태값 변경이 가능한 값입니다.
위에 쓴것 처럼 setState() 함수를 통해서 값을 변경 할 수 있습니다.

자 이제 차이를 알았으니 Props를 State로 쓸수 있게 코드를 수정해 봅시다.

```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

//그리고 ReactDOM.render()에 Clock에 인자도 제거해줍시다.
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

[class constructor](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes#Constructor)를 선언해주고 안에 super(props);를 넣어줘서 부모객체에 props를 전달해줍니다.

저렇게 전달 해주면 props를 해당 컴퍼넌트에서 state로 사용 할 수 있습니다.

여기까지 오시느라 수고하셨습니다.

지금까지의 과정을 눈으로만 보신분은 그러려니 하시겠지만... 코드를 작성 하시면서 따라오시는 분들은 이상하게 생각 하실 수 있습니다.

네, 저 상태로는 시간이 안 흐릅니다. 후후..

수정 전 처럼 tick()을 통해 setInterval로 호출하지 않고 있으니 정적인 시간만 노출되고 있습니다.

## 클래스에 LifeCycle 메소드 추가하기
컴퍼넌트에는 생명 주기가 있으며 특정 상황에 사용할 수 있는 메서드 들이 있습니다.

[문서 참고 - React.Component](https://facebook.github.io/react/docs/react-component.html)

이중 우리는 두 가지를 추가 후 사용해 보도록하겠습니다.
컴퍼넌트 만들어지고 렌더링 후 발생하는 **componentDidMount();**
컴퍼넌트가 닫히고 발생하는 **componentWillUnmount();**
두가지 입니다.

```javascript
componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
}

componentWillUnmount() {
    clearInterval(this.timerID);
}

tick() {
    this.setState({
        date: new Date()
    });
}
```

Clock 클래스에 위 메서드를 구현해주면 시간이 정상적으로 바뀌는 모습을 볼 수 있습니다.

## setState 사용시 주의사항
### State의 변경은 setState()
state의 변경은 무조건 setState()를 통해서 해주셔야 합니다.

```javascript
//변경되지 않음
this.state.date = new Date();

//정상적으로 변경
this.setState({
    date: new Date()
});
```

### State업데이트가 비동기일 수 있음
setState는 여러군대에서 호출 할 수 있지만 state는 하나만 변합니다.
컴퍼넌트에서 setState를 여러번 호출해도 this.state만 변한다는 말이죠

그런 이유로 this.state나 this.props의 값을 가지고 계산하여 State를 변경 할 때는 문제가 생길 수 있습니다.

쉬운 설명을 위해 아래 코드를 보시겠습니다.
```javascript
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});

// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```
위에 setState에서 값을 설정 할 때 this.state값이나 혹은 this.props값이 언제 바뀔지 모릅니다, 즉 내가 원하는 값이 아닐 수 있습니다.

그렇기 때문에 익명함수를 처리해서 prevState, props를 받아서 처리해 주면 그런 걱정을 예방 할 수 있습니다.

this.state가 변해도 익명함수 내부에서는 prevState를 사용하기 때문에 side effect를 예방할 수 있습니다.

### 상태는 업데이트 시 Merge
상태 업데이트 시 setState에 없는 키 값을 넣거나 할 경우 기존 구조에서 합쳐지게 됩니다.
예를들면

```javascript

constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
}

componentDidMount() {
    this.setState({
      posts: {post:'test'}
    });

    this.setState({
      comments: {comment: 'comment!'}
    });
}
```
위와같이 따로 다른 키값의 상태만을 넣어주는 경우에 기존 state에 merge시키기 때문에
각각 반영됩니다.

만약 기존 posts나 comments가 존재하지 않을 경우 자동으로 추가되게 됩니다.

## Data Flow Down
지금까지 계속 얘기해왔던 부분입니다.

데이터는 항상 아래로 흐릅니다.

컴퍼넌트도 마찬가지입니다. 우리가 작성한 컴퍼넌트의 최상위부터 아래로 내려가게 됩니다.


# 참고
https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes
https://facebook.github.io/react/docs/react-component.html
https://velopert.com/1130
