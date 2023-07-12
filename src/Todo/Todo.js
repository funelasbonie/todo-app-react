import React from "react";

export default class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todoList: [],
            newTodo: '',
        };
    }

    handleInputChange = (event) => {
        const { value } = event.target;
        this.setState({ newTodo: value });
    }

    handleUpdateInputChange = (id, e) => {
        const updatedTodos = this.state.todoList.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    text: e.target.value,
                };
            }
            return todo;
        });
        this.setState({ todoList: updatedTodos });
    }

    setTodo = () => {
        if (this.state.newTodo.trim() === '') {
            return;
        }

        const newTodos = [
            ...this.state.todoList,
            {
                id: Date.now(),
                text: this.state.newTodo,
                isEditing: false,
            },
        ];

        this.setState({ todoList: newTodos, newTodo: '' });
    }

    toggleUpdate = (id) => {
        console.log("updatedTodos: ", updatedTodos)
        const updatedTodos = this.state.todoList.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    isEditing: !todo.isEditing,
                };
            }
            return todo;
        });
        this.setState({ todoList: updatedTodos });
    }

    saveUpdatedTodo = (id) => {
        const updatedTodos = this.state.todoList.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    isEditing: false,
                };
            }
            return todo;
        });
        this.setState({ todoList: updatedTodos });
    }

    removeTodo = (id) => {
        const updatedTodos = this.state.todoList.filter((todo) => todo.id !== id);
        this.setState({ todoList: updatedTodos });
    }

    render() {
        const { todoList, newTodo } = this.state;

        return (
            <div>
                <h1>To-Do App</h1>
                <div>
                    <input
                        type="text"
                        placeholder="Enter a new task"
                        value={newTodo}
                        onChange={this.handleInputChange}
                    />
                    <button onClick={this.setTodo}>Add</button>
                </div>
                <ul>
                    {todoList.map((todo) => (
                        <li key={todo.id}>
                            {
                                todo.isEditing
                                    ? (<input type="text" value={todo.text} onChange={(e) => this.handleUpdateInputChange(todo.id, e)} />)
                                    : (<span>{todo.text}</span>)
                            }
                            {
                                todo.isEditing
                                    ? (<button onClick={() => this.saveUpdatedTodo(todo.id)}>Save</button>)
                                    : (<button onClick={() => this.toggleUpdate(todo.id)}>Edit</button>)
                            }
                            <button onClick={() => this.removeTodo(todo.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}