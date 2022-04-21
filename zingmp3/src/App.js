import './App.css';
import Header from './Header.js';
function App() {
  return (
    <div className="app">
      <img
        className="app__background-image"
        src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme-background/eiffel.jpg"
        alt="background image" />
      <Header></Header>
    </div>
  );
}

export default App;
