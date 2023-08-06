const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./model/User");
const CompaniesList = require("./model/CompaniesList");
const Customer = require("./model/Customer");
const Supplier = require("./model/Supplier");
const Areas = require("./model/Areas");
const Items = require("./model/Items");
const session = require("express-session");
const OrderBooker = require("./model/OrderBooker");
const { ObjectId } = require("mongodb");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    secret: "7ghhj2j8d7gj1h383h3",
    resave: false,
    saveUninitialized: false,
  })
);
let compId;

//database connection
mongoose
  .connect("mongodb://127.0.0.1:27017/arix")
  .then(() => console.log("db connected"))
  .catch();

// Routes
//
app.post("/api/companiesdata", async (req, res) => {
  const { companyName, companyPhone } = req.body;

  const companyData = new CompaniesList({ companyName, companyPhone });
  const savedCompany = await companyData.save();
  res.status(200).send(savedCompany);
});
app.get("/api/getcompaniesdata", async (req, res) => {
  const companyData = await CompaniesList.find({});
  res.status(200).send(companyData);
});
app.delete("/api/companiesDelete/:id", (req, res) => {
  const companyId = req.params.id;

  // Check if the ID is a valid ObjectId
  if (!mongoose.isValidObjectId(companyId)) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid company ID" });
  }

  CompaniesList.findOneAndDelete({ _id: companyId })
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(500).json({ success: false, error: err }));
});

//edit companies data by id;
app.get("/api/companiesgetid/:id", async (req, res) => {
  const companyId = await CompaniesList.findById(req.params.id);
  res.status(200).send(companyId);
});

//update company;
app.put("/api/company/update/:id", async (req, res) => {
  compId = req.params.id;
  CompaniesList.findByIdAndUpdate(
    { _id: compId },
    {
      $set: {
        companyName: req.body.companyName,
        compnayPhone: req.body.companyPhone,
      },
    }
  )
    .then((result) => res.status(200).json({ updated: result }))
    .catch();
});

app.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const newUser = new User({ firstname, lastname, email, password });
  const savedUser = await newUser.save();
  res.status(200).send(savedUser);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if the email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Find the user based on email
    const user = await User.findOne({ email });

    // Check if the user exists and the password matches
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Successful login
    // return res.status(200).json({ message: "Login successful" });
    req.session.user = user;

    // Successful login
    return res.status(200).json({ message: "Login " });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/company/toPost", async (req, res) => {
  const { compname, phone } = req.body;
  const addData = new Company({ compname, phone });
  try {
    const result = await addData.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json({ message: "Logout successful" });
  });
});

app.delete("/table/:id", (req, res) => {
  const companyId = req.params.id;

  // Check if the ID is a valid ObjectId
  if (!mongoose.isValidObjectId(companyId)) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid company ID" });
  }

  Company.findOneAndDelete({ _id: companyId })
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(500).json({ success: false, error: err }));
});

