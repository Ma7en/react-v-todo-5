import { useState, useEffect } from "react";
import axios from "axios";

// import style
import "./App.css";

// components
import Table from "./components/Table";
import TodoForm from "./components/TodoForm";
import { apiLink } from "./utils/constants";
import BestChange from "./components/ads/bestchange/BestChange";

function App() {
    const [todos, setTodos] = useState("");
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiLink}todo/`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setTodos(response.data);
            setisLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className=" px-8 bg-indigo-100 min-h-screen ">
            <nav className="pt-8">
                <h1 className=" text-5xl text-center pb-8">To Do List </h1>
            </nav>
            {/* Body */}
            <TodoForm setTodos={setTodos} fetchData={fetchData} />
            <Table todos={todos} isLoading={isLoading} setTodos={setTodos} />

            <BestChange />
        </div>
    );
}

export default App;
