import { BrowserRouter } from 'react-router-dom';
import Header from './Components/header/Header.jsx';
import Main from './Components/main/Main.jsx';
import Footer from './Components/footer/Footer.jsx';
import './App.css';


function App(props) {

  const isAuthenticated = localStorage.getItem('token') ? true : false;

  return (
    <BrowserRouter>
      <div className="App">
        <Header isAuthenticated = {isAuthenticated}/>
        <Main isAuthenticated = {isAuthenticated}/>
        <Footer />
      </div>
    </BrowserRouter>
    
  );
};

export default App;
