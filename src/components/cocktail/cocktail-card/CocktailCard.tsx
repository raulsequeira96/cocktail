
import { CocktailCardContextProps, CocktailCardProps } from '../../../interfaces/cocktailInterfaces';
import { createContext } from 'react';
import { useButton } from '../hooks/useButton';
import { INITIAL_STATE_SKILL_CTX } from '../../../constants/cocktailConstant';

export const CocktailCardContext = createContext<CocktailCardContextProps>(INITIAL_STATE_SKILL_CTX);
const { Provider } = CocktailCardContext;

export const CocktailCard = ({ skill, children }: CocktailCardProps) => {
  const { handleDetailsCocktail } = useButton();

  return (
    <Provider value={{
      handleDetailsCocktail,
      skill
    }}>      
      { children }
    </Provider>
  );
}
