import { List, ListItemButton, ListItemText, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useDispatch } from 'react-redux';
import { fetchDataCocktail } from '../../redux/actions/cocktailActions';
import { AllowedKeys, SubmenuState } from '../../interfaces/cocktailInterfaces';
import { API_CALL_DICTIONARY } from '../../constants/cocktailConstant';

interface ItemMenuProps {
  toggleSubmenu: (event: React.MouseEvent<HTMLDivElement>, seccion: string) => void;
  openSubmenu: SubmenuState;
  classes: { [key: string]: string; };
  sectionTitle: any;
  subSections: string[];
}

const ItemMenu = ({ toggleSubmenu, openSubmenu, classes, sectionTitle, subSections }: ItemMenuProps) => {
  const dispatch = useDispatch<any>();

  const handleSubcategoryClick = (sub: string, sectionTitle: AllowedKeys) => {
    const uri = `filter.php?${API_CALL_DICTIONARY[sectionTitle]}=${sub.replace(/\s+/g, '_')}`;
    dispatch(fetchDataCocktail(uri));
  };

  //Por limitaciones de typescript con el tipado, no uso opensubmenu[sectionTitle]
  const getSectionValue = () => {
    const sections = Object.keys(openSubmenu);
    const booleanValues = Object.values(openSubmenu);

    const index = sections.indexOf(sectionTitle);
    const booleanValue = booleanValues[index];

    return booleanValue;
  }

  return (
    <>
      <ListItemButton onClick={event => toggleSubmenu(event, sectionTitle)}>
        <ListItemText primary={sectionTitle} style={{ color: 'white', fontWeight: 'bold', fontSize: '1.8em' }} />
        {getSectionValue() ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={getSectionValue()} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            subSections && subSections.map((sub: string, index: number) =>
              <ListItemButton
                className={classes.nested}
                key={index}
                onClick={() => handleSubcategoryClick(sub, sectionTitle)} // Manejador de eventos para imprimir el nombre de la subcategoría
              >
                <ListItemText primary={sub} style={{ color: 'red', fontSize: '1em' }} />
              </ListItemButton>
            )
          }
        </List>
      </Collapse>
    </>
  )
}

export default ItemMenu;
