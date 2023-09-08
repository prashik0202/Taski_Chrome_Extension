import React from 'react'

import { Box ,Typography, TextField , FormControl, Button} from '@mui/material'

export default function Reminder() {

     /*global chrome*/
  const click = () => {
    chrome.notifications.create('test', {
      type: 'basic',
      iconUrl: 'logo192.png',
      title: 'GlenRish',
      message: 'glen love rishma',
      priority: 2
    });
  }

  return (
    <Box>
      <Box
        px={1}
        marginTop={10}
        textAlign='center'
        >
            <Typography variant='h5'>Set Reminder</Typography>
        </Box>

        <Box
          mt={2}
          mx={2}
        >
          <Button onClick={click}>
            Clickme
          </Button>
        </Box>
    </Box>
  )
}
