import axios from "axios";
import React, { useState } from "react";
import { TextField, Grid, Divider, Button, Box } from "@mui/material";

const CreateCompanyForm = ({ data, isEditable, showModal, buttonLabel }) => {
  const [companyName, setCompanyName] = useState(
    data.companyName ? data.companyName : ""
  );
  const [companyPhone, setPhone] = useState(
    data.companyPhone ? data.companyPhone : ""
  );
  console.log("isEditable: ", isEditable);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newdata = {
      companyName,
      companyPhone,
    };

    {
      isEditable && data.length !== 0
        ? axios.put(
            `http://localhost:5000/api/company/update/${data._id}`,
            newdata
          )
        : await axios.post("http://localhost:5000/api/companiesdata", newdata);
    }
    showModal(false);
    window.location.reload();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              value={companyName}
              label="Comapny Name"
              variant="outlined"
              onChange={(e) => setCompanyName(e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              value={companyPhone}
              label="Comapny Phone"
              variant="outlined"
              onChange={(e) => setPhone(e.target.value)}
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

export default CreateCompanyForm;
