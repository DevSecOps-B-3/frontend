import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Button, Stack, Typography } from "@mui/material"
import InputIcon from '../components/input/input_with_icon';
import { Link } from 'react-router-dom';
import LoginHook from '../feature/login/login_hook';
import { failedNotification } from '../components/notification/failed';
import { successNotification } from '../components/notification/succes';
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';
import { AxiosError } from 'axios';


const Login = () => {
  const { state, dispatch, loginHandler, mutation } = LoginHook()
  useEffect(() => {
    if (mutation.error instanceof AxiosError) {
      failedNotification(mutation.error.response?.data.message)
    }
    if (mutation.isSuccess) {
      successNotification("Login success", 1000)
    }
  }, [mutation.isSuccess, mutation.isError, mutation.error])
  return (
    <>
      <ToastContainer />
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
          justifyContent: "center",
          gap: "20px",
        }}>
          <Typography variant="h4" color="initial" sx={{
            textAlign: "center",
            color: "white",
          }}>
            Login
          </Typography>
          <form onSubmit={loginHandler}>
            <Stack sx={{ alignItems: "center", width: "100%", paddingY: "20px" }}>
              <Stack sx={{ width: "70%" }} spacing={3}>
                <InputIcon icon={<EmailOutlinedIcon />} label="Email" type="email" value={state?.email} dispatch={dispatch} actionType="UPDATE_EMAIL" />
                <InputIcon icon={<LockOutlinedIcon />} label="Password" type="password" value={state?.password} dispatch={dispatch} actionType="UPDATE_PASSWORD" />
                <Button variant="contained" type='submit' sx={{ width: "100%" }} disabled={mutation.isPending}>Login</Button>
                <Link to="/register" style={{ textDecoration: "none", color: "white", marginLeft: "auto", marginRight: "auto", }}>
                  <Typography variant="body1" color="initial" sx={{
                    textAlign: "center",
                    width: "max-content",
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
          </form>
        </Stack>
      </Stack >
    </>
  )
}

export default Login