import Nav from "./Components/Nav";
import React, { useState } from "react";
import { Route, BrowserRouter as Router,Routes } from 'react-router-dom';
import Popular from './Components/Popular';
import Battle from './Components/Battle';
import Results from "./Components/Results";

function App() {
  const [theme,setTheme] = useState("light");

  const toggleTheme = () => {
    let newTheame = theme === "light" ? "dark" : "light"
    setTheme(newTheame);
  }

  
  return (
    <>
    <div className={theme}>
    <div className="container">
    <Router>
    <Nav theme={ theme } toggleTheme={toggleTheme}/>
    <Routes>
      <Route path='/' element={<Popular theme={theme} />}  />
      <Route path='/battle' element={<Battle theme={theme}/>}  />
      <Route path="/battle/results" element={<Results theme={theme}/>}/>
      <Route render={() => <h1>404</h1>} />
     </Routes>
    </Router>
    </div>

    </div>
  
    </>
  );
}

export default App;
