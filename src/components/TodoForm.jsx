/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";

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
        try {
            await axios.post(`${apiLink}todo/`, newTodo, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setNewTodo({ body: "" });
            setTodos((prevTodos) => [...prevTodos, newTodo]);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    // const handleKeyDown = (e) => {
    //     if (e.key === 'Enter') {
    //         postTodo();
    //     }
    // }

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
                    value={newTodo.body}
                    className="input input-bordered input-info w-full max-w-xs"
                    onChange={handleChange}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            postTodo();
                        }
                    }}
                    autoComplete="off"
                />

                <button
                    onClick={postTodo}
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
