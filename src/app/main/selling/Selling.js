import { useTranslation } from 'react-i18next';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import React, { useEffect } from 'react'
import SellingCard from './SellingCard'
import { useDispatch, useSelector } from 'react-redux'
import { getProductSelling } from 'app/store/userSlices/userSellingSlice'
import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import SellingTab from './shared components/SellingTab';
import ArchiveTab from './shared components/ArchiveTab';
import PropTypes from 'prop-types';
// const Root = styled(FusePageSimple)(({ theme }) => ({
//   '& .FusePageSimple-header': {
//     backgroundColor: theme.palette.background.paper,
//     borderBottomWidth: 1,
//     borderStyle: 'solid',
//     borderColor: theme.palette.divider,
//   },
//   '& .FusePageSimple-toolbar': {},
//   '& .FusePageSimple-content': { display: 'block' },
//   '& .FusePageSimple-sidebarHeader': {},
//   '& .FusePageSimple-sidebarContent': {},
// }));

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Selling = () => {
  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%', marginTop: 3 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="Selling" {...a11yProps(0)} />
          <Tab label="Archive" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <SellingTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ArchiveTab />
      </CustomTabPanel>
    </Box>
  )
}

export default Selling