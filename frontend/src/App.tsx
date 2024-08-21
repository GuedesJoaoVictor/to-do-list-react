import { useEffect, useState, useRef, FormEvent } from "react";
import { FiTrash2 } from "react-icons/fi";
import { MdAddTask } from "react-icons/md";
import { api } from "./services/api";

interface TaskProps {
  id: string;
  checklistId: string;
  description: string;
  done: boolean;
}

interface ChecklistProps {
  id: string;
  title: string;
  items: TaskProps[];
  createdAt: string;
}

export default function App() {

  const [checklists, setChecklists] = useState<ChecklistProps[]>([]);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const checklistIdRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    const response = await api.get("/checklists");
    setChecklists(response.data);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if(!titleRef.current?.value) return;

    const response = await api.post("/checklist", {
      title: titleRef.current.value
    });

    setChecklists(allChecklists => [...allChecklists, response.data]);

    titleRef.current.value = "";
  }

  async function handleSubmitTask(event: FormEvent) {
    event.preventDefault();

    if(!checklistIdRef.current?.value || !descriptionRef.current?.value) return;

    const response = await api.post("/checklist-item", {
      description: descriptionRef.current.value,
      checklistId: checklistIdRef.current.value
    });

    setChecklists((allChecklists) => 
      allChecklists.map(checklist => 
          checklist.id === checklistIdRef.current?.value 
              ? { ...checklist, items: [...checklist.items, response.data] } 
              : checklist
      )
    );

    descriptionRef.current.value = "";
  }
  
  async function handleDelete(id: string) {
    try {
      api.delete("/checklists", {
        params: {
          id: id
        }
      });
      
      const allChecklists = checklists.filter((checklist) => checklist.id !== id);

      setChecklists(allChecklists);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteTask(id: string) {
    try {
      api.delete("/checklist-item", {
        params: {
          id: id
        }
      })

      const allChecklists = checklists.map((checklist) => {
        return {
            ...checklist,
            items: checklist.items.filter((task) => task.id !== id)
        };
      });

      setChecklists(allChecklists);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const addTaskButton: HTMLElement | null = document.getElementById("addTask");
    const modal: HTMLDialogElement | null = document.querySelector("dialog[id='dialogModal']");
    const buttonSubmit = document.getElementById("taskRegister");
    const closeModal = document.getElementById("closeModal");
  
    if(addTaskButton) {
      addTaskButton.onclick = function () {
        modal?.classList.remove("hidden");
        modal?.showModal();
      };
    };
  
    if(buttonSubmit) {
      buttonSubmit.onclick = function () {
        modal?.close();
      };
    };
  
    if (closeModal) {
      closeModal.onclick = function () {
        modal?.close();
      };
    }
  
    return () => {
      if(addTaskButton) addTaskButton.onclick = null;
      if(buttonSubmit) buttonSubmit.onclick = null;
      if(closeModal) closeModal.onclick = null;
    };
  }, [checklists]);

  return(
      <div className="w-full min-h-screen bg-gray-950 flex justify-center px-4">
        <main className="my-10 w-full md:max-w-2xl">
          <h1 className="text-4xl font-medium text-white">Checklists</h1>
          <form className="flex flex-col my-6" onSubmit={handleSubmit}>
            <label htmlFor="title" className="font-medium text-white">Title: </label>
            <input type="text" name="title" id="title" placeholder="Enter the name of checklist" className="w-full mb-5 p-2 rounded-lg" ref={titleRef}/>
            <input type="submit" value="Register" className="cursor-pointer w-full p-2 bg-green-600 rounded font-medium text-white"/>
          </form>

          <section className="flex flex-col gap-4">
            {checklists.map((checklist) => (
              <article className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200" key={checklist.id}>
                <p><span className="font-medium">Title:</span> {checklist.title}</p>
                <dialog className="flex-col p-5 rounded hidden" id="dialogModal">
                        <h1 className="text-4xl font-medium text-gray-950">Add Task</h1>
                        <form className="flex flex-col my-6" onSubmit={handleSubmitTask}>
                          <label htmlFor="description" className="font-medium text-white">Description: </label>
                          <input type="hidden" name="checklistId" value={checklist.id} ref={checklistIdRef}/>
                          <input type="text" name="description" id="description" placeholder="Enter the name of task" className="w-full mb-5 p-2 rounded-lg" ref={descriptionRef}/>
                          <input id="taskRegister" type="submit" value="Register" className="cursor-pointer w-full p-2 bg-green-600 rounded font-medium text-white my-2"/>
                          <button id="closeModal" className="cursor-pointer w-full p-2 bg-red-800 rounded font-medium text-white">Close</button>
                        </form>
                </dialog>
                <section>
                  {checklist.items.map((task) => (
                    <article key={task.id} className="flex justify-between items-center my-2">
                      <p className="flex"><input  type="checkbox" name="done" id="done" className="flex mr-2"/>{task.description}</p>
                      <input type="button" value="Remove" className="cursor-pointer flex bg-red-800 px-2 rounded-lg text-white" onClick={() => handleDeleteTask(task.id)}/>
                    </article>

                  ))}
                </section>
                <button id="addTask" className="bg-green-500 w-7 h-7 flex items-center justify-center rounded-lg absolute -top-2 right-10">
                  <MdAddTask size={18} color="#FFF"/>
                </button>
                <button className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute -top-2 right-0" onClick={() => handleDelete(checklist.id)}>
                  <FiTrash2 size={18} color="#FFF"/>
                </button>
              </article>
            ))}
          </section>
        </main>
      </div>
  );
}