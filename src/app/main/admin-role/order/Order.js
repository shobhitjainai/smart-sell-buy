import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AllOrders from './tabs/AllOrders';
import ExpiredOrders from './tabs/ExpiredOrders'
import OrdersLeft from './tabs/OrdersLeft'
import { useTranslation } from 'react-i18next';
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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { t } = useTranslation("productStatus");

  return (
    <Box sx={{ width: '100%',marginTop:3 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label={t('ACTIVE_PRODUCTS')} {...a11yProps(0)} />
          <Tab label={t("EXPIRED_PRODUCTS")} {...a11yProps(1)} />
          {/* <Tab label="Order Left" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <AllOrders/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
       <ExpiredOrders/>
      </CustomTabPanel>
    </Box>
  );
}