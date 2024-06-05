import { Component } from 'react';
import CardList from './comoponents/card-list/card-list.component';
import SearchBox from './comoponents/search-box/search-box.component';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: '',
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((users) => this.setState(
        ()=> {
          return {monsters: users};
        },
        ()=> {
          console.log(this.state)
        }
      )
    );
  }

  onSearchChange = (event) => {
      let searchField = event.target.value.toLocaleLowerCase();
      this.setState(
        () => {
          return { searchField }
        }
      )
    }

  render() {

    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    let filteredMonsters =  monsters.filter((monster)=> {
      return monster.name.toLocaleLowerCase().includes(searchField)
    })
    return (
      <div className="App">
        <SearchBox
          className={"search-box"}
          onChangeHandler={onSearchChange}
          placeHolder={"Search Monsters"}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
