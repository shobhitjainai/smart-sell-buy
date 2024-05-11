import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { memo } from 'react';
import Navigation from '../../shared-components/Navigation';
import { Grid, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageSwitcher from '../../shared-components/LanguageSwitcher';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import EmailIcon from '@mui/icons-material/Email';
import UserMenu from 'app/theme-layouts/shared-components/UserMenu';
const Root = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
}));

function NavbarLayout3(props) {
    return (
        <Root className={clsx('w-full h-64 min-h-64 max-h-64 pt-10', props.className)}>
            <div className="flex flex-auto items-center w-full h-full container px-16 lg:px-24">
                <FuseScrollbars className="flex h-full w-full items-center justify-between">

                    {/* <div className='flex justify-between gap-14 items-center'> */}
                    <Grid container className='w-1/2 gap-20'>
                            <div className='flex gap-10'>
                            <HeadsetMicIcon className='text-[#818CF8]'/>
                            <Typography>7845125456</Typography>
                            </div>
                            
                            <div className='flex gap-10'>
                            <EmailIcon className='text-[#818CF8]'/>
                            <Typography>arbutus@gmail.com</Typography>
                            </div>
                    </Grid>
 
                    <Grid container alignItems="center" justifyContent="flex-end" className='w-1/2 gap-10'>
                            <FacebookIcon className='text-[#818CF8]'/>
                            <TwitterIcon className='text-[#818CF8]'/>
                            <LanguageSwitcher />
                            <UserMenu />
                    </Grid>


                    
                    {/* </div> */}
                </FuseScrollbars>
            </div>
        </Root>
    );
}

export default memo(NavbarLayout3);
