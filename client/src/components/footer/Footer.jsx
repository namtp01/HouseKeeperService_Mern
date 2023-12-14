import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>Taskerr</h2>
            <span>Taskerr Company</span>
            <span>1st, Vo Van Ngan, Thu Duc</span>
            <span>Ho Chi Minh, Viet Nam</span>
          </div>
          <div className="item">
            <h2>FAQ</h2>
            <Link className="link" to="/faq"><span>Taskerr FAQ</span></Link>
          </div>
          <div className="item">
            <h2>Policy</h2>
            <Link className="link" to="/policy"><span>Policy</span></Link>
          </div>
          <div className="item">
            <h2>Service</h2>
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
          <div className="item">
            <h2>Contact</h2>
            <span>Phone number: +84 038-310-6586</span>
            <span>Email: team136@gmail.com</span>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>taskerr</h2>
            <span>© Taskerr International Ltd. 2023</span>
          </div>
          <div className="right">
            <div className="social">
              <img src="/img/twitter.png" alt="" />
              <img src="/img/facebook.png" alt="" />
              <img src="/img/linkedin.png" alt="" />
              <img src="/img/pinterest.png" alt="" />
              <img src="/img/instagram.png" alt="" />
            </div>
            <div className="link">
              <img src="/img/language.png" alt="" />
              <span>English</span>
            </div>
            <div className="link">
              <img src="/img/coin.png" alt="" />
              <span>USD</span>
            </div>
            <img src="/img/accessibility.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
