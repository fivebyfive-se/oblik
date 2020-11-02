const { DataTypes } = require("sequelize");

module.exports = {
    jsonSchemaSchema: {
        name: { type: DataTypes.STRING(64), allowNull: false },
        content: { type: DataTypes.JSONB, allowNull: false }
    }
};
