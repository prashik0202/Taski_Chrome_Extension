import React from 'react'

import { Box ,Typography, TextField , FormControl} from '@mui/material'

export default function Reminder() {

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
          <FormControl fullWidth>
            <TextField
              type="text"
              placeholder="Enter Title"
              onKeyDown={(e) => {
                if(e.key === 'enter'){
                  
                }
              }}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              type="time"
              placeholder="Enter Title"
              onKeyDown={(e) => {
                if(e.key === 'enter'){
                  
                }
              }}
            />
          </FormControl>
        </Box>
    </Box>
  )
}
