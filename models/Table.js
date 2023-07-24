import mongoose from "mongoose";

const TableSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    file: String,
    originalFileName: String,
    fileName: String,
    material: String,
    quality: String,
    width: Number,
    height: Number,
    count: Number,
    sum: Number,
    notes: String,
    address: String,
    descriptionDelete: String,
    status: {
      name: String,
      currentStatus: String,
      paid: Boolean,
    },
    date: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    conditions: {
      lamination: {
        option: String,
        name: String,
        value: String,
      },
      cutting: {
        option: String,
        name: String,
        value: String,
      },
      eyelets: {
        option: String,
        name: String,
        value: String,
      },
      mounting: {
        option: String,
        name: String,
        value: String,
      },
      poster: {
        option: String,
        name: String,
        value: String,
      },
      solderGates: {
        option: String,
        name: String,
        value: String,
      },
      solderPockets: {
        option: String,
        name: String,
        value: String,
      },
      stamp: {
        option: String,
        name: String,
        value: String,
      },
      stretch: {
        option: String,
        name: String,
        value: String,
      },
    },
  },
  { timestamps: true }
);

TableSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastTable = await this.constructor.findOne(
      {},
      {},
      { sort: { id: -1 } }
    );
    this.id = lastTable && lastTable.id ? lastTable.id + 1 : 1;
  }
  next();
});

export default mongoose.model("Table", TableSchema);
