# Forms
우리가 일반적으로 알고 있는 Forms이란 아래와 같은 것이죠

```html
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```

submit을 클릭하면 form의 지정된 url로(없으면 현재페이지로) 새로고침 될 것입니다.

만약 특정 기능을 수행하게 하고 싶다면, 자바스크립트 기능을 추가해서 처리 할 수 있겠죠.

이번 포스트에서는 React에서 input, textarea, select등의 요소를 어떻게 제어할지 알아보겠습니다.

## Controlled Component
Controlled Component는 State에 따라서 값을 갱신하는 컴퍼넌트입니다.

value에 할당된 state값을 직접 갱신하고 전달하기 때문에 기본적으로 권장하는 컴퍼넌트 사용방식입니다.

## Uncontrolled Component
Component에서 제어를 관리하지않는 Component입니다.

value에 state를 직접 할당하지 않기 때문에 기본값을 `defaultValue`로 지정해 줍니다.

이 방식은 빠르게 작성할수 있지만 코드가 더러워지며 사용자 입력에 따른 변화를 수동적으로 관리해주어야 하기 때문에 필요한 경우가 아니라면 Controlled Component를 사용하길 권장합니다.

아래 설명은 우선 Controlled Component 방식으로 설명되며 Uncontrolled Component ref요소를 설명하는 포스트 작성 이후에 설명예정입니다.

우선은 그런게 있구나 하시고 넘어가시면 될 것 같습니다.

그래도 궁금하신분은 아래 링크 참고!

[Uncontrolled Component - Docs](https://facebook.github.io/react/docs/uncontrolled-components.html)


## input 요소 제어하기
React는 단일된 state를 가지고 있습니다.
그리고 사용자 입력에서 발생하는 이벤트를 제어해서 state를 관리합니다.
이런 방식으로 React에 의해서 값이 제어되는 상태를 `controlled component`라고 합니다.

```javascript
class NameForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {value : ''};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e){
        alert('value - ' + this.state.value);
        e.preventDefault();
    }

    handleChange(e){
        this.setState({value: e.target.value});
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Name :
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

ReactDOM.render(
    <NameForm />,
    document.getElementById('root')
);
```

state.value가 `handleChange` 컨트롤러에 의해서 설정되고, handleSubmit을 통해서 alert을 띄웁니다.

handleChange를 통해서 입력값에 대한 유효성 검사나 사용자 입력을 쉽게 수정 할 수 있겠죠.

이와같이 controlled component를 사용하면 모든 상태 변화에 연관된 핸들러 함수를 사용 할 수 있습니다.

## textarea 요소 제어하기
HTML은 textarea사용 시 input처럼 value에 값을 넣지 않고 자식요소에 텍스트를 넣어줍니다.
```html
<textarea>
  Hello there, this is some text in a text area
</textarea>
```
일반적으로 textarea에서 값을 할당하거나 가져올 때는 value같은 속성이 아닌 자식요소를 가져와야 하지만..!

react의 textarea는 하위요소 대신 value 속성을 사용합니다.
즉 React는 input과 동일하게 쓸 수 있어요. 작업 시 고민이 하나 줄어 들겠네요 :)

아래 소스를 봅시다 달라진건 textarea로 표시하는 label이 추가된 것.

```javascript
class NameForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {value : ''};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e){
        alert('value - ' + this.state.value);
        e.preventDefault();
    }

    handleChange(e){
        this.setState({value: e.target.value});
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <label> Name :
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <hr/>
                //Textarea 추가
                <label> Name2 :
                    <textarea value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

ReactDOM.render(
    <NameForm />,
    document.getElementById('root')
);
```
단지 Label하나만 더 추가되었습니다.
ㅊ
이 소스의 특징이라면 Name과 Name2는 같은 state.value를 바라보기 때문에 한쪽을 수정하면 다른 한쪽도 즉시 반영됩니다!

## Select 요소 제어하기
Select요소는 HTML에서 일반적으로 아래와 같이 사용합니다.
```html
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
```
select 하나에 여러개의 option으로 구성되어 있지요.
그리고 Coconut에는 `selected` 옵션이 선언되어 있습니다.
해당 Select 항목의 기본 선택값으로 지정된다는 의미입니다.

이걸 React에서는 어떻게 작성 할까요?

textarea와 마찬가지로 select에도 value가 있습니다.
별도로 optino에 selected를 선언해줄 필요 없이 select의 value값과 동일한 option항목이 선택되게 됩니다.

세가지 요소 input, textarea, select 모두 handleChange 컨트롤러를 사용하고 있습니다.

직접 사용자입력을 해보시면 느끼실 수 있겠지만

```javascript
class NameForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {value : ''};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e){
        alert('value - ' + this.state.value);
        e.preventDefault();
    }

    handleChange(e){
        this.setState({value: e.target.value});
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <label> Name :
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <hr/>
                <label> Name2 :
                    <textarea value={this.state.value} onChange={this.handleChange} />
                </label>
                <hr/>
                <label>
                    Pick your favorite La Croix flavor:
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option></option>
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option value="coconut">Coconut</option>
                        <option value="mango">Mango</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

ReactDOM.render(
    <NameForm />,
    document.getElementById('root')
);
```

React에서는 하나의 state값을 가지고 있으며, 사용자 이벤트에 따른 즉각적인 상태 변화가 이루어 집니다.

기본 HTML을 가지고 자바스크립트로 처리하게 되면 컴퍼넌트와 기능이 많아질 경우 코드의 양이 길어지고 컴퍼넌트별로 관리하기가 힘듭니다.

하지만 React에서는 보시다시피 ReactComponent 내부 controller단에서 처리하기 때문에 관리도 쉽고 코드도 훨씬 간결해집니다.



# 마치며
React의 Forms에 대해서 알아보았습니다.

input, textarea, select등의 사용법은 예제를 보시면 쉽게 이해갈 것 입니다.

이번 포스트에서는 Controlled Component가 어떤 식으로 동작하는지 개념을 파악하시는데 집중하시면 좋을 듯합니다.

Uncontrolled Component는 추후 DOM의 ref 요소 관련된 설명 이후 포스트 예정이니 기다려주세요.

다음 포스트에서는 Lifting State Up이 무엇인지 알아보도록 합시다.
