import "./Header.css";
import NavBar from "./NavBar";

function Header() {
  return (
    <header>
      <div className="brand">
        <img className="logo" src="./img/qinpatients-logo.png" alt="logo" />
        <h1 className="title">QInPatients</h1>
      </div>
      <NavBar />
    </header>
  );
}

export default Header;
