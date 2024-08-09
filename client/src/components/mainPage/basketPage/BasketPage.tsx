import { FC, useCallback, useState } from "react";
import { useEffect } from "react";
import classes from "./BasketPage.module.css";
import CardEquipment from "./cardEquipment/CardEquipment";
import { useNavigate } from "react-router-dom";
import basketService from "../../../services/basket-service";
import BlockPurchase from "./blockPurchase/BlockPurchase";
import { BasketItem } from "../../../types/type";

import { useAppSelector } from "../../../hooks/redux";

const BasketPage: FC = () => {
  const { profiles, isAuth } = useAppSelector((state) => state.auth);
  const [basketData, SetbasketData] = useState<BasketItem[]>([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();
  const backToMain = () => {
    navigate("/catalog");
  };
  const handleShowBasket = useCallback(async () => {
    try {
      if (isAuth) {
        if (!profiles?.id) {
          console.error("ID пользователя не найден");
          return;
        }
      }
      const idUsers = profiles?.id;
      if (idUsers) {
        const response = idUsers && (await basketService.get(idUsers));
        SetbasketData(response);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isAuth, profiles.id]);
  useEffect(() => {
    handleShowBasket();
  }, []);
  useEffect(() => {
    const totalQuantity = basketData.reduce((acc, item) => acc + item.count, 0);
    const totalPrice = basketData.reduce((total, item) => {
      const price = item.equipment.price;
      const count = item.count;
      return total + price * count;
    }, 0);
    setTotalQuantity(totalQuantity);
    setTotalPrice(totalPrice);
  }, [basketData]);

  const handleProceedToOrder = () => {
    localStorage.setItem("totalPrice", totalPrice.toString());
    localStorage.setItem("TotalQuantity", totalQuantity.toString());
    navigate("/makingOrder");
  };
  return (
    <div className={classes.basketPage}>
      <p onClick={backToMain} className={classes.backToMainPage}>
        Вернуться каталог
      </p>
      <p className={classes.titlebasket}>Корзина</p>
      <div className={classes.basketContent}>
        {basketData.length === 0 ? (
          <p className={classes.emptyBasket}>
            Ваша корзина пуста, выберите товары для покупки.
          </p>
        ) : (
          <>
            <div className={classes.basketContent__list}>
              {basketData.map((elbasketData) => (
                <CardEquipment
                  elbasketData={elbasketData}
                  key={elbasketData.id_equipment}
                  SetbasketData={SetbasketData}
                />
              ))}
            </div>
            <BlockPurchase
              totalPrice={totalPrice}
              totalQuantity={totalQuantity}
              handleProceedToOrder={handleProceedToOrder}
            />
          </>
        )}
      </div>
    </div>
  );
};
export default BasketPage;
