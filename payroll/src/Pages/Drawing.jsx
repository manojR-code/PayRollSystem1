import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import SpeedDial from "@mui/material/SpeedDial";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ClearIcon from "@mui/icons-material/Clear";
import UndoIcon from "@mui/icons-material/Undo";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import GroupsIcon from "@mui/icons-material/Groups";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Button,
} from "@mui/material";

export default function Drawing() {
  const socketRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef({});
  const [Players, setPlayers] = useState([]);
  const [color, setColor] = useState("#000000");
  const [openGroup, setOpenGroup] = useState(false);
  const [artist, setArtist] = useState(false);
  const [guess, setGuess] = useState("");
  const [wordOptions, setWordOptions] = useState([]);
  const [openWordPopup, setOpenWordPopup] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");
  const [needtoguess, setNeedToGuess] = useState();
  const Canvas = [
    { icon: <ClearIcon />, name: "Clear" },
    { icon: <UndoIcon />, name: "Undo" },
    { icon: <ColorLensIcon />, name: "Color" },
    { icon: <GroupsIcon />, name: "Group" },
  ];

  const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }));
  //Socket Connection
  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("connect", () => {
      console.log("Socket connected:", socketRef.current.id);
      socketRef.current.emit("UserConnected", {
        Name: localStorage.getItem("Name") || "Guest",
      });
    });

    socketRef.current.on("user_left", ({ id }) => {
      delete lastPosRef.current[id];
      setPlayers((prev) => prev.filter((player) => player[0] !== id));
    });

    socketRef.current.on("Player", (users) => {
      const others = users.filter((data) => data[0] !== socketRef.current.id);
      setPlayers(others);
    });

    socketRef.current.on("Special_Socket", ({ words }) => {
      // Show the artist word selection popup
      setArtist(true);
      setWordOptions(words);
      setOpenWordPopup(true);
    });

    socketRef.current.on("Artist_Chosen", ({ id }) => {
      setArtist(id === socketRef.current.id);
    });

    socketRef.current.on("guessed", (data) => {
      setNeedToGuess(data.word);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // Drawing From Other Side
  useEffect(() => {
    if (!socketRef.current) return;

    socketRef.current.on("Draw_Co_ordinates", ({ id, offsetX, offsetY }) => {
      const ctx = ctxRef.current;
      const last = lastPosRef.current[id];
      if (!last) {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
      } else {
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      }
      lastPosRef.current[id] = { offsetX, offsetY };
    });

    socketRef.current.on("ColorChangeed", ({ color }) => {
      ctxRef.current.strokeStyle = color;
    });

    socketRef.current.on("Clear", ({ id }) => {
      ctxRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      delete lastPosRef.current[id];
    });

    socketRef.current.on("Stop_Cordinates", ({ id }) => {
      lastPosRef.current[id] = undefined;
    });
  }, []);

  // Canvas Making
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth - 70;
    canvas.height = window.innerHeight - 70;
    canvas.style.border = "2px solid #aaa";
    canvas.style.background = "#fff";

    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    if (ctxRef.current) ctxRef.current.strokeStyle = color;
  }, [color]);

  // DRAWING EVENTS
  const startDrawing = (e) => {
    if (!artist) return;
    isDrawingRef.current = true;
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    socketRef.current.emit("Draw_Co_ordinates", {
      id: socketRef.current.id,
      offsetX,
      offsetY,
    });
  };

  const draw = (e) => {
    if (!artist || !isDrawingRef.current) return;
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
    socketRef.current.emit("Draw_Co_ordinates", {
      id: socketRef.current.id,
      offsetX,
      offsetY,
    });
  };

  const stopDrawing = () => {
    if (!artist) return;
    isDrawingRef.current = false;
    ctxRef.current.closePath();
    socketRef.current.emit("Stop_Cordinates", { id: socketRef.current.id });
  };

  const Call = (name) => {
    switch (name) {
      case "Clear":
        ctxRef.current.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        socketRef.current.emit("Clean", { id: socketRef.current.id });
        break;
      case "Color":
        document.getElementById("colorPicker").click();
        break;
      case "Group":
        setOpenGroup(true);
        break;
      default:
        break;
    }
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    socketRef.current.emit("ColorChange", {
      id: socketRef.current.id,
      color: newColor,
    });
  };

  const sendGuess = () => {
    if (guess.trim() === "") return;
    socketRef.current.emit("User_Guess", {
      guess,
      id: socketRef.current.id,
    });
    setGuess("");
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{
          background: "#fff",
          cursor: artist ? "crosshair" : "not-allowed",
          opacity: artist ? 1 : 0.8,
        }}
      />

      <input
        type="color"
        id="colorPicker"
        value={color}
        onChange={handleColorChange}
        style={{ display: "none" }}
      />

      {/* LOADING OR ARTIST UI */}
      {Players.length <= 0 ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "auto",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <CircularProgress />
          <p style={{ fontSize: "12px" }}>
            Searching for players... <br />
            <small>Draw something while we wait — it’ll clear later</small>
          </p>
        </div>
      ) : artist ? (
        <>
          {/* WORD SELECTION POPUP */}
          <Dialog open={openWordPopup} onClose={() => setOpenWordPopup(false)}>
            <DialogTitle>Select a word to draw </DialogTitle>
            <DialogContent>
              <List>
                {wordOptions.map((word, index) => (
                  <React.Fragment key={index}>
                    <ListItem
                      button
                      selected={selectedWord === word}
                      onClick={() => setSelectedWord(word)}
                    >
                      <ListItemText primary={word} />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                disabled={!selectedWord}
                onClick={() => {
                  setOpenWordPopup(false);
                  socketRef.current.emit("Selected_word", {
                    word: selectedWord,
                    artistId: socketRef.current.id,
                  });
                }}
              >
                Confirm Word
              </Button>
            </DialogContent>
          </Dialog>

          <Box sx={{ position: "relative", top: 0 }}>
            <StyledSpeedDial
              ariaLabel="SpeedDial playground example"
              icon={<SpeedDialIcon />}
            >
              {Canvas.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  onClick={() => Call(action.name)}
                />
              ))}
            </StyledSpeedDial>
          </Box>
        </>
      ) : (
        // NON-ARTIST GUESS BOX
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "rgba(255,255,255,0.15)",
            padding: "10px 16px",
            borderRadius: "16px",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          <input
            type="text"
            placeholder="Guess the word..."
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            style={{
              border: "2px solid #2196f3",
              borderRadius: "12px",
              padding: "8px 14px",
              width: "240px",
              outline: "none",
              background: "rgba(255,255,255,0.2)",
              color: "black",
              fontSize: "1rem",
            }}
          />
          <button
            style={{
              background: "#2196f3",
              border: "none",
              color: "white",
              borderRadius: "10px",
              padding: "8px 16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onClick={() => {
              if (guess==needtoguess) {
                alert("success");
              }
            }}
          >
            Send
          </button>
        </div>
      )}

      {/* Group Dialog */}
      <Dialog open={openGroup} onClose={() => setOpenGroup(false)} fullWidth>
        <DialogTitle>Online Players</DialogTitle>
        <DialogContent>
          {Players.length === 0 ? (
            <p>No other players online.</p>
          ) : (
            <List>
              {Players.map((player) => (
                <React.Fragment key={player[0]}>
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end">
                        <MusicNoteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={player[1]} />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )}
          <Button
            onClick={() => setOpenGroup(false)}
            variant="contained"
            color="error"
            sx={{ mt: 2 }}
            fullWidth
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
