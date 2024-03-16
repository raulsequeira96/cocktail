import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
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
      <ListItem button onClick={event => toggleSubmenu(event, sectionTitle)}>
        <ListItemText primary={sectionTitle} style={{ color: 'white', fontWeight: 'bold', fontSize: '1.8em' }} />
        {getSectionValue() ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={getSectionValue()} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            subSections && subSections.map((sub: string, index: number) =>
              <ListItem
                button
                className={classes.nested}
                key={index}
                onClick={() => handleSubcategoryClick(sub, sectionTitle)} // Manejador de eventos para imprimir el nombre de la subcategoría
              >
                <ListItemText primary={sub} style={{ color: 'red', fontSize: '1em' }} />
              </ListItem>
            )
          }
        </List>
      </Collapse>
    </>
  )
}

export default ItemMenu;
