import React, {useState, useEffect} from 'react';
import './App.css';
import AppHeader from './components/app-header/app-header'
import BurgerIngridients from './components/burger-ingridients/burger-ingridients';
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
        <BurgerIngridients data={data}/>
    </div>
  );
}

export default App;
