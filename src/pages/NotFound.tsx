import { Stack, Typography } from '@mui/material'

const NotFound = () => {
  return (
    <Stack sx={{
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#0B1120",
    }}>
      <Typography variant="h1" color="white">
        404
      </Typography>
      <Typography variant="h6" color="white">
        The resource you are looking for was not found.
      </Typography>
      <Typography></Typography>
    </Stack>
  )
}

export default NotFound