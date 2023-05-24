import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./views/Main";
import EditThing from "./components/EditThing";
import NameEdit from './components/NameEdit';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/edit/:id" element={<EditThing />} />
        <Route path="/edit/:id/name" element={<NameEdit />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

