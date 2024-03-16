import { useEffect } from "react"
import { CocktailBar } from "./CocktailBar"
import CocktailCatalog from "./CocktailCatalog"
import { useDispatch } from "react-redux";
import { fetchDataCocktail, addCategory } from "../../redux/actions/cocktailActions";
import DialogCocktailDetails from "./DialogCocktailDetails";

const Cocktail = () => {
  const dispatch = useDispatch<any>();

  useEffect(() => {

    const execute = async () => {
      await dispatch(fetchDataCocktail());
      await dispatch(addCategory());
    };

    execute();
  }, []);

  return (
    <>
      <CocktailBar />
      <div style={{ margin: '20px 0' }} />
      <CocktailCatalog />
      <DialogCocktailDetails/>
    </>
  )
}

export default Cocktail