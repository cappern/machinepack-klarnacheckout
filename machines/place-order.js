module.exports = {
  "inputs": {
    "eid": {
      "id": "3eed72c0-9309-4b9d-b324-cc8251e04923",
      "friendlyName": "EID",
      "description": "",
      "example": "123a",
      "requiredManually": true,
      "addedManually": true,
      "required": true
    },
    "secret": {
      "friendlyName": "secret",
      "description": "",
      "example": "ART238ureXkz561",
      "addedManually": true,
      "requiredManually": true,
      "required": true
    },
    "live": {
      "id": "7653be11-255b-4432-ba11-bc858853b38d",
      "friendlyName": "Live",
      "description": "Live transactions",
      "example": true,
      "requiredManually": true,
      "addedManually": true,
      "required": true
    },
    "cart": {
      "friendlyName": "Cart",
      "description": "",
      "example": {
        "items": [{
          "name": "Tin of spam",
          "reference": "1234",
          "quantity": 2,
          "unit_price": 3400,
          "tax_rate": 2500
        }]
      },
      "addedManually": true,
      "requiredManually": true,
      "required": true
    },
    "country": {
      "id": "8c9499fc-703f-4fec-a615-808a3f6a2384",
      "friendlyName": "Country",
      "description": "Klarna Country\nSupported languages: https://developers.klarna.com/en/se+php/kco-v2/checkout-api#supported-locales",
      "example": "NO",
      "addedManually": true
    },
    "currency": {
      "id": "76e18aa4-7486-46a0-b7c5-d2d4c728d2da",
      "friendlyName": "Currency",
      "description": "Klarna currency\nSupported languages: https://developers.klarna.com/en/se+php/kco-v2/checkout-api#supported-locales",
      "example": "NOK",
      "addedManually": true
    },
    "locale": {
      "id": "48ad9307-35f6-474c-9c49-1acf8681fdb1",
      "friendlyName": "locale",
      "description": "Klarna locale\nSupported languages: https://developers.klarna.com/en/se+php/kco-v2/checkout-api#supported-locales",
      "example": "nb-no",
      "addedManually": true
    },
    "confirmationURL": {
      "friendlyName": "Confirmation URL",
      "description": "",
      "example": "http://localhost:1337/confirmation?klarna_order_id={checkout.order.id}",
      "addedManually": true,
      "requiredManually": true,
      "required": true
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
      "example": "<html> \"html code\" </html>"
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
      live: false
    });

    klarna.config({
      purchase_country: inputs.country,
      purchase_currency: inputs.currency,
      locale: inputs.locale,
      terms_uri: 'http://www.example.com',
      cancellation_terms_uri: 'http://www.example.com',
      checkout_uri: 'http://www.example.com',
      confirmation_uri: inputs.confirmationURL,
      push_uri: 'http://www.example.com'
    });

    return klarna.place(inputs.cart).then(function(id) {
      console.log("Klarna ID :", id);
      return klarna.fetch(id);
    }, function(error) {
      console.log("error:");
      return exits.error(error);
    }).then(function(order) {
      console.log("Snippet received");
      return exits.success(order.gui.snippet);
    }, function(error) {
      return exits.error(error);
    });
  },
  "identity": "place-order"
};