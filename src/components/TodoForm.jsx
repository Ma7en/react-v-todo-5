/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

// plugin
import Toast from "../plugin/Toast";

// uitls
import { apiLink } from "../utils/constants";

const TodoForm = ({ setTodos, fetchData }) => {
    const [newTodo, setNewTodo] = useState({
        body: "",
    });

    const handleChange = (e) => {
        setNewTodo((prev) => ({
            ...prev,
            body: e.target.value,
        }));
    };

    const postTodo = async () => {
        if (!newTodo?.body) {
            Toast("error", "Enter Data!");
            return;
        }

        try {
            await axios.post(`${apiLink}todo/`, newTodo, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setNewTodo({ body: "" });
            fetchData();
            Toast("success", "Todo created successfully!");
        } catch (error) {
            console.log(error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            postTodo();
        }
    };

    return (
        <>
            <div className="text-center">
                <label htmlFor="newtodo" className="hidden">
                    New Todo
                </label>
                <input
                    type="text"
                    id="newtodo"
                    name="newtodo"
                    placeholder="Add Todo"
                    value={newTodo?.body}
                    className="input input-bordered input-info w-full max-w-xs"
                    onChange={(e) => {
                        handleChange(e);
                    }}
                    onKeyDown={(e) => {
                        handleKeyDown(e);
                    }}
                    autoComplete="off"
                    required
                />

                <button
                    onClick={() => {
                        postTodo();
                    }}
                    className="btn btn-primary ml-2"
                    title="Add todo"
                >
                    Add todo
                </button>
            </div>
        </>
    );
};

export default TodoForm;
