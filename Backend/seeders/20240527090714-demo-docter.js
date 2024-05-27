'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
    //  * await queryInterface.bulkInsert('People', [{
    //  *   name: 'John Doe',
    //  *   isBetaMember: false
    //  * }], {});
   
  },

 async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  
//Docters
return queryInterface.bulkInsert('Docters', [{
  name: 'Steave roger',
  createdAt: new Date(),
  updatedAt: new Date()
},{
  name: 'Dr banner',
  createdAt: new Date(),
  updatedAt: new Date()
}
,{
  name: 'Dr shaha',
  createdAt: new Date(),
  updatedAt: new Date()
}
], {});

 
  }
};
