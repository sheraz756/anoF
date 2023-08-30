import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../../http";
import styles from "./Navigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../store/authSlice";
import Button from "../../../components/shared/Button/Button";
import { useHistory } from "react-router-dom";

const Navigation = () => {
 
   
    const brandStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
  };

  const logoText = {
    marginLeft: "10px",
  };
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);
  async function logoutUser() {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (err) {
      console.log(err);
    }
  }
    const history = useHistory();
   const leave = () => {
      history.push("/");
   };

  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={brandStyle} to="/">
        <img src="/images/logo.png" alt="logo" className={styles.logo} />
        <span className={styles.logoText}>Anony</span>
      </Link>
      {isAuth && (
        <div className={styles.navRight}>
          <h3 className={styles.user}>{user?.name}</h3>
          <Link to="/" className={styles.abc}>
            <img
              className={styles.avatar}
              src={
                user?.avatar
                  ? user?.avatar
                  : "/images/monkey-avatar.png"
              }
              width="40"
              height="40"
              alt="avatar"
            />
            
                    <div className={styles.box}>
            <img
              src={user?.avatar}
              alt=""
              className={styles.chk}
            />
            <h3>{user?.name}</h3>
            <div>
            <div className={styles.logout} onClick={logoutUser}>Logout</div>
              <Button onClick={leave} text="Go back to meetings Room" />
            </div>
            </div> 
          </Link>
          <button className={styles.logoutButton} onClick={logoutUser}>
            <img src="/images/logout.png" alt="logout" />
            
          </button>
                                 
        </div>
      )}
    </nav>
  );
};

export default Navigation;
