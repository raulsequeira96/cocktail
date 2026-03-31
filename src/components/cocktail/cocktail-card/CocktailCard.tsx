
import { CocktailCardContextProps, CocktailCardProps } from '../../../interfaces/cocktailInterfaces';
import { createContext, useMemo, memo } from 'react';
import { useButton } from '../hooks/useButton';
import { INITIAL_STATE_SKILL_CTX } from '../../../constants/cocktailConstant';

export const CocktailCardContext = createContext<CocktailCardContextProps>(INITIAL_STATE_SKILL_CTX);
const { Provider } = CocktailCardContext;

const CocktailCardComponent = ({ skill, children }: CocktailCardProps) => {
  const { handleDetailsCocktail } = useButton();

  const contextValue = useMemo(() => ({
    handleDetailsCocktail,
    skill
  }), [handleDetailsCocktail, skill]);

  return (
    <Provider value={contextValue}>
      { children }
    </Provider>
  );
};

export const CocktailCard = memo(CocktailCardComponent);
