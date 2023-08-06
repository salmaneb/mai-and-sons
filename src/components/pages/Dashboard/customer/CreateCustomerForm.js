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



const CreateCustomerForm = ({ data, isEditable, showModal, buttonLabel }) => {
  const [customername,setCustomerName] = useState(
    data.customername ? data.customername : ""
  );
  const [contact, setConatct] = useState(data.contact ? data.contact : "");
  const [openingbalance, setOpeningBalance] = useState(
    data.openingbalance ? data.openingbalance : ""
  );
  const [commoncode, setCommonCode] = useState(data.commoncode ? data.commoncode : "");
  const [remarks, setRemarks] = useState(data.remarks ? data.remarks : "");
  const [area, setArea] = useState(data.area ? data.area : "");
  const [areaData, setAreaData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/areas/show")
      .then((res) => setAreaData(res.data))
      .catch();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newdata = {
      customername,
      area,
      contact,
      openingbalance,
      commoncode,
      remarks,
    };

    {
      isEditable && data.length !== 0
        ? axios.put(
            `http://localhost:5000/customer/edit/${data._id}`,
            newdata
          )
        : await axios.post("http://localhost:5000/customers", newdata);
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
              value={customername}
              label="CustomerName"
              variant="outlined"
              onChange={(e) => setCustomerName(e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Area</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={area}
                label="Area"
                onChange={(e) => setArea(e.target.value)}
              >
                {areaData
                  ? areaData.map((item, index) => (
                      <MenuItem value={item.areasname} key={index}>
                        {item.areasname}
                      </MenuItem>
                    ))
                  : ""}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              value={contact}
              label="Contact"
              variant="outlined"
              onChange={(e) => setConatct(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={openingbalance}
              label="OpeningBalance"
              variant="outlined"
              onChange={(e) => setOpeningBalance(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={commoncode}
              label="commoncode"
              variant="outlined"
              onChange={(e) => setCommonCode(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={remarks}
              label="remarks"
              variant="outlined"
              onChange={(e) => setRemarks(e.target.value)}
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

export default CreateCustomerForm;
