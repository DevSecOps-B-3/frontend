import { Box, Divider, Stack, Typography } from '@mui/material'
import FilmDetail from '../feature/film/component/film_section'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useQuery } from '@tanstack/react-query'
import { getDetailMovie } from '../api/movies/get_detail_movie'
import { axiosClient } from '../lib/axios_client'
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/loading/loading';
import ReviewSection from '../feature/film/component/review_section';
import { ToastContainer } from 'react-toastify';
const Film = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const movieData = useQuery({
    queryKey: ["movie_detail", id],
    queryFn: () => getDetailMovie(id),
  });

  const poster = useQuery({
    queryKey: ["poster", movieData?.data?.data.poster],
    queryFn: () => axiosClient.get(`/movies/poster/${movieData?.data?.data.poster}`, { responseType: "blob" }),
    enabled: !!movieData.data,
  });

  const reviews = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => axiosClient.get(`/reviews/${id}`),
    enabled: !!id,
  })

  let urlData = "";
  if (poster.data) {
    urlData = URL.createObjectURL(poster.data.data);
  }


  if (poster.isPending) {
    return <Loading />
  }
  return (
    <>
      <Box sx={{
        minHeight: "100vh",
        backgroundColor: "#0B1120",
      }}>
        <Stack direction={'row'} sx={{
          paddingTop: "2em",
          alignItems: "center",
          paddingX: "5em",
          gap: "0.5em",
        }}>
          <ArrowLeftIcon
            onClick={() => navigate(-1)}
            sx={{
              fontSize: "3em",
              color: "white",
              cursor: "pointer",
            }} />
          <Box>
            <Typography variant="h5" color="white"
              onClick={() => navigate(-1)}
              sx={{ cursor: "pointer" }}
            >
              Back
            </Typography>
          </Box>
        </Stack>
        <Stack direction={'row'} sx={{
          paddingTop: "3em",
          paddingX: "5em",
          justifyContent: "center",
          gap: "2em",
        }}>
          <img src={urlData} alt={movieData.data?.data.title} style={{ width: "20%", borderRadius: "10px" }} />
          <Box sx={{
            width: "50%",
            marginTop: "2em",
          }}>
            <FilmDetail {...movieData?.data?.data} />
          </Box>
        </Stack>
        <Stack sx={{
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Box sx={{
            width: "70%",
          }}>
            <Divider sx={{
              bgcolor: "primary.main",
              margin: "auto",
              width: "100%",
              marginTop: "2em",
            }} />
            {id && (
              <ReviewSection reviews={reviews.data?.data} movieId={id} />
            )}
          </Box>
        </Stack>
      </Box>
      <ToastContainer/>
    </>
  )
}

export default Film