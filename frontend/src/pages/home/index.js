// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CustomTextField from 'src/@core/components/mui/text-field'
import { Button } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import Icon from 'src/@core/components/icon'
import IconButton from '@mui/material/IconButton'

const Home = () => {
  return (
    <Grid container spacing={6}>
      {/* <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Uploaded Tickets</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              placeholder='Leonard Carter'
              InputProps={{
                startAdornment: (
                  <>
                    <InputAdornment position='end'>
                      <IconButton edge='end'>
                        <Icon fontSize='1.25rem' icon='tabler:search' />
                      </IconButton>
                    </InputAdornment>
                    <InputAdornment position='end'>
                      <IconButton edge='end'>
                        <Icon fontSize='1.25rem' icon='tabler:adjustments-horizontal' />
                      </IconButton>
                    </InputAdornment>
                  </>
                )
              }}
            />
          </Grid>
          <Button type='submit' variant='contained'>
            Submit
          </Button>
        </div>
      </Grid> */}
      <Grid item xs={12}></Grid>
    </Grid>
  )
}

export default Home
