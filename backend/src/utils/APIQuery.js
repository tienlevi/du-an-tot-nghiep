import { de } from "date-fns/locale";
import e from "express";
import { toLower } from "lodash";
import mongoose, { Query, Document } from "mongoose";

class APIQuery {
  query;
  queryString;

  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields", "search"];
    excludedFields.forEach((el) => delete queryObj[el]);
    Object.keys(queryObj).forEach((el) => {
      if (el.includes("raw")) {
        delete queryObj[el];
      }
    });
    Object.keys(queryObj).forEach((el) => {
      if (String(queryObj[el]).includes(",")) {
        queryObj[el] = { $in: queryObj[el].split(",") };
      }
    });
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  search() {
    if (this.queryString.search) {
      const isId = mongoose.Types.ObjectId.isValid(this.queryString.search);
      if (isId) {
        const search = this.queryString.search;
        this.query = this.query.find({ _id: search });
      } else {
        const search = toLower(this.queryString.search);
        this.query = this.query.find({
          name: { $regex: search, $options: "i" },
        });
      }
    }
    return this;
  }
  paginate() {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  async count() {
    const totalDocs = await this.query.model.countDocuments(
      this.query.getQuery()
    );
    return totalDocs;
  }
}

export default APIQuery;
