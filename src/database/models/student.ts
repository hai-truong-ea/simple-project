import { Model, ModelStatic, Sequelize } from "sequelize";
import DataType from "sequelize/types/data-types";

export class Student extends Model {
  declare id: number;
  declare username: string;
  declare password: string;
  declare className: string;
  declare classRoomID: number;
  declare info?: string;
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: { [key: string]: ModelStatic<any> }) {
    // define association here
    Student.belongsTo(models.ClassRoom, {
      foreignKey: {
        allowNull: false,
        name: "classRoomID",
      },
    });
  }
}

export default (sequelize: Sequelize, DataTypes: typeof DataType) => {
  Student.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      className: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      info: {
        type: DataTypes.TEXT,
      }
    },
    {
      sequelize,
      modelName: "Student",
    }
  );
  return Student;
};
