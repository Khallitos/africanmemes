import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import React from "react";

const FormRowSelect = ({ labelText, name, value, handleChange, list, defaultValue }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Typography variant="p1" style={{ marginRight: "10px" }}>
        {/* {labelText} */}
      </Typography>
      <FormControl sx={{}}>
        <Select
          id={name}
          key={value}
          value={value}
          defaultValue={value}
          name={name}
          label={labelText}
          onChange={handleChange}
          placeholder = {defaultValue}
          required
          sx={{
            width: "150px", // Adjust the width as desired
            height: "40px", // Adjust the height as desired
            marginRight: "10px",
            backgroundColor: "orange",
            borderRadius: "10px",
            border: "2px solid orange", // Add the border color and width
            fontWeight: "bold",
          }}
        >
          {list.map((itemValue, index) => {
            return (
              <MenuItem key={index} value={itemValue}>
                {itemValue}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default FormRowSelect;
