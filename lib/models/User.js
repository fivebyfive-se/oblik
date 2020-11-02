const { DataTypes } = require("sequelize");
const { randomBytes, hash } = require('tweetnacl');
const { decodeUTF8, encodeUTF8 } = require('tweetnacl-util');

const hashPassword = (password) => {
    const salt = encodeUTF8(randomBytes(60));
    const hashedPassword = encodeUTF8(hash(decodeUTF8(password + salt)));
    return { salt, hashedPassword };
};

const userSchema = {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: { isEmail: true }
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
        set(value) {
            const { salt, hashedPassword } = hashPassword(value);
            this.setDataValue('salt', salt);
            this.setDataValue('password', hashedPassword);
        }
    },
    salt: DataTypes.TEXT,
    userData: DataTypes.JSONB
};

module.exports = {
    userSchema,
    hashPassword
}