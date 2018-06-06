import React, { Component } from 'react';
import Calendar from 'react-calendar';
import welcome_img from '../image/welcome_img.jpg';
import './css/dashboard.css';



export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      text: '',
      
      
    }
  }
  
  onChange = (date) => this.setState({ date });
  
  handleChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  addTodo = (e) => {
    if(e.which === 13 || e.keyCode === 13) {
      this.props.addTodo(this.state.text);
      this.setState({
        text: '',
      })
    }
  }
  

  render() {
    
    return (
      <div className="DashBoard">
        <div className="welcome">
          <img src={welcome_img}></img>
        </div>
        <div className="below">
          <div className="calendar">
            <Calendar onChange={this.onChange} value={this.state.date} />
          </div>
          <div className="next_meeting">
            <h3>畢 業 倒 數 </h3>
            <span>{this.state.date.getDate()}</span>
            <p> days </p>
          </div>
          <div className="next_todos">
            <h3>本週待辦</h3>
            <div className="todos">
              <ul>
                {this.props.todos.map(todo => <li>{todo}</li>)}
              </ul>
              </div>
            <input type="text" value={this.state.text} placeholder="add a goal" onChange={this.handleChange} onKeyPress={this.addTodo}></input>
          </div>
        </div>

      </div>
    )
  }
}

