import React from 'react';
import logo from "../base_img/logo.jpg";
import {Link} from "react-router-dom";
import { AuthService } from '../services/auth.service';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
const authService = new AuthService()
function NavBar(props) {
  function logout() {
		authService.logout().then(() => {
			document.location.reload()
		})
	}

    return(
      <>
      <nav class="navbar bg-primary navbar-dark text-light fixed-top sticky-top" >
            <div class="container-fluid">
              <a class="navbar-brand">
                <img src={logo} width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy"/>
                <span class="ms-2">Мяу</span>
              </a>
                <ul class="nav nav-tabs bg-light nav-justified">
                    <li class="nav-item">
                        <Link class="nav-link " to={'/sandbox'}>Песочница</Link>
                    </li>
                    <li class="nav-item">
                    <Link class="nav-link active" to={'/'}>Главная</Link>
                  </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" href="#content">Каталог</a>
                        <ul class="dropdown-menu">
                          <a class="dropdown-item" href="#cat1">Котик 1</a>
                          <a class="dropdown-item" href="#cat2">Котик 2</a>
                          <a class="dropdown-item" href="#cat3">Котик 3</a>
                        </ul>
                    </li>
                    <li>
                    <Link className='nav-link' to={'/crud-example'}>
					            Простой CRUD
				            </Link>
                    </li>
                    <li>
                    <Link className='nav-link' to={'/boquet-example'}>
					            Букеты
				            </Link>
                    </li>
                    <li>
                    <Link className='nav-link' to={'/flower-wrapper'}>
					            цветы и упаковки
				            </Link>
                    </li>
                    <li>
                      <span style={{ fontSize: '14px', marginRight: 15 }}>
                        Привет, {props.currentUserInfo.login}!
                        {props.currentUserInfo.role === 'admin' ? 'Ты можешь все!💪😎' : 'Смотри и радуйся🌚'}
                      </span>
                        <Button size='small' onClick={logout} type='text'>
                          Выйти
                        </Button>
                        
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
      <Link className='header-link' to={'/'}>
					Главная
				</Link>
				<Link className='header-link' to={'/sandbox'}>
					Песочница
				</Link>
      </>
    ) 
      
        
    };
  export default NavBar;