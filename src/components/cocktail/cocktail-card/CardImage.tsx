import { CardMedia } from "@material-ui/core"
import { useContext } from "react";
import { CocktailCardContext } from "./CocktailCard";
import { useStyles } from "../styles";

const CardImage = ({ title, image }: { title?: string, image?: string }) => {
  const { skill } = useContext( CocktailCardContext );
  const classes = useStyles();
  
  return (
    <CardMedia
      className={classes.cardMedia}
      image={title ? title : skill.image}
      title={image ? image : skill.title}
    />
  )
}

export default CardImage