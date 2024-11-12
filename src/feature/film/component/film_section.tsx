import { Typography } from "@mui/material"
import { MovieType } from "../../../data/dto/movie_type"


const FilmDetailSection = ({ title, overview, release_date, language, genres }: MovieType) => {
  return (
    <>
      <Typography variant="h4" color="initial" sx={{
        color: "white",
      }}>
        {title}
      </Typography>
      <Typography sx={{ color: "primary.main" }}>
        {genres && genres.map((genre, index) => (
          <span key={index} style={{ marginLeft: index !== 0 ? "0.5em" : "" }}>{genre}</span>
        ))}
      </Typography>
      <Typography variant="body1" color="white" sx={{
        marginTop: "1em",
      }}>
        Release: {release_date}
      </Typography>
      <Typography variant="body1" color="white">
        Language: {language}
      </Typography>
      <Typography variant="h6" color="white" sx={{
        marginTop: "1em",
      }}>Description
      </Typography>
      <Typography variant="body1" color="white">
        {overview}
      </Typography>
    </>
  )
}

export default FilmDetailSection