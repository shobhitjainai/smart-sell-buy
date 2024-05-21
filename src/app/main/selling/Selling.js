import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react'
import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import SellingTab from './shared components/SellingTab';
import ArchiveTab from './shared components/ArchiveTab';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';


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
  const { t } = useTranslation('sellingPage');
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Root
      content={
    <Box sx={{ width: '100%', marginTop: 3 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label={t('SELLING')} {...a11yProps(0)} />
          <Tab label={t('ARCHIVE')} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <SellingTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ArchiveTab />
      </CustomTabPanel>
    </Box>
    
    }
    scroll="content"
    />
  )
}

export default Selling