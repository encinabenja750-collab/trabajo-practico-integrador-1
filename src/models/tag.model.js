import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { ArticleModel } from "./article.model.js";
import { articleTagModel } from "./articleTag.model.js";

export const TagModel = sequelize.define("Tag", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
  },
});

ArticleModel.belongsToMany(TagModel, {
  through: articleTagModel,
  foreignKey: "article_id",
  otherKey: "tag_id",
  as: "tags",
});

TagModel.belongsToMany(ArticleModel, {
  through: articleTagModel,
  foreignKey: "tag_id",
  otherKey: "article_id",
  as: "articles",
});
