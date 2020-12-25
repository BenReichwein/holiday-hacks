import React, { Component } from 'react';
import './NavBar.css'

class Navbar extends Component {
    render() {
        return(
            <nav className="NavbarItems">
                <a href={"/"} style={{textDecoration : "none"}}><h1 className="navbar-logo">RECIPE <i class="fas fa-utensils"/></h1></a>
                <ul className={'nav-menu'}>
                    <li>
                        <a className={'nav-links'} href={'/'}>
                            <i className="fas fa-home"/>
                        </a>
                        <a className={'nav-links'} href={'/imagesearch'}>
                            <i className="fas fa-camera-retro"/>
                        </a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navbar;
