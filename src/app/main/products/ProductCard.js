import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ProductCard({title,image,price, address}) {
    
  return (
    <Card  className='lg:w-full md:w-full p-10   h-[350px] rounded-sm'>
      
      
       {/* <CardMedia
        sx={{ height: 250 }}
        // className='w-fit'
        image={image.image}     
      /> 
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" className='font-bold'>
         {title}
         </Typography>
        
        <Typography gutterBottom variant="h5" component="div" className='text-gray-600'>
         {address}
        </Typography>
        <Typography gutterBottom variant="h5" component="div" className='text-[blue]'>
         ₹{price}
        </Typography>
      </CardContent> */}

          <img alt="ecommerce" class="object-cover object-center w-full h-4/6 block" src={image.image}  />
        
        
          <h3 class="text-gray-700 text-2xl tracking-widest title-font mb-1 pt-8 font-bold">{title}</h3>
          <h2 class="text-gray-500 title-font text-lg font-medium">{address}</h2>
          <p class="mt-1 pt-4 text-blue-700 font-semibold">₹{price}</p>
        
      

    </Card>
  );
}