const { DataTypes } = require("sequelize");

module.exports = {
    secretSchema: {
        name: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        objectType: {
            type: DataTypes.ENUM('password', 'payment', 'note', 'custom'),
            defaultValue: 'password'
        },
        objectData: DataTypes.JSONB
    }
};
