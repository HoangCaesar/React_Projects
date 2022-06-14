import 'swiper/css/bundle';
import './assets/boxicons-2.1.2/css/boxicons.min.css';
import './App.scss';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import RouteS from './config/Routes';

function App() {
  return (
    <Router>
      <Routes>
        <Route render={props => (
          <>
            <Header />
            <RouteS />
            <Footer />
          </>
        )} />
      </Routes>
    </Router>
  );
}

export default App;
