import { useContext } from "react";

import { Button } from "@material-ui/core"
import { Skill } from "../../../interfaces/cocktailInterfaces";
import { CocktailCardContext } from "./CocktailCard";
import { INITIAL_STATE_SKILL_CTX } from "../../../constants/cocktailConstant";

const CardButton = (skillProps: Skill | {}) => {

  const { skill, handleDetailsCocktail } = useContext( CocktailCardContext );

  let mySkill: Skill | {} = skill;

  if(Object.keys(skillProps).length !== 0 ){
    mySkill = skillProps;
  }else if( Object.keys(skill).length !== 0 ){
    mySkill = skill;
  }else{
    mySkill = INITIAL_STATE_SKILL_CTX.skill;
  }

  return (
    <Button size="small" color="primary" onClick={event => handleDetailsCocktail(mySkill as Skill)}>
      Leer Mas
    </Button>
  )
}

export default CardButton