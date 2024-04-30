import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { Button, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getuserProfile } from 'app/store/userSlices/userProfileSlice';
import Divider from '@mui/material/Divider';
import PaymentIcon from '@mui/icons-material/Payment';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
  },
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': { display: 'block' },
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
}));

function Profile(props) {
  const { t } = useTranslation('profilePage');
const {userProfile} = useSelector((state) => state.userSlices.userProfileSlice)

  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getuserProfile());
  }, [])

  return (
    <Root
      header={
        <div className="p-24">
          <h4 className='text-lg font-bold'>{t('MY_PROFILE')}</h4>
        </div>
      }
      content={
        <Container>
            <Grid className='flex flex-col justify-center gap-20 bg-white p-52 border-lg'>

            <div className='flex gap-10'>
            <img src={userProfile.picture} className='h-[200px] w-[200px] rounded-full'/>
            <div className='flex justify-center flex-col items-start'>
            <Typography className='font-bold'>{userProfile.first_name} {userProfile.last_name}</Typography>
            <Typography>{t('BOUGHT_25_SOLD')}</Typography>
            </div>
            </div>

            <Divider variant="middle"  />

            <Grid className='flex flex-col gap-16'>
                <Grid>
                    <Typography className='text-lg font-bold'>{t('TRANSACTIONS')}</Typography>
                    <Grid className='pl-40'>
                        <div className='flex gap-8 py-4'><AttachMoneyIcon /><Typography>{t('PURCHASES_AND_SALES')}</Typography><KeyboardArrowRightIcon/></div>
                        <div className='flex gap-8 py-4'><PaymentIcon /><Typography>{t('PAYMENT_AND_DEPOSIT')}</Typography><KeyboardArrowRightIcon/></div>
                        <Typography></Typography>
                    </Grid>
                </Grid>

                <Divider variant="middle"  />

                <Grid>
                    <Typography className='text-lg font-bold'>{t('SAVES')}</Typography>
                    <Grid className='pl-40'>
                        <div className='flex gap-8 py-4'><StarBorderIcon /><Typography>{t('SAVE_ITEMS')}</Typography><KeyboardArrowRightIcon/></div>
                        <div className='flex gap-8 py-4'><NotificationsActiveIcon /><Typography>{t('SEARCH_ALERTS')}</Typography><KeyboardArrowRightIcon/></div>
                        <Typography></Typography>
                    </Grid>
                </Grid>

                <Divider variant="middle"  />

                <Grid>
                    <Typography className='text-lg font-bold'>{t('ACCOUNT')}</Typography>
                    <Grid className='pl-40'>
                        <Link to='/profile/account-settings'  style={{ textDecoration: 'none', display: 'inline-block' }}>
                        <div className='flex gap-8  py-4 text-black ' sx={{ textDecoration: 'none !important' }}><SettingsIcon /><Typography>{t('ACCOUNT_SETTINGS')}</Typography><KeyboardArrowRightIcon/></div>
                        </Link>
                        <div className='flex gap-8  py-4'><AttachMoneyIcon /><Typography>{t('BOOST_PLUS')}</Typography><KeyboardArrowRightIcon/></div>
                        <Typography></Typography>
                    </Grid>
                </Grid>
            </Grid>

            </Grid>
        </Container>
      }
      scroll="content"
    />
  );
}

export default Profile;
