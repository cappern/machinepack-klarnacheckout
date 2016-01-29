module.exports = {
  "inputs": {
    "eid": {
      "friendlyName": "EID",
      "description": "",
      "example": 1234,
      "addedManually": true,
      "requiredManually": true,
      "required": true
    },
    "secret": {
      "friendlyName": "Secret",
      "description": "",
      "example": "dsfsdgfdnghgesr435t5",
      "addedManually": true,
      "requiredManually": true,
      "required": true
    },
    "live": {
      "friendlyName": "Live",
      "description": "",
      "example": false,
      "addedManually": true
    },
    "country": {
      "friendlyName": "Country",
      "description": "",
      "example": "SE",
      "addedManually": true
    },
    "currency": {
      "friendlyName": "Currency",
      "description": "",
      "example": "NOK",
      "addedManually": true
    },
    "locale": {
      "friendlyName": "Locale",
      "description": "",
      "example": "nb-no",
      "addedManually": true
    },
    "id": {
      "friendlyName": "id",
      "description": "Order ID",
      "example": "sjdasd76a8d68asiu",
      "addedManually": true,
      "requiredManually": true,
      "required": true
    },
    "order_ref": {
      "friendlyName": "Order reference",
      "description": "Order id",
      "example": "order2016-45",
      "addedManually": true
    }
  },
  "exits": {
    "error": {
      "example": undefined
    },
    "success": {
      "id": "success",
      "friendlyName": "then",
      "description": "Normal outcome.",
      "example": {
        "id": "FZKNGFQAO4JN2731K8ALWU8CH0P",
        "merchant_reference": {
          "orderid1": "order666FTW"
        },
        "purchase_country": "se",
        "purchase_currency": "sek",
        "locale": "sv-se",
        "status": "created",
        "reference": "FZKNGFQAO4JN2731K8ALWU8CH0P",
        "reservation": "1220307000",
        "started_at": "2016-01-23T15:17:35+01:00",
        "completed_at": "2016-01-23T15:18:02+01:00",
        "created_at": "2016-01-23T23:16:23+01:00",
        "last_modified_at": "2016-01-23T23:16:23+01:00",
        "expires_at": "2016-02-06T15:18:02+01:00",
        "cart": {
          "items": [{
            "discount_rate": 0,
            "name": "test",
            "quantity": 10,
            "reference": "1234",
            "tax_rate": 2500,
            "total_price_excluding_tax": 80000,
            "total_price_including_tax": 100000,
            "total_tax_amount": 20000,
            "type": "physical",
            "unit_price": 10000
          }],
          "total_price_excluding_tax": 80000,
          "total_tax_amount": 20000,
          "total_price_including_tax": 100000
        },
        "customer": {
          "type": "person",
          "date_of_birth": "1941-03-21",
          "gender": "female"
        },
        "shipping_address": {
          "given_name": "Testperson-se",
          "family_name": "Approved",
          "street_address": "Stårgatan 1",
          "postal_code": "12345",
          "city": "Ankeborg",
          "country": "se",
          "email": "checkout-se@testdrive.klarna.com",
          "phone": "070 111 11 11"
        },
        "billing_address": {
          "given_name": "Testperson-se",
          "family_name": "Approved",
          "street_address": "Stårgatan 1",
          "postal_code": "12345",
          "city": "Ankeborg",
          "country": "se",
          "email": "checkout-se@testdrive.klarna.com",
          "phone": "070 111 11 11"
        },
        "gui": {
          "layout": "desktop",
          "snippet": ">html snippet>"
        },
        "merchant": {
          "id": "1045",
          "terms_uri": "http://www.example.com",
          "checkout_uri": "http://www.example.com",
          "confirmation_uri": "http://localhost:1337/confirmation?klarna_order_id=FZKNGFQAO4JN2731K8ALWU8CH0P",
          "push_uri": "http://www.example.com",
          "cancellation_terms_uri": "http://www.example.com"
        },
        "cart_update_allowed": true
      }
    }
  },
  "sync": false,
  "cacheable": false,
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    var klarna = require("klarna-checkout");

    klarna.init({
      eid: inputs.eid,
      secret: inputs.secret,
      live: inputs.live
    });

    klarna.config({
      purchase_country: inputs.country,
      purchase_currency: inputs.currency,
      locale: inputs.locale,
      terms_uri: 'http://www.example.com',
      cancellation_terms_uri: 'http://www.example.com',
      checkout_uri: 'http://www.example.com',
      confirmation_uri: 'http://localhost:3000/confirmation?klarna_order_id={checkout.order.id}',
      push_uri: 'http://www.example.com'
    });

    return klarna.confirm(inputs.id, inputs.order_ref).then(function(order) {
      console.log("Order confirmed");
      return exits.success(order);
    }, function(error) {
      return exits.success(error);
    });
  },
  "identity": "confirm-order"
};