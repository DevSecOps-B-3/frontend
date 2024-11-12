import { Box, Button, Slider, Stack, TextField, Typography } from "@mui/material"
import ReviewHook from "../review.hook"
import { ReviewType } from "../../../data/dto/movie_type"
import CommentCard from "./comment_card";
import { useUserContext } from "../../../provider/user_context_provider";
import { useEffect, useState } from "react";

const ReviewSection = ({ reviews, movieId }: { reviews: ReviewType[], movieId: string }) => {
  const [exist, setExist] = useState(false)
  const { state, dispatch, postReviewHandler } = ReviewHook()
  const { user } = useUserContext()


  useEffect(() => {
    dispatch({ type: "SET_MOVIE_ID", payload: movieId })
    if (user && user.user_id != null && reviews) {
      const exist = reviews.map((review) => review.userId).includes(user.user_id)
      setExist(exist)
    }
  }, [user, movieId, reviews, dispatch])

  return (
    <>
      <Box sx={{
        marginTop: "1em",
        marginBottom: "4em",
      }}>
        <Typography variant="h5" color="primary.main">
          Reviews
        </Typography>
        {!exist && (
          <form onSubmit={postReviewHandler}
            style={{
              width: "100%",
              display: "flex",
              gap: "2em",
              alignItems: "center"
            }}>
            <TextField
              id="outlined-multiline-static"
              label="Review"
              value={state?.comment}
              onChange={(e) => dispatch({ type: "UPDATE_REVIEW", payload: e.target.value })}
              multiline
              rows={4}
              sx={{
                marginTop: "1em",
                width: "50%",
                "& label": {
                  color: "white"
                },
                '& label.Mui-focused': {
                  color: "white"
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'white',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                },
                "& .MuiOutlinedInput-input": {
                  color: "white",
                },
                "& .MuiOutlinedInput-inputMultiline": {
                  overflow: "hidden",
                },
              }}
            />
            <Stack
              sx={{
                width: "30%",
              }}>
              <Box>
                <Typography variant="h6" color="primary.main">Rating: {state?.star}</Typography>
                <Slider
                  size="small"
                  aria-label="Temperature"
                  valueLabelDisplay="auto"
                  value={typeof state.star === "number" ? state.star : 1}
                  onChange={(_, value) => {
                    if (typeof value === "number") {
                      dispatch({ type: "UPDATE_RATING", payload: value });
                    }
                  }}
                  step={1}
                  marks
                  min={1}
                  max={10}
                />
              </Box>
              <Button variant="contained"
                type="submit"
                sx={{
                  width: "100%",
                }}>
                Post
              </Button>
            </Stack>
          </form>
        )}
        <Stack sx={{
          marginTop: "10px",
          gap: "10px"
        }}>
          {reviews && reviews.length > 0 && reviews.map((review, index) => {
            return (
              <div key={index}>
                <CommentCard review={review} dispatch={dispatch} user={user} movieId={movieId} state={state} />
              </div>
            )
          })}
        </Stack>
      </Box >
    </>
  )
}

export default ReviewSection