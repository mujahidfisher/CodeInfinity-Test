const { express } = require("./controller");
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`The server is running on port : ${PORT} 👌`);
});

app.use(express.static("./static"), express.json());
