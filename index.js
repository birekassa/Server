import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

// connect to Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// ✅ HOME
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Supabase + Express CRUD API 🚀</h1>");
});

// ✅ CREATE
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const { data, error } = await supabase.from("users").insert([{ name, email }]);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// ✅ READ (all)
app.get("/users", async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// ✅ READ (one)
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("users").select("*").eq("id", id).single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// ✅ UPDATE
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const { data, error } = await supabase.from("users").update({ name, email }).eq("id", id);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// ✅ DELETE
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("users").delete().eq("id", id);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});
