import { useDispatch } from "react-redux";
import { openDetailsCocktail } from "../../../redux/actions/cocktailActions";
import { Skill } from "../../../interfaces/cocktailInterfaces";

export const useButton = () => {

  const dispatch = useDispatch<any>();

  const handleDetailsCocktail = (skill: Skill) => {
    dispatch(openDetailsCocktail(skill));
  };

  return {
    handleDetailsCocktail
  }
}
