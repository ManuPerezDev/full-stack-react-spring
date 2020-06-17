import React, { Component } from 'react';
// import FirstComponent from './components/learning-examples/FirstComponent';
// import SecondComponent from './components/learning-examples/SecondComponent';
// import ThirdComponent from './components/learning-examples/ThirdComponent';
// import FourthComponent from './components/learning-examples/FourthComponent';
//import Counter from "./components/counter/CounterButton";
import TodoApp from "./components/todo/TodoApp";

import './App.css';
import './bootstrap.css';

class App extends Component {
  render() {
    return (

      <div className="App">
        {/*<Counter/>*/}
        <TodoApp></TodoApp>
      </div>
    );
  }
}

// class LearningComponents extends Component {
//     render() {
//         return (
//             //JSX always must have a parent component.
//             <div className="LearningComponents">
//                 My Hello World
//                 <FirstComponent></FirstComponent>
//                 <SecondComponent></SecondComponent>
//                 <ThirdComponent></ThirdComponent>
//                 <FourthComponent></FourthComponent>
//             </div>
//         );
//     }
// }

export default App;
