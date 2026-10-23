
require("dotenv").config();
const { MongoClient } = require("mongodb");

async function main() {
  if (!process.env.MONGO_URI || !process.env.DB_NAME) {
    throw new Error("Please configure MONGO_URI and DB_NAME in .env");
  }

  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();
    console.log("MongoDB connected successfully");

    const db = client.db(process.env.DB_NAME);
    const transactions = db.collection("transactions");

    // Insert WT02, without creating a duplicate on reruns.
    const existing = await transactions.findOne({
      transactionId: "WT02"
    });

    if (!existing) {
      const result = await transactions.insertOne({
        transactionId: "WT02",
        walletHolder: "Priya",
        amount: 3000,
        transactionType: "Credit"
      });

      console.log("WT02 inserted:", result.acknowledged);
    } else {
      console.log("WT02 already exists; insertion skipped");
    }

    // Update WT01 to Debit.
    const updateResult = await transactions.updateOne(
      { transactionId: "WT01" },
      { $set: { transactionType: "Debit" } }
    );

    console.log("WT01 matched:", updateResult.matchedCount);
    console.log("WT01 modified:", updateResult.modifiedCount);

    // Delete WT03.
    const deleteResult = await transactions.deleteOne({
      transactionId: "WT03"
    });

    console.log("WT03 deleted:", deleteResult.deletedCount);

    // Display the remaining records.
    const allTransactions = await transactions.find({}).toArray();
    console.log("Remaining transactions:", allTransactions);

  } catch (error) {
    console.error("Database operation failed:", error.message);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error("Application failed:", error.message);
  process.exitCode = 1;
});
