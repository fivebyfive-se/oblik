const { DataTypes } = require("sequelize");

module.exports = {
    groupSchema: {
        name: {
            type: DataTypes.STRING(64),
            allowNull: false
        }
    }
};
