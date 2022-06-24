import { Model, ModelStatic, Sequelize } from "sequelize";
import DataType from "sequelize/types/data-types";

export class ClassRoom extends Model {
  declare id: number;
  declare name: string;
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: { [key: string]: ModelStatic<any> }) {
    // define association here
    ClassRoom.hasMany(models.Student, {
      foreignKey: "classRoomID",
    });
  }
}

export default (sequelize: Sequelize, DataTypes: typeof DataType) => {
  ClassRoom.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "ClassRoom",
    }
  );
  return ClassRoom;
};
