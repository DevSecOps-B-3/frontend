import { RouterProvider } from "react-router-dom"
import { router } from "../routes/route"

const Router = () => {
  return <RouterProvider router={router} />
}

export default Router