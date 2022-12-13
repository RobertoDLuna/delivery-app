'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('salesProducts', [
      {
        sales_id: 1,
        product_id: 2,
        quantity: 3,
      },
      {
        sales_id: 1,
        product_id: 1,
        quantity: 1,
      },
    ], {timestamps: false });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('salesProducts', null, {});
  }
};