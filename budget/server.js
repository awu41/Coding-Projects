const express = require("exrpess");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.port || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(
    "mongo://localhost:27017/BudgetTracker",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const db = mongoose.connection;
db.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});

db.once("open", () => {
    console.log("Connected to mongoose");
});

const expenseSchema = new mongoose.Schema({
    description: {type: String, required: true},
    amount: {type: Number, required: true},
});

const Expense = mongoose.model("Expense", expenseSchema);

app.get("/expenses", async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        console.error("Error fetching expenses:", error);
        res.status(500).json({ message: "Internal Server Error when fetching expenses" });
    }
});

app.post("/expenses", async (req, ress) => {
    const {description, amount} = req.body;

    try {
        if (!description || !amount) {
            return res.status(400).json({message : "Description and amount are required"});
        }
        const newExpense = new Expense({description, amount});
        await newExpense.save();
        res.json(newExpense);
    } catch (error) {
        console.error("Error saving expense:", error);
        res.status(500).json({ message: "Internal Server Error when saving expense"});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});