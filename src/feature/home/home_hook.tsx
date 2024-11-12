
import { useQuery } from "@tanstack/react-query"
import { getAllMovies } from "../../api/movies/get_all_movies"
import Cookies from 'js-cookie';

const useHomeHook = () => {
  const { data, isPending } = useQuery({
    queryKey: ["movies"],
    queryFn: getAllMovies,
    staleTime: 5 * 60 * 1000,
  })
  const logout = () => {
    Cookies.remove("ACCESS_TOKEN")
    window.location.reload()
  }
  return { data, isPending, logout }
}

export default useHomeHook