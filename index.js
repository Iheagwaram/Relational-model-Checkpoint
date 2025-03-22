const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

const Hotel = sequelize.define('Hotel', {
    Hotel_Id: { type: DataTypes.INTEGER, primaryKey: true },
    Hotel_Name: { type: DataTypes.STRING, allowNull: false }
});

const Type = sequelize.define('Type', {
    Type_Id: { type: DataTypes.INTEGER, primaryKey: true },
    Type_Name: { type: DataTypes.STRING, allowNull: false }
});

const Room = sequelize.define('Room', {
    Room_Id: { type: DataTypes.INTEGER, primaryKey: true },
    Floor: { type: DataTypes.INTEGER, allowNull: false }
});

const Category = sequelize.define('Category', {
    Category_Id: { type: DataTypes.INTEGER, primaryKey: true },
    Category_Name: { type: DataTypes.STRING, allowNull: false },
    Price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    Beds_Numbers: { type: DataTypes.INTEGER, allowNull: false }
});

const Employee = sequelize.define('Employee', {
    Employee_Id: { type: DataTypes.INTEGER, primaryKey: true },
    Employee_Name: { type: DataTypes.STRING, allowNull: false },
    Employee_Speciality: { type: DataTypes.STRING, allowNull: false }
});

// Relationships
Hotel.hasMany(Employee);
Employee.belongsTo(Hotel);

Hotel.hasMany(Room);
Room.belongsTo(Hotel);

Type.hasMany(Room);
Room.belongsTo(Type);

Category.hasMany(Room);
Room.belongsTo(Category);

Employee.hasMany(Employee, { as: 'Leads', foreignKey: 'Manager_Id' });
Employee.belongsTo(Employee, { as: 'Manager', foreignKey: 'Manager_Id' });

sequelize.sync({ force: true }).then(() => {
    console.log("Database & tables created!");
});
