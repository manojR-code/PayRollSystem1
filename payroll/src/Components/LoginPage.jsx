import React from "react";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth, provider } from "../Auth/firebase";
import { Error, Warning } from "../OOPS/Alert";
import {
    ThemeProvider,
    createTheme,
    CssBaseline,
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Divider,
    Stack,
    Paper,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Progress from "../Components/ProgressBar";
const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#1976d2",
        },
        secondary: {
            main: "#ff4081",
        },
        background: {
            default: "#f0f2f5",
        },
    },
    typography: {
        fontFamily: "Roboto, Arial",
    },
});

export default function LoginPage({ setlogined }) {
    const [email, setemail] = React.useState("");
    const [pass, setpass] = React.useState("");
    const [progress, SetProgress] = React.useState(false);
    try {
        if (Date.now() > localStorage.getItem("Expiry")) {
            setlogined(false);
            Warning();
        } else {
            setlogined(true);
        }
    } catch (err) {
        Error();
    }
    const handleEmailLogin = async (e) => {
        e.preventDefault();
        const expirytime = Date.now() + 1000 * 60 * 30;
        try {
            const datas = await createUserWithEmailAndPassword(auth, email, pass);
            const data = [datas];
            localStorage.setItem("Expiry", expirytime);
            localStorage.setItem("Name", data[0].providerData[0].displayName);
            setlogined(true);
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                localStorage.setItem("Expiry", expirytime);
                setlogined(true);
            }
        }
    };
    const handleGoogleLogin = async () => {
        try {
            const users = await signInWithPopup(auth, provider);
            if (users) {
                const data = [users.user];
                const expirytime = Date.now() + 1000 * 60 * 30;
                localStorage.setItem("Expiry", expirytime);
                localStorage.setItem("Name", data[0].providerData[0].displayName);
                setlogined(true);
            } else {
                setlogined(false);
            }
        } catch (err) {
            Error();
        }
    }
    return (
        (progress) ? <Progress /> : <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container maxWidth="sm" style={{ backgroundColor: 'white' }}>
                    <Paper elevation={10} sx={{ mt: 10, p: 5, borderRadius: 3 }}>
                        <Box textAlign="center" mb={3}>
                            <Typography variant="h4" gutterBottom>
                                Manoj And Punith Group
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                Sign in to continue
                            </Typography>
                        </Box>

                        <Stack spacing={2} mb={2}>
                            <Button
                                variant="outlined"
                                startIcon={<GoogleIcon />}
                                onClick={handleGoogleLogin}
                            >
                                Sign in with Google
                            </Button>
                        </Stack>

                        <Divider sx={{ my: 5 }}>OR</Divider>

                        <form onSubmit={handleEmailLogin}>
                            <Stack spacing={2}>
                                <TextField label="Email" onChange={(val) => setemail(val.target.value)} type="email" fullWidth required />
                                <TextField label="Password" onChange={(val) => setpass(val.target.value)} type="password" fullWidth required />
                                <Button variant="contained" type="submit" fullWidth>
                                    Sign in
                                </Button>
                            </Stack>
                        </form>

                        <Box mt={3} textAlign="center">
                            <Typography variant="body2">
                                Don’t have an account?{" "}
                                <Button variant="text" color="primary" size="small">
                                    Sign Up
                                </Button>
                            </Typography>
                        </Box>
                    </Paper>
                </Container>
            </ThemeProvider>
        </>
    );
}