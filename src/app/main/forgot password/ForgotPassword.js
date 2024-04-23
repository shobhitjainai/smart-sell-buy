import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
  },
  '& .FusePageSimple-content': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
}));

function ForgotPasswordPage(props) {
  const handleContinueClick = () => {
   
  };

  return (
    <Root
      header={
        <div className="p-24">
          <h4>Change Password</h4>
        </div>
      }
      content={
        <div className="p-24">
          <div>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleContinueClick}
            >
              Continue
            </Button>
          </div>
        </div>
      }
      scroll="content"
    />
  );
}

export default ForgotPasswordPage;
