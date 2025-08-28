import express from "express"
import cors from "cors"
import authRouter from "./routes/auth";
import categoryRouter from "./routes/categories";
import summaryRouter from "./routes/summary";
import receiptsRouter from "./routes/receipts";
import incomesRouter from "./routes/incomes";
import expensesRouter from "./routes/expenses";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/categories', categoryRouter);
app.use('/expenses', expensesRouter);
app.use('/incomes', incomesRouter);
app.use('/summary', summaryRouter);
app.use('/receipt', receiptsRouter);

app.get("/", (req, res) => {
  res.send("Hello from expense tracker api")
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))