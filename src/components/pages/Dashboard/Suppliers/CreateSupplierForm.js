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
  const [distributername, setDistributername] = useState(
    data.distributername ? data.distributername : ""
  );
  const [address, setAddress] = useState(data.address ? data.address : "");
  const [telephoneNumber, setTelephoneNumber] = useState(
    data.telephoneNumber ? data.telephoneNumber : ""
  );
  const [debit, setDebit] = useState(data.debit ? data.debit : "");
  const [credit, setCredit] = useState(data.credit ? data.credit : "");
  const [supplierData, setSupplierData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/supplier/show")
      .then((res) => setSupplierData(res.data))
      .catch();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newdata = {
      distributername,
      address,
      telephoneNumber,
      debit,
      credit,
    };

    {
      isEditable && data.length !== 0
        ? axios.put(
            `http://localhost:5000/supplier/update/${data._id}`,
            newdata
          )
        : await axios.post("http://localhost:5000/supplier", newdata);
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
              value={distributername}
              label="distributername"
              variant="outlined"
              onChange={(e) => setDistributername(e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              value={address}
              label="Address"
              variant="outlined"
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={telephoneNumber}
              label="telephoneNumber"
              variant="outlined"
              onChange={(e) => setTelephoneNumber(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={debit}
              label="debit"
              variant="outlined"
              onChange={(e) => setDebit(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={credit}
              label="credit"
              variant="outlined"
              onChange={(e) => setCredit(e.target.value)}
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
