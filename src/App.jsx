import { useEffect, useState } from "react";
function App() {
  const [currentTask, setCurrentTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingText, setEditingText] = useState("");
  const [totaltasks,setTotaltasks] = useState();


  useEffect(() => {
    let loadedtasks = JSON.parse(localStorage.getItem("tasks"));
    if (loadedtasks) {
      setTasks(loadedtasks);
      
    }
    
  }, [])

 

  useEffect(() => {  localStorage.setItem("tasks", JSON.stringify(tasks))
    setTotaltasks(tasks.length)
   }, [tasks]);


  const setcurrenttask = (e) => {
    setCurrentTask(e.target.value);
  }

  const seteditingtext = (e) => {
    setEditingText(e.target.value);
  }

  const addTask = () => {
    setCurrentTask(currentTask.trim())
    if (currentTask != "") {
      const newTask = { task: currentTask, cstatus: false, editingMode: false }
      setTasks([...tasks, newTask])

    }
    else
      alert("Tasks cannot be empty")
    setCurrentTask("");
   
  }

  const deleteTask = (deleteindex) => {
    setTasks(tasks.filter((_, index) => index != deleteindex))
   
  }


  const mark = (markIndex) => (
    setTasks(tasks.map((item, index) => {
      if (index == markIndex) {
        return ({ ...item, cstatus: !item.cstatus })
      }
      else {
        return (item)
      }
    })));

  const toggleEditing = (eindex) => {
    setEditingText(tasks[eindex].task);
    if (!tasks[eindex].editingMode)
      setTasks(tasks.map((task, index) => ((index == eindex) ? { ...task, editingMode: !task.editingMode } : task)))
    else {

      setTasks(tasks.map((task, index) => ((index == eindex) ? { ...task, editingMode: !task.editingMode, task: editingText } : task)))
      setEditingText("");

    }

  }
  return (
    <div>
      <h1 className="heading">Task Manager</h1>
      <input className="taskEnter" type="text" value={currentTask} onChange={setcurrenttask} placeholder="Enter A Task" />
      <button className="taskAdd" onClick={addTask}>Add task</button>
      <p><b>Total tasks: {totaltasks}</b></p>

      <div className="TaskList">
        {
          tasks.length > 0 ?

            <ul className="list">
              {tasks.map((item, index) => (

                <li className="task" key={index}>
                  {
                    !(item.editingMode) ?
                      <span
                        style={{
                          textDecoration: item.cstatus ? "line-through" : "none",
                          color: item.cstatus ? "gray" : "black",
                        }}
                      >
                        {item.task}
                      </span> :
                      <input style={{ height: "30px", border: "none", background: "#f7f7f7" }} onChange={seteditingtext} value={editingText} className="editinginput" type="text" />

                  }



                  <button onClick={() => deleteTask(index)}>delete task</button>
                  <button onClick={() => mark(index)}>
                    mark {item.cstatus ? "undone" : "done"}
                  </button>
                  <button onClick={() => toggleEditing(index)}>{!item.editingMode ? "edit text" : "complete editing"}</button>
                </li>
              ))}
            </ul> :
            <p className="noTask">No tasks available</p>

        }
      </div>
      <div className="clearAll"><button onClick={()=>{setTasks(""); setTotaltasks(0)}}>clear all tasks</button></div>
    </div>
   
  )
}
export default App;