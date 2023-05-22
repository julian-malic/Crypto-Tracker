import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CoinTable from './Components/CoinTable';
import Trending from './Components/Trending';
import CoinHistory from './Components/CoinHistory';

function App() {
  return (
    <div class="container">
      <Router>
        <div class="text-center">
          <Link to="/">
            <img class="img-fluid" src="../img/logo.png"></img>
            <hr/>
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<><Trending/><CoinTable/></>}/>
          <Route path="/history/:id" element={<CoinHistory/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
