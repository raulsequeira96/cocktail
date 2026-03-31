import { alpha, Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) =>
  ({
    appShell: {
      minHeight: '100vh',
      background:
        'radial-gradient(circle at 10% 10%, rgba(41, 211, 166, 0.14), transparent 32%), radial-gradient(circle at 90% 0%, rgba(126, 203, 255, 0.18), transparent 30%), linear-gradient(180deg, #0c1526 0%, #0a111d 100%)',
    },
    contentContainer: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(5),
      [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(7),
      },
    },
    pageTitle: {
      fontWeight: 800,
      letterSpacing: 0.2,
      color: '#f5f7fb',
    },
    pageSubtitle: {
      maxWidth: 760,
      color: alpha(theme.palette.common.white, 0.74),
      lineHeight: 1.7,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      border: `1px solid ${alpha(theme.palette.common.white, 0.18)}`,
      backgroundColor: alpha(theme.palette.common.black, 0.18),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.14),
      },
    },
    appBar: {
      borderRadius: 0,
      borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.15)}`,
      background: 'linear-gradient(90deg, #101826 0%, #152238 55%, #1d3557 100%)',
      boxShadow: '0 10px 28px rgba(0, 0, 0, 0.25)',
    },
    appToolbar: {
      gap: theme.spacing(1.5),
      minHeight: 72,
      [theme.breakpoints.down('sm')]: {
        minHeight: 64,
        gap: theme.spacing(1),
      },
    },
    title: {
      display: 'none',
      fontWeight: 800,
      letterSpacing: 0.2,
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      borderRadius: 999,
      border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
      backgroundColor: alpha(theme.palette.common.white, 0.08),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.14),
      },
      marginLeft: 'auto',
      width: '100%',
      maxWidth: 420,
      [theme.breakpoints.up('sm')]: {
        width: 320,
      },
      [theme.breakpoints.up('md')]: {
        width: 380,
      },
    },
    inputRoot: {
      color: 'inherit',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    inputInput: {
      padding: theme.spacing(1.15, 1, 1.15, 0),
      fontSize: '0.95rem',
      transition: theme.transitions.create('width'),
      width: '100%',
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    cardRoot: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 18,
      border: `1px solid ${alpha(theme.palette.common.white, 0.12)}`,
      background: 'linear-gradient(180deg, #1a2335 0%, #141b2a 100%)',
      boxShadow: '0 12px 30px rgba(2, 6, 15, 0.28)',
      transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        borderColor: alpha(theme.palette.primary.main, 0.55),
        boxShadow: '0 18px 36px rgba(2, 6, 15, 0.4)',
      },
    },
    cardMedia: {
      height: 210,
      objectFit: 'cover',
      [theme.breakpoints.down('sm')]: {
        height: 190,
      },
    },
    cardMediaLong: {
      width: '100%',
      maxHeight: 430,
      objectFit: 'cover',
      borderRadius: 14,
      border: `1px solid ${alpha(theme.palette.common.white, 0.14)}`,
    },
    drawerPaper: {
      width: 280,
      background: 'linear-gradient(180deg, #172036 0%, #101827 100%)',
      color: '#fff',
      borderRight: `1px solid ${alpha(theme.palette.common.white, 0.12)}`,
      [theme.breakpoints.up('sm')]: {
        width: 320,
      },
    },
    nested: {
      paddingLeft: theme.spacing(4.5),
    },
  }),
);