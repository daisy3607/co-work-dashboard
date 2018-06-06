import React, { Component } from 'react';
import avatar from './image/mouse.jpg';
import Login from './login';
import Dashboard from './components/dashboard';
import BrainStorming from './components/brainStorm';
import './App.css';
import io from 'socket.io-client';
import { CLIENT_RENEG_LIMIT } from 'tls';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io('http://localhost:8888'),
      login: 1,
      userName: '',
      todos: [],
      proposal: [],
      dashboard: 1,
    }
  }

  componentDidMount() {
    
    this.callApi()
    .then(res => this.setState({todos: res.data}))
    .catch(err => console.log(err));

    this.callProposalApi()
    .then(res => this.setState({proposal: res.data}))
    .catch(err => console.log(err));

    this.state.socket.on('add task', this.handleNewtask); 

  }

  callApi = async () => {
    const response = await fetch('/data');    
    const body = await response.json();
    
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  callProposalApi = async () => {
    const response = await fetch('/proposal');    
    const body = await response.json();
    
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  handleNewtask = (newTitle) => {
    
    let newTask = {title: newTitle, good: 0, bad: 0};
    
    this.setState({
      proposal: [...this.state.proposal, newTask],
    })
  }

  setUserName = (name) => {
    this.setState({
      userName: name,
    })
  }

  addTodo = (txt) => {
    this.setState({
      todos: [...this.state.todos, txt],
    })
  }

  addIdea = (idea) => {
    this.state.socket.emit('add new task', idea);
  }


  handleDashBoard = () => {
    
    this.setState({
      dashboard: 1,
    })
  }

  handleNoDashBoard = () => {
    
    this.setState({
      dashboard: 0,
    })
    
  }

  render() {
    
    return (
      <div className="App">
      
      <nav>
        <div className="user">
          <img src={avatar}></img>
          <h3>{this.state.userName}</h3>
        </div>
        <div className="menu">
          <ul>
              <li onClick={this.handleDashBoard}>Dashboard</li>
              <li><div onClick={this.handleNoDashBoard}>BrainStorming</div></li>
          </ul>
        </div>        
      </nav>
      <div className="renderWrapper">
      {this.state.dashboard? <Dashboard todos={this.state.todos} addTodo={this.addTodo} />
      : <BrainStorming proposal={this.state.proposal} addIdea={this.addIdea} />}
        
      </div>
    </div>
      
    )
  }
        
}

export default App;
