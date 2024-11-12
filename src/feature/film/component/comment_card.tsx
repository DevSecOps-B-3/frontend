import { Box, Divider, Stack, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ReviewType } from '../../../data/dto/movie_type';
import { ReviewActionType, ReviewStateType } from '../reducer';
import { userType } from '../../../data/dto/user_context_type';
import DeleteModal from './modal/delete_modal';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { deleteReview } from '../../../api/review/delete_review_user';
import UpdateModal from './modal/update_modal';
import { adminDeleteReview } from '../../../api/review/delete_review_admin';
import { successNotification } from '../../../components/notification/succes';

interface CommentCardProps {
  review: ReviewType;
  dispatch: React.Dispatch<ReviewActionType>
  state: ReviewStateType
  user: userType | null,
  movieId: string
}

const CommentCard = ({ review, dispatch, user, movieId, state }: CommentCardProps) => {
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const cancelHandler = () => setIsUpdate(false);
  const openUpdateHandler = () => {
    dispatch({ type: "UPDATE_REVIEW", payload: review.comment })
    dispatch({ type: "UPDATE_RATING", payload: review.star })
    setIsUpdate(true);
  }

  const deleteMutation = useMutation({
    mutationFn: deleteReview,
    onSuccess() {
      successNotification("Review deleted successfully")
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    }
  })
  const deleteHandler = () => {
    deleteMutation.mutate(movieId)
    handleClose()
  }

  const adminDeleteMutation = useMutation({
    mutationFn: adminDeleteReview,
    onSuccess() {
      successNotification("Review deleted successfully")
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    }
  })
  const deleteAdminHandler = () => {
    const formData = {
      movieId: movieId,
      userId: review.userId,
    }
    adminDeleteMutation.mutate(formData)
    handleClose()
  }

  return (
    <>
      <Box>
        <Stack direction={"row"} sx={{
          alignItems: "center",
          justifyItems: "center",
          gap: "10px"
        }}>
          <AccountCircleIcon fontSize="large" sx={{
            color: "primary.main",
            "&.Mui-focused": {
              color: "primary",
            }
          }} />
          <Typography variant="h6" color="white">
            {review.userName}
          </Typography>
          {user?.role === "user" && user.user_id == review.userId &&
            <Box>
              <EditIcon color="primary" onClick={openUpdateHandler} sx={{
                cursor: "pointer"
              }} />
              <DeleteIcon
                color="error"
                onClick={handleOpen}
                sx={{
                  cursor: "pointer"
                }}
              />
            </Box>
          }
          {user?.role === "admin" &&
            <DeleteIcon
              color="error"
              onClick={handleOpen}
              sx={{
                cursor: "pointer"
              }}
            />
          }
        </Stack>
        <Box sx={{
          marginLeft: "2.5em",
        }}>
          {[...Array(review.star)].map((_, i) => (
            <StarIcon key={i} fontSize="small" sx={{ color: "primary.main" }} />
          ))}
        </Box>
        <p style={{
          marginTop: "5px",
          color: "white",
          marginLeft: "2.5em"
        }} dangerouslySetInnerHTML={{ __html: review.comment }} />
      </Box>
      <Divider sx={{
        marginTop: "1em",
        backgroundColor: "primary.main",
      }} />
      {user?.role === "user" ?
        <>
          <DeleteModal open={open} handleClose={handleClose} deleteHandler={deleteHandler} />
          <UpdateModal open={isUpdate} handleClose={cancelHandler} state={state} dispatch={dispatch} />
        </>
        :
        <DeleteModal open={open} handleClose={handleClose} deleteHandler={deleteAdminHandler} />
      }
    </>
  )
}

export default CommentCard