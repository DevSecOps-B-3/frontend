import { Box, Typography } from "@mui/material"

const Loading = () => {
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#0B1120",
    }}>
      <Typography variant="body1" color="white" sx={{ textAlign: "center" }}>
        Loading...
      </Typography>
    </Box>
  )
}

export default Loading