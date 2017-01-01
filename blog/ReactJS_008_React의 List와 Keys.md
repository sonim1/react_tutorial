# List & Key
목록을 View에서 표현할 때 주로 List를 사용합니다.

Foreach나 For를 사용해서 Element를 만들어 주는게 보통인데 과연 React에서는 어떤식으로 사용을 할까요?

React에 대해서 알아보기 전!

우선 자바스크립트의 map에 대해서부터 알아보도록 하겠습니다.

## 자바스크립트 map()
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled) //[2, 4, 6, 8, 10]
```

map과 forEach는 거의 동일한데 다른점은 같은 길이의 배열이 나오냐 안나오냐의 차이정도가 있습니다.
위 예제를 예로들면 `doubled`변수에 map함수는 동일한 길이의 결과값을 return해주지만 forEach를 사용했다면 `doubled`는 **undefined** 입니다.

그런 이유로 map과 forEach의 용도가 다르다는 걸 잊지마세용.

## 여러 컴퍼넌트 렌더링
JSX에서는 중괄호를 사용하여 Element를 구축할 수 있습니다.

```javascript
const names = ['kendrick', 'christopher', 'theo', 'dave'];
const listItem = names.map((name) =>
    <li>{name}</li>
);
```
위에서 만든 listItem을 render에 넘겨줍시다.
li는 ul아래 있어야 겠죠

```javascript
ReactDOM.render(
    <ul>{listItem}</ul>,
    document.getElementById('root');
);
```

![스크린샷 2016-12-30 오후 8.49.57](</assets/스크린샷 2016-12-30 오후 8.49.57.png>)

위와같이 노출되게 됩니다.

## 기본 리스트 컴퍼넌트
예제로 사용하는 Name 리스트를 컴퍼넌트로 묶어주는 작업을 해봅시다.

```javascript
function NameList(props){
    const names = props.names;
    const listItem = names.map((name) =>
        <li>{name}</li>
    );
    return (
        <ul>{listItem}</ul>
    );
};

const names = ['kendrick', 'christopher', 'theo', 'dave'];
ReactDOM.render(
    <NameList names={names} />,
    document.getElementById('root')
);
```

컴퍼넌트화 시켜서 렌더링 시키니깐 잘 동작 하는가 싶은데.. console창을 보세요. warning이 발생하고 있습니다..!

```
react.js:3639 Warning: Each child in an array or iterator should have a unique "key" prop. Check the render method of `NameList`. See https://fb.me/react-warning-keys for more information.
    in li (created by NameList)
    in NameList
```

li에 key가 없답니다.

List에는 각 항목을 구분해주는 key값이 필요합니다.


```javascript
function NameList(props){
    const names = props.names;
    const listItem = names.map((name) =>
        //키값 추가
        <li key={name.toString()}>{name}</li>
    );
    return (
        <ul>{listItem}</ul>
    );
};

const names = ['kendrick', 'christopher', 'theo', 'dave'];
ReactDOM.render(
    <NameList names={names} />,
    document.getElementById('root')
);
```

li에 key attribute를 추가해 줍니다.
key는 현재는 name값을 넣어줬지만.. 일반적으로 항목을 고유하게 식별 할 수 있는 값으로 지정합니다.

### 1. data의 고유한 id를 사용하는 경우
```javascript
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

### 2. 명확한 식별자가 없을 때, 색인을 사용하는 경우
차선책으로 쓰는방법입니다.
일반적으로 위와같이 고유한 식별값으로 지정해주시고 만약 그런 값이 없다면 이 방법을 고려해볼 수 있습니다.

```javascript
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```

## 유의사항
### 1. 키는 배열의 컨텍스트에 의미가 있습니다.
아래 코드를 보시면 li가 직접 배열이 생성되지 않고 ListItem이 li를 대신해 배열화 됩니다.
그렇기 때문에 key를 `li`가 아닌 `ListItem`에 할당 해 줘야 합니다.

```javascript
function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

### 2. 키는 형제중 유일해야합니다.
키는 형제 중 유일해야 합니다.
이말은 반대로 형제가 아닐경우 유일하지 않아도 된다는 말입니다.

아래 코드를 보시면 `sidebar`와 `content` 두군대에서 같은 posts 리스트를 서로 다른 요소로 렌더링해 줍니다.

그렇기 때문에 key로 사용하는 id가 동일 하지만, `sidebar`와 `content`는 형제요소가 아니기 때문에 id를 키값으로 각각 사용 가능합니다.
```javascript
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```

## JSX 내부에서 map() 사용하기
JSX 생성시 내부에 map을 사용할 수 있습니다.
변수로 만들어서 해당 변수를 JSX에 사용하는게 아닌 바로 생성해주는 것이죠
이를 사용하면 코드가 훨씬 간결하고 이해하기 쉽습니다.

아래 예제를 보시죠

```javascript
function NameList(props){
    const names = props.names;
    return (
        <ul>
        //변수가 아닌 JSX 내부에서 직접 map을 사용한다.
        {names.map((name) =>
            <ListItem key={name.toString()} value={name} />
        )}
        </ul>
    )
}
```

지금까지는 `listItems`라는 변수에 map을 이용해서 엘리먼트를 생성 후 전달해 주었지만, 위 소스에서는 ListItem컴퍼넌트 생성을 JSX내부에서 직접 map을 이용해서 해주고 있습니다.

코드가 명확해지지만, 특정한 경우에는 오히려 더 복잡해질 수 있습니다.
예를 들면 JSX 내부에 map을 너무 많이 사용하면 더 복잡하겠죠? 변수로 처리해주는게 훨씬 좋습니다.

변수를 추출해서 할지 위와같이 JSX 내부에서 map을 사용해서 처리할지는 개발자가 결정해야 합니다.

# 마치며
List는 어떤 화면에서라도 사용 될 수 있는 필수 기능이기에 React와 JSX에서 어떻게 사용되는지 확실히 숙지하고 가야합니다.

다음 포스트에서는 Forms에 대해서 알아보겠습니다.

오늘도 화이팅 합니다
