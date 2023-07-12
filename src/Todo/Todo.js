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
        const { userInfo } = this.props

        return (
            <div className="max-w-md mx-auto bg-gray-200 p-4 rounded-md shadow h-full">
                <span>Welcome {userInfo}!</span>
                <h1 className="text-2xl font-bold mb-4">To-Do App</h1>
                <div className="flex mb-4">
                    <input
                        type="text"
                        className="w-full mr-2 py-1 px-2 border border-gray-400 rounded"
                        placeholder="Enter a new task"
                        value={newTodo}
                        onChange={this.handleInputChange}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
                        onClick={this.setTodo}
                    >
                        Add
                    </button>
                </div>
                <ul className="space-y-2">
                    {todoList.map((todo) => (
                        <div key={todo.id} className="max-w-md bg-white p-5 mb-1">
                            <div className="flex justify-between">
                                <div>
                                    {todo.isEditing ? (
                                        <input
                                            type="text"
                                            className="w-full mr-2 py-1 px-2 border border-gray-400 rounded"
                                            value={todo.text}
                                            onChange={(e) => this.handleUpdateInputChange(todo.id, e)}
                                        />
                                    ) : (
                                        <span className="ml-2">{todo.text}</span>
                                    )}
                                </div>
                                <div className="flex pl-2">
                                    {todo.isEditing ? (
                                        <button
                                            className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded mr-2"
                                            onClick={() => this.saveUpdatedTodo(todo.id)}
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded mr-2"
                                            onClick={() => this.toggleUpdate(todo.id)}
                                        >
                                            Edit
                                        </button>
                                    )}
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded mr-2"
                                        onClick={() => this.removeTodo(todo.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <div className="mt-4 border-t border-gray-200 border-t-2">
                                <h4 className="p-3">Comments</h4>
                                <input
                                    type="text"
                                    className="w-full mr-2 py-1 px-2 border border-gray-400 rounded"
                                    placeholder="Enter a comment"
                                    value={commentText}
                                    onChange={this.handleCommentInputChange}
                                />
                                <div className="flex justify-end mt-2">
                                    <button
                                        className="bg-blue-500  hover:bg-blue-600 text-white py-1 px-4 rounded"
                                        onClick={() => this.addComment(todo.id)}
                                    >
                                        Add Comment
                                    </button>
                                </div>
                                <div className="mt-2">
                                    <div className="space-y-2">
                                        {todo.comments.map((comment) => (
                                            <div key={comment.id} className="flex justify-between">
                                                <div>
                                                    {editingCommentId === comment.id ? (
                                                        <input
                                                            type="text"
                                                            className="w-full mr-2 py-1 px-2 border border-gray-400 rounded"
                                                            value={comment.text}
                                                            onChange={(e) =>
                                                                this.handleUpdateCommentInputChange(todo.id, comment.id, e)
                                                            }
                                                        />
                                                    ) : (
                                                        <span>{comment.text}</span>
                                                    )}
                                                </div>
                                                <div className="flex pl-2">
                                                    {editingCommentId === comment.id ? (
                                                        <button
                                                            className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded mr-2"
                                                            onClick={() => this.saveUpdatedComment(todo.id, comment.id)}
                                                        >
                                                            Save Comment
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded mr-2"
                                                            onClick={() => this.toggleUpdateComment(comment.id)}
                                                        >
                                                            Edit Comment
                                                        </button>
                                                    )}
                                                    <button
                                                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
                                                        onClick={() => this.removeComment(todo.id, comment.id)}
                                                    >
                                                        Delete Comment
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {/* <div>
                                        <span>asdasd</span>
                                        <button>b</button>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </ul>
            </div >
        )
    }
}