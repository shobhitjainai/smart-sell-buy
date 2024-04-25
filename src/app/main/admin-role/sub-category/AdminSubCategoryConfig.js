import { authRoles } from 'src/app/auth';
import { Navigate } from 'react-router-dom';
import SubCategoryPage from './SubCategory';
import SubCategoryList from './tabs/sub-category-list/SubCategoryList';
import NewSubCategoryPage from './tabs/new-sub-category/NewSubCategory';

const AdminSubCategoryConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    auth: authRoles.admin,
    routes: [
        {
            path: '/admin/sub-category',
            children: [
                {
                    path: '',
                    element: <Navigate to="/admin/sub-category/sub-category-list" />,
                },
                {
                    path: 'sub-category-list',
                    element: <SubCategoryPage><SubCategoryList /></SubCategoryPage>
                },
                {
                    path: 'new-sub-category',
                    element: <SubCategoryPage><NewSubCategoryPage /></SubCategoryPage>
                },
                // {
                //   path: ':id/sub-category',
                //   element: <Category><SubCategoryPage /></Category>
                // }
            ]
        },
    ],
};

export default AdminSubCategoryConfig;
