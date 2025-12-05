import { Route, Routes } from "react-router-dom";
import TaskList from "./pages/TaskList";
import TaskCreate from "./pages/TaskCreate";
import TaskDetails from "./pages/TaskDetails";
import VoiceCreate from "./pages/VoiceCreate";

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<TaskList/>}/>
      <Route path='/create' element={<TaskCreate/>}/>
      <Route path='/task/:id' element={<TaskDetails/>}/>
      <Route path='/voice' element={<VoiceCreate/>}/>
    </Routes>
  );
}
