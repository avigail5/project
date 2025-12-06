import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { loginUser } from '../api/authApi';
import {
  Box, Button, Checkbox, CssBaseline, FormControl, FormControlLabel,
  FormLabel, Link, Stack, TextField, Typography, Card as MuiCard
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AppTheme from './shared-theme/AppTheme';
import ColorModeSelect from './shared-theme/customizations/ColorModeSelect';
import { GoogleIcon, SitemarkIcon } from './CustomIcons';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: { maxWidth: '450px' },
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: '100vh',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: { padding: theme.spacing(4) },
}));

export default function SignIn(props: { disableCustomTheme?: boolean;
  setIsLoggedIn: (value: boolean) => void;
}) {
  const { setIsLoggedIn } = props;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [backendError, setBackendError] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);

  const navigate = useNavigate();

  const validateInputs = () => {
    let isValid = true;
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else { setEmailError(false); setEmailErrorMessage(""); }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else { setPasswordError(false); setPasswordErrorMessage(""); }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateInputs()) return;

    try {
      const result = await loginUser({ email, password });
      if (result.access_token) {
        localStorage.setItem("token", result.access_token);
        localStorage.setItem("user", JSON.stringify(result.user));
        const expireTime = new Date().getTime() + (rememberMe ? 7*24*60*60*1000 : 60*60*1000);
        localStorage.setItem("expireTime", expireTime.toString());
        setIsLoggedIn(true);
        navigate('/products');
      } else {
        setBackendError(result.message || "Invalid credentials");
      }
    } catch (err: any) {
      setBackendError(err.message || "Login failed");
    }
  };

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log(tokenResponse);
      localStorage.setItem("token", tokenResponse.access_token);
      setIsLoggedIn(true);
      navigate('/products');
    },
    onError: () => console.log("Google login failed"),
  });

  return (
    <AppTheme>
      <CssBaseline />
      <SignInContainer direction="column" justifyContent="center">
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography component="h1" variant="h4">Sign in</Typography>
          {backendError && <Typography color="error">{backendError}</Typography>}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required fullWidth type="email" value={email} onChange={e => setEmail(e.target.value)}
                error={emailError} helperText={emailErrorMessage}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required fullWidth type="password" value={password} onChange={e => setPassword(e.target.value)}
                error={passwordError} helperText={passwordErrorMessage}
              />
            </FormControl>
            <FormControlLabel control={<Checkbox value="remember" color="primary" 
            onChange={e => setRememberMe(e.target.checked)} />} label="Remember me" />
            <Button type="submit" fullWidth variant="contained">Sign in</Button>
          </Box>

          <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} onClick={() => login()}>
            Sign in with Google
          </Button>

          <Typography sx={{ textAlign: 'center', mt: 2 }}>
            Don't have an account?{' '}
            <Link href="/signUp/" variant="body2">Sign up</Link>
          </Typography>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}
