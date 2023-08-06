import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../../../shared/Modal/Modal";
import CreateCompanyForm from "./CreateCompanyForm";
import { Box, Button, Typography, Divider, IconButton } from "@mui/material";
import Table from "../../../shared/Table/Table";
import ContextMenu from "../../../shared/ContextMenu/ContextMenu";
import CloseIcon from "@mui/icons-material/Close";

const Companies = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add Company");
  const [submitButtonLabel, setSubmitButtonLabel] = useState("Add Company");

  // get data and listed
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getcompaniesdata")
      .then((res) => setData(res.data))
      .catch();
  }, []);

  const createCompanyModal = () => {
    setModalTitle("Add Company");
    setSubmitButtonLabel("Add Company");
    setCompanyData([]);
    setIsEditable(false);
    setShowModal(true);
  };

  const editCompany = (id) => {
    axios
      .get(`http://localhost:5000/api/companiesgetid/${id}`)
      .then((res) => {
        setCompanyData(res.data);
        console.log("res: ", res);
        setModalTitle("Edit Company");
        setSubmitButtonLabel("Update Company");
        setIsEditable(true);
        setShowModal(true);
      })
      .catch();
  };

  function deleteRecord(id) {
    axios.delete(`http://localhost:5000/api/companiesDelete/${id}`);
    window.location.reload();
  }

  const companyHeaders = [
    {
      th: "Company Name",
      minWidth: "30%",
    },
    {
      th: "Company Phone",
      minWidth: "60%",
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
            content: item.companyName,
            title: "Company Name",
          },
          {
            content: item.companyPhone,
            title: "Company phone",
          },
          {
            content: (
              <div className="flex gap-2">
                <ContextMenu
                  properties={[
                    {
                      label: "Edit",
                      onClick: () => editCompany(item._id),
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
          Companies
        </Typography>
        <Button variant="contained" onClick={createCompanyModal}>
          Create Company
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
          <CreateCompanyForm
            data={companyData}
            isEditable={isEditable}
            showModal={setShowModal}
            buttonLabel={submitButtonLabel}
          />
        </Box>
      </Modal>
    </React.Fragment>
  );
};
export default Companies;
