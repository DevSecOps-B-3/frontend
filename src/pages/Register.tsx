import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Box, Button, Stack, Typography } from "@mui/material"
import InputIcon from "../components/input/input_with_icon"
import { Link } from "react-router-dom"
import RegisterHook from '../feature/register/register_hook';
import Loading from '../components/loading/loading';
import { failedNotification } from '../components/notification/failed';
import { successNotification } from '../components/notification/succes';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { AxiosError } from 'axios';

const Register = () => {
  const { state, dispatch, hasError, registerHandler, mutation, navigate } = RegisterHook()

  useEffect(() => {
    if (mutation.error instanceof AxiosError) {
      failedNotification(mutation.error.response?.data.message)
    }
    if (mutation.isSuccess) {
      successNotification("Register success", 1000)
      setTimeout(() => {
        navigate('/login');
      }, 1500)
    }
  }, [mutation.isSuccess, mutation.isError, navigate])

  if (mutation.isPending) {
    return <Loading />
  }

  return (
    <>
      <Stack sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#0B1120",
      }}>
        <Stack sx={{
          border: "1px solid white",
          height: "75vh",
          width: "25%",
          borderRadius: "10px",
          justifyContent: "center",
          gap: "20px"
        }}>
          <Typography variant="h4" color="initial" sx={{
            textAlign: "center",
            color: "white",
          }}>
            Register
          </Typography>
          <form onSubmit={registerHandler}>
            <Stack sx={{ alignItems: "center", width: "100%", paddingY: "20px" }}>
              <Stack sx={{ width: "70%" }} spacing={3}>
                <InputIcon icon={<EmailOutlinedIcon />} label="Email" type="email" value={state?.email} dispatch={dispatch} actionType="UPDATE_EMAIL" required={true} />
                <InputIcon icon={<PersonOutlineOutlinedIcon />} label="Username" type="text" value={state?.name} dispatch={dispatch} actionType="UPDATE_NAME" required={true} />
                <Box>
                  <InputIcon icon={<LockOutlinedIcon />} label="Password" type="password" value={state?.password} dispatch={dispatch} actionType="UPDATE_PASSWORD" required={true} />
                </Box>
                <Box>
                  <InputIcon icon={<LockOutlinedIcon />} label="Retype Password" type="password" value={state?.retypePassword} dispatch={dispatch} actionType="UPDATE_RETYPE_PASSWORD" required={true} />
                  <Typography variant="body2" color={`${state.error.retype ? "error" : "success"}`} sx={{ marginTop: "10px" }}>Password doesn't match</Typography>
                </Box>
                <Button variant="contained" type='submit'
                  sx={{
                    width: "100%",
                    "&.Mui-disabled": {
                      backgroundColor: "white",
                      color: "gray",
                    },
                    "&:hover": {
                      backgroundColor: hasError ? "white" : "primary.dark",
                    },
                  }}>Register
                </Button>
                <Link to="/login" style={{ textDecoration: "none", color: "white", marginLeft: "auto", marginRight: "auto" }}>
                  <Typography variant="body1" color="initial" sx={{
                    textAlign: "center",
                    width: "max-content",
                    color: "white",
                    "&:hover": {
                      color: "primary.main"
                    }
                  }}>
                    Login
                  </Typography>
                </Link>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Stack >
      <ToastContainer />
    </>
  )
}

export default Register