# React로 생각하기
이번 공식문서의 파트 제목은 Thinking in React 입니다.
아마도 Thinking in C++, Thinking in Java 등 유명한 시리즈가 있는데 이에대한 오마쥬가 아닌가 싶습니다.

React 구조 설계에 대한, 어렵지않지만 매우 중요한 내용을 설명하고 있습니다.

# 모의 기능을 만들기
음악 리스트를 JSON형식으로 받아서 이를 테이블로 볼수 있고 필터 할 수 있는 기능의 테이블을 만들어 봅시다.

## 1. UI를 Component 계층 구조로 만들기위한 준비
지금부터 만들 필터 테이블은 아래와 같은 화면으로 구성됩니다.

![스크린샷 2017-01-21 오후 1.55.58](</assets/스크린샷 2017-01-21 오후 1.55.58.png>)

이 화면에 사용될 JSON 데이터는 아래와 같습니다.

```javascript
var MUSIC_DATAS = [
    {
        category: 'POP',
        title:    '24K Magic',
        artist:   'Bruno Mars',
        favorite: true
    }, {
        category: 'POP',
        title:    'Sugar',
        artist:   'Maroon 5',
        favorite: false
    }, {
        category: 'POP',
        title:    '24K Magic',
        artist:   'Bruno Mars',
        favorite: false
    }, {
        category: 'POP',
        title:    'Closer',
        artist:   'The Chainsmokers',
        favorite: false
    }, {
        category: 'EDM',
        title:    'GOLD',
        artist:   'Kiiara',
        favorite: false
    }, {
        category: 'EDM',
        title:    'Lush Life',
        artist:   'Zara Larsson',
        favorite: false
    }, {
        category: 'EDM',
        title:    'Make It Bun Dem',
        artist:   'Skrillex',
        favorite: true
    }
]
```

위 데이터를 이용해서 React 구조로 어떻게 만드는지 알아 보도록합시다.

## 2. React 구조로 정적 버전 만들기
우선 정적 버전을 만들어 보도록 하겠습니다.

기능은 나중에 추가 하고 JSON 데이터를 어떻게 사용하여 화면을 구성하는지 보도록 합시다.

React 컴퍼넌트 구조로 생각한다면 위의 뷰는 아래와 같이 나눌 수 있습니다.

![스크린샷 2017-01-21 오후 2.07.57](</assets/스크린샷 2017-01-21 오후 2.07.57.png>)

왼쪽은 위 뷰를 컴퍼넌트 별로 나눈것이고

오른쪽은 나눈것에 대한 컴퍼넌트 명을 적었습니다.

트리로 보면 아래와 같은 구조입니다.

- FilterableProductTable
    - SearchBar
    - ProductTable
        - ProductCategoryRow
        - ProductRow


하위 컴퍼넌트로 내려가며 전체 화면을 구성합니다.

상호작용이 없는 버전이기 때문에 아직 State도 사용하지 않습니다.
State는 대화형 작업, 즉 앱 사용 하는중에 변경되는 데이터에 대해서만 사용하기 때문에 아직 State는 사용하지 않습니다.

Props와 State의 차이를 아직 잘 모르시겠는 분은 이전 포스트를 참고해주세요.

그럼 이제 동작없이 기본 뷰만 구성하는 코드를 작성해보겠습니다.

아래 링크를 통해서 데모와 소스를 보실 수 있습니다.

[소스보기]()
[데모보기]()

## State 사용하기
대화형 인터페이스를 사용하기 위해서는 State를 통해서 변경사항을 제어해 줘야 합니다.
그러므로 현재 앱에서 필요한 최소한의 변경 가능한 상태를 고려해 봐야 합니다.

우리 예제에서의 변경사항은 아래 두 가지 정도가 되겠습니다.
- 사용자가 입력한 텍스트로 필터링
- 체크박스에 따른 필터링

```javascript
class FilterableMusicTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inFavoriteOnly: false
        };
    }

    render() {
        return (
            <div>
                <SearchBar filterText={this.state.filterText} inFavoriteOnly={this.state.inFavoriteOnly}/>
                <MusicTable music={this.props.music} filterText={this.state.filterText} inFavoriteOnly={this.state.inFavoriteOnly}/>
            </div>
        );
    }
}
```

`FilterableMusicTable` Component에서 생성자를 추가 했습니다.
state에 우리가 사용 필터링에 사용할 입력텍스트와 체크박스 정보를 담을 수 있게 추가해 줍니다.

이후 `SearchBar`, `MusicTable` Component에 데이터를 전달해 줍니다.

하위 Component에서 어떻게 적용한지 아래와 같이 확인 할 수 있습니다.

```javascript
class SearchBar extends React.Component {
    render() {
        return (
            <form>
                //filterText를 추가해줍니다.
                <input type="text" placeholder="Search..." value={this.props.filterText}/>
                <p>
                    //checkbox 상태에 따른 체크 여부도 처리해 줍니다.
                    <input type="checkbox" checked={this.props.inFavoriteOnly}/> {' '}
                    Only Favorite Music
                </p>
            </form>
        );
    }
}

class MusicTable extends React.Component {
    render() {
        var rows = [];
        var lastCategory = null;
        this.props.music.forEach((music) => {
            //현재 music데이터의 값과 filterText, inFavoriteOnly 값을 비교해서 노출할지 안할지 처리
            if(music.title.indexOf(this.props.filterText) === -1 || (!music.favorite && this.props.inFavoriteOnly)){
                return;
            }
            if (music.category !== lastCategory) {
                rows.push(<MusicCategoryRow category={music.category} key={music.category}/>);
            }
            rows.push(<MusicRow music={music} key={music.title}/>);
            lastCategory = music.music;
        });
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Artist</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}
```

