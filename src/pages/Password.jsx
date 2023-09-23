import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import PasswordGenerator from '../Components/PasswordGenerator';

// ui imports:
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PasswordIcon from '@mui/icons-material/Password';
import { 
    Box , 
    Typography , 
    TextField , 
    FormControl, 
    Button, 
    IconButton, 
    List , 
    ListItem , 
    OutlinedInput ,
    InputAdornment, 
    ListItemText,
    Grid
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function NewPass() {
  const [ website, setWebsite ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwords, setPasswords ] = useState([]);
  const [ editIndex, setEditIndex ] = useState(-1); // Index of the password being edited
  const [ strenght , setStrength ] = useState('');
  const [ showPassword , setShowPassword ] = useState(true);

    // show password functionlity:
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    //password strength checker:
    const strengthChecker = (pass) => {
    let strenghtValue = 0;
    let regexList = ["[A-Z]" ,"[a-z]" , "[0-9]" , "\\W"];
    let strenghtText = ["" , "weak" , "average" , "strong" , "very strong"  ];

    regexList.forEach((regex) => {
      if(new RegExp(regex).test(pass)){
        strenghtValue += 1;
      }
      
    });
    if(pass.lenght >= 8){
        strenghtValue += 1;
    }

    return strenghtText[strenghtValue];
  }

    useEffect(() => {
        setStrength(strengthChecker(password));
    },[strenght,password])

    useEffect(() => {
        // Load passwords from localStorage when the component mounts
        const storedPasswords = JSON.parse(localStorage.getItem('passwords')) || [];
        setPasswords(storedPasswords);
    }, []);

    const addPassword = () => {

    // before adding the password we check the strenght of password:
    const strenght = strengthChecker(password);
    if(strenght === ''||  strenght === 'weak' || strenght === 'average'){
        return alert("Please provide strong password")
    }

    // Encrypt the password before storing it
    const encryptedPassword = CryptoJS.AES.encrypt(password, 'encryptionKey').toString();

    const newPassword = {
      website,
      encryptedPassword, // Store the encrypted password
    };

    // If we are editing a password, update it; otherwise, add a new password
    if (editIndex !== -1) {
      const updatedPasswords = [...passwords];
      updatedPasswords[editIndex] = newPassword;
      setPasswords(updatedPasswords);
      setEditIndex(-1);
    } else {
      const updatedPasswords = [...passwords, newPassword];
      localStorage.setItem('passwords', JSON.stringify(updatedPasswords));
      setPasswords(updatedPasswords);
    }

    // Store the password in localStorage
    // localStorage.setItem('passwords', JSON.stringify(passwords));

    // Clear the input fields
    setWebsite('');
    setPassword('');

  };

  const editPassword = (index) => {
    const passwordToEdit = passwords[index];
    setWebsite(passwordToEdit.website);
    setPassword(CryptoJS.AES.decrypt(passwordToEdit.encryptedPassword, 'encryptionKey').toString(CryptoJS.enc.Utf8));
    setEditIndex(index);
  };

  const deletePassword = (index) => {
    const updatedPasswords = [...passwords];
    updatedPasswords.splice(index, 1);
    setPasswords(updatedPasswords);
    // Store the updated password list in localStorage
    localStorage.setItem('passwords', JSON.stringify(updatedPasswords));
  };

  const copyPassword = (encryptedPassword) => {
    // Decrypt the encrypted password when copying it
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, 'encryptionKey');
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    // You can use the Clipboard API to copy the original password to the clipboard
    navigator.clipboard.writeText(originalPassword);
  };

  const strengthColor = (strenght) => {
    if(strenght === 'weak') return 'error';
    else if(strenght === 'average') return 'warning';
    else return 'success'
  }

  return (
    <Box 
      mx={2}
    >
      {/* <Typography variant='h4'>Password Manager</Typography > */}
      <Grid container>
        <Grid item sm={6}>

        <Box 
          mt={10}
        >
        
        <FormControl fullWidth>
            <TextField
                type="text"
                placeholder="Website"
                margin='normal'
                size='small'
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
            />
            <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                size='small'
                value={password}
                // helperText={strenght ? strenght : "" }
                onChange={(e) => setPassword(e.target.value)}
            />

            <Typography 
                variant='body1' 
                ml={1} 
                mt={1}
                textAlign='center'
                // sx={{ fontWeight : 'bold'}}
            >
              {strenght}
            </Typography>

            <Button onClick={addPassword} sx={{ mt : 1}} variant='contained' size='small'>
            {editIndex !== -1 ? 'Update Password' : 'Add Password'}
            </Button>

        </FormControl>

      </Box>

      <Box><PasswordGenerator /></Box>
        </Grid>
        <Grid item sm={6}>
            <Box mt={10}>
                
            <List sx={{ mx : 1}}>
            {passwords.map((item, index) => (
            <ListItem
                key={index}
                sx={{ my : 0.5 }}
                className='password'
                secondaryAction= {
                    <>
                        <IconButton
                            style={{ textDecoration: 'underline', cursor: 'pointer' }}
                            onClick={() => copyPassword(item.encryptedPassword)}
                        >
                            <ContentCopyIcon sx={{ color : 'green'}}/>
                        </IconButton>
            
                        <IconButton
                            style={{ textDecoration: 'underline', cursor: 'pointer' }}
                            onClick={() => editPassword(index)}
                        >
                            <EditIcon sx={{ color : '#42a5f5'}}/>
                        </IconButton>
            
                        <IconButton
                            style={{ textDecoration: 'underline', cursor: 'pointer' }}
                            onClick={() => deletePassword(index)}
                        >
                            <DeleteIcon sx={{ color : 'red'}}/>
                        </IconButton>
                    </>
                }
            >   

                <ListItemText
                    
                    primary={item.website}
                    // secondary={secondary ? 'Secondary text' : null}
                />

            </ListItem>
        ))}
      </List>

            </Box>
        </Grid>
      </Grid>

      
    </Box>
  );
}

export default NewPass;
