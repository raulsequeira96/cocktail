import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { closeDetailsCocktail } from '../../redux/actions/cocktailActions';
import { useStyles } from './styles';
import CardMedia from '@mui/material/CardMedia';

const DialogCocktailDetails = () => {
  const { open, details } = useSelector((state: RootState) => state.cocktail.dialog);
  const dispatch = useDispatch<any>();
  const classes = useStyles();
  const [shareMessage, setShareMessage] = React.useState('');

  const handleClose = () => {
    dispatch(closeDetailsCocktail());
  };

  const handleShare = async () => {
    const shareText = `${details?.title || 'Cocktail'} - ${details?.category || 'Cocktail Studio'}`;
    const sharePayload = {
      title: details?.title || 'Cocktail Studio',
      text: `${shareText}\n${details?.description || ''}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(sharePayload);
        setShareMessage('Cocktail compartido.');
        return;
      }

      await navigator.clipboard.writeText(`${sharePayload.text}\n${sharePayload.url}`);
      setShareMessage('Enlace copiado al portapapeles.');
    } catch (error) {
      setShareMessage('No se pudo compartir este cocktail.');
    }
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="customized-dialog-title" sx={{ pr: 6, fontWeight: 800 }}>
          {details?.title || 'Detalle del cocktail'}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 5 }}>
              <CardMedia
                component="img"
                className={classes.cardMediaLong}
                image={details?.image || ''}
                alt={details?.title || 'Cocktail'}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                {details?.description || 'No hay descripcion disponible para este cocktail.'}
              </Typography>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 2 }}>
                <Chip
                  color="primary"
                  variant="outlined"
                  label={details?.category ? `Categoria: ${details.category}` : 'Categoria no disponible'}
                />
                {details?.alcoholic && (
                  <Chip variant="outlined" label={`Tipo: ${details.alcoholic}`} />
                )}
                {details?.glass && (
                  <Chip variant="outlined" label={`Vaso: ${details.glass}`} />
                )}
                {details?.iba && (
                  <Chip variant="outlined" label={`IBA: ${details.iba}`} />
                )}
              </Stack>

              {details?.tags && details.tags.length > 0 && (
                <Box sx={{ mt: 2.2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>
                    Tags
                  </Typography>
                  <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    {details.tags.map((tag) => (
                      <Chip key={tag} size="small" label={tag} />
                    ))}
                  </Stack>
                </Box>
              )}

              {details?.ingredientItems && details.ingredientItems.length > 0 && (
                <Box sx={{ mt: 2.2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>
                    Ingredientes
                  </Typography>
                  <List dense sx={{ p: 0 }}>
                    {details.ingredientItems.map((ingredient) => (
                      <ListItem key={ingredient.display} disableGutters sx={{ py: 0.35 }}>
                        <ListItemAvatar sx={{ minWidth: 42 }}>
                          <Avatar
                            src={ingredient.thumbnail}
                            alt={ingredient.name}
                            variant="rounded"
                            sx={{ width: 28, height: 28 }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={ingredient.display}
                          primaryTypographyProps={{ color: 'text.secondary', fontSize: '0.95rem' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button variant="outlined" startIcon={<ShareRoundedIcon />} onClick={handleShare}>
            Compartir
          </Button>
          <Button autoFocus variant="contained" onClick={handleClose}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={Boolean(shareMessage)}
        autoHideDuration={2200}
        onClose={() => setShareMessage('')}
        message={shareMessage}
      />
    </>
  );
}

export default DialogCocktailDetails