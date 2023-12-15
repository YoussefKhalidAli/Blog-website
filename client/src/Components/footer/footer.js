import classes from "./footer.module.css";

//imported tools
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../../store/store";

export default function Footer() {
  const pageNumber = useSelector((state) => state.auth.pageNumber);
  const lastPage = useSelector((state) => state.auth.lastPage);
  const dispatch = useDispatch();
  const handlePageNumber = (e) => {
    dispatch(authActions.setPageNumber(parseInt(e.target.innerHTML)));
  };
  const pageSelector = [];
  const max =
    pageNumber === 1 || pageNumber === 2 ? pageNumber + 5 : pageNumber + 3;
  for (
    let i = pageNumber === 1 || pageNumber === 2 ? pageNumber : pageNumber - 2;
    i < max;
    i++
  ) {
    pageSelector[i - 1] = (
      <Link
        key={i + 1}
        to="?#"
        className={classes.page}
        onClick={(e) => handlePageNumber(e)}
      >
        {i}
      </Link>
    );
    if (i === lastPage) {
      break;
    }
  }

  const nextPage = () => {
    dispatch(authActions.setPageNumber(pageNumber + 1));
  };
  const previousPage = () => {
    dispatch(authActions.setPageNumber(pageNumber - 1));
  };
  return (
    <div className={classes.container}>
      <Link to="?#" className={classes.skip} onClick={() => previousPage()}>
        back
      </Link>
      {pageSelector}
      <Link to="?#" className={classes.skip} onClick={() => nextPage()}>
        next
      </Link>
    </div>
  );
}
