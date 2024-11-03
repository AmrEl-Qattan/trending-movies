import React from "react";
import style from "./Navbar.module.css";
import { Link } from "react-router-dom";

export default function Navbar({ userData , logOut}) {
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
          <div className="container-fluid">
            <Link className="navbar-brand text-light" to="/home">
              <h3>Trending-Movies</h3>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              {userData ? (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/home"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/movies">
                      Movies
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/tvshow">
                      TV Shows
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/people">
                      People
                    </Link>
                  </li>
                </ul>
              ) : null}

              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item d-flex align-items-center">
                  <i className="fab mx-2 fa-facebook cursor-pointer"></i>
                  <i className="fab mx-2 fa-twitter cursor-pointer"></i>
                  <i className="fab mx-2 fa-instagram cursor-pointer"></i>
                  <i className="fab mx-2 fa-soundcloud cursor-pointer"></i>
                </li>

                {userData ? (
                  <li className="nav-item">
                    <span onClick={logOut} className="nav-link cursor-pointer">Logout</span>
                  </li>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link active" to="/register">
                        Register
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active" to="/login">
                        Login
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
