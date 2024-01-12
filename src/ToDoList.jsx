import { useState } from "react"

export default function ToDoList(){

    const [tasks, setTasks] = useState(["Eat breakfast", "Write some code", "Go for a walk"])
    const [newTask, setNewTask] = useState("")

    function handleInputChange(event){
        setNewTask(event.target.value)
    }

    function addTask(){

        if (newTask.trim() !== ""){
            setTasks(prev => [...prev, newTask])
            setNewTask("")
        }
        
    }

    function deleteTask(index){

        const updatedTasks = tasks.filter((_, i) => {
            return i !== index
        } )
        setTasks(updatedTasks)

    }

    function moveTaskUp(index){

        if (index > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = 
            [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
        
    }

    function moveTaskDown(index){

        if (index < tasks.length - 1){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = 
            [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
        
    }

    function moveToTop(index){
        if (index > 0){
            let updatedTasks = [tasks[index],...tasks]
            updatedTasks.splice(index + 1, 1)
            setTasks(updatedTasks)
        }
    }


    return (
        <div className="to-do-list">
            <h1>To-Do-List</h1>

            <div>
                <input 
                    type="text" 
                    placeholder="Enter a task..."
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button
                    className="add-button"
                    onClick={addTask}
                >
                    Add
                </button>


                <ol>
                    {tasks.map((task, index) =>
                        <li key={index}>
                            <span className="text">{task}</span>
                            <button 
                                className="delete-button"
                                onClick={() => deleteTask(index)}>
                                Delete
                            </button>
                            <button 
                                className="move-button"
                                onClick={() => moveToTop(index)}>
                                🔝
                            </button>
                            <button
                                className="move-button"
                                onClick={() => moveTaskUp(index)}>
                                👆
                            </button>
                            <button 
                                className="move-button"
                                onClick={() => moveTaskDown(index)}>
                                👇
                            </button>
                        </li>
                    )}
                </ol>
            </div>
        </div>
    )
}