import { FC } from "react";
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
          <li></li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
