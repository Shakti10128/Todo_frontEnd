import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context, server } from "..";
import { toast } from "react-hot-toast";
import TodoList from "../pages/TodoList";

const AddTask = () => {
  const [title, settitle] = useState("");
  const [description, setDescription] = useState("");
  const [Loader, setLoader] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { isAuthenticated } = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const { data } = await axios.post(
        `${server}/tasks/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
      setRefresh(!refresh);
      setLoader(false);
      settitle("");
      setDescription("");
    } catch (error) {
      toast.error(error.response.data.message);
      setLoader(false);
    }
  };
  const getAllTask = async () => {
    axios
      .get(`${server}/tasks/all`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    isAuthenticated && getAllTask();
  }, [refresh]);

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/tasks/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setRefresh(!refresh);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/tasks/${id}`, {
        withCredentials: true,
      });
      if (data.message === "Task Not Complete Yet") {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        setRefresh(!refresh);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    isAuthenticated && (
      <div className="AddTask">
        <section className="section1">
          <form action="" onSubmit={submitHandler}>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                settitle(e.target.value);
              }}
              name="task"
              placeholder="Task"
              required
              className="task"
            />
            <input
              type="description"
              name="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Description"
              required
              className="description"
            />
            <button disabled={Loader} type="submit" className="Taskbtn">
              ADD TASK
            </button>
          </form>
        </section>

        <section className="section2">
          {Array.isArray(tasks) ? (
            tasks.map((item) => {
              return (
                <TodoList
                  title={item?.title}
                  key={item?._id}
                  description={item?.description}
                  isCompleted={item?.isCompleted}
                  updateHandler={updateHandler}
                  deleteHandler={deleteHandler}
                  id={item?._id}
                />
              );
            })
          ) : (
            <h1>No Task Found</h1>
          )}
        </section>
      </div>
    )
  );
};

export default AddTask;
