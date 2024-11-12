import { useReducer } from "react"
import { registerFormReducer, registerInitialState } from "./reducer"
import { useMutation, } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../../api/auth/register"

const RegisterHook = () => {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(registerFormReducer, registerInitialState)
  const hasError = Object.values(state.error).some(value => value === true);

  const mutation = useMutation({
    mutationFn: registerUser,
  });

  const registerHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const formData = {
      email: state.email,
      name: state.name,
      password: state.password
    }
    mutation.mutate(formData)
  }
  return { state, dispatch, hasError, registerHandler, mutation, navigate }
}

export default RegisterHook