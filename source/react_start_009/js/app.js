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
