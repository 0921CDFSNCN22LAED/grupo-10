import { Link } from 'react-router-dom';
import logo from '../assets/images/PC_Gamer_logo.png';

function SideBar() {
  return (
    <ul
      className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* <!-- Sidebar - Brand --> */}
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="/"
      >
        <div className="sidebar-brand-icon">
          <img className="w-100" src={logo} alt="Digital House" />
        </div>
      </a>

      {/* <!-- Divider --> */}
      <hr className="sidebar-divider my-0" />

      {/* <!-- Nav Item - Dashboard --> */}
      <li className="nav-item active">
        <Link className="nav-link" to="/">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>PC Gamer - Tablero</span>
        </Link>
      </li>

      {/* <!-- Divider --> */}
      <hr className="sidebar-divider" />

      {/* <!-- Heading --> */}
      <div className="sidebar-heading">Links</div>

      {/* <!-- Nav Item - Pages --> */}
      <li className="nav-item">
        <Link className="nav-link collapsed" to="/last-product">
          <i className="fas fa-fw fa-folder"></i>
          <span>Último producto</span>
        </Link>
      </li>

      {/* <!-- Nav Item - Charts --> */}
      <li className="nav-item">
        <Link className="nav-link" to="/subtaxonomies">
          <i className="fas fa-fw fa-chart-area"></i>
          <span>Subtaxonomías</span>
        </Link>
      </li>

      {/* <!-- Nav Item - Tables --> */}
      <li className="nav-item">
        <Link className="nav-link" to="/table">
          <i className="fas fa-fw fa-table"></i>
          <span>Tabla</span>
        </Link>
      </li>

      {/* <!-- Divider --> */}
      <hr className="sidebar-divider d-none d-md-block" />
    </ul>
  );
}

export default SideBar;
