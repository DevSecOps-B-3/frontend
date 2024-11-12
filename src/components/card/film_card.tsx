import { Stack, Typography } from "@mui/material"
import { MovieListType } from "../../data/dto/movie_type"
import { useQuery } from "@tanstack/react-query"
import { axiosClient } from "../../lib/axios_client"
import Loading from "../loading/loading"
const FilmCard = (movieData: MovieListType) => {
  const { data, isPending } = useQuery({
    queryKey: ["poster", movieData.poster],
    queryFn: () => axiosClient.get(`/movies/poster/${movieData.poster}`, { responseType: "blob" }),
    enabled: !!movieData?.poster,
    staleTime: 5 * 60 * 1000,
  })
  let urlData = ""
  if (data) {
    urlData = URL.createObjectURL(data?.data)
  }
  return (
    <Stack sx={{
      border: "1px solid white",
      height: "30vh",
      width: "15em",
      borderRadius: "8px",
      background: `url(${urlData})`,
      backgroundSize: "cover",
      justifyContent: "flex-end",
    }}>
      {isPending && <Loading />}
      <Typography variant="body1"
        sx={{
          width: "100%",
          color: "white",
          textAlign: "center",
          minHeight: "3em",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          borderRadius: "0px 0px 8px 8px",
          padding: "0.5em",
        }}>
        {movieData.title}
      </Typography>
    </Stack>
  )
}

export default FilmCard