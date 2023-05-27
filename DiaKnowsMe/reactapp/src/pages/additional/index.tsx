import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import { TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';


export default function Additional(setAdditional:any) {

    

const handleAdditionalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdditional(e.target.value);
};

// React.useEffect(() => {
//     // Make the API request when the component mounts
//     fetchSecondData();
//   }, []);

//   const fetchSecondData = async () => {
//     try {
//       const response = await fetch('https://diaknowsmeapi.azurewebsites.net/GPT/Diagnose');
//       const data = await response.json();
//       // Assuming the response contains the answer as a string
//       console.log(data)
//       setAdditional(data.answer);
//     } catch (error) {
//       console.log('Error fetching data:', error);
//     }
//   };

  return (

    <div>
      
      <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Additional Input</FormLabel>


      <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          label="Put your answer here"
          // value={additional}
          onChange={handleAdditionalChange}
        />
      </FormControl>
        {/* <Button variant="contained" size='medium'>
            Send
        </Button> */}
        </div>
  )
}