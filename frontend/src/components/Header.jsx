import Cookies from "js-cookie";
import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  const staff = localStorage.getItem("seller");
  console.log("staff",staff,typeof(staff))

  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    localStorage.clear();
  };
  return ( staff ==="false"? (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Ecommerce DRF
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="/navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link " to="/">
                Home
                <i class="fa-solid fa-house mx-2"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart
                <i class="fa-solid fa-cart-shopping mx-2"></i>
              </Link>
            </li>

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                User
                <i class="fa-solid fa-user mx-2"></i>
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/signup">
                    {" "}
                    Signup
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to="/login"
                    onClick={() => {
                      logout();
                    }}
                  >
                    {" "}
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <form className="d-flex">
            <input
              className="form-control me-sm-2"
              type="search"
              placeholder="Search"
            />
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  ) : (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Ecommerce DRF
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="/navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link " to="/myproducts">
                My Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/myorders">
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/seller">
                Add product
              </Link>
            </li>

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                User
                <i class="fa-solid fa-user mx-2"></i>
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/signup">
                    {" "}
                    Signup
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to="/login"
                    onClick={() => {
                      logout();
                    }}
                  >
                    {" "}
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <form className="d-flex">
          
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">
              Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  ));
}

export default Header;
