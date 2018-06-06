import React, { Component } from 'react';


export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nameValue:'',
		}
	}

	handleNameChange = (e) => {
		this.setState({
			nameValue: e.target.value,
		})
	}

	setUserName = (e) => {
		
		if(e.which === 13 || e.keyCode === 13) {
			this.props.setUserName(this.state.nameValue);
			this.props.setPageChange();
    }
	}


	render() {
		return (
			<div className="login-App">
					<h4>請輸入你的名字：</h4>
					<input type="text" placeholder="your name" value={this.state.nameValue} onChange={this.handleNameChange}
					       onKeyPress={this.setUserName}></input>

			</div>
		)
	}
}
