import { useState } from 'react';

import { List } from '@material-ui/core';
import ItemMenu from './ItemMenu';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Category, SubmenuState } from '../../interfaces/cocktailInterfaces';

interface MenuCocktailProps {
  classes: {
    [key: string]: string;
  },
  sections: SubmenuState
}


const MenuCocktail = ({ classes, sections }: MenuCocktailProps) => {
  const [openSubmenu, setOpenSubmenu] = useState<SubmenuState>(sections);
  const categories: Category = useSelector((state: RootState) => state.cocktail.categories);

  const toggleSubmenu = (event: React.MouseEvent<HTMLDivElement>, seccion: string) => {
    if (Object.keys(categories).length === 0) {
      return;
    }

    setOpenSubmenu((prevValues: any) => ({ ...prevValues, [seccion]: !prevValues[seccion] }));
    event.stopPropagation(); // Evita que el evento se propague al elemento padre
  };

  return (
    <>
      {categories && Object.keys(categories).length > 0
        ? (
          <List>
            {Object.keys(categories).map((sec: string) => (
              <ItemMenu
                key={sec}
                toggleSubmenu={toggleSubmenu}
                openSubmenu={openSubmenu}
                classes={classes}
                sectionTitle={categories[sec].desc}
                subSections={categories[sec].subMenus}
              />
            ))}
          </List>
        )
        : <></>
      }
    </>
  );
};


export default MenuCocktail