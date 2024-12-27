'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Albums', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      artist: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      genreId: {
        allowNull: false,
        references:{model:"Genres"},
        type: Sequelize.INTEGER
      },
      ownerCount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      releaseDate: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      imgSrc: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      discoId: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Albums');
  }
};
