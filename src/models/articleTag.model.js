import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const articleTagModel = sequelize.define("ArticleTag", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  article_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "articles",
      key: "id",
    },
  },
  tag_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "tags",
      key: "id",
    },
  },
});
