# React에서의 이벤트 처리
React에서는 이벤트를 함수에 연결해줍니다.
DOM에 onclick을 사용해서 처리하는 것과 비슷하게 사용합니다.
주의해야 할 특징으로는 아래와 같이 있습니다.

- 이벤트는 camelCase를 사용합니다. (onclick X -> onClick O)
- {}(이벤트처리기)로 함수이름를 전달합니다.

## 이벤트 사용
아래 코드 보시면 그 차이를 한눈에 보실 수 있습니다.

```javascript
//Javascript onclick event
<button onclick="activateLasers()">
  Activate Lasers
</button>

//React onClick Event
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

DOM에 onclick을 사용하듯이 리액트에서는 onClick에서 전처리기를 통해 함수명을 전달해 줍니다.

## 이벤트 취소
또다른 차이로는 이벤트 취소가 있습니다.

자바스크립트에서 a태그 사용 시, onclick 이벤트를 사용하면 href의 경로로 이동하게 되는데 이를 방지하기 위해 아래와 같이 사용하고 있습니다.

```javascript
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```
return false;로 추후 이벤트를 취소하여 href url의 링크이동을 막아주고 있습니다.

React에서는 이를 아래와 같이 막아 줄 수 있습니다.

```javascript
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

e.preventDefault();를 이용해서 발생할 다른 이벤트를 차단해줍니다.

## 이벤트 처리 함수에 관하여
이벤트 처리 시 호출하는 함수에 관한 문제에 대해서 다룹니다.

공식문서에서 제공하는 Toggle컴퍼넌트 소스를 보겠습니다.

```javascript
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    //this를 사용하기 위해서 bind를 해주어야 합니다.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

생성자 내부를 보시면 `this.handleClick = this.handleClick.bind(this)`구문이 존재합니다.

이 부분이 없다면 handleClick() 호출 시 this는 null입니다.

bind 없이 호출 시 handleClick()의 this가 null 혹은 undefined 혹은 window가 되는데 왜일까요?

바로 render에서 해당 함수를 호출하기 때문입니다.

그렇기 때문에 생성자에서 this를 bind 해줘야 해당 컴퍼넌트의 this를 사용 할 수 있습니다.

## bind가 아닌 익명함수로 this값 주기 - 1
이 방법은 Create React App에서 기본적으로 사용하는 방법입니다.

바로 Arrow Function을 사용해서 handleClick에 익명함수를 할당하는 방식입니다.

```javascript
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
      console.log('this is:', this);
  };

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

class내부에서 생성된 arrow function의 주소를 handleClick에 할당해주기 때문에 this를 우리가 의도하는 방향으로 사용 할 수 있습니다.

## bind가 아닌 익명함수로 this값 주기 - 2

```javascript
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
```
onClick에서 익명함수로 e를 전달해줍니다. 하지만 이렇게 사용 할 경우 추가 재 렌더링을 수행 할 수도 있습니다.
일반적으로 성능문제 등으로 인하여 생성자에서 bind하는 방식을 공식문서에서는 권장하고 있습니다.
