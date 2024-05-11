import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => ({
  '& > .logo-icon': {
    transition: theme.transitions.create(['width', 'height'], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  '& > .badge': {
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
}));

function Logo() {
  return (
    <Root className="flex items-center gap-10">
      <img className="logo-icon w-32 h-32" src="assets/images/logo/Smart_buy_sells_logo.png" alt="logo" />

       <Typography variant='h6' className='font-bold'>
          Smart Sell Buy
        </Typography>
    </Root>
  );
}

export default Logo;
