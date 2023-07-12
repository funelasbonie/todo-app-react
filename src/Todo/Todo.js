import React from "react";

export default class Todo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todoList: [],
            newTodo: '',
            commentText: '',
            editingCommentId: null,
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
                id: Date.now(), //make it guid
                text: this.state.newTodo,
                isEditing: false,
                comments: [],
            },
        ];

        this.setState({ todoList: newTodos, newTodo: '' });
    }

    toggleUpdate = (id) => {
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









    handleCommentInputChange = (e) => {
        this.setState({ commentText: e.target.value });
    }

    handleUpdateCommentInputChange = (todoId, commentId, e) => {
        const updatedTodos = this.state.todoList.map((todo) => {
            if (todo.id === todoId) {
                const updatedComments = todo.comments.map((comment) => {
                    if (comment.id === commentId) {
                        return {
                            ...comment,
                            text: e.target.value,
                        };
                    }
                    return comment
                })
                console.log("updatedComments: ", updatedComments)
                return {
                    ...todo,
                    comments: updatedComments
                };
            }
            return todo;
        });
        this.setState({ todoList: updatedTodos });
    }

    addComment = (id) => {
        const { todoList, commentText } = this.state;
        const updatedTodos = todoList.map((todo) => {
            if (todo.id === id) {
                const newComment = {
                    id: Date.now(),
                    text: commentText,
                };
                return {
                    ...todo,
                    comments: [...todo.comments, newComment],
                };
            }
            return todo;
        });

        this.setState({ todoList: updatedTodos, commentText: '' });
    }

    removeComment = (todoId, commentId) => {
        const updatedTodos = this.state.todoList.map((todo) => {
            if (todo.id === todoId) {
                const updatedComments = todo.comments.filter(
                    (comment) => comment.id !== commentId
                );
                return {
                    ...todo,
                    comments: updatedComments,
                };
            }
            return todo;
        });

        this.setState({ todoList: updatedTodos });
    }

    toggleUpdateComment = (commentId) => {
        this.setState({ editingCommentId: commentId });
    }

    saveUpdatedComment = (todoId, commentId) => {
        const updatedTodos = this.state.todoList.map((todo) => {
            if (todo.id === todoId) {
                const updatedComments = todo.comments.map((comment) => {
                    if (comment.id === commentId) {
                        return {
                            ...comment,
                            text: this.state.commentText,
                        };
                    }
                    return comment;
                });
                return {
                    ...todo,
                    comments: updatedComments,
                };
            }
            return todo;
        });

        this.setState({
            todos: updatedTodos,
            commentText: '',
            editingCommentId: null,
        });
    }



















    render() {
        const { todoList, newTodo, commentText, editingCommentId } = this.state;

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
                    {
                        todoList.map((todo) => (
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
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Enter a comment"
                                        value={commentText}
                                        onChange={this.handleCommentInputChange}
                                    />
                                    <button onClick={() => this.addComment(todo.id)}>Add Comment</button>
                                    <ul>
                                        {
                                            todo.comments.map((comment) => (
                                                <li key={comment.id}>
                                                    {
                                                        editingCommentId === comment.id
                                                            ? (<input type="text" value={comment.text} onChange={(e) => this.handleUpdateCommentInputChange(todo.id, comment.id, e)} />)
                                                            : (comment.text)
                                                    }
                                                    {
                                                        editingCommentId === comment.id
                                                            ? (<button onClick={() => this.saveUpdatedComment(todo.id, comment.id)}>Save Comment</button>)
                                                            : (<button onClick={() => this.toggleUpdateComment(comment.id)}>Edit Comment</button>)
                                                    }
                                                    <button onClick={() => this.removeComment(todo.id, comment.id)}>Delete Comment</button>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}