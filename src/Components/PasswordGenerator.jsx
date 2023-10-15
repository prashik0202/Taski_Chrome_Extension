import React, { useState } from 'react';
import {
    Typography,
    Box,
    Button,
    TextField,
    FormControl,
    IconButton,
    OutlinedInput,
    InputAdornment
} from '@mui/material';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';

function generateStrongPassword(length) {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|<>,.?/~';
  let password = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}

function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(12); // Default password length

  const handleGeneratePassword = () => {
    const newPassword = generateStrongPassword(passwordLength);
    setPassword(newPassword);
  };

  const handleCopyPassword = () => {
    const passwordField = document.getElementById('passwordField');
    passwordField.select();
    document.execCommand('copy');
  };

  return (
    <Box mt={5}>
      <Typography variant='body2' textAlign='center' sx={{ color : 'gray'}}>Generate strong password here</Typography>
      <div>
        {/* <label>Password Length:</label> */}
        <FormControl fullWidth>
            <TextField
                margin='dense'
                type="number"
                min="6"
                max="100"
                size='small'
                value={passwordLength}
                onChange={(e) => setPasswordLength(e.target.value)}
            />
            <Button 
              onClick={handleGeneratePassword}  
              variant='contained' 
              size='small' 
              sx={{ mb : 1 , borderRadius : 0}}
            >
              Generate Password
            </Button>
        </FormControl>
      </div>
      <Box mt={2}>
        <FormControl fullWidth>
            <OutlinedInput
                margin='dense'
                variant="standard"
                inputprops={{
                    disableUnderline: true,
                }}
                size='small'
                id="passwordField"
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton onClick={handleCopyPassword}>
                            <ContentCopyTwoToneIcon color='success' />
                        </IconButton>
                    </InputAdornment>
                }
                type="text"
                value={password}
                readOnly
            />
            {/* <IconButton onClick={handleCopyPassword} variant='contained' size='small' sx={{ mb : 1}}><ContentCopyIcon /></IconButton> */}
        </FormControl>
      </Box>
    </Box>
  );
}

export default PasswordGenerator;
