/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useState } from "react";
import {
    MdOutlineDeleteOutline,
    MdEditNote,
    MdOutlineCheckBox,
    MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";

// utils
import { apiLink } from "../utils/constants";

const Table = ({ todos, isLoading, setTodos }) => {
    const [editText, setEditText] = useState({
        body: "",
    });

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`);
            const newList = todos.filter((todo) => todo.id !== id);
            setTodos(newList);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = async (id, value) => {
        try {
            const response = await axios.patch(`${apiLink}todo/${id}/`, value);
            // console.log(response.data);
            const newTodos = todos.map((todo) =>
                todo.id === id ? response.data : todo
            );
            setTodos(newTodos);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        // console.log(e.target.value);
        setEditText((prev) => ({
            ...prev,
            body: e.target.value,
        }));
        console.log(editText);
    };

    const handleClick = () => {
        handleEdit(editText.id, editText);
        setEditText({
            body: "",
        });
    };

    const handleCheckbox = (id, value) => {
        // console.log(value.completed);
        handleEdit(id, {
            completed: !value,
        });
    };

    return (
        <div>
            <div className="container  mx-auto my-10">
                <table className="w-full">
                    <thead className="border-b-2 border-black">
                        <tr className="text-black">
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">
                                Checkbox
                            </th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">
                                To Do
                            </th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">
                                Status
                            </th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">
                                Date Created
                            </th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading ? (
                            <>
                                <tr>
                                    <td>
                                        <div>Is Loading </div>
                                    </td>
                                </tr>
                            </>
                        ) : (
                            <>
                                {todos.length > 0 &&
                                    todos?.map((todoItem, index) => (
                                        <tr
                                            key={index}
                                            className="border-b border-black"
                                        >
                                            <td className="p-3">
                                                <span
                                                    onClick={() =>
                                                        handleCheckbox(
                                                            todoItem.id,
                                                            todoItem.completed
                                                        )
                                                    }
                                                    className="inline-block cursor-pointer"
                                                >
                                                    {todoItem.completed ===
                                                    true ? (
                                                        <MdOutlineCheckBox />
                                                    ) : (
                                                        <MdOutlineCheckBoxOutlineBlank />
                                                    )}
                                                </span>
                                            </td>

                                            <td
                                                className="p-3 text-sm "
                                                title={todoItem.id}
                                            >
                                                {todoItem.body}
                                            </td>

                                            <td className="p-3 text-sm  text-white">
                                                <span
                                                    className={`p-1.5 text-xs font-medium tracking-wider rounded-md ${
                                                        todoItem?.completed
                                                            ? "bg-green-300"
                                                            : "bg-red-300"
                                                    }`}
                                                >
                                                    {todoItem?.completed
                                                        ? "Done"
                                                        : "Incomplete"}
                                                </span>
                                            </td>

                                            <td className="p-3 text-sm font-medium">
                                                {new Date(
                                                    todoItem.created
                                                ).toLocaleString()}
                                            </td>

                                            <td className="p-3 text-sm font-medium grid grid-flow-col items-center mt-5 ">
                                                <span className="text-violet-900">
                                                    <label htmlFor="my-modal">
                                                        <MdEditNote
                                                            onClick={() =>
                                                                setEditText(
                                                                    todoItem
                                                                )
                                                            }
                                                            className=" text-xl cursor-pointer"
                                                        />
                                                    </label>
                                                </span>

                                                <span className=" text-xl cursor-pointer text-red-700">
                                                    <MdOutlineDeleteOutline
                                                        onClick={() =>
                                                            handleDelete(
                                                                todoItem.id
                                                            )
                                                        }
                                                    />
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                            </>
                        )}
                    </tbody>
                </table>

                {/* Modal */}
                <input type="checkbox" id="my-modal" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg" title="Update Todo">
                            <label htmlFor="update_text">Update Todo</label>
                        </h3>

                        <input
                            type="text"
                            name="text"
                            id="update_text"
                            value={editText.body}
                            onChange={handleChange}
                            placeholder="Type here"
                            className="input input-bordered w-full mt-8"
                        />

                        <div className="modal-action">
                            <label htmlFor="my-modal" className="btn">
                                Close
                            </label>

                            <label
                                htmlFor="my-modal"
                                onClick={handleClick}
                                className="btn btn-primary"
                            >
                                Update
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;
