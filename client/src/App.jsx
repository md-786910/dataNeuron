import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Task1 from "./components/Task1";
import Task2 from "./components/Task2";
import Dashboard from "./components/Dashboard";
import "./App.css"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/task1" element={<Task1 />} />
        <Route path="/task2" element={<Task2 />} />
      </Routes>
    </>
  );
}

export default App;
