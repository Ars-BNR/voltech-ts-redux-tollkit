import classes from "./HeaderProfile.module.css";
import trash from "../../../assets/icon/basket.svg";
import profile from "../../../assets/icon/user.svg";
import exit from "../../../assets/icon/exit.svg";
import arrow from "../../../assets/icon/arrow.svg";
import { FC, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useAppDispatches, useAppSelector } from "../../../hooks/redux";

const HeaderProfile: FC = () => {
  const { profiles } = useAppSelector((state) => state.auth);
  const { logout } = useAppDispatches();

  const navigate = useNavigate();
  const [openid, setOpenId] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      await logout({ navigate });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(profiles);
  const username = profiles?.login;
  return (
    <div className={classes.headerProfile}>
      <div className={classes.trashBlock}>
        <img src={trash} alt="" className={classes.trashBlock__img} />
        <Link to="/basket" className={classes.trashBlock__text}>
          Корзина
        </Link>
      </div>
      <div
        className={classes.profileBlock}
        onClick={() => setOpenId((prev) => !prev)}
      >
        <div className={classes.profileBlockLeft}>
          <img src={profile} alt="" className={classes.profileBlock__img} />
          <span className={classes.profileBlock__text}>{username}</span>
        </div>
        <img
          src={arrow}
          alt=""
          className={`${classes.arrow} ${openid ? classes.active : ""}`}
        />
      </div>
      <div
        className={classes.profilePopup}
        style={
          openid
            ? { height: itemRef.current?.scrollHeight, opacity: 1 }
            : { height: "0px", opacity: 0 }
        }
        ref={itemRef}
      >
        <ul className={classes.popupList}>
          <li className={classes.popupList__item}>
            <img src={trash} alt="" />
            <Link to="/ordersInfo" className={classes.popupList__item}>
              Заказы
            </Link>
          </li>
          <li onClick={handleLogout} className={classes.popupList__item}>
            <img src={exit} alt="" />
            Выход
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderProfile;
