import { Typography } from "@material-ui/core"
import { useContext } from "react";
import { CocktailCardContext } from "./CocktailCard";

const Cardtitle = ({ title }: { title?: string }) => {
  const { skill } = useContext( CocktailCardContext );

  return (
    <Typography gutterBottom variant="h5" component="h2">
      {title ? title : skill.title}
    </Typography>
  )
}

export default Cardtitle