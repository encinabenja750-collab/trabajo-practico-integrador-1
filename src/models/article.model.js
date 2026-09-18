import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";

export const ArticleModel = sequelize.define("Article", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    tpye: DataTypes.TEXT,
    allowNull: false,
  },
  excerpt: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("published", "archived"),
    defaultValue: "published",
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
});

UserModel.hasMany(ArticleModel, {
  foreignKey: "user_id",
  as: "articles",
});

ArticleModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "author",
});
