import React from "react";
import './index.css'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import MainPage from "./pages/MainPage";
import UserListPage from "./pages/UserListPage";
import UserPage from "./pages/UserPage";

function App() {
    return (
        <Router>
            <div className="App">
                <Route exact path='/' component={MainPage}/>
                <Route exact path='/users' component={UserListPage}/>
                <Route exact path='/users/:uid' component={UserPage}/>
            </div>
        </Router>
    );
}

export default App;
