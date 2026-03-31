import { useState } from 'react';

import { Box, List, ListSubheader, Typography } from '@mui/material';
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
          <List
            subheader={
              <ListSubheader
                sx={{
                  bgcolor: 'transparent',
                  px: 2,
                  pt: 1,
                  pb: 0.25,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.8 }}>
                  <Box
                    component="img"
                    src="/coctel.png"
                    alt="Logo Cocktail Studio"
                    sx={{ width: 24, height: 24, objectFit: 'contain' }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 800,
                      color: 'text.primary',
                      letterSpacing: 0.2,
                    }}
                  >
                    Cocktail Studio
                  </Typography>
                </Box>
                <Typography
                  component="span"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    display: 'block',
                  }}
                >
                  Explorar por categoria
                </Typography>
              </ListSubheader>
            }
            sx={{ width: { xs: 280, sm: 320 }, pt: 0.5 }}
          >
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