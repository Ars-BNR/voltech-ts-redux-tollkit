import classes from "./Pagination.module.css";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (number: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  console.log(totalPages);
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`${classes.button} ${
          i === currentPage ? classes.active : ""
        }`}
      >
        {i}
      </button>
    );
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={classes.pagination__Block}>
      <div className={classes.pagination__item}>{pages}</div>
    </div>
  );
};

export default Pagination;
