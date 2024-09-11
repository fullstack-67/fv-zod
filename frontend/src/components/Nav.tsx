import { FC } from "react";
import Clock from "./Clock";
const Nav: FC = () => {
  return (
    <header style={{ padding: "1rem 0" }}>
      <nav>
        <ul>
          <li>
            <a href="/" className="custom-icon">
              <i className="fa-solid fa-xl fa-home"></i>
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <Clock />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
