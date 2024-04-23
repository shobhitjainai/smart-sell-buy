import AppBar from '@mui/material/AppBar';
import { ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import clsx from 'clsx';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectFooterTheme } from 'app/store/fuse/settingsSlice';

function FooterLayout2(props) {
  const footerTheme = useSelector(selectFooterTheme);

  return (
    <ThemeProvider theme={footerTheme}>
      <AppBar
        id="fuse-footer"
        className={clsx('relative z-20 shadow-md', props.className)}
        color="default"
        sx={{ backgroundColor: footerTheme.palette.background.paper }}
      >
         <footer className='bg-black text-white '>
        <div className='container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col'>
          <div className='w-96 md:mx-0 text-center md:text-left'>
            <h3 className='font-bold text-2xl'>
              Smart Buy<span className='text-red-500'>Sell</span>
            </h3>
          </div>

          <div className='flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center ml-320'>

            {/* MENU */}
            <div className='lg:w-1/4 md:w-1/2 w-full px-4'>
              <h2 className='title-font font-medium tracking-widest text-lg mb-3'>
                MENU
              </h2>
              <ul className='list-none mb-10'>
                <li>Features</li>
                <li className='mt-1'>Info Center</li>
                <li className='mt-1'>News Blog</li>
                <li className='mt-1'>Login</li>
              </ul>
            </div>

            {/* COMPANY */}
            <div className='lg:w-1/4 md:w-1/2 w-full px-4'>
              <h2 className='title-font font-medium tracking-widest text-lg mb-3'>Company</h2>
              <ul className='list-none mb-10'>
                <li>About Us</li>
                <li className='mt-1'>Privacy Policy</li>
                <li className='mt-1'>Terms & Conditions</li>
                <li className='mt-1'>Login</li>
              </ul>
            </div>


            {/* CONTACT */}
            <div className='lg:w-1/4 md:w-1/2 w-full px-4'>
              <h2 className='title-font font-medium tracking-widest text-lg mb-3'>Contact</h2>
              <ul className='list-none mb-10'>
                <li>Contact Sales</li>
                <li className='mt-1'>+1236547966</li>
                <li className='mt-1'>News Blog</li>
                <li className='mt-1'>+254669763</li>
              </ul>
            </div>

            {/* TECH SUPPORT */}
            <div className='lg:w-1/4 md:w-1/2 w-full px-4'>
              <h2 className='title-font font-medium tracking-widest text-lg mb-3'>Tech Support</h2>
              <ul className='list-none mb-10'>
                <li>Contact Support</li>
                <li className='mt-1'>Info Center</li>
                <li className='mt-1'>Activate</li>
              </ul>
            </div>
          </div>

        </div>

        {/* COPYRIGHT */}
        
      </footer>
      </AppBar>
    </ThemeProvider>
  );
}

export default memo(FooterLayout2);
