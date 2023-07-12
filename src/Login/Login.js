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
    }

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
    }

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
    }

    render() {
        const { username, password, signedIn, error } = this.state;

        if (signedIn) {
            return <Todo userInfo={username} />;
        }

        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 shadow-md rounded-md">
                    <h2 className="text-2xl font-bold mb-4">Login</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Username:</label>
                            <input
                                type="text"
                                name="username"
                                value={username}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                                onChange={this.handleInputChange} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                                onChange={this.handleInputChange} />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                            onClick={this.handleRegister}>Register</button>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 mt-3"
                            onClick={this.handleLogin}>Login</button>
                    </form>
                    {error && <p>{error}</p>}
                </div>
            </div>
        )
    }
}