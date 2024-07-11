import css from './Header.module.css';
import Container from '../layout/Container/Container.jsx';
import {NavLink} from "react-router-dom";
import clsx from 'clsx';

export default function Header() {
  function buildLinkClass ({ isActive }) {
    return clsx(css['link'], isActive && css['active']);
  }

  return (
    <>
      <header className={css['header']}>
        <Container>
          <div className={css['header-wrap']}>
            <nav>
              <NavLink to="/" className={buildLinkClass}>Home</NavLink>
              <NavLink to="/movies" className={buildLinkClass}>Movies</NavLink>
            </nav>
          </div>
        </Container>
      </header>
    </>
  );
};