import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>Product Management App</h1>
      <hr />
      <div>
        <NavLink to="/" className="me-5" activeClassName="active" exact>
          Products List
        </NavLink>
        <NavLink to="/add" className="ms-5" activeClassName="active">
          Add a Product
        </NavLink>
      </div>
    </header>
  );
};

export default Header;