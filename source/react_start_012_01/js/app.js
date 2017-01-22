class FilterableMusicTable extends React.Component {
    render() {
        return (
            <div>
                <SearchBar/>
                <MusicTable music={this.props.music}/>
            </div>
        );
    }
}

class SearchBar extends React.Component {
    render() {
        return (
            <form>
                <input type="text" placeholder="Search..." value=""/>
                <p>
                    <input type="checkbox"/> {' '}
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
        this.props.music.forEach(function(music) {
            if (music.category !== lastCategory) {
                rows.push(<MusicCategoryRow category={music.category} key={music.category}/>);
            }
            rows.push(<MusicRow music={music} key={music.title}/>);
            lastCategory = music.rows;
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

class MusicRow extends React.Component {
    render() {
        var name = this.props.music.favorite
            ? <span style={{color: 'red'}}>
                    {this.props.music.title}
                </span>
            : this.props.music.title;
        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.music.artist}</td>
            </tr>
        );
    }
}

class MusicCategoryRow extends React.Component {
    render() {
        return <tr>
            <th colSpan="2">{this.props.category}</th>
        </tr>;
    }
}
var MUSIC_DATAS = [
    {
        category: 'POP',
        title: '24K Magic',
        artist: 'Bruno Mars',
        favorite: true
    }, {
        category: 'POP',
        title: 'Sugar',
        artist: 'Maroon 5',
        favorite: false
    }, {
        category: 'POP',
        title: '24K Magic',
        artist: 'Bruno Mars',
        favorite: false
    }, {
        category: 'POP',
        title: 'Closer',
        artist: 'The Chainsmokers',
        favorite: false
    }, {
        category: 'EDM',
        title: 'GOLD',
        artist: 'Kiiara',
        favorite: false
    }, {
        category: 'EDM',
        title: 'Lush Life',
        artist: 'Zara Larsson',
        favorite: false
    }, {
        category: 'EDM',
        title: 'Make It Bun Dem',
        artist: 'Skrillex',
        favorite: true
    }
]

ReactDOM.render(
    <FilterableMusicTable music={MUSIC_DATAS}/>, document.getElementById('root'));
