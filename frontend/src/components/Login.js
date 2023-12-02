import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        axios.post('/api/auth/login', user)
            .then(res => {
                this.props.setUser(res.data);
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data
                });
            });
    }

    render() {
        return(
            <div>
                <h2>Login</h2>
                <form onSubmit={ this.handleSubmit }>
                    <div>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            name="email"
                            onChange={ this.handleInputChange }
                            value={ this.state.email }
                        />
                    </div>
                    <div>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            name="password"
                            onChange={ this.handleInputChange }
                            value={ this.state.password }
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}

export default Login;