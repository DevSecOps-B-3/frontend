import React, { useReducer } from 'react'
import { reviewInitialState, reviewReducer } from './reducer'
import { useMutation } from '@tanstack/react-query'
import { axiosClient } from '../../lib/axios_client'
import { successNotification } from '../../components/notification/succes'

const ReviewHook = () => {
  const [state, dispatch] = useReducer(reviewReducer, reviewInitialState)

  const postReview = (formData: { movie: string, comment: string, star: number }) => {
    return axiosClient.post("reviews", formData);
  }
  const mutation = useMutation({
    mutationFn: postReview,
    onSuccess() {
      successNotification("Review Posted")
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    }
  })

  const postReviewHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const formData = {
      movie: state.movieId,
      comment: state.comment,
      star: state.star
    }
    mutation.mutate(formData)
  }
  return { state, dispatch, postReviewHandler }
}

export default ReviewHook