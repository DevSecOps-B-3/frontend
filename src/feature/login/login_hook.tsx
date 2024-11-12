import { useReducer } from "react"
import { loginFormReducer, loginInitialState } from "./reducer"
import { useMutation } from "@tanstack/react-query"
import { useUserContext } from "../../provider/user_context_provider"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../../api/auth/login"

const LoginHook = () => {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(loginFormReducer, loginInitialState)
  const { setTokenToLocal } = useUserContext()

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess({ data }) {
      setTokenToLocal(data.token)
      navigate('/film')
    },
  });

  const loginHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const formData = {
      email: state.email,
      password: state.password
    }
    mutation.mutate(formData)
  }
  return { state, dispatch, loginHandler, mutation, }
}

export default LoginHook