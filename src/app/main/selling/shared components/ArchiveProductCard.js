import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import SellIcon from '@mui/icons-material/Sell';
const ArchiveProductCard = ({ image, name, price, id }) => {
    const { t } = useTranslation('sellingPage')
    return (
        <Link to={`/product-details/${id}`} style={{ textDecoration: "none" }}>
            <Card sx={{ width: "250px" }}>
                <CardMedia
                    sx={{ height: "200px", width: "100%", objectFit: "cover" }}
                    component="img"
                    image={image}
                    alt={name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        ₹ {price}
                    </Typography>
                </CardContent>
                <CardActions sx={{justifyContent:"center"}}>
                    <Button variant="contained" size="small" sx={{
                        border: '1px solid #818CF8', borderRadius: 2, color: '#818CF8', backgroundColor: '#fff', '&:hover': {
                            backgroundColor: '#818CF8', color: '#fff'
                        },
                    }}>
                        <SellIcon sx={{ width: '0.8em' }} /> &nbsp;{t("SOLD")}
                    </Button>
                    <Button variant="contained" size="small" sx={{
                        border: '1px solid #818CF8', borderRadius: 2, color: '#818CF8', backgroundColor: '#fff', '&:hover': {
                            backgroundColor: '#818CF8', color: '#fff'
                        },
                    }}>
                        <UnarchiveIcon sx={{ width: '0.8em' }} /> &nbsp;{t("UNARCHIVE")}
                    </Button>
                </CardActions>
            </Card>
        </Link>
    );
};

export default ArchiveProductCard;
