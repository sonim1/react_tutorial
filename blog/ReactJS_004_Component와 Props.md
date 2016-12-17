# Components와 Props
## Compoenet란
컴퍼넌트는 각 부분을 재사용 가능한 조각으로 UI를 나눈 것과 같습니다.

리액트에서의 컴퍼넌트는 자바스크립트 함수와 같습니다.
컴퍼넌트는 input으로 Props를 받고 화면에 표시할 element를 반환해 줍니다.

Welcome이라는 컴퍼넌트를 만들어 보겠습니다

```javascript
function Welcome(props){
    return <h1>Hello, {props.name}</h1>
}
```

: for ES6
```javascript
class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}
```

두 코드는 props를 받고 React의 Element를 반환한다는 점에서 동일한 기능을 하는 컴퍼넌트 입니다.

## Component 렌더링
우선 Welcome이라는 사용자 정의 컴퍼넌트를 구성해봅시다.
```javascript
const element = <Welcome name="Sara" />;
```
Component이름은 Welcome이고 해당 컴퍼넌트에 전달한 name(Props.name)은 Sara인걸 알 수 있습니다.

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

위 코드의 동작을 순서대로 보겠습니다.
1. App 컴퍼넌트는 여러개의 Welcome을 가지고 있습니다.
2. ReactDOM.render을 통해서 App 컴퍼넌트를 호출합니다.
3. App컴퍼넌트는 각 Welcome 컴퍼넌트를 호출합니다. (재사용)
4. 전달한 props에 따른 각각의 Welcome 컴퍼넌트 내용이 호출되는걸 확인 할 수 있습니다.

## Components 분할을 두려워하지 말자
컴퍼넌트를 작은 요소로 분해하는걸 두려워하지 않아야 합니다.
```javascript
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```
위에 Comment라는 컴퍼넌트에 유저 정보와 Comment를 표시해주고 있습니다. 하지만 하나에 컴퍼넌트에 넣어놨기 때문에 추후 재사용이 어렵습니다.

Comment내용 중 유저 정보는 컴퍼넌트화 하는게 좋아 보입니다.
UserInfo div를 컴퍼넌트화 시킨다면 아래와 같이 컴퍼넌트화 시킬 수 있을 겁니다.

```javascript
//UserInfo 내부의 Avatar 컴퍼넌트
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}

//Comment 내부의 UserInfo 컴퍼넌트
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```
UserInfo로 컴퍼넌트가 생성되고 Avatar도 따로 컴퍼넌트화 되었습니다.
위와같이 Components 세분화가 된다면?

Comment Component는 아래와 같이 줄어듭니다.

```javascript
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```
가독성도 좋아지고 만약 UserInfo의 변경이 필요할 경우 UserInfo Component만 확인하면 됩니다.
재사용성이 좋아지는건 말 할 것도 없죠?

## Props는 읽기전용.
컴퍼넌트는 순수함수처럼 이루어져있습니다.

이 말이 무슨말이냐..하면, 내가 받는 인자에 따라서 언제나 동일한 값을 반환하고 있다는 말입니다.

하지만 그렇게 되기위해서는 Props가 변경되지 않아야 합니다. 그렇기 때문에 Props가 읽기전용이어야 한다는 말입니다.

무슨말인지 다시한번 설명하겠습니다.

아래와 같은 함수를 봅시다
```javascript
function sum(a, b){
    return a + b;
}
```
위 함수는 늘 같은 결과만을 반환하겠죠?

컴퍼넌트도 마찬가지입니다. 항상 동일한 입력에 대한 동일한 결과를 반환하기 때문에 입력받은 인자 (즉 Props)는 읽기전용 이라는 말입니다.

### 그럼 궁금증이 생깁니다.

Props값이 변경되야 하면 어떻게 하죠?? 보여줘야 하는 데이터가 수정이 안된다?? 보여주기만을 위한 View는 의미가 없다고 생각 될 수 있습니다.

그럴땐! 다른 어디선가 Props를 변경하고 다시 Component를 호출 하면 되겠죠?

그렇습니다. 다시 Component를 호출합니다.. 그럼 렌더링도 전부 되냐고 생각하시는 분.. 이전 포스트를 다시 보고 오셔야 할 듯합니다..

React에서 비교해서 **변경이 필요한 부분만** 가상DOM을 그려줍니다.

# 마치며
Component에 대해서 알아보았습니다.

각 기능별로 컴퍼넌트화 한다는 부분이 새롭게(좋거나 혹은 나쁘거나) 느껴질 수 있습니다.
물론 컴퍼넌트화로 인해서 코드가 많아지고 계층구조가 복잡할 수 있겠으나, 그로인해 얻는 이점인 분할된 기능들에 대한 관리나 재사용성이 매우 높아지기 때문에 매우 중요한 개념입니다!

다음 포스트에서는 React의 상태와 생명주기에 대해서 알아보겠습니다.


# 참고
http://webframeworks.kr/tutorials/react/components-and-lifecycle/
