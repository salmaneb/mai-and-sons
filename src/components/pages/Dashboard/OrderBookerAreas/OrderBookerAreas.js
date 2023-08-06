import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";

const OrderBookerAreas = () => {
  const [orderBooker, SetOrderBooker] = useState();
  const [orderBookerData, setOrderBookerData] = useState([]);
  const [areaData, setAreaData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/orderbooker/show")
      .then((res) => setOrderBookerData(res.data))
      .catch();
    
    axios.get('http://localhost:5000/areas/show').then(res =>setAreaData(res.data)).catch();
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        Order Booker Area
      </Typography>
      <Divider sx={{ my: "24px" }} />

      <Grid
        container
        spacing={2}
        style={{
          backgroundColor: "#fff",
          padding: "24px 24px 34px",
          marginLeft: "0",
          width: "100%",
          marginBottom: "32px",
        }}
      >
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Order Booker</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={orderBooker}
              label="Copmanies"
              onChange={(e) => SetOrderBooker(e.target.value)}
              size="small"
            >
              {orderBookerData.map((item, index) => {
                return (
                  <MenuItem value={item.orederBookerName}>
                    {item.orederBookerName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <Button variant="contained">Get Data</Button>
        </Grid>
      </Grid>

      <Box sx={{ paddingTop: "24px" }}>
        <Typography variant="h5">Areas</Typography>
        <Divider sx={{ my: "24px" }} />

        <FormGroup>
          {
            areaData.map(item => {
              return (
                <FormControlLabel control={<Checkbox />} label={item.areasname} />
              )
            })
     }
          {/* <FormControlLabel control={<Checkbox />} label="Zone 2" />
          <FormControlLabel control={<Checkbox />} label="Zone 3" />
          <FormControlLabel control={<Checkbox />} label="Zone 4" />
          <FormControlLabel control={<Checkbox />} label="Zone 4" /> */}
        </FormGroup>

        <Divider sx={{ mb: "24px" }} />
        <Box style={{ display: "flex", justifyContent: "end" }}>
          <Button variant="contained">Save</Button>
        </Box>
      </Box>
    </React.Fragment>
  );
};
export default OrderBookerAreas;
