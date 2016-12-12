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
