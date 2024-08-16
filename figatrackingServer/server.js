const app = express();
const port = 3000;

app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
