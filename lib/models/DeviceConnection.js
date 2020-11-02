const { DataTypes } = require("sequelize");

const deviceConnectionSchema = {
    name: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    details: DataTypes.STRING(255),
    private_key: {
        type:DataTypes.TEXT,
        allowNull: false
    }
};

module.exports = { deviceConnectionSchema };
