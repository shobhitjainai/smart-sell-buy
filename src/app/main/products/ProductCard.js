import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch } from 'react-redux';
import { createArchieve } from 'app/store/userSlices/userSellingSlice';
import { showMessage } from 'app/store/fuse/messageSlice';

export default function ProductCard({ title, image, price, address, id, archive }) {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const dispatch = useDispatch();

  const toggleFavorite = (id) => {
    setIsFavorite(!isFavorite);
    const data = {
      product_id: id,
    }
    dispatch(createArchieve(data)).then((res) => {
      isFavorite ? dispatch(showMessage({ message: 'Successful', variant: 'success' })) : dispatch(showMessage({ message: 'Successful', variant: 'success' }))
    })
  };
  return (
    <Card  className='lg:w-full md:w-full p-10 h-[350px] rounded-sm'>
      
      
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

          <img alt="ecommerce" className="object-cover object-center w-full h-4/6 block" src={image.image}  />
        
        
          <h3 className="text-gray-700 text-2xl tracking-widest title-font mb-1 pt-8 font-bold">{title}</h3>
          <h2 className="text-gray-500 title-font text-lg font-medium">{address}</h2>
          <p className="mt-1 pt-4 text-blue-700 font-semibold">₹{price}</p>
        
      

    </Card>
  );
}
