# React에서의 조건부 렌더링
조건부 렌더링이란 React render시 특정 조건에 따른 동작을 하게 하는 것입니다.

사실 그냥 if문 사용과 다를게 없습니다. 이해하기 어렵지 않으실겁니다 하하

아래 소스를 참고해보면

```javascript
render() {
    const isLoggedIn = this.state.isLoggedIn;

    let button = null;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
}
```

isLoggedIn 메서드에 따라서 LogoutButton일지 LoginButton 일지 button변수에 할당해 줍니다.

그 후 return 시 {button}으로 넣어주면 렌더링 시 isLoggedIn여부에 따라 다른 컴퍼넌트가 노출되겠죠?

즉 isLoggedIn이 True일 경우 아래와 같이 return 해줄겁니다.
```javascript
return (
  <div>
    <Greeting isLoggedIn={isLoggedIn} />
    <LogoutButton onClick={this.handleLogoutClick} />;
  </div>
);
```

## 논리연산자 &&을 이용하여 조건주기
논리연산자 &&을 이용하여 조건을 줄 수 있습니다.

```javascript
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}
```
조건 && expression입니다.
조건이 true일 경우에는 && 이후에 위치한 expression을 반환하고, false일 경우 expression을 반환하지 않고 무시합니다.

&&나 ||은 아래와 같이 사용 할 수 있다는 점을 아시면 쉽게 이해가는 구문입니다.
string의 경우 ''(공백)을 제외하면 true라는 점을 기억하세요.
```javascript
console.log(true && 1 > 0 && 'success'); //success
console.log(true && 1 < 0 && 'success'); //false
console.log(1 > 0 || 'success'); //true
console.log(1 < 0 || 'success'); //success
```


## 삼항연산자를 이용한 조건주기
삼항연산자는 아래와 같습니다.

`조건 ? 참 : 거짓`

조건이 참일경우에는 참 부분이 거짓일 경우에는 거짓인 부분이 return 됩니다.

```javascript
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

isLoggedIn이 true일경우 currently, false일 경우 not이 출력 되겠죠?

## 컴퍼넌트 렌더링 방지

컴퍼넌트가 다른 컴퍼넌트에 의해 렌더링 되었을 때에도 구성요소를 숨길 수 있습니다.

아래 컴퍼넌트는 warn값을 받아서 해당값이 false일 경우 null을 return합니다.

React에서는 null, undefined, 공백에 대해서는 렌더링 하지 않기 때문에 아래 코드는 warn 값에 의해서 렌더링되거나 되지 않습니다.

```javascript
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}
```
