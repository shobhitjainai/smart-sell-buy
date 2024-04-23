import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Cards({title,image,price}) {
    
  return (
    <Card sx={{ alignContent:"center", alignItems:"center"}}>
      
      <CardMedia
        sx={{ height: "200px", width: "100%", objectFit: "cover"}}

        image={image}     
      />
      {/* <CardMedia
        sx={{ height: 130, width: 130 }}
        // className='w-fit'
        image={image.image}     
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {title}
         </Typography>
         <Typography gutterBottom variant="h5" component="div">

         {price}
        </Typography>
      </CardContent>
    </Card>
  );
}