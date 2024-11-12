import { Box, Button, Modal, Slider, Stack, TextField, Typography } from '@mui/material'
import React, { SyntheticEvent } from 'react'
import { useMutation } from '@tanstack/react-query';
import { ReviewActionType, ReviewStateType } from '../../reducer';
import { updateReview } from '../../../../api/review/update_review';
import { successNotification } from '../../../../components/notification/succes';

interface DeleteModalProps {
  open: boolean;
  handleClose: () => void;
  dispatch: React.Dispatch<ReviewActionType>
  state: ReviewStateType
}

const UpdateModal = ({ open, handleClose, state, dispatch }: DeleteModalProps) => {


  const updateMutation = useMutation({
    mutationFn: updateReview,
    onSuccess() {
      successNotification("Review Updated successfully")
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    }
  })
  const updateHandler = (e: SyntheticEvent) => {
    e.preventDefault()
    const formData = {
      movie: state.movieId,
      comment: state.comment,
      star: state.star
    }
    updateMutation.mutate(formData)
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 400,
        bgcolor: '#0B1120',
        border: '2px solid #000',
        borderRadius: 3,
        boxShadow: 24,
        p: 3,
        display: "flex",
        justifyContent: "center",
      }}>
        <form onSubmit={updateHandler}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1em",
            alignItems: "center",
            justifyContent: "center"
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
              width: "80%",
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
              width: "80%",
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
            <Stack direction={"row"} gap={"10px"}>
              <Button variant="contained"
                onClick={handleClose}
                color='error'
                sx={{
                  width: "100%",
                }}>
                Cancel
              </Button>
              <Button variant="contained"
                type="submit"
                sx={{
                  width: "100%",
                }}>
                Update
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Modal>
  )
}

export default UpdateModal