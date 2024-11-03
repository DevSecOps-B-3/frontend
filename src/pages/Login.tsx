// import { AccountCircle } from "@mui/icons-material"
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Button, Stack, Typography } from "@mui/material"
import InputIcon from '../components/input/input_with_icon';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <Stack sx={{
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#0B1120",
    }}>
      <Stack sx={{
        border: "1px solid white",
        height: "60vh",
        width: "25%",
        borderRadius: "10px",
        justifyContent: "space-evenly",
      }}>
        <Typography variant="h4" color="initial" sx={{
          textAlign: "center",
          color: "white",
        }}>
          Login
        </Typography>
        <Stack sx={{ alignItems: "center", width: "100%", paddingY: "20px" }}>
          <Stack sx={{ width: "60%" }} spacing={5}>
            <InputIcon icon={<EmailOutlinedIcon />} label="Email" type="email" />
            <InputIcon icon={<LockOutlinedIcon />} label="Password" type="password" />
            <Button variant="contained" sx={{ width: "100%" }}>Login</Button>
            <Link to="/register" style={{ textDecoration: "none", color: "white", margin: "auto" }}>
              <Typography variant="body1" color="initial" sx={{
                textAlign: "center",
                width: "max-content",
                marginTop: "20px",
                color: "white",
                "&:hover": {
                  color: "primary.main"
                }
              }}>
                Register
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Stack >
  )
}

export default Login