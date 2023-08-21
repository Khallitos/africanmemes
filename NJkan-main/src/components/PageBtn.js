import React from "react";
import { useAppContext } from "../context/AppContext";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PageBtn = () => {
  const { numOfPages, page, changePage } = useAppContext();

  const handleChange = (event, value) => {
    changePage(value);
  };
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });
  console.log(pages);

  const prevPage = () => {
    let newPage = page - 1;

    if (newPage < 1) {
      newPage = numOfPages;
    }
    changePage(newPage);
  };

  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    changePage(newPage);
  };
  return (
    <div
      
    >
      <Stack spacing={2} sx={{ display: "flex", alignItems: "center", justifyContent: "center" ,marginRight:"30px"}}>
        <Pagination
          count={pages.length}
          color="primary"
          onChange={handleChange}
          size="large"
        />
      </Stack>
    </div>
  );
};

export default PageBtn;
