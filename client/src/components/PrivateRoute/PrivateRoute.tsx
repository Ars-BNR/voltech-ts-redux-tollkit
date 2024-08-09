import { FC } from "react";
import { Navigate } from "react-router-dom";

import NotFound from "../ui/notFound/NotFound";
import Page from "../Page";
import HeaderPage from "../headerPage/HeaderPage";
import FooterPage from "../footerPage/FooterPage";
import cl from "../Page.module.css";
import { useAppSelector } from "../../hooks/redux";
interface PrivateRouteProps {
  role: string;
}
const PrivateRoute: FC<PrivateRouteProps> = ({ role }) => {
  const { isAuth, profiles, isLoading } = useAppSelector((state) => state.auth);

  if (!isLoading) {
    if (isAuth) {
      if (profiles.role === role) {
        return <Page />;
      } else {
        return (
          <div className={cl.wrapper}>
            <HeaderPage />
            <div className={cl.main}>
              <div className={cl.main__container}>
                <NotFound />
              </div>
            </div>
            <FooterPage />
          </div>
        );
      }
    } else {
      return <Navigate to="/adminPanel" />;
    }
  }
};

export default PrivateRoute;
