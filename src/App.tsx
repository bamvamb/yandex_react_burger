import React, {useState, useEffect} from 'react';
import './App.css';
import AppHeader from './components/app-header/app-header'
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import { get_data } from './share/api';


function App() {
  const [data,setData] = useState<any>([])
  useEffect(() => {
    get_data().then(data => { 
      setData(data)
    })
  }, [])
  
  return (
    <div className="App">
        <AppHeader/>
        <BurgerConstructor data={data}/>
    </div>
  );
}

export default App;
