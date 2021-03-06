import './header.scss';

import React, {useState} from 'react';
import {Translate, Storage} from 'react-jhipster';
import {Navbar, Nav, NavbarToggler, Collapse} from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import {Home, Brand, CreateProb, SearchProb} from './header-components';
import {AdminMenu, AccountMenu, LocaleMenu} from '../menus';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  onLocaleChange: Function;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLocaleChange = event => {
    const langKey = event.target.value;
    Storage.session.set('locale', langKey);
    props.onLocaleChange(langKey);
  };

  const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">
          <Translate contentKey={`global.ribbon.${props.ribbonEnv}`}/>
        </a>
      </div>
    ) : null;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div id="app-header">
      {renderDevRibbon()}
      <LoadingBar className="loading-bar"/>
      <Navbar dark expand="sm" fixed="top" className="bg-primary">
        <NavbarToggler aria-label="Menu" onClick={toggleMenu}/>
        <Brand/>
        <Collapse isOpen={menuOpen} navbar>
          <Nav id="header-tabs" className="ml-auto" navbar>
            <Home/>
            {props.isAuthenticated && <SearchProb/>}
            {props.isAuthenticated && <CreateProb/>}
            {props.isAuthenticated && props.isAdmin && <AdminMenu showSwagger={props.isSwaggerEnabled}/>}
            <LocaleMenu currentLocale={props.currentLocale} onClick={handleLocaleChange}/>
            <AccountMenu isAuthenticated={props.isAuthenticated}/>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
