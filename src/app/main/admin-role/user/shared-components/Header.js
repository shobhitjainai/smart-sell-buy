import { useTranslation } from 'react-i18next';
import { Grid, Typography, Breadcrumbs } from '@mui/material';
import Link from '@mui/material/Link';


function Header() {
    const { t } = useTranslation('customerPage');

    const breadcrumbs = [
        <Link
            key="2"
            color="#7588A3 !important"
            href="admin/user/userlist"
            sx={{textDecoration: 'none !important', '&:hover': {
                textDecoration: 'underline !important',
                color: '#111827 !important'
            },}}
        >
            {t('Customers')}
        </Link>,
        <Typography key="3" color="text.primary">
            {t('Customer_List')}
        </Typography>,
    ];

    return (
        <>
            <Grid component={'div'} className='fuseHeaderRoot pt-52 px-24' container justifyContent="space-between">
                <Typography variant='h6' className='font-bold text-3xl'>{t('All_Customer')}</Typography>
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                        {breadcrumbs}
                    </Breadcrumbs>
            </Grid>
        </>
    );
}

export default Header;
