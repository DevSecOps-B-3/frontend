import { Box, Button, Modal, Typography } from "@mui/material";

interface DeleteModalProps {
  open: boolean;
  handleClose: () => void;
  deleteHandler: () => void;
}

const DeleteModal = ({ open, handleClose, deleteHandler }: DeleteModalProps) => {
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
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        borderRadius: 3,
        boxShadow: 24,
        p: 3,
      }}>
        <Typography variant="h6" component="h2">
          Are you sure you want to delete this review?
        </Typography>
        <Box sx={{
          marginTop: "2em",
          display: "flex",
          justifyContent: "center",
          gap: "1em"
        }}>
          <Button variant="contained" color="primary" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="error" onClick={deleteHandler}>Delete</Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default DeleteModal