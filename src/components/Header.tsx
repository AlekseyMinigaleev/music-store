import React from "react";
import '../css/Header.css';

import { Link } from 'react-router-dom';

function Header() {
return (
   <header>
      <nav>
         <ul>
            <li>
               <Link to="/music">Музыка</Link>
            </li>
            <li>
               <Link to="/discs">Компакт-диски</Link>
            </li>
            <li>
               <Link to="/create-music-card">Создать музыкальное произведение</Link>
            </li>
         </ul>
      </nav>
   </header>
);
}

export default Header;