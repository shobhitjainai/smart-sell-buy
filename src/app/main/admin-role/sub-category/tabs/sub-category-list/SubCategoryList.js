import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import SubCategoryListTable from './shared-components/SubCategoryListTable';

const Root = styled(FusePageSimple)(({ theme }) => ({
    '& .FusePageSimple-header': {
        backgroundColor: theme.palette.background.paper,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: theme.palette.divider,
    },
    '& .FusePageSimple-toolbar': {},
    '& .FusePageSimple-content': {},
    '& .FusePageSimple-sidebarHeader': {},
    '& .FusePageSimple-sidebarContent': {},
}));

function SubCategoryList(props) {
    return (
        <div className="p-24">
            <SubCategoryListTable />
        </div>
    );
}

export default SubCategoryList;
