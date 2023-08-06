import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../../../shared/Modal/Modal";
import { Box, Button, Typography, Divider, IconButton } from "@mui/material";
import Table from "../../../shared/Table/Table";
import ContextMenu from "../../../shared/ContextMenu/ContextMenu";
import CloseIcon from "@mui/icons-material/Close";
import CreateOrderBookerForm from "./CreateOrderBookerForm";

const OrderBooker = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add Order Booker");
  const [submitButtonLabel, setSubmitButtonLabel] =
    useState("Add Order Booker");

  // get data and listed
  useEffect(() => {
    axios
      .get("http://localhost:5000/orderbooker/show")
      .then((res) => setData(res.data))
      .catch();
  }, []);

  const createData = () => {
    setModalTitle("Add Order Booker");
    setSubmitButtonLabel("Add Order Booker");
    setFormData([]);
    setIsEditable(false);
    setShowModal(true);
  };

  const editData = (id) => {
    axios
      .get(`http://localhost:5000/api/orderbookerbyid/${id}`)
      .then((res) => {
        setFormData(res.data);
        console.log("res: ", res);
        setModalTitle("Edit Company");
        setSubmitButtonLabel("Update Company");
        setIsEditable(true);
        setShowModal(true);
      })
      .catch();
  };

  function deleteRecord(id) {
    axios.delete(`http://localhost:5000/orderbooker/${id}`);
    window.location.reload();
  }

  const headers = [
    {
      th: "Order Booker Name",
      minWidth: "30%",
    },
  ];

  const rows = data
    ? data.map((item, index) => ({
        id: index.toString(),
        informationCells: [
          {
            content: item.orederBookerName,
            title: "Company Name",
          },
          {
            content: (
              <div className="flex gap-2">
                <ContextMenu
                  properties={[
                    {
                      label: "Edit",
                      onClick: () => editData(item._id),
                    },
                    {
                      label: "Delete",
                      onClick: () => deleteRecord(item._id),
                    },
                  ]}
                />
              </div>
            ),
          },
        ],
      }))
    : [];

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Order Booker
        </Typography>
        <Button variant="contained" onClick={createData}>
          Create Order Booker
        </Button>
      </Box>

      <Divider sx={{ my: "24px" }} />

      <Box
        sx={{
          bgcolor: "background.paper",
          p: 4,
          borderRadius: "8px",
          boxShadow: "0px 4px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Table
          headers={headers}
          rows={rows}
          noDataMessage="No Companies exit..."
        />
      </Box>

      <Modal shouldShowModal={showModal}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {modalTitle}
          </Typography>
          <IconButton
            aria-label="close"
            size="small"
            onClick={() => setShowModal(false)}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ my: "24px" }} />
        <Box>
          <CreateOrderBookerForm
            data={formData}
            isEditable={isEditable}
            showModal={setShowModal}
            buttonLabel={submitButtonLabel}
          />
        </Box>
      </Modal>
    </React.Fragment>
  );
};
export default OrderBooker;
