import { Col, Container, Row } from "react-bootstrap";
import TodoTable from "./TodoTable";
import { useEffect, useState } from "react";
import { Axios } from "../axios/axios";
import Loading from "./Spinner";

function Dashboard() {

  const [dashboard, setDashboard] = useState(null)
  const [loader, setLoader] = useState(false)

  const getDashboardData = async () => {
    try {
      setLoader(true)
      const response = await Axios.get("/dashboard");
      if (response?.status === 200) {
        // do something 
        setDashboard(response?.data)
      }
    } catch (error) {
      alert(error?.data?.data?.message)
    } finally {
      setLoader(false)
    }
  }


  useEffect(() => {

    getDashboardData();

  }, []);

  return (
    <div className="mtTop">
      <Container className="dashboard">
        <h2>Dashboard</h2>
        {
          loader && <Loading />
        }

        <Row className="mt-4 align-items-center" >
          <Col col={12} lg={4} md={4} sm={12} className="mb-3">
            <div className="todoCount">
              <h4>Todo count</h4>
              <span>{dashboard?.todoCount || 0}</span>
            </div>
          </Col>
          <Col col={12} lg={4} md={4} sm={12} className="mb-3">
            <div className="addCount">
              <h4>Add count</h4>
              <span>{dashboard?.addCount || 0}</span>
            </div>
          </Col>

          <Col col={12} lg={4} md={4} sm={12} className="mb-3">
            <div className="updateCount">
              <h4>Update count</h4>
              <span>{dashboard?.updateCount || 0}</span>
            </div>
          </Col>
          <Col col={12} className="mt-2">
            <div >
              <TodoTable todos={dashboard?.todos} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
