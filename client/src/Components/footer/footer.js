import classes from "./footer.module.css";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../../store/store";

export default function Footer() {
  const pageNumber = useSelector((state) => state.auth.pageNumber);
  const dispatch = useDispatch();
  const handlePageNumber = (e) => {
    console.log(parseInt(e.target.innerHTML));
  };
  let pageSelector = [null];
  for (let i = pageNumber; i < pageNumber + 5; i++) {
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
  }

  const skipPages = () => {
    dispatch(authActions.setPageNumber(pageSelector.length + 1));
  };
  const returnPages = () => {
    let page = 0;
    if (pageSelector.length === 5) {
      page = 1;
    } else {
      page = pageSelector.length - 9;
    }
    dispatch(authActions.setPageNumber(page));
  };
  return (
    <div className={classes.container}>
      <Link to="?#" className={classes.skip} onClick={() => returnPages()}>
        skip
      </Link>
      {pageSelector}
      <Link to="?#" className={classes.skip} onClick={() => skipPages()}>
        skip
      </Link>
    </div>
  );
}
