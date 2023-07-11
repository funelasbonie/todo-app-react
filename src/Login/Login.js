import React from "react";
import Todo from "../Todo/Todo";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            signedIn: false,
            error: ''
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleRegister = (event) => {
        event.preventDefault();
        const { username, password } = this.state;
        
        if (username !== '' && password !== '') {
            const user = { username, password };
            
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const existingUser = users.find((u) => u.username === username);
            if (existingUser) {
                this.setState({ error: 'Username already exists.' });
                return;
            }
            
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            this.setState({ signedIn: true });
        }
    };

    handleLogin = (event) => {
        event.preventDefault();
        const { username, password } = this.state;
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u) => u.username === username && u.password === password);
        if (user) {
            this.setState({ signedIn: true });
        } else {
            this.setState({ error: 'Invalid username or password.' });
        }
    };

    render() {
        const { username, password, signedIn, error } = this.state;

        if (signedIn) {
            return <Todo userInfo={username} />;
        }

        return (
            <div>
                <h2>Login</h2>
                <form>
                    <label>
                        Username:
                        <input type="text" name="username" value={username} onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input type="password" name="password" value={password} onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <button type="submit" onClick={this.handleRegister}>Register</button>
                    <button type="submit" onClick={this.handleLogin}>Login</button>
                </form>
                {error && <p>{error}</p>}
            </div>
        );
    }
}