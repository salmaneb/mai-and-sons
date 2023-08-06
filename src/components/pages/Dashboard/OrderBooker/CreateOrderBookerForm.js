import axios from "axios";
import React, { useState } from "react";
import { TextField, Grid, Divider, Button, Box } from "@mui/material";

const CreateOrderBookerForm = ({ data, isEditable, showModal, buttonLabel }) => {
  const [orederBookerName, setOrderBookerName] = useState(
    data.orederBookerName ? data.orederBookerName : ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newData = {
      orederBookerName,
    };

    {
      isEditable && data.length !== 0
        ? axios.put(
            `http://localhost:5000/orderbooker/edit/${data._id}`,
            newData
          )
        : await axios.post("http://localhost:5000/orderbooker", newData);
    }

    showModal(false);
    window.location.reload();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              value={orederBookerName}
              label="Order Booker Name"
              variant="outlined"
              onChange={(e) => setOrderBookerName(e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: "24px" }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Button variant="contained" type="submit">
            {buttonLabel}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateOrderBookerForm;
