import './App.css';
import sp from './base_img/spinka.jpg';
import logo from "./base_img/logo.jpg";
import ex from './base_img/excel.jpg';

function App() {
  
  return (
    <div className="App">
          <nav class="navbar bg-primary navbar-dark text-light fixed-top sticky-top" >
            <div class="container-fluid">
              <a class="navbar-brand" href="#">
                <img src={logo} width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy"/>
                <span class="ms-2">Мяу</span>
              </a>
                <ul class="nav nav-tabs bg-light nav-justified">
                    <li class="nav-item">
                        <a class="nav-link " href="#auth">Авторизация</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link active " href="#app">Главная</a>
                  </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" href="#content">Каталог</a>
                        <ul class="dropdown-menu">
                          <a class="dropdown-item" href="#cat1">Котик 1</a>
                          <a class="dropdown-item" href="#cat2">Котик 2</a>
                          <a class="dropdown-item" href="#cat3">Котик 3</a>
                        </ul>
                    </li>
                </ul>

              <button class="navbar-toggler" type="button" 
                    data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" 
                     aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
              </button>
              <div class="offcanvas offcanvas-end bg-success " tabindex="-1" id="offcanvasNavbar" 
              aria-labelledby="offcanvasNavbarLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title text-light" id="offcanvasNavbarLabel">Котики</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li class="nav-item">
                            <a class="nav-link" href="#cat1">Котик 1</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link" href="#cat2">Котик 2</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link" href="#cat3">Котик 3</a>
                          </li>
                    </ul>
                </div>
              </div>
            </div>
        </nav>
      <img id="cat1" src={ex} style={{height:600,width:600}}/>
      <img id="cat2" src={sp} style={{height:600,width:600}}/>
      <img id="cat3" src={sp} style={{height:600,width:600}}/>
      </div>
  );
}

export default App;
