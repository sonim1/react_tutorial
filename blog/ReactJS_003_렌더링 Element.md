# 렌더링 요소 - Rendering Elements
우리는 이전 포스트를 통해서 JSX를 이용해 렌더링 요소를 만들어봤습니다.

```javascript
const element = <h1>Hello, world</h1>;
```
네 이겁니다

# DOM에 Element를 렌더링
ReactDOM을 사용하면 Elements를 DOM에 렌더링 할 수 있습니다.
ReactDOM.render();을 이용해서 넣어줍시다!

```html
<div id="root"></div>
```
root가 있네요

```javascript
const element = <h1>Hello, world</h1>;
ReactDOM.render(
  element,
  document.getElementById('root') // root에 element를 렌더링 시켜줍니다.
);
```

# ReactDOM은 필요한 것만 업데이트 한다.
ReactDOM은 변경되는 부분이 있다면 그 부분만 변경합니다.

일반적인 DOM이 아니고 Virtual DOM이기 때문에 변경된 부분만 찾아서 변경해줍니다.

아래 예제를 보겠습니다.
```javascript
//app.js
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

소스를 보시면 1초마다 tick메서드를 호출 해서 element를 렌더링 해줍니다.

element에는 아래와 같은 코드가 있습니다.
현재 시간을 문자열로 떨어뜨려 주고 있습니다.
매번 tick을 호출 한다면 해당 부분의 값이 바뀌기 때문에 DOM을 매번 새로 그려주어야 할것입니다.

```javascript
<h2>It is {new Date().toLocaleTimeString()}.</h2>
```

하지만 아래 스샷을 보시다시피 ReactDOM으로 그릴 경우 변경된 부분만 렌더링 해주고 있습니다.

![스크린샷 2016-12-12 오후 9.15.56](</assets/스크린샷 2016-12-12 오후 9.15.56.png>)

# 마치며
뭔가 매번 급하게 끝내는 느낌이..?

매 포스트는 각 주제에 대해서 깊이 아시기 전 가장 중요한 부분을 짚고 끝내고 있습니다.

다음 포스트는 지금까지 작성한 코드를 이용해서 Component와 Props에 대해서 알아보겠습니다.


# 참고
https://facebook.github.io/react/docs/rendering-elements.html
