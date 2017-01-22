# 들어가기에 앞서..
React는 강력한 Composition 모델을 가지고 있으며, 컴퍼넌트간의 코드 재사용을 위해서 Inheritance(이하 상속) 대신에 Composition(이하 합성)을 사용하기를 권장하고 있습니다.



## 합성과 상속이란?
객체지향에서 기능의 재사용을 하기 위해서 사용하는 대표적인 기법입니다.

### 상속 - Inheritance
다른 부모클래스를 먼저 만듭니다.
자식클래스는 이 부모클래스를 상속받아서 구현을 정의합니다.

is-a 라고도 합니다.

### 합성 - Composition
서로다른 객체를 여러개 붙여서 새로운 기능이나 객체를 구성합니다.
일반적으로 합성 할 클래스를 변수에 할당 후 사용하는 구조입니다.
이렇게 합성 한 경우, 상속과는 다르게 클래스간의 유기적으로 서로의 클래스를 융통성있게 합성 할 수 있습니다.

has-a 라고도 합니다.

## 상속과 합성 무엇을 선택해야 할까?
아래와 같은 이유로 GoF 디자인패턴에서는 클래스 상속보다 객체 합성이 더 나은 방법이라고 합니다.


```
합성 vs 상속
- 합성을 사용한 코드를 변경하는 것이 상속을 사용한 코드를 변경하는 것보다 노력이 덜 든다.
- 상속을 사용한 코드는 일반적으로 합성을 사용한 코드보다 더 빨리 동작한다.
- 전통적인 방법을 따라서 상속을 사용하기가 모호한 경우 합성을 우선 고려하는 것이 좋다.
- 상속이냐, 합성이냐의 결정에서 고민할 때 다음과 같이 처리한다.
- 자식 클래스를 사용해야 하는 곳에 부모 클래스를 사용할 수 있다면 상속으로 제작
- 클래스가 단지 다른 클래스의 서비스만을 이용한다면 합성으로 제작
- 새로 디자인 하려는 클래스가 기존 클래스와 유사한 형태라면 상속으로 제작
```

상속의 경우 너무 복잡해질 여지가 있습니다. 기능이 변경되거나 추가될 때 마다 상속이 많아져서 Depth가 깊어질 수록 복잡해 질 것입니다.
그리고 상속 시 private을 제외한 것들이 노출될 염려가 있습니다.

상속 최상위 클래스가 변경되면 자손 클래스에도 전부 영향을 주게 됩니다.
하위레벨에서 기능 분리로 클래스가 나뉜다면 기능의 조합 수에 따라서 클래스가 증가합니다.

지금까지는 일반적인 객체지향에서의 합성과 상속에 대해서 이야기 했습니다.

### 결론은?
상속은 재사용의 관점보다는 기능 확장에 사용합니다.
재사용을 하기 위해서는 합성(Composition) has-a 방식을 사용합시다.

# React - 합성 vs 상속
다시 React로 돌아오도록 하겠습니다.

공식 문서에서는 React는 강력한 합성 모델을 가지고 있으며, 상속 대신 합성을 사용하여 구성 요소간의 코드를 재사용하는 것이 좋다고 가이드 하고 있습니다.

Facebook에서도 역시 React를 사용하며 Component를 상속 계층으로 만드는 것이 권장되는 사용 사례를 찾지 못했다고 합니다.

즉 합성(composition)을 사용한다는 결론.

그렇다면 합성을 어떻게 사용하는지 알아보겠습니다.

## Containment
예를들면 컴퍼넌트로 Dialog나 Sidebar를 만든다고 합시다.
일반적으로 이런 특수한 컴퍼넌트의 경우 재사용을 합니다.
허나 내용을 어떻게 그려줘야 할지 미리 알지 못합니다.

그렇기 때문에 컴퍼넌트 호출 시 `props.children`을 이용해서 그려줄 요소를 받아 올 수 있습니다.

```javascript
function Border(props) {
    return (
        <div>
            {props.children}
        </div>
    );
}

function WelcomeDialog() {
    return (
        <div>
            <Border>
                {/* Border 컴퍼넌트가 구현 할 요소를 선언. props.children으로 호출한다.*/}
                <h1 className="Dialog-title">
                    Welcome
                </h1>
                <p className="Dialog-message">
                    Thank you for visiting our spacecraft!
                </p>
            </Border>
            <Border>
                {/* Border 컴퍼넌트가 구현 할 요소를 선언. props.children으로 호출한다.*/}
                <h1 className="Dialog-title">
                    Second Title
                </h1>
                <p className="Dialog-message">
                    Wassup
                </p>
            </Border>
        </div>
    );
}

ReactDOM.render(
    <WelcomeDialog/>, document.getElementById('root')
);
```

props.children을 사용해서 Border 컴퍼넌트를 재사용 하는 예제입니다.

같은 `Border`지만 내용을 다르게 전달해주어 다르게 표시 됩니다.

혹은 아래와 같은 방법으로도 사용 할 수 있습니다.

이 방식은 일반적이진 않지만 여러개의 패널이 필요한 등의 구조가 필요할 때, 자신만의 규칙을 만들어서 요소를 전달해 줄 수 있습니다.

```javascript
function Contacts(){
    return (
        <div>Contacts!</div>
    );
}

function Chat(){
    return (
        <div>Chat!</div>
    );
}

function SplitPane(props) {
    return (
        <div className="SplitPane">
            <div className="SplitPane-left">
                {props.left}
            </div>
            <div className="SplitPane-right">
                {props.right}
            </div>
        </div>
    );
}

function App() {
    return (
        <SplitPane left={<Contacts />} right={<Chat />}/>
    );
}

ReactDOM.render(
    <App/>, document.getElementById('root')
);
```

`SplitPane` 컴퍼넌트 생성 시 left/right에 컴퍼넌트를 전달해 줍니다.
`SplitPane` 내부에서는 props의 left와 right를 전처리기로 넣어 줍니다.

위와같이 자신만의 규칙으로 재사용성이 있는 컴퍼넌트를 만들어 줄 수 있습니다.

이런식으로 사용 할 경우 사용자 Event를 상위 컴퍼넌트에서 구현 해 줄 수도 있습니다.

이 부분은 긴 설명보다 공식문서를 참고해 주세요

# 마치며
원래 문서의 제목의 의미를 파악하는데 쓸데없이 오래 걸렸습니다.
합성 vs 상속이라고 하고 상속얘기는 있지도 않고!
두가지 방법으로 사용한다는 의미인줄 알았으나 결국 상속이 아닌 합성(Composition) 패턴을 사용해야 한다는 말이었습니다.
다음 포스트 12. React로 생각하기로 돌아오겠습니다.

오늘도 화이팅입니다.

# 참고
[공식문서](https://facebook.github.io/react/docs/composition-vs-inheritance.html)
[oops4u - 상속 vs 합성](http://www.oops4u.com/163)
[Mr 후크의 잡동사니 - is-a, has-a의 관계](http://mrhook.co.kr/64)
[sagara - 재사용 관점에서 객체의 상속 VS 조립 (INHERITANCE VS. COMPOSITION)](http://www.sagarablog.com/?p=191)
