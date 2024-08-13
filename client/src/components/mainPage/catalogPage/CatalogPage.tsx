import React, { useState, useEffect, FC } from "react";
import classes from "./CatalogPage.module.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import catalogService from "../../../services/catalog-service";
import NoProductFound from "../../ui/noProductFound/NoProductFound";
import { convertStringToNumber } from "../../../utils/convertStringToNumber";
import basketService from "../../../services/basket-service";
import SortBlock from "./sortBlock/SortBlock";
import CardList from "./cardList/CardList";
import { Product, ProductData } from "../../../types/type";
import { useAppSelector } from "../../../hooks/redux";
import Pagination from "../../ui/Pagination/Pagination";
import LoadMore from "../../ui/LoadMore/LoadMore";

const CatalogPage: FC = () => {
  const { profiles } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const [products, setProducts] = useState<ProductData>({
    data: [],
    total: 0,
    page: 1,
    limit: 1,
    totalPages: 2,
    minPrice: 1,
    maxPrice: 1,
  });
  const [selectedCategory] = useState<string | null>(category);
  const [brand, setBrand] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([]);
  const [noProductsFound, setNoProductsFound] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>();
  const [minPrice, setMinPrice] = useState<number>();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [countItemInPage, setcountItemInPage] = useState<number>(2);

  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [selectedBrands, selectedCategory, currentPage]);

  const fetchProducts = async (min?: number, max?: number) => {
    setIsLoading(true);
    let params: {
      category?: string | null;
      price?: string;
      brand?: string;
      page?: number;
      limit?: number;
    } = {
      category: selectedCategory,
      page: currentPage,
      limit: countItemInPage,
    };
    if (min && max) {
      params.price = [min, max].join("-");
    } else {
      if (priceRange && priceRange.length > 0) {
        params.price = priceRange.join("-");
      }
    }
    if (selectedBrands && selectedBrands.length > 0) {
      params.brand = selectedBrands.join(",");
    }
    try {
      const productsData = await catalogService.get(params);

      if (productsData.data.length > 0) {
        if (isLoadingMore) {
          setProducts((prevProducts) => ({
            ...productsData,
            data: [...prevProducts.data, ...productsData.data],
          }));
        } else {
          setProducts(productsData);
        }
        if (!minPrice && !maxPrice) {
          console.log(productsData);
          const minPrice = productsData.minPrice;
          const maxPrice = productsData.maxPrice;
          setMaxPrice(maxPrice);
          setMinPrice(minPrice);
          if (priceRange.length === 0) {
            setPriceRange([minPrice, maxPrice]);
          }
          const brands = Array.from(
            new Set(
              productsData.data.map(
                (product: Product) => product.main_info["Бренд"]
              )
            )
          ) as string[];
          setBrand(brands);
        }
        setNoProductsFound(false);
      } else {
        setNoProductsFound(true);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoadingMore(false);
      setIsLoading(false);
    }
  };
  const handlePriceInputChange = (
    min: number | string,
    max: number | string
  ) => {
    min = convertStringToNumber(min);

    max = convertStringToNumber(max);
    setPriceRange([min, max]);
  };
  const handleOnKeyDownChange = (
    event: React.KeyboardEvent,
    min: number | string,
    max: number | string
  ) => {
    if (event.key === "Enter") {
      min = convertStringToNumber(min);
      max = convertStringToNumber(max);
      if (maxPrice !== undefined) {
        if (minPrice !== undefined) {
          if (min > maxPrice) {
            min = maxPrice;
            max = maxPrice;
          }
          if (max > maxPrice) {
            max = maxPrice;
          }
          if (min < minPrice) {
            min = minPrice;
          }
          if (max < minPrice) {
            max = maxPrice;
          }
          setPriceRange([min, max]);
          fetchProducts();
        }
      }
    }
  };
  const handleSliderPriceChange = (range: number[]) => {
    setPriceRange(range);
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedBrands((prevSelectedBrands) => [...prevSelectedBrands, value]);
    } else {
      setSelectedBrands((prevSelectedBrands) =>
        prevSelectedBrands.filter((brand) => brand !== value)
      );
    }
  };
  const HandleAddBasket = async (id_equipment: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.info(
        "Чтобы добавить товар в корзину, вам необходимо зарегистрироваться."
      );
      navigate("/registration");
      return;
    }
    try {
      const idUsers = profiles?.id;
      await basketService.post({
        id_equipment: id_equipment,
        id_user: idUsers,
        count: 1,
      });
      toast.success("Товар добавлен в корзину");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page: number): void => {
    console.log(page);
    setCurrentPage(page);
    setProducts((prevProducts) => ({
      ...prevProducts,
      data: [],
    }));
    setIsLoadingMore(false);
  };
  const loadMoreItems = (page: number) => {
    console.log(page);
    if (currentPage < products.totalPages) {
      setIsLoadingMore(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  if (isLoading) {
    return (
      <h1
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontSize: "30px",
        }}
      >
        {" "}
        Загрузка.....
      </h1>
    );
  }
  return (
    products && (
      <div className={classes.catalogPage}>
        <SortBlock
          fetchProducts={fetchProducts}
          handleCheckboxChange={handleCheckboxChange}
          minPrice={minPrice ?? 0}
          maxPrice={maxPrice ?? 0}
          priceRange={priceRange}
          brand={brand}
          selectedBrands={selectedBrands}
          handleOnKeyDownChange={handleOnKeyDownChange}
          handlePriceInputChange={handlePriceInputChange}
          handleSliderPriceChange={handleSliderPriceChange}
        />
        {noProductsFound ? (
          <NoProductFound />
        ) : (
          <div className={classes.catalogBlock}>
            <CardList products={products} HandleAddBasket={HandleAddBasket} />
            <LoadMore
              showMoreProducts={loadMoreItems}
              totalPages={products.totalPages}
              currentPage={currentPage}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={products.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    )
  );
};

export default CatalogPage;
