import { FC } from "react";
import classes from "./HeaderPage.module.css";
import { Link } from "react-router-dom";
import HeaderProfile from "./headerProfile/HeaderProfile";
import HeaderButton from "./headerButton/HeaderButton";
import { useAppSelector } from "../../hooks/redux";

const HeaderPage: FC = () => {
  const { isAuth } = useAppSelector((state) => state.auth);
  return (
    <div className={classes.header}>
      <div className={classes.header__container}>
        <div className={classes.voltechHeader}>
          <Link to="/" className={classes.voltechHeader__title}>
            Voltech
          </Link>
          {isAuth ? <HeaderProfile /> : <HeaderButton />}
        </div>
      </div>
    </div>
  );
};

export default HeaderPage;
