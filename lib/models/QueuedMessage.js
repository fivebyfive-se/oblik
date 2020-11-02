const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
    queuedMessageSchema: {
        receivedAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW
        },
        nonce: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        messageType: {
            type: DataTypes.ENUM('message', 'handshake'),
            allowNull: false,
            defaultValue: 'message'
        },
        encryptedContent: DataTypes.TEXT
    }
};