//items
app.post("/api/items", async (req, res) => {
  try {
    const newItem = new Items(req.body);
    const savedItem = await newItem.save();
    res.status(200).json(savedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
app.get("/api/getsitems", async (req, res) => {
  const itemsData = await Items.find({});
  res.status(200).send(itemsData);
});
app.delete("/api/itemsDelete/:id", (req, res) => {
  const itemsId = req.params.id;

  // Check if the ID is a valid ObjectId
  if (!mongoose.isValidObjectId(itemsId)) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid company ID" });
  }

  Items.findOneAndDelete({ _id: itemsId })
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(500).json({ success: false, error: err }));
});
app.get("/api/itemsgetid/:id", async (req, res) => {
  const itemsId = await Items.findById(req.params.id);
  res.status(200).send(itemsId);
});
app.put("/api/items/update/:id", async (req, res) => {
  itemsId = req.params.id;
  Items.findByIdAndUpdate(
    { _id: itemsId },
    {
      $set: {
        name: req.body.name,
        location: req.body.location,
        salePrice: req.body.salePrice,
        purchasePrice: req.body.purchasePrice,
        purchaseDiscount: req.body.purchaseDiscount,
        reOrderLevel: req.body.reOrderLevel,
        minSalePrice: req.body.minSalePrice,
        companyValue: req.body.companyValue,
      },
    }
  )
    .then((result) => res.status(200).json({ updated: result }))
    .catch();
});

app.post("/supplier", async (req, res) => {
  try {
    const newItem = new Supplier(req.body);
    const savedItem = await newItem.save();
    res.status(200).json(savedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
app.get("/supplier/show", async (req, res) => {
  const itemData = await Supplier.find({});
  res.status(200).send(itemData);
});
app.delete("/supplier/:id", (req, res) => {
  const companyId = req.params.id;

  // Check if the ID is a valid ObjectId
  if (!mongoose.isValidObjectId(companyId)) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid company ID" });
  }

  Supplier.findOneAndDelete({ _id: companyId })
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(500).json({ success: false, error: err }));
});
app.get("/api/supplierbyid/:id", async (req, res) => {
  const companyId = await Supplier.findById(req.params.id);
  res.status(200).send(companyId);
});
//edit routes
app.put("/supplier/update/:id", async (req, res) => {
  Supplier.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        distributername: req.body.distributername,
        address: req.body.address,
        telephoneNumber: req.body.telephoneNumber,
        debit: req.body.debit,
        credit: req.body.credit,
      },
    }
  )
    .then((result) => res.status(200).json({ updated: result }))
    .catch();
});

app.post("/areas", async (req, res) => {
  try {
    const newItem = new Areas(req.body);
    const savedItem = await newItem.save();
    res.status(200).json(savedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
app.get("/areas/show", async (req, res) => {
  const itemData = await Areas.find({});
  res.status(200).send(itemData);
});
app.delete("/areas/:id", (req, res) => {
  const companyId = req.params.id;

  // Check if the ID is a valid ObjectId
  if (!mongoose.isValidObjectId(companyId)) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid company ID" });
  }

  Areas.findOneAndDelete({ _id: companyId })
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(500).json({ success: false, error: err }));
});
app.put("/areas/edit/:id", async (req, res) => {
  Areas.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        areasname: req.body.areasname,
      },
    }
  )
    .then((result) => res.status(200).json({ updated: result }))
    .catch();
});
app.get("/api/areabyid/:id", async (req, res) => {
  const companyId = await Areas.findById(req.params.id);
  res.status(200).send(companyId);
});

app.post("/customers", async (req, res) => {
  const {
    customername,
    area, // Assuming you pass the areaId in the request body
    contact,
    openingbalance,
    commoncode,
    remarks,
  } = req.body;

  // Create a new Customer instance
  const customer = new Customer({
    customername,
    area, // Set the area field with the provided areaId
    contact,
    openingbalance,
    commoncode,
    remarks,
  });

  // Save the customer to the database
  const result = await customer.save();

  res.status(200).json({ message: "Customer created successfully", result });
});
app.get("/customer/show", async (req, res) => {
  const itemData = await Customer.find({});
  res.status(200).send(itemData);
});
app.delete("/customer/:id", (req, res) => {
  const customerId = req.params.id;

  // Check if the ID is a valid ObjectId
  if (!mongoose.isValidObjectId(customerId)) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid company ID" });
  }

  Customer.findOneAndDelete({ _id: customerId })
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(500).json({ success: false, error: err }));
});
app.put("/customer/edit/:id", async (req, res) => {
  Customer.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        customername: req.body.customername,
        area: req.body.area,
        contact: req.body.contact,
        openingbalance: req.body.openingbalance,
        commoncode: req.body.commoncode,
        remarks: req.body.remarks,
      },
    }
  )
    .then((result) => res.status(200).json({ updated: result }))
    .catch();
});
app.get("/api/customerbyid/:id", async (req, res) => {
  const customerId = await Customer.findById(req.params.id);
  res.status(200).send(customerId);
});

//orderbooker;
app.post("/orderbooker", async (req, res) => {
  const { orederBookerName } = req.body;

  // Create a new Customer instance
  const customer = new OrderBooker({ orederBookerName });

  // Save the customer to the database
  const result = await customer.save();

  res
    .status(200)
    .json({ message: "orederBookerName created successfully", result });
});
app.get("/orderbooker/show", async (req, res) => {
  const itemData = await OrderBooker.find({});
  res.status(200).send(itemData);
});
app.delete("/orderbooker/:id", (req, res) => {
  const bookerId = req.params.id;

  // Check if the ID is a valid ObjectId
  if (!mongoose.isValidObjectId(bookerId)) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid company ID" });
  }

  OrderBooker.findOneAndDelete({ _id: bookerId })
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(500).json({ success: false, error: err }));
});
app.put("/orderbooker/edit/:id", async (req, res) => {
  OrderBooker.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        orederBookerName: req.body.orederBookerName,
      },
    }
  )
    .then((result) => res.status(200).json({ updated: result }))
    .catch();
});
app.get("/api/orderbookerbyid/:id", async (req, res) => {
  const bookerId = await OrderBooker.findById(req.params.id);
  res.status(200).send(bookerId);
});

app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});
