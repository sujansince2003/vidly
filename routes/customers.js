const mongoose = require("mongoose");
const { Customer, validate } = require("../models/customer");

const Joi = require("joi");
const express = require("express");
const router = express.Router();

// defining customers schema

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort({ name: 1 });
  res.send(customers);
});

router.get("/:cid", async (req, res) => {
  const customer = await Customer.findById(req.params.cid);

  customer
    ? res.send(customer)
    : res.status(404).send("Customer is not found with this id");
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  customer = await customer.save();
  res.send(customer);
});

router.put("/:cid", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  const customer = await Customer.findByIdAndUpdate(
    req.params.cid,
    {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold,
    },
    { new: true }
  );
  if (!customer)
    return res.status(404).send("Customer is not found with this id");
  res.send(customer);
});

router.delete("/:cid", async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.cid);
  if (!customer) return res.status(404).send("Customer not found with this id");
  res.send(customer);
});

module.exports = router;
