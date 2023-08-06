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



const CreateAreaForm = ({ data, isEditable, showModal, buttonLabel }) => {
  const [areasname, setAreaName] = useState(
    data.areasname ? data.areasname : ""
  );
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
      areasname,
     
    };

    {
      isEditable && data.length !== 0
        ? axios.put(
            `http://localhost:5000/areas/edit/${data._id}`,
            newdata
          )
        : await axios.post("http://localhost:5000/areas", newdata);
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
              value={areasname}
              label="AreasName"
              variant="outlined"
              onChange={(e) => setAreaName(e.target.value)}
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

export default CreateAreaForm;
