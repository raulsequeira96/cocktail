import { Typography } from "@mui/material"
import { useContext } from "react";
import { CocktailCardContext } from "./CocktailCard";

const Cardtitle = ({ title }: { title?: string }) => {
  const { skill } = useContext( CocktailCardContext );

  return (
    <Typography
      gutterBottom
      variant="h6"
      component="h2"
      sx={{
        fontWeight: 700,
        lineHeight: 1.35,
        minHeight: '2.7em',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}
    >
      {title ? title : skill.title}
    </Typography>
  )
}

export default Cardtitle