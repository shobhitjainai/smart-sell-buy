import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const SellingProductCard = ({ image, name, price, id }) => {
    const { t } = useTranslation()
    return (
        // <Link to={`/product-details/${id}`} style={{ textDecoration: "none" }}>
            <Card sx={{ maxWidth: 345 }}>
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
                <CardActions>
                    <Button variant="contained" size="small" sx={{
                        border: '1px solid #818CF8', borderRadius: 2, color: '#818CF8', backgroundColor: '#fff', '&:hover': {
                            backgroundColor: '#818CF8', color: '#fff'
                        },
                    }}>
                        <EditIcon sx={{ width: '0.8em' }}/> &nbsp;{t("Edit")}
                    </Button>
                    <Button variant="contained" size="small" sx={{
                        border: '1px solid #818CF8', borderRadius: 2, color: '#818CF8', backgroundColor: '#fff', '&:hover': {
                            backgroundColor: '#818CF8', color: '#fff'
                        },
                    }}>
                        <DeleteIcon sx={{ width: '0.8em' }}/> &nbsp;{t("Delete")}
                    </Button>
                </CardActions>
            </Card>
        // </Link>
    );
};

export default SellingProductCard;
