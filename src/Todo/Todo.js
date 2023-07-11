import { directive } from "@babel/types";
import React from "react";

export default class Todo extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { userInfo } = this.props
        return (
            <div>
                <h4>Welcome {userInfo}</h4>
                <div>To Do App</div>
            </div>
        )
    }
}