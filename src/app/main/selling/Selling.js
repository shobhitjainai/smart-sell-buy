import { useTranslation } from 'react-i18next';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import React, { useEffect } from 'react'
import SellingCard from './SellingCard'
import { useDispatch, useSelector } from 'react-redux'
import { getProductSelling } from 'app/store/userSlices/userSellingSlice'
import { Grid } from '@mui/material';
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


const Selling = () => {
  const { t } = useTranslation();
    const {productSelling} = useSelector((state) => state.userSlices.userSellingSlice)

    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getProductSelling())
    }, [])
  return (
    <Root
    
      content={
        <>
    <div className='p-28'>
        {productSelling.map((item) => (
          <Grid spacing={2}>
            <SellingCard item={item}/>
            </Grid>
        ))}
    </div>

          

    </>
    }
    scroll="content"
  />
  )
}

export default Selling