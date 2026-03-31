import { alpha, Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) =>
  ({
    appShell: {
      minHeight: '100vh',
      background:
        theme.palette.mode === 'dark'
          ? 'radial-gradient(circle at 10% 10%, rgba(41, 211, 166, 0.14), transparent 32%), radial-gradient(circle at 90% 0%, rgba(126, 203, 255, 0.18), transparent 30%), linear-gradient(180deg, #0c1526 0%, #0a111d 100%)'
          : 'radial-gradient(circle at 0% 0%, rgba(17, 122, 101, 0.1), transparent 30%), radial-gradient(circle at 100% 10%, rgba(11, 92, 173, 0.1), transparent 26%), linear-gradient(180deg, #f8fbff 0%, #eef3f9 100%)',
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
      color: theme.palette.text.primary,
    },
    pageSubtitle: {
      maxWidth: 760,
      color: alpha(theme.palette.text.primary, 0.74),
      lineHeight: 1.7,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      border: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.2 : 0.18)}`,
      backgroundColor:
        theme.palette.mode === 'dark'
          ? alpha(theme.palette.common.black, 0.18)
          : alpha(theme.palette.common.white, 0.45),
      '&:hover': {
        backgroundColor:
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.common.white, 0.14)
            : alpha(theme.palette.common.white, 0.72),
      },
    },
    appBar: {
      borderRadius: 0,
      borderBottom: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.16 : 0.14)}`,
      background:
        theme.palette.mode === 'dark'
          ? 'linear-gradient(90deg, #101826 0%, #152238 55%, #1d3557 100%)'
          : 'linear-gradient(90deg, #dff0ec 0%, #e6eef7 55%, #d8e7f8 100%)',
      boxShadow: '0 10px 28px rgba(0, 0, 0, 0.25)',
      color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.text.primary,
    },
    appToolbar: {
      display: 'grid',
      gridTemplateColumns: 'minmax(280px, 1fr) minmax(260px, 430px) minmax(90px, 1fr)',
      alignItems: 'center',
      columnGap: theme.spacing(1.5),
      minHeight: 72,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      [theme.breakpoints.down('lg')]: {
        gridTemplateColumns: 'minmax(240px, 1fr) minmax(240px, 390px) minmax(78px, 1fr)',
      },
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'minmax(210px, 1fr) minmax(220px, 340px) minmax(70px, 1fr)',
      },
      [theme.breakpoints.down('sm')]: {
        minHeight: 64,
        gridTemplateColumns: 'minmax(0, 1fr) auto',
        gridTemplateRows: 'auto auto',
        rowGap: theme.spacing(1),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1.25),
      },
    },
    toolbarLeft: {
      display: 'flex',
      alignItems: 'center',
      minWidth: 0,
    },
    brandIdentity: {
      display: 'flex',
      alignItems: 'center',
      minWidth: 0,
      maxWidth: '100%',
    },
    brandLogo: {
      width: 32,
      height: 32,
      marginRight: theme.spacing(1.1),
      objectFit: 'contain',
      flexShrink: 0,
    },
    toolbarCenter: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        gridColumn: '1 / 3',
      },
    },
    toolbarRight: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    title: {
      display: 'none',
      fontWeight: 800,
      letterSpacing: 0.2,
      color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.text.primary,
      whiteSpace: 'nowrap',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      [theme.breakpoints.down('lg')]: {
        fontSize: '1.35rem',
      },
      [theme.breakpoints.down('md')]: {
        fontSize: '1.2rem',
      },
    },
    search: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      borderRadius: 999,
      border: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.2 : 0.18)}`,
      backgroundColor:
        theme.palette.mode === 'dark'
          ? alpha(theme.palette.common.white, 0.08)
          : alpha(theme.palette.common.white, 0.72),
      color: theme.palette.mode === 'dark' ? theme.palette.common.white : alpha(theme.palette.text.primary, 0.92),
      '&:hover': {
        backgroundColor:
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.common.white, 0.14)
            : alpha(theme.palette.common.white, 0.9),
      },
      width: '100%',
      maxWidth: 420,
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
      border: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.12 : 0.1)}`,
      background:
        theme.palette.mode === 'dark'
          ? 'linear-gradient(180deg, #1a2335 0%, #141b2a 100%)'
          : 'linear-gradient(180deg, #ffffff 0%, #f6f9ff 100%)',
      boxShadow:
        theme.palette.mode === 'dark'
          ? '0 12px 30px rgba(2, 6, 15, 0.28)'
          : '0 12px 28px rgba(15, 23, 42, 0.1)',
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
      border: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.14 : 0.1)}`,
    },
    drawerPaper: {
      width: 280,
      background:
        theme.palette.mode === 'dark'
          ? 'linear-gradient(180deg, #172036 0%, #101827 100%)'
          : 'linear-gradient(180deg, #f5fbff 0%, #edf4fb 100%)',
      color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.text.primary,
      borderRight: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.12 : 0.1)}`,
      [theme.breakpoints.up('sm')]: {
        width: 320,
      },
    },
    themeToggleButton: {
      border: `1px solid ${alpha(theme.palette.text.primary, theme.palette.mode === 'dark' ? 0.2 : 0.16)}`,
      backgroundColor:
        theme.palette.mode === 'dark'
          ? alpha(theme.palette.common.black, 0.2)
          : alpha(theme.palette.common.white, 0.65),
      '&:hover': {
        backgroundColor:
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.common.white, 0.16)
            : alpha(theme.palette.common.white, 0.92),
      },
    },
    nested: {
      paddingLeft: theme.spacing(4.5),
    },
  }),
);