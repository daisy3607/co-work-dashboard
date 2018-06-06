import React, { Component } from 'react';
import Calendar from 'react-calendar';
import './css/brainStorm.css';



export default class BrainStorm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTitle: '',
    }

  }

  renderTask = (idea) => {
    return (
      <div className="task-Wrapper">
      <h3>{idea.title}</h3>
    
    </div>
    )
  }

  handleChange = (e) => {
    this.setState({
      newTitle: e.target.value,
    })
  }

  addIdea = () => {
    this.props.addIdea(this.state.newTitle);
    this.setState({
      newTitle: '',
    })

    
  }

  render() {
    {this.props.proposal}
    return(
      
        <div className="schedule-App">
          
          {this.props.proposal.map(this.renderTask)} 
          <div className="add-Task-Wrapper">
            <input className="title" placeholder="title..." value={this.state.newTitle} onChange={this.handleChange}></input>
            <button className="add-idea-btn" onClick={this.addIdea}> add idea+ </button>
          </div>


        </div>
    );
  }
}