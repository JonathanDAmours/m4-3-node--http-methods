"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { customers, stock } = require("./data/inventory");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(bodyParser.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  .post("/order", (req, res) => {
    console.log(req.body);

    let error = undefined;
    const bottle = stock.bottle;
    const socks = stock.socks;
    const tshirt = stock.tshirt;
    const small = tshirt.small;
    const medium = tshirt.medium;
    const large = tshirt.large;
    const xlarge = tshirt.xlarge;

    customers.forEach((customer) => {
      console.log(req.body);
      const {
        order,
        size,
        email,
        givenName,
        surname,
        address,
        city,
        postcode,
        province,
        country,
      } = req.body;
      if (
        customer.email.toLowerCase() === email.toLowerCase() ||
        (customer.givenName.toLowerCase() === givenName.toLowerCase() &&
          customer.address.toLowerCase() === address.toLowerCase())
      ) {
        error = "repeat-customer";
      } else if (!email.toLowerCase().includes("@")) {
        error = "missing-data";
      } else if (country.toLowerCase() !== "canada") {
        error = "undeliverable";
      } else if (
        (order === "socks" && socks <= "0") ||
        (order === "bottle" && bottle <= "0")
      ) {
        error = "unavailable";
      } else if (
        (order === "tshirt" && size === "small" && small <= "0") ||
        (order === "tshirt" && size === "medium" && medium <= "0") ||
        (order === "tshirt" && size === "large" && large <= "0") ||
        (order === "tshirt" && size === "xlarge" && xlarge <= "0")
      ) {
        error = "unavailable";
      }
    });
    /////
    if (error) {
      res.status(400).json({
        status: "error",
        error,
      });
    } else {
      res.status(200).json({
        status: "success",
      });
    }
    /////
  })
  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
