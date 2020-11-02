const { deviceConnectionSchema } = require('./DeviceConnection');
const { groupSchema } = require('./Group');
const { jsonSchemaSchema } = require('./JsonSchema.js');
const { queuedMessageSchema } = require('./QueuedMessage.js');
const { secretSchema } = require('./Secret.js');
const { userSchema } = require('./User.js');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL);

const JsonSchema = sequelize.define('JsonSchema', jsonSchemaSchema, { paranoid: true });
const User = sequelize.define('User', userSchema, { paranoid: true });
const Group = sequelize.define('Group', groupSchema, { paranoid: true });
const Secret = sequelize.define('Secret', secretSchema, { paranoid: true });
const DeviceConnection = sequelize.define('DeviceConnection', deviceConnectionSchema);
const QueuedMessage = sequelize.define('QueuedMessage', queuedMessageSchema);

Group.hasOne(User, { foreignKey: 'ownerId' });
Secret.hasOne(User, { foreignKey: 'ownerId' });
DeviceConnection.hasOne(User, { foreignKey: 'userId' });

const GroupMember = sequelize.define('GroupMember', {
    isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    groupId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Group,
            key: 'id'
        }
    }
});

JsonSchema.sync();
User.sync();
Group.sync();
GroupMember.sync();
Secret.sync();
DeviceConnection.sync();
QueuedMessage.sync();


module.exports = {
    JsonSchema,
    User, Group, GroupMember,
    Secret,
    DeviceConnection,
    QueuedMessage
};
