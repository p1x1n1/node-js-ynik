import './App.css';
import sp from './base_img/spinka.jpg';
import ex from './base_img/excel.jpg';
import heart from './base_img/heart.jpg';
import NavBar from './components/Navbar';
import Content from './components/Content';
import Footer from './components/Footer';
function App(props) {
  
  return (
    <>
    <div className="App">
          <NavBar currentUserInfo={props.currentUserInfo} />
				  <Content currentUserInfo={props.currentUserInfo} />
          <img id="cat1" src={ex} style={{height:600,width:600}}/>
          <img id="cat2" src={sp} style={{height:600,width:600}}/>
          <img id="cat3" src={heart} style={{height:600,width:600}}/>
          <Footer/>
      </div>
      </>
  );
}

export default App;
