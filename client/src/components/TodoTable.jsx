import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Axios } from '../axios/axios';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
function TodoTable({ todos }) {
  const [loader, setLoader] = useState(false);

  const handleDeleteTodos = async (taskId) => {
    try {
      setLoader(true)
      const response = await Axios.delete(`/delete-task/${taskId}`);
      if (response.status === 200) {
        window.location.reload();
        alert(response?.data?.message);
      }
    } catch (error) {
      alert(error?.response?.data?.message || error?.message)

    }
    finally {
      setLoader(false)

    }


  }

  return (
    <Table responsive="sm" className='shadow-sm' hover sx={{
      borderRadius: "6px"
    }}>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Task</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          todos?.map((todo, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{todo?.task}</td>
                <td>{todo?.createdAt}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Link to={`/task2?taskId=${todo?._id}&task=${todo?.task}`}>
                      <button className="btn btn-primary" >update</button>
                    </Link>
                    <button className="btn btn-danger" disabled={loader} onClick={() => handleDeleteTodos(todo?._id)}>{
                      loader ? "DELETING..." : "delete"
                    }</button>

                  </div>
                </td>
              </tr>
            )
          })
        }


      </tbody>
    </Table>
  )
}



export default TodoTable