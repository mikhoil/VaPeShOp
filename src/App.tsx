import React from 'react';
import './App.css';
import {Logo} from "./components/logo";
import {Navbar} from "./components/navbar";

function App(): JSX.Element {
    return (
        <div className="App">
            <header>
                <Logo/>
            </header>
            <Navbar/>
        </div>
    );
}

export default App;
