import classes from "./LoadMore.module.css";
interface Props {
  currentPage: number;
  totalPages: number;
  showMoreProducts: (number: number) => void;
}

const LoadMore = ({ currentPage, totalPages, showMoreProducts }: Props) => {
  return (
    <div className={classes.showMoreBtn__block}>
      {currentPage < totalPages && (
        <button
          onClick={() => showMoreProducts(currentPage)}
          className={classes.showMoreBtn}
        >
          Показать еще
        </button>
      )}
    </div>
  );
};

export default LoadMore;
