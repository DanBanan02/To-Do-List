import { useState } from 'react';
import './App.css';
import RemoveTrash from './assets/trash.png'
import SaveXtask from './assets/save.png'


function App()
 {

  const [NewTask, setNewTask] = useState(() => 
    {
      const savedTask = localStorage.getItem("tasks");

      if (savedTask)
      {
        return JSON.parse(savedTask);
      }

      return [];  
    });



  const [nextID, setNextId] = useState(() => 
  {
    if (NewTask.length === 0)
    {
      return 2;
    }

    const higestID = Math.max(
      ...NewTask.map((task) => task.Id)
    );

    return higestID + 1;
  });




  const [inputTitle, setInputTitle] = useState('');
  const [inputText, setInputText] = useState('');


  const [filterText, setFilterText] = useState('');
  const [searchText, setSearchText] = useState('');


  const [priority, setPriority] = useState('Low');
  const [filterOption, setFilterOption] = useState('All');


  const [deletingIDs, setDeletingIDs] = useState([]);
  const [loadingPercent, setLoadingPercent] = useState({});


  const [savedTaskID, setSavedTaskID] = useState(null);
  const [savingPercent, setSavingPercent] = useState({});






  function AddTask()
  {
    const taskId = nextID;
    const fullText = inputText;


    setNewTask([
      ...NewTask,
      {
        Id: nextID,
        NameOfTask: inputTitle,
        TheTask: inputText,
        VisibleText: "",

        Priority: priority,
        CreatedAt: Date.now()
      }

    ]);



    let letterIndex = 0;


    const typingInterval = setInterval(() =>
    {
      letterIndex++;


      setNewTask((prevTasks) =>
        prevTasks.map((task) =>
          task.Id === taskId
          ? {
              ...task,
              VisibleText: fullText.slice(0, letterIndex)
            }
          : task
        )
      );


      if (letterIndex >= fullText.length)
      {
        clearInterval(typingInterval);
      }


    }, 75);



    setNextId(SetId => SetId +1);

    setInputTitle('');
    setInputText('');
  }





/* Delete Section */

function DeleteTask(Id)

{
    setDeletingIDs((prevIDs) => [
        ...prevIDs,
        Id
    ]);


    setLoadingPercent((prevPercent) => ({
        ...prevPercent,
        [Id]: 0
    }));



    const loadingInterval = setInterval(() =>
    {
        setLoadingPercent((prevPercent) =>
        {
            const currentPercent = prevPercent[Id] ?? 0;


            if (currentPercent >= 100)
            {
                clearInterval(loadingInterval);


                return {
                    ...prevPercent,
                    [Id]: 100
                };
            }


            return {
                ...prevPercent,
                [Id]: currentPercent + 1
            };
        });


    }, 45);



    setTimeout(() =>
    {
        setNewTask((prevTasks) =>
            prevTasks.filter((task) => task.Id !== Id)
        );



        const savedTasks = JSON.parse(
          localStorage.getItem("tasks")
        ) || [];


        const updatedSavedTasks = savedTasks.filter(
            (task) => task.Id !== Id
        );


        localStorage.setItem(
          "tasks",
          JSON.stringify(updatedSavedTasks)
        );



        setDeletingIDs((prevIDs) =>
            prevIDs.filter((deleteId) => deleteId !== Id)
        );



        setLoadingPercent((prevPercent) =>
        {
            const updatedPercent = { ...prevPercent };


            delete updatedPercent[Id];


            return updatedPercent;
        });



        clearInterval(loadingInterval);


    }, 5650);

}





/* Save Section */

function SaveTask(task)
{

    setSavingPercent((prevPercent) => ({
        ...prevPercent,
        [task.Id]: 0
    }));



    const savingInterval = setInterval(() =>
    {
        setSavingPercent((prevPercent) =>
        {
            const currentPercent = prevPercent[task.Id] ?? 0;



            if (currentPercent >= 100)
            {
                clearInterval(savingInterval);


                return {
                    ...prevPercent,
                    [task.Id]: 100
                };
            }



            return {
                ...prevPercent,
                [task.Id]: currentPercent + 1
            };
        });


    }, 45);





    setTimeout(() =>
    {
        const savedTasks = JSON.parse(
          localStorage.getItem("tasks")
        ) || [];



        const taskAlreadySaved = savedTasks.some(
          (savedTask) => savedTask.Id === task.Id
        );



        let updatedTasks;



        if (taskAlreadySaved)
        {
          updatedTasks = savedTasks.map((savedTask) =>
            savedTask.Id === task.Id
            ? task
            : savedTask
          );
        }

        else
        {
          updatedTasks = [
            ...savedTasks,
            task
          ];
        }



        localStorage.setItem(
          "tasks",
          JSON.stringify(updatedTasks)
        );



        setSavingPercent((prevPercent) => ({
            ...prevPercent,
            [task.Id]: 100
        }));



        setSavedTaskID(task.Id);


        clearInterval(savingInterval);




        setTimeout(() =>
        {
            setSavedTaskID(null);



            setSavingPercent((prevPercent) =>
            {
                const updatedPercent = { ...prevPercent };


                delete updatedPercent[task.Id];


                return updatedPercent;
            });



        }, 450);



    }, 5650);

}





  console.log(NewTask);



  /* **************************
     SEARCH TASKS
  ************************** */

  let filteredTasks = NewTask.filter((task) =>
    task.NameOfTask
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );




  if (filterOption === "High")
  {
    filteredTasks = filteredTasks.filter((task) =>
      task.Priority === "High"
    );
  }



  if (filterOption === "Low")
  {
    filteredTasks = filteredTasks.filter((task) =>
      task.Priority === "Low"
    );
  }



  if (filterOption === "Newest")
  {
    filteredTasks = [...filteredTasks].sort((a, b) =>
      (b.CreatedAt ?? 0) - (a.CreatedAt ?? 0)
    );
  }



  if (filterOption === "Oldest")
  {
    filteredTasks = [...filteredTasks].sort((a, b) =>
      (a.CreatedAt ?? 0) - (b.CreatedAt ?? 0)
    );
  }





  return (
   <>


      <div className='title_Div'>


        {/* <h1 className='h1_title'>To do list:</h1> */}


          <h1 className='h1_title_1'>T</h1>
          <h1 className='h1_title_2'>o</h1>


          {/* Spaceing */}

          <h1>&nbsp;</h1>


          <h1 className='h1_title_3'>D</h1>
          <h1 className='h1_title_4'>o</h1>


          {/* Spacing */}

          <h1>&nbsp;</h1>


          <h1 className='h1_title_5'>L</h1>
          <h1 className='h1_title_6'>i</h1>
          <h1 className='h1_title_7'>s</h1>
          <h1 className='h1_title_8'>t</h1>
          <h1 className='h1_title_9'>:</h1>


      </div>

       <div className='Filter_options'>

        <p className='Choice_Filter' >Choose Filter</p>
        <select
          className={
            filterOption === "High"
              ? "Filter_High"
              : filterOption === "Low"
              ? "Filter_Low"
              : filterOption === "Newest"
              ? "Filter_Newest"
              : filterOption === "Oldest"
              ? "Filter_Oldest"
              : "Filter_All"
          }
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
        >


          <option className='Select_all' value="All" >
            
            All
          </option>

          <option className='Select_high' value="High">
            High Priority
          </option>

          <option className='Select_low' value="Low">
            Low Priority
          </option>

          <option className='Select_oldest' value="Oldest">
            Oldest
          </option>

          <option className='Select_newest' value="Newest">
            Newest
          </option>

        </select>


      </div>


      <div className='Filter_div'>


        <input
          className='Filter_input'
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder='Find a task'


          onKeyDown={(e) => 
          {
            if (e.key === "Enter")
            {
              setSearchText(filterText);
            }
          }}

        ></input>


      </div>

      <div className='Priority_select'>

        <p className='Priority_low_high'>Choose Priority For Task</p>
        <select 
          className={priority === "Low" ? "Low_Task" : "High_Task"}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >

          <option className='Low_Task' value="Low">
            Low-Priority Task
          </option>


          <option className='High_Task' value="High">
            High-Priority Task
          </option>


        </select>


      </div>
     

    <section className='sectionAll'>


      <div className='Task_title'>


        <input
          className='Title_input'
          type="text"
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
          placeholder="Enter Task Title"

          onKeyDown={(e) =>
          {
            if (e.key === "Enter")
            {
              AddTask();
            }
          }}

        ></input>


      </div>




      <div className='Task_text'>


        <input
          className='Text_input'
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}

          onKeyDown={(e) =>
          {
            if (e.key === "Enter")
            {
              AddTask();
            }
          }}

          placeholder="Enter Task Text"

        ></input>


      </div>


    </section>





    <div>


        <button
          className='addTask_btn'
          onClick={AddTask}
        >

          Add new task

        </button>




        <ol>


          {filteredTasks.map(task => (


            <li
              className='li_Box'
              key={task.Id}
              id={`task-${task.Id}`}
            >



              <div className='Task_buttons'>
                <section className='Prio_Date'>
                  <p className='Task_Priority'>
                    Priority: {task.Priority ?? "Not set"}
                  </p>



                  <p className='Task_date'>

                    {
                      task.CreatedAt
                        ? new Date(task.CreatedAt).toLocaleString([], {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                            : "No date"
                    }
                  </p>
                </section>

                <div className='Trashbin'>


                  <button
                    type="button"
                    className="Remove_btn"
                    onClick={() => DeleteTask(task.Id)}
                    disabled={deletingIDs.includes(task.Id)}
                  >


                    <img
                      className="Trash_img"
                      src={RemoveTrash}
                      alt="Trash"
                    />


                  </button>




                  {deletingIDs.includes(task.Id) && (


                    <div className="Removing_text">


                      {loadingPercent[task.Id] > 99

                        ? (
                          <span className="Removed_text">
                            Removed!
                          </span>
                        )

                        : (
                          <>

                            <meter
                              className='M_Remove'
                              min="0"
                              max="100"
                              value={loadingPercent[task.Id] ?? 0}
                            ></meter>


                            <span className="Percent_text">
                              {loadingPercent[task.Id] ?? 0}%
                            </span>

                          </>
                        )
                      }


                    </div>


                  )}


                </div>


              <div className='floppySave'>


                <button
                  className='saveTask_btn'
                  onClick={() => SaveTask(task)}
                  disabled={savingPercent[task.Id] !== undefined}
                >


                  <img
                    className="Save_img"
                    src={SaveXtask}
                    alt="Save"
                  />


                </button>




                {savingPercent[task.Id] !== undefined && (


                  <div className="Saving_text">


                    {savingPercent[task.Id] > 99 &&
                     savedTaskID === task.Id

                      ? (

                        <span className="Saved_text">
                          Saved!
                        </span>

                      )

                      : (
                        <>

                          <meter
                            className='M_Floppy'
                            min="0"
                            max="100"
                            value={savingPercent[task.Id] ?? 0}
                          ></meter>


                          <span className="Percent_text">
                            {savingPercent[task.Id] ?? 0}%
                          </span>

                        </>
                      )
                    }


                  </div>


                )}


              </div>




              </div>




              <h2>
                {task.NameOfTask}
              </h2>


              {task.TheTask?.trim() && (


                <p className='Target'>
                  🎯 {task.VisibleText}
                </p>


              )}



            </li>


          ))}


        </ol>


      </div>


  </>
  );

}


export default App;