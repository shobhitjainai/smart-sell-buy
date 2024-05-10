import { ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Hidden from '@mui/material/Hidden';
import Toolbar from '@mui/material/Toolbar';
import clsx from 'clsx';
import { memo } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { selectFuseCurrentLayoutConfig, selectToolbarTheme } from 'app/store/fuse/settingsSlice';
import AdjustFontSize from '../../shared-components/AdjustFontSize';
import FullScreenToggle from '../../shared-components/FullScreenToggle';
import LanguageSwitcher from '../../shared-components/LanguageSwitcher';
import NotificationPanelToggleButton from '../../shared-components/notificationPanel/NotificationPanelToggleButton';
import NavigationSearch from '../../shared-components/NavigationSearch';
import UserMenu from '../../shared-components/UserMenu';
import QuickPanelToggleButton from '../../shared-components/quickPanel/QuickPanelToggleButton';
import ChatPanelToggleButton from '../../shared-components/chatPanel/ChatPanelToggleButton';
import Logo from '../../shared-components/Logo';
import NavbarToggleButton from '../../shared-components/NavbarToggleButton';
import CallIcon from '@mui/icons-material/Call';
import { getUserProducts, getSearchProducts, handleFilters, filterProducts } from "app/store/userSlices/userHomeSlice";
import { Accordion, AccordionSummary, AccordionDetails,Grid, MenuItem, TextField, Typography } from '@mui/material';
function ToolbarLayout3(props) {
  const config = useSelector(selectFuseCurrentLayoutConfig);
  const toolbarTheme = useSelector(selectToolbarTheme);
  const { userProducts,  filterState } = useSelector((state) => state.userSlices.userHomeSlice);
  const { Categories } = useSelector((state) => state.userSlices.userHomeSlice)
  const dispatch = useDispatch();
  const handleFilter = (e) => {
    dispatch(handleFilters(e.target))
  }
  return (
    <ThemeProvider theme={toolbarTheme}>
      <AppBar
        id="fuse-toolbar"
        className={clsx('flex relative z-20 shadow-md', props.className)}
        color="default"
        style={{ backgroundColor: toolbarTheme.palette.background.paper }}
      >
        <Toolbar className="container p-0 lg:px-24 min-h-48 md:min-h-64 justify-evenly w-full">
          {config.navbar.display && (
            <Hidden lgUp>
              <NavbarToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" />
            </Hidden>
          )}

          <Hidden lgDown>
            <div className={clsx('flex shrink-0 items-center')}>
              <Logo />
            </div>
          </Hidden>
          {/* <Accordion expanded={true}> */}
                    {/* <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      CATEGORY
                    </AccordionSummary> */}
                    <AccordionDetails sx={{width: 200, paddingTop: '20px'}}>
                      <TextField
                        name='category_id'
                        variant='filled'
                        select
                        type='text'
                        value={filterState.category_id == '' ? 1 : filterState?.category_id}
                        onChange={(e) => {
                          handleFilter(e)
                        }}
                        fullWidth
                        SelectProps={{
                          sx: {
                            '& .MuiSelect-select': {
                              paddingTop: '14px'
                            }
                          }
                        }}
                      >
                        {/* {console.log(categories)} */}
                        <MenuItem value={1} disabled>ALL CATEGORIES</MenuItem>
                        {Categories?.map((opt) => <MenuItem value={opt.id}>{opt?.name}</MenuItem>)}
                      </TextField>
                    </AccordionDetails>
                  {/* </Accordion> */}
          <div className="flex flex-1">
            <Hidden smDown>
              <NavigationSearch className="mx-16  lg:mx-24" variant="basic" />
            </Hidden>
          </div>

          <div className="flex items-center px-8 md:px-0 h-full overflow-x-auto justify-end gap-20">
            <Hidden smUp>
              <NavigationSearch />
            </Hidden>

            <Hidden lgUp>
              <ChatPanelToggleButton />
            </Hidden>
              <Grid item justifyContent="center" alignItems="center">
                <CallIcon sx={{color: 'green', backgroundColor: '#BDBDBD', borderRadius: '100%', padding: "5px" }}/>
              </Grid>
              <Grid item>
                <Typography sx={{fontWeight:"700"}} className='text-lg'>+91 9852368952</Typography>
                <Typography sx={{color:"grey"}} className='text-md'>Support 24/7 times</Typography>
              </Grid>
            {/* <LanguageSwitcher /> */}

            {/* <AdjustFontSize /> */}

            {/* <FullScreenToggle /> */}

            {/*   <QuickPanelToggleButton /> */}

            {/* <NotificationPanelToggleButton /> */}

            <UserMenu />
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default memo(ToolbarLayout3);
