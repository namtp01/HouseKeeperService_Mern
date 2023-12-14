import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err); 
    }
  }; 

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">taskerr</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <Link className="link" to="/faq"><span>Taskerr FAQ</span></Link>
          <Link className="link" to="/policy"><span>Policy</span></Link>
          {/* {!currentUser?.isSeller && <span>Become a Seller</span>} */}
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">
                        Gigs
                      </Link>
                      <Link className="link" to="/add">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">Sign in</Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/gigs?cat=heavy-lifting">
              Heavy Lifting
            </Link>
            <Link className="link menuLink" to="/gigs?cat=home-repairs">
              Home Repairs
            </Link>
            <Link className="link menuLink" to="/gigs?cat=home-cleaning">
              Home Cleaning
            </Link>
            <Link className="link menuLink" to="/gigs?cat=electrical-help">
              Electrical Help
            </Link>
            <Link className="link menuLink" to="/gigs?cat=baby-proofing">
              Baby Proofing
            </Link>
            <Link className="link menuLink" to="/gigs?cat=home-cooking">
              Home Cooking
            </Link>
            <Link className="link menuLink" to="/gigs?cat=cleaning-air-conditioner">
              Cleaning Air Conditioner
            </Link>
            <Link className="link menuLink" to="/gigs?cat=laundry">
              Laundry
            </Link>
            <Link className="link menuLink" to="/gigs?cat=dog-walking">
              Dog Walking
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
