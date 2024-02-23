import { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Axios } from "../axios/axios";
import { useLocation, useNavigate } from "react-router-dom";

function Task2() {
  const navigate = useNavigate()
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [taskId, setTaskId] = useState(null)
  const [task, setTask] = useState("");
  const [loader, setLoader] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoader(true)
    try {
      let response = null;
      // Make Axios call`
      if (taskId) {
        response = await Axios.put(`/update-task/${taskId}`, {
          task: task,
        });
      } else {
        response = await Axios.post("/create-task", {
          task: task,
        });
      }
      if (response.status === 201) {
        alert("Task created/updated successfully")
      }
      navigate("/")
      setTask("");
    } catch (error) {
      alert(error?.response?.data?.message || error?.message)

    }
    finally {
      setLoader(false)

    }
  };


  useEffect(() => {
    const taskIdParam = params.get("taskId");
    const taskParam = params.get("task");

    if (taskIdParam && taskParam) {
      setTaskId(taskIdParam);
      setTask(taskParam);
    }
  }, [])

  return (
    <Container className="mtTop">
      <h2>TASK : 2</h2>
      <Form onSubmit={handleFormSubmit} className="shadow-sm p-3">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Task</Form.Label>
          <Form.Control
            type="text"
            placeholder="hello world"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loader}>
          {
            loader ? "LAODING..." : "SUBMIT"
          }
        </Button>
      </Form>
    </Container>
  );
}

export default Task2;
