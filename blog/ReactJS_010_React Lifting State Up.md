# 같은 state를 공유하는 두개의 컴퍼넌트
상태 올리기라는건 언제 쓰는걸 까요?
그 이유를 알기 위해서 State를 공유하는 두개의 컴퍼넌트에 대해서 알아보겠습니다.

공식문서에서 제공하는 아래 예제를 통해서 설명해 보도록 하겠습니다.
화씨와 섭씨를 각각 받을 수 있는 컴퍼넌트가 있다고 합니다.
UI는 아래와 같이 노출됩니다.

![스크린샷 2017-01-02 오후 8.37.18](</assets/스크린샷 2017-01-02 오후 8.37.18.png>)

위 스크린샷을 보면 두개의 컴퍼넌트가 있습니다.

소스를 한번 보시겠습니다.

```javascript
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {value: ''};
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  render() {
    const value = this.state.value;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={value}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);
```

`Calculator`라는 컴퍼넌트가 존재하고 하위에 `TemperatureInput` 컴퍼넌트를 2개 사용하고 있습니다.
이때 scale 값을 넘겨서 이 값에 따른 처리를 `TemperatureInput` 컴퍼넌트에서 하고 있습니다.

컴퍼넌트의 내부에서 state를 관리하기 때문에 섭씨 Component와 화씨 Component는 서로 전혀 공유되지 않습니다.

그렇다면 섭씨와 화씨 컴퍼넌트를 서로 같은 state를 써서 업데이트 하게 하려면 어떻게 사용 해야 할까요?

# Lifting State Up
드디어.. 이번 포스트의 주제 상태 올리기에 대해서 알아보겠습니다.
위 예제는 보시다시피 각각의 Component가 각자의 state를 바라보기 때문에 서로 전~혀 연관이 없네요..

이를 어떻게 처리 할까요?

## 섭씨 <-> 화씨 변경 함수 추가
컴퍼넌트를 수정 하기 전에 우선 섭씨를 화씨로 그리고 화씨를 섭씨로 바꾸는 함수를 작성해줍니다.

```javascript
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
```

그리고 위에서 만든 함수와 온도값을 받아서 소수점 3자리로 계산하여 return해주는 함수인 tryConvert를 만들어줍니다.

```javascript
function tryConvert(value, convert) {
  const input = parseFloat(value);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```

위 함수는 `toCelsius()`, `toFahrenheit()` 함수를 convert로 전달하여 return 시켜줍니다.

예를 들면 `tryConvert(31, toFahrenheit)`와 같이 사용 할 수 있습니다.
이말은 섭씨 31도를 화씨로 바꿔서 return해 줍니다.

만일 value가 숫자형식이 아니면 공백을 return해 줍니다.

## 상태 올리기
상태 올리기의 원리는 간단합니다.
하위 Component에 props로 상위 Component의 함수를 전달해 주고, 하위 Component 에서는 그 함수를 호출하는 것입니다.
여기서 중요한건 위와 별개로 State가 상단에서 관리되어야 한다는 것입니다.
두가지를 조합하면 답이 나옵니다.
상위 컴퍼넌트에서 State를 가지고 있으며, State를 변경해주는 함수를 하위 컴퍼넌트에서 호출한다.

위에서 설명한 동작을 위하여 하위 컴퍼넌트를 아래와 같이 수정해줍시다.

```javascript
class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e.target.value);
    }

    render() {
        const value = this.props.value;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={value} onChange={this.handleChange}/>
            </fieldset>
        );
    }
}
```

input의 onChange가 동작하면..handleChange함수를 통해서 props의 onChange를 호출합니다.
props의 onChange를 호출하면 뭐가 호출 될까요? 아래 소스를 봅시다.

```javascript
const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(value, convert) {
    const input = parseFloat(value);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {
            value: '',
            scale: 'c'
        };
    }

    handleCelsiusChange(value) {
        this.setState({scale: 'c', value});
    }

    handleFahrenheitChange(value) {
        this.setState({scale: 'f', value});
    }

    render() {
        const scale = this.state.scale;
        const value = this.state.value;
        const celsius = scale === 'f'
            ? tryConvert(value, toCelsius)
            : value;
        const fahrenheit = scale === 'c'
            ? tryConvert(value, toFahrenheit)
            : value;

        return (
            <div>
                <TemperatureInput scale="c" value={celsius} onChange={this.handleCelsiusChange}/>
                <TemperatureInput scale="f" value={fahrenheit} onChange={this.handleFahrenheitChange}/>
                <BoilingVerdict celsius={parseFloat(celsius)}/>
            </div>
        );
    }
}
```

TemperatureInput에서 onChange 이벤트 시 아래와 같이 handleChange() 함수를 호출하는 부분 기억하시나요?
```javascript
handleChange(e) {
    this.props.onChange(e.target.value);
}
```

여기서 this.props.onChange();는 컴퍼넌트 생성시 넘겨준 props겠죠?

```javascript
return (
    <TemperatureInput scale="c" value={celsius} onChange={this.handleCelsiusChange}/>
);
```

즉 위에 `this.props.onChange(e.target.value);`는 `handleCelsiusChange(e.target.value);`와 동일합니다.

BoilingVerdict 컴퍼넌트는 celsius를 이용하여 온도에 따른 텍스트를 출력해 주는 컴퍼넌트입니다.

결국 단방향 바인딩 방식은 유지 한 채로 State를 올리고 함수를 호출하여 이와 같이 사용 할 수 있습니다.


# 마치며
다시 공부하면서 React의 이런 부분을 보니 Redux를 왜 쓰는지 다시한번 생각하게 되네요.
다음포스트에서는 OOP의 개념으로 많이 유명한 Composition(합성)과 Inheritance(상속)에 대해서 알아보겠습니다.

즐프하세요
