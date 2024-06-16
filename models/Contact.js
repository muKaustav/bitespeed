module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define('Contact', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isEmail: true, // Ensures the email format is valid
            },
        },
        linkedId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Contacts', // This assumes that the model name is 'Contact'
                key: 'id',
            },
        },
        linkPrecedence: {
            type: DataTypes.ENUM('primary', 'secondary'),
            allowNull: false,
            defaultValue: 'primary', // Assuming 'primary' as the default value
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    }, {
        paranoid: true, // This enables the 'deletedAt' field for soft deletes
    })

    Contact.associate = models => {
        Contact.belongsTo(models.Contact, {
            as: 'linkedContact',
            foreignKey: 'linkedId',
            onDelete: 'SET NULL',
        })
    }

    return Contact
}
