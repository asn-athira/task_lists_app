import Link from 'next/link';

import classes from './navbar.module.css';

function Navbar() {
  return (
    <header className={classes.header}>
      <Link href='/tasks'>
        <a>
          <div className={classes.logo}>Task Lists</div>
        </a>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href='/create'>Create New</Link>
          </li>         
          
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
