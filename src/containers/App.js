import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import '../components/ErrorBoundary'
import './App.css';
import Scroll from '../components/Scroll'
import ErrorBoundary from '../components/ErrorBoundary';

class App extends Component{ //parent passes state to robot
    constructor(){ //App owns the states- so use constructor function 
        super()
        this.state = { // App component has 2 states (robots and searchfield)
            robots: [], // these state are passed down to render() as props
            searchfield: ''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({robots: users}));
    }
    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value}); //each time theres a change
    }

    render () { //communicates with cardList to find searched robots
        const {robots, searchfield} = this.state;//destructuring  
        const filteredRobots = robots.filter(robot =>{ //filters robots according to searchfield
            return robot.name.toLowerCase().includes(searchfield.toLowerCase()) //only includes robots from the searchfield
        })
       return !robots.length ? //if there's no robots
            <h1>Loading</h1> : //loading screen
        (                       //if there are robots
                <div className = 'tc'>
                    <h1 className = 'f2'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundary> 
                    </Scroll>
                </div>
        )
    }
}

export default App;