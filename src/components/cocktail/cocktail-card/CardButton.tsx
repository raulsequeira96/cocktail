import { useContext } from "react";

import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';
import { Button, IconButton, Stack, Tooltip } from "@mui/material"
import { Skill } from "../../../interfaces/cocktailInterfaces";
import { CocktailCardContext } from "./CocktailCard";
import { INITIAL_STATE_SKILL_CTX } from "../../../constants/cocktailConstant";

interface CardButtonProps {
  skillProps?: Skill;
  isFavorite?: boolean;
  onToggleFavorite?: (skill: Skill) => void;
  onShare?: (skill: Skill) => void;
}

const CardButton = ({ skillProps, isFavorite = false, onToggleFavorite, onShare }: CardButtonProps) => {

  const { skill, handleDetailsCocktail } = useContext( CocktailCardContext );

  let mySkill: Skill | {} = skill;

  if(skillProps && Object.keys(skillProps).length !== 0 ){
    mySkill = skillProps;
  }else if( Object.keys(skill).length !== 0 ){
    mySkill = skill;
  }else{
    mySkill = INITIAL_STATE_SKILL_CTX.skill;
  }

  const selectedSkill = mySkill as Skill;

  return (
    <Stack direction="row" spacing={0.5} sx={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
      <Stack direction="row" spacing={0.25}>
        <Tooltip title={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}>
          <IconButton
            size="small"
            color={isFavorite ? 'error' : 'default'}
            onClick={() => onToggleFavorite?.(selectedSkill)}
          >
            {isFavorite ? <FavoriteRoundedIcon fontSize="small" /> : <FavoriteBorderRoundedIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Compartir cocktail">
          <IconButton
            size="small"
            onClick={() => onShare?.(selectedSkill)}
          >
            <IosShareRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={event => handleDetailsCocktail(selectedSkill)}
        sx={{ px: 2.25, fontWeight: 700 }}
      >
        Ver detalle
      </Button>
    </Stack>
  )
}

export default CardButton