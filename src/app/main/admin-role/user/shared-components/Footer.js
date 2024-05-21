import { Grid, Typography } from '@mui/material'
import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Link } from 'react-router-dom';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleClick = () => {
        // Additional handling when footer link is clicked
        // For example, you might have some navigation logic here
        // After handling, scroll to the top
        scrollToTop();
    };
    return (
        <>
            <Grid container padding={5} gap={3} >
                <Grid item xs={12} display={'flex'} justifyContent={'space-between'} marginLeft={5}>
                    <Grid item container xs={9} spacing={2} display={'flex'} flexDirection={'column'}>
                        <Grid item display={'flex'} gap={1} >
                            <img src="/assets/images/logo/Smart_buy_sells_logo.png" alt="" height={25} width={35} />
                            <Typography variant='h5'>Smart Sell Buy</Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{ width: '50%' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam exercitationem at maiores aliquid veniam explicabo distinctio obcaecati placeat nam ipsum </Typography>
                        </Grid>
                        <Grid item display={'flex'} gap={2}>
                            <FacebookIcon />
                            <TwitterIcon />
                        </Grid>
                    </Grid>
                    <Grid item container xs={3} display={'flex'} flexDirection={'row'} gap={10}>
                        <Grid item display={'flex'} flexDirection={'column'} gap={3}>
                            <Link to='/user/home' onClick={handleClick} style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
                            <Link to='/user/products' onClick={handleClick} style={{ textDecoration: 'none', color: 'white' }}>Product</Link>
                            <Link to='/user/selling' onClick={handleClick} style={{ textDecoration: 'none', color: 'white' }}>Selling</Link>
                        </Grid>
                        <Grid item display={'flex'} flexDirection={'column'} gap={3}>
                            <Link to='/user/sell-product' onClick={handleClick} style={{ textDecoration: 'none', color: 'white' }}>Sell Product</Link>
                            <Link to='/' onClick={handleClick} style={{ textDecoration: 'none', color: 'white' }}>Privacy Policy</Link>
                            <Link to='/' onClick={handleClick} style={{ textDecoration: 'none', color: 'white' }}>Terms of use</Link>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <hr />
                </Grid>
                <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                    <Typography sx={{ fontWeight: '100' }}>
                        Copyright &copy; {new Date().getFullYear()} <span style={{ fontWeight: '400' }}> Smart Sell Buy </span>. All Rights Reserved.| V 1.1.1
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default Footer
