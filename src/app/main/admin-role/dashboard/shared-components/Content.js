import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Card from './Card'
import { Grid, Box } from '@mui/material';
import Table from './Table'
// const Root = styled(FusePageSimple)(({ theme }) => ({
//   '& .FusePageSimple-header': {
//     backgroundColor: theme.palette.background.paper,
//     borderBottomWidth: 1,
//     borderStyle: 'solid',
//     borderColor: theme.palette.divider,
//   },
//   '& .FusePageSimple-toolbar': {},
//   '& .FusePageSimple-content': {},
//   // '& .FusePageSimple-sidebarHeader': {},
//   '& .FusePageSimple-sidebarContent': {},
// }));

function DashboardPage(props) {
  const { t } = useTranslation('examplePage');

  return (
    <Grid component={'div'} className='w-full'>
      <Card />
      <Box sx={{ margin: 4 }}>
        <Grid container>
          <Table />
        </Grid>
      </Box>
    </Grid>
  );
}

export default DashboardPage;


