import React from "react";

interface Props {
  setcountItemInPage;
}

const CountItemInPage = ({ setcountItemInPage }) => {
  return (
    <select value={count} onChange={(e) => onChange(Number(e.target.value))}>
      <option value={2}>2</option>
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={20}>20</option>
    </select>
  );
};

export default CountItemInPage;
