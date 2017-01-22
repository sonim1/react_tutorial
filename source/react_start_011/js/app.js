// function Border(props) {
//     return (
//         <div>
//             {props.children}
//         </div>
//     );
// }
//
// function WelcomeDialog() {
//     return (
//         <div>
//             <Border>
//                 {/* Border 컴퍼넌트가 구현 할 요소를 선언. props.children으로 호출한다.*/}
//                 <h1 className="Dialog-title">
//                     Welcome
//                 </h1>
//                 <p className="Dialog-message">
//                     Thank you for visiting our spacecraft!
//                 </p>
//             </Border>
//             <Border>
//                 {/* Border 컴퍼넌트가 구현 할 요소를 선언. props.children으로 호출한다.*/}
//                 <h1 className="Dialog-title">
//                     Second Title
//                 </h1>
//                 <p className="Dialog-message">
//                     Wassup
//                 </p>
//             </Border>
//         </div>
//     );
// }
//
// ReactDOM.render(
//     <WelcomeDialog/>, document.getElementById('root'));
//
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
    <App/>, document.getElementById('root'));
