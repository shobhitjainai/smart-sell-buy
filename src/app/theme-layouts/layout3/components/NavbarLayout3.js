import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { memo } from 'react';
import Navigation from '../../shared-components/Navigation';
import { Grid, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageSwitcher from '../../shared-components/LanguageSwitcher';
const Root = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

function NavbarLayout3(props) {
  return (
    <Root className={clsx('w-full h-64 min-h-64 max-h-64 shadow-md', props.className)}>
      <div className="flex flex-auto items-center w-full h-full container px-16 lg:px-24">
        <FuseScrollbars className="flex h-full w-full items-center justify-between">

          <Navigation layout="horizontal" dense />
          <div className='flex justify-between gap-14 items-center'>
            <div >
              <LanguageSwitcher />
            </div>
            <div >
              <Typography sx={{ color: "blue", marginLeft: "auto", fontWeight: "700" }}>$0.00</Typography>
            </div>
            <div >
              <FacebookIcon />
            </div >
            <div>
              <TwitterIcon />
            </div >
              </div>
        </FuseScrollbars>
      </div>
    </Root>
  );
}

export default memo(NavbarLayout3);
