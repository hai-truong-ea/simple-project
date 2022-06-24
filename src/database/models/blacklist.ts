import { Model, Sequelize } from "sequelize";
import DataType from "sequelize/types/data-types";

export class Blacklist extends Model {
  declare id: number;
  declare token: string;
}

export default (sequelize: Sequelize, DataTypes: typeof DataType) => {
  Blacklist.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      token: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Blacklist",
    }
  );
  return Blacklist;
};
