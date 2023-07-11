import React from "react";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            signedIn: false
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { username, password } = this.state;

        if (username !== '' && password !== '') {
            this.setState({ signedIn: true });
        }
    };

    render() {
        const { username, password, signedIn } = this.state;

        if (signedIn) {
            return <h2>Welcome, {username}!</h2>;
        }

        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={this.handleFormSubmit}>
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
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}