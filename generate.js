module.exports = function () {
  var faker = require("faker");
  var _ = require("lodash");
  return {
    restaurants: _.times(20, function (n) {
      return {
        id: n,
        name: faker.company.companyName(),
        image: "https://source.unsplash.com/1600x900/?food",
        address: faker.address.streetAddress(),
        open: faker.random.boolean(),
        deliveryMin: faker.random.number(40),
        foodTypes: [faker.commerce.productAdjective(), faker.commerce.productAdjective(), faker.commerce.productAdjective()]
      }
    })
  }
}