주석단 부분을 보시면 하위에서 어떻게 처리하신지 확인 할 수 있습니다.

아래 링크를 통해서 데모와 소스를 보실 수 있습니다.

[소스보기]()
[데모보기]()

이제 state를 변경하면 노출되는 테이블이 변경되는걸 확인 하실 수 있습니다.

하지만 아직 사용자 입력에 대한 처리를 해놓지 않았기 때문에 확인하려면 state할당 값을 강제로 바꿀 수 밖에 없겠네요

이제 사용자 입력에 대한 처리를 구현해 보겠습니다.

## 3. 사용자 이벤트에 따른 역데이터 흐름 추가
지금까지 Component 계층구조에 따라서 단방향으로 이루어지는 앱을 구현했습니다.
하지만 이전까지 진행한 앱은 사용자의 입력이 안되고 있습니다.
check상태와 input text의 value가 state에서 전해주는 값이기 때문입니다.

우리가 원하는건 사용자 입력에 따른 Filter구현입니다.

`SearchBar` Component에서 사용자 입력 Event가 발생하면 `FilterableProductTable` Component에 콜백을 전달하게 해서 setState를 발생시키는 기능을 추가해보겠습니다.


```javascript
class FilterableMusicTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inFavoriteOnly: false
        };

        //이벤트 처리 함수에서 현재 Component의 this를 사용할 수 있게 this를 bind해줍니다
        this.handleUserInput = this.handleUserInput.bind(this);
    }

    //UserInput을 처리해주는 함수를 작성합니다.
    //잘 이해가 안된다면 State올리기 포스트를 참고해주세요
    handleUserInput(filterText, inFavoriteOnly) {
        this.setState({
            filterText:     filterText,
            inFavoriteOnly: inFavoriteOnly});
    }

    render() {
        return (
            //SearchBar에 handleUserInput을 onUserInput Props로 넘겨주세요
            <div>
                <SearchBar filterText={this.state.filterText} inFavoriteOnly={this.state.inFavoriteOnly} onUserInput={this.handleUserInput}/>
                <MusicTable music={this.props.music} filterText={this.state.filterText} inFavoriteOnly={this.state.inFavoriteOnly}/>
            </div>
        );
    }
}
```

`SearchBar` Component에서 이벤트 발생 시 Props로 전달한 handlerUserInput 이벤트를 실행할 수 있게 해줍니다.

하위 컴퍼넌트에서 상위 이벤트를 호출하는 부분이 이해가 안되신다면 [React 상태(State) 올리기 포스트](http://sonim1.tistory.com/185)를 참고해주세요

SearchBar는 어떻게 구성되는지 변경된 부분을 보겠습니다.

```javascript
class SearchBar extends React.Component {
    //함수의 this 요소 바인딩을 위해서 생성자 추가
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    //input에서 사용자 이벤트 발생시 해당 함수 호출합니다.
    //이 함수에서는 위에서 전달받은 props.onUserInput() 함수를 통해서 값을 전달 해 줍니다.
    handleChange() {
        this.props.onUserInput(this.filterTextInput.value, this.inFavoriteOnlyInput.checked);
    }

    render() {
        return (
            <form>
                //ref를 사용해서 DOM에 대한 정보를 전달 할 수 있습니다.
                <input
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    ref={(input) => this.filterTextInput = input}
                    onChange={this.handleChange}
                />
                <p>
                    <input type="checkbox" checked={this.props.inFavoriteOnly} ref={(input) => this.inFavoriteOnlyInput = input}
                    onChange={this.handleChange} /> {' '}
                    Only Favorite Music
                </p>
            </form>
        );
    }
}
```
특이한게 보이네요

바로 ref입니다.

위처럼 콜백 함수를 통해서 `(input) => this.refName = input` 과 같이 사용 할 수 있습니다.
이후 `this.refName` 을 통해서 DOM정보를 가져온 후 값을 가져오는 등의 방식으로 사용 할 수 있습니다.

함수의 이름을 넣어서 `this.refs.refName`으로 접근해서 사용하는 방법도 있으나 이는 outdated 됐기 때문에 넘어가겠습니다.

```javascript
handleChange() {
    this.props.onUserInput(this.filterTextInput.value, this.inFavoriteOnlyInput.checked);
}
```
props로 받은 onUserInput을 통해 상단 컴퍼넌트의 함수를 호출 할 수 있습니다.

[소스보기]()
[다시보기]()

자 이제 원하는데로 동작하는 걸 확인 할 수 있습니다.

![스크린샷 2017-01-22 오후 8.55.40](</assets/스크린샷 2017-01-22 오후 8.55.40.png>)


# 마치며
React 문서의 기본을 이제야 끝내게 되네요

한번 다시 훑어보니.. React자체도 훌륭하지만 상태올리기 같은걸 보니 Redux의 절실함이 한층더 높아지네요.





# 참고
[Facebook React 공식문서](https://facebook.github.io/react/)
[Velopert - ref 사용하기](https://velopert.com/1148)
