import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  TextField,
  Grid,
  Divider,
  Button,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

const CreateItemForm = ({ data, isEditable, showModal, buttonLabel }) => {
  const [name, setName] = useState(data.name ? data.name : "");
  const [location, setLocation] = useState(data.location ? data.location : "");
  const [salePrice, setSalePrice] = useState(
    data.salePrice ? data.salePrice : ""
  );
  const [purchasePrice, setPurchasePrice] = useState(
    data.purchasePrice ? data.purchasePrice : ""
  );
  const [purchaseDiscount, setPurhaseDiscount] = useState(
    data.purchaseDiscount ? data.purchaseDiscount : ""
  );
  const [reOrderLevel, setReorderLevel] = useState(
    data.reOrderLevel ? data.reOrderLevel : ""
  );
  const [minSalePrice, setMinSalePrice] = useState(
    data.minSalePrice ? data.minSalePrice : ""
  );
  const [companiesData, setCompaniesData] = useState([]);
  const [companyValue, setCompanyValue] = useState(
    data.companyValue ? data.companyValue : ""
  );

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getcompaniesdata")
      .then((res) => setCompaniesData(res.data))
      .catch();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newdata = {
      name,
      location,
      salePrice,
      purchasePrice,
      purchaseDiscount,
      reOrderLevel,
      minSalePrice,
      companyValue,
    };

    {
      isEditable && data.length !== 0
        ? axios.put(
            `http://localhost:5000/api/items/update/${data._id}`,
            newdata
          )
        : await axios.post("http://localhost:5000/api/items", newdata);
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
              value={name}
              label="Name"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Copmanies</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={companyValue}
                label="Copmanies"
                onChange={(e) => setCompanyValue(e.target.value)}
              >
                {companiesData
                  ? companiesData.map((item, index) => (
                      <MenuItem value={item.companyName} key={index}>
                        {item.companyName}
                      </MenuItem>
                    ))
                  : ""}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              value={location}
              label="Location"
              variant="outlined"
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={salePrice}
              label="SalePrice"
              variant="outlined"
              onChange={(e) => setSalePrice(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={purchasePrice}
              label="purchasePrice"
              variant="outlined"
              onChange={(e) => setPurchasePrice(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={purchaseDiscount}
              label="purchaseDiscount"
              variant="outlined"
              onChange={(e) => setPurhaseDiscount(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={reOrderLevel}
              label="Reorder Level"
              variant="outlined"
              onChange={(e) => setReorderLevel(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={minSalePrice}
              label="MinSale Price"
              variant="outlined"
              onChange={(e) => setMinSalePrice(e.target.value)}
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

export default CreateItemForm;
