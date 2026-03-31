import { CardMedia } from "@mui/material"
import { useContext } from "react";
import { CocktailCardContext } from "./CocktailCard";
import { useStyles } from "../styles";

const CardImage = ({ title, image }: { title?: string, image?: string }) => {
  const { skill } = useContext( CocktailCardContext );
  const classes = useStyles();
  const mediaImage = image ? image : skill.image;
  const mediaTitle = title ? title : skill.title;
  
  return (
    <CardMedia
      component="img"
      className={classes.cardMedia}
      image={mediaImage}
      alt={mediaTitle}
    />
  )
}

export default CardImage