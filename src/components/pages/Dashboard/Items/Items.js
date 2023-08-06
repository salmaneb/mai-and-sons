import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../../../shared/Modal/Modal";
import { Box, Button, Typography, Divider, IconButton } from "@mui/material";
import Table from "../../../shared/Table/Table";
import ContextMenu from "../../../shared/ContextMenu/ContextMenu";
import CloseIcon from "@mui/icons-material/Close";
import CreateItemForm from "./CreateItemForm";

const Items = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add Item");
  const [submitButtonLabel, setSubmitButtonLabel] = useState("Add Item");
  console.log("items data", data);
  // get data and listed
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getsitems")
      .then((res) => setData(res.data))
      .catch();
  }, []);

  const createItemModal = () => {
    setModalTitle("Add Item");
    setSubmitButtonLabel("Add Item");
    setItemData([]);
    setIsEditable(false);
    setShowModal(true);
  };

  const editItem = (id) => {
    axios
      .get(`http://localhost:5000/api/itemsgetid/${id}`)
      .then((res) => {
        setItemData(res.data);
        console.log("res: ", res);
        setModalTitle("Edit Item");
        setSubmitButtonLabel("Update Item");
        setIsEditable(true);
        setShowModal(true);
      })
      .catch();
  };

  function deleteRecord(id) {
    console.log(id);
    axios.delete(`http://localhost:5000/api/itemsDelete/${id}`);
    window.location.reload();
  }

  const companyHeaders = [
    {
      th: "Name",
      minWidth: "",
    },
    {
      th: "Company",
      minWidth: "",
    },
    {
      th: "Location",
      minWidth: "",
    },
    {
      th: "salePrice",
      minWidth: "",
    },
    {
      th: "purchasePrice",
      minWidth: "",
    },
    {
      th: "purchaseDiscount",
      minWidth: "",
    },
    {
      th: "reOrderLevel",
      minWidth: "",
    },
    {
      th: "minSalePrice",
      minWidth: "",
    },
    {
      th: "Actions",
      minWidth: "100px",
    },
  ];

  const companyRowsData = data
    ? data.map((item, index) => ({
        id: index.toString(),
        informationCells: [
          {
            content: item.name,
            title: "",
          },
          {
            content: item.companyValue,
            title: "",
          },
          {
            content: item.location,
            title: "",
          },
          {
            content: item.salePrice,
            title: "",
          },
          {
            content: item.purchasePrice,
            title: "",
          },
          {
            content: item.purchaseDiscount,
            title: "",
          },
          {
            content: item.reOrderLevel,
            title: "",
          },
          {
            content: item.minSalePrice,
            title: "",
          },
          {
            content: (
              <div className="flex gap-2">
                <ContextMenu
                  properties={[
                    {
                      label: "Edit",
                      onClick: () => editItem(item._id),
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
          Items
        </Typography>
        <Button variant="contained" onClick={createItemModal}>
          Create Item
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
          headers={companyHeaders}
          rows={companyRowsData}
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
          <CreateItemForm
            data={itemData}
            isEditable={isEditable}
            showModal={setShowModal}
            buttonLabel={submitButtonLabel}
          />
        </Box>
      </Modal>
    </React.Fragment>
  );
};
export default Items;
