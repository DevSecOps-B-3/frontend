import { Box, Button, Stack, Typography } from "@mui/material"
import FilmCard from "../components/card/film_card"
import { Link } from "react-router-dom";
import { useUserContext } from "../provider/user_context_provider";
import { AccountCircle } from "@mui/icons-material";
import useHomeHook from "../feature/home/home_hook";
import { Suspense } from "react";
import { MovieListType } from "../data/dto/movie_type";
import Loading from "../components/loading/loading";
const Home = () => {
  const { user } = useUserContext()
  const { data, isPending, logout } = useHomeHook()
  const movieData: MovieListType[] = data?.data
  if (isPending) {
    return <Loading />
  }
  return (
    <Box sx={{
      minHeight: "100vh",
      paddingY: "2em",
      backgroundColor: "#0B1120",
    }}>
      <Box sx={{ width: "100%", maxWidth: "false", }}>
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} sx={{
          paddingTop: "3vh",
          paddingX: "2em",
        }}>
          <Button variant="contained" color="error" onClick={logout} >
            Logout
          </Button>
          <Typography variant="h4" color="initial"
            sx={{
              textAlign: "center",
              color: "white",
            }}>
            AMBAMOVIE
          </Typography>
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={"3px"}>
            <AccountCircle sx={{
              fontSize: "30px",
              color: "primary.main",
            }} />
            <Typography variant="h6" color="initial"
              sx={{
                textAlign: "right",
                color: "white",
              }}>
              {user?.name}
            </Typography>
          </Box>
        </Stack>
        <Box sx={{
          marginTop: "30px",
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          width: "100%",
          rowGap: "2em",
          columnGap: "10px",
          justifyContent: "center",
          alignItems: "center",
          paddingX: "10px",
        }}>
          {movieData && movieData.map((movie, index) => (
            <Link to={`/film/${movie.id}`} key={index}
              style={{
                textDecoration: "none",
                transform: "scale(1)",
                transition: "transform 0.3s ease-in-out"
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              }}>
              <Box key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Suspense fallback={<div>Loading...</div>}>
                  <FilmCard {...movie} />
                </Suspense>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    </Box >
  )
}

export default Home