import { BrowserRouter, Routes, Route } from "react-router-dom";

import Entry from "./pages/entry/Entry";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

function App() {
return ( <BrowserRouter> <Routes>
{/* Default Entry Page */}
<Route path="/" element={<Entry />} />


    {/* Authentication */}
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
  </Routes>
</BrowserRouter>

);
}

export default App;
