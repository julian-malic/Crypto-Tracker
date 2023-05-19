import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CoinTable from './Components/CoinTable';
import Trending from './Components/Trending';
import CoinHistory from './Components/CoinHistory';
import './style.css'

function App() {
  return (
    <div class="container">
      <Router>
        <div class="text-center">
          <Link to="/">
            <img src="../img/logo.png"></img>
            <hr/>
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<><Trending/><CoinTable/></>}/>
          <Route path="/coin/:id" element={<CoinHistory/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
