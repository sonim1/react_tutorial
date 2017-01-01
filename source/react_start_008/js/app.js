// function NameList(props){
//     const names = props.names;
//     const listItem = names.map((name) =>
//         <li key={name.toString()}>{name}</li>
//     );
//     return (
//         <ul>{listItem}</ul>
//     );
// };

function NameList(props){
    const names = props.names;
    return (
        <ul>{names.map((name) =>
            <ListItem key={name.toString()} value={name} />
        )}</ul>
    );
};

function ListItem(props){
    return <li>{props.value}</li>;
}

const names = ['kendrick', 'christopher', 'theo', 'dave'];
ReactDOM.render(
    <NameList names={names} />,
    document.getElementById('root')
);
