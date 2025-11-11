const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
dotenv.config();
const Express = require("express");
const app = Express();
const cors = require("cors");
const DB = require("./Connection");
const UserModel = require("./Routes/Registration");
const UserGet = require("./Routes/UserList");

const server = http.createServer(app);
app.use(cors());
app.use(Express.json());
app.use("/User/api", UserModel);
app.use("/User/api", UserGet);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
const WORDS = [
  ["apple", "banana", "grapes"],
  ["car", "bus", "bicycle"],
  ["dog", "cat", "elephant"],
  ["house", "tree", "mountain"],
  ["sun", "moon", "star"],
  ["book", "pen", "laptop"],
  ["fish", "shark", "whale"],
  ["rain", "cloud", "lightning"],
  ["chair", "table", "bed"],
  ["football", "basketball", "cricket"],
  ["river", "sea", "bridge"],
  ["train", "plane", "ship"],
  ["shoe", "hat", "shirt"],
  ["cake", "icecream", "pizza"],
  ["guitar", "drum", "piano"],
  ["king", "queen", "castle"],
  ["robot", "rocket", "planet"],
  ["camera", "phone", "television"],
  ["door", "window", "wall"],
  ["butterfly", "bird", "snake"],
];
const User_Map = new Map();
let Stack = [];
let currentArtist = null;

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);
  socket.emit("connects", "Welcome to Server");
  socket.broadcast.emit("New_User_Joined", { id: socket.id });

  socket.on("UserConnected", ({ Name }) => {
    User_Map.set(socket.id, Name);
    Stack.push(socket.id);

    const data = Array.from(User_Map.entries());
    io.emit("Player", data);
  });

  socket.on("Draw_Co_ordinates", (data) => {
    socket.broadcast.emit("Draw_Co_ordinates", { id: socket.id, ...data });
  });

  socket.on("Stop_Cordinates", () => {
    socket.broadcast.emit("Stop_Cordinates", { id: socket.id });
  });
  socket.on("Selected_word", (selected) => {
    socket.broadcast.emit("guessed", selected);
  })
  socket.on("Clean", () => {
    socket.broadcast.emit("Clear", socket.id);
  });

  socket.on("ColorChange", ({ color }) => {
    socket.broadcast.emit("ColorChangeed", { color, id: socket.id });
  });

  socket.on("disconnect", (reason) => {
    console.log("🔴 Disconnected:", socket.id);
    User_Map.delete(socket.id);
    Stack = Stack.filter((id) => id !== socket.id);
    io.emit("user_left", { id: socket.id, reason });
    if (socket.id === currentArtist) {
      chooseNewArtist();
    }
  });
});

function chooseNewArtist() {
  if (Stack.length === 0) {
    currentArtist = null;
    return;
  }

  const randomIndex = Math.floor(Math.random() * Stack.length);
  const index = Math.floor(Math.random() * WORDS.length);
  const newArtist = Stack[randomIndex];
  currentArtist = newArtist;

  io.to(newArtist).emit("Special_Socket", { words: WORDS[index] });

  io.emit("Artist_Chosen", {
    id: newArtist,
    name: User_Map.get(newArtist),
  });

  console.log(" New Artist Chosen:", User_Map.get(newArtist));
}
  setInterval(() => {
    chooseNewArtist();
  }, 30000);


server.listen(3000, () => {
  console.log("✅ Server listening on http://localhost:3000");
});
