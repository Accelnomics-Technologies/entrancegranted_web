import { forwardRef, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import CardActions from '@mui/material/CardActions'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'

import Icon from 'src/@core/components/icon'

import TextField from '@mui/material/TextField'

const EditTicketVertical = ({ open, onClose, styles }) => {
  const handleClose = () => {
    onClose()
  }

  const [scroll, setScroll] = useState('paper')

  return (
    <div className='flex gap-4'>
      <Dialog
        open={open}
        scroll={scroll}
        onClose={handleClose}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
        className='modal_boxpanel edit_ticketbox'
      >
        <div className={styles.upload_modalhead}>
          <h2>Edit Ticket</h2>
          <IconButton onClick={handleClose}>
            <Icon icon='tabler:x' fontSize={20} />
          </IconButton>
        </div>
        <div dividers={scroll === 'body'} className={styles.upload_modalcontent}>
          <form onSubmit={e => e.preventDefault()}>
            <Grid container spacing={5}>
              <Grid
                item
                container
                spacing={5}
                className={`${styles.editticket_formfields} ${styles.editfirst_row}`}
                style={{ margin: '0 !important' }}
              >
                <Grid item xs={12} lg={6} className={styles.orderFirst}>
                  <TextField
                    select
                    fullWidth
                    label='Event Name'
                    id='form-layouts-separator-select'
                    value='Men’s Basketball'
                    className={styles.editticket_formfield}
                  >
                    <MenuItem value='Men’s Basketball'>Men’s Basketball</MenuItem>
                  </TextField>

                  <TextField
                    select
                    fullWidth
                    label='Event Type'
                    id='form-layouts-separator-select'
                    defaultValue='National'
                    className={styles.editticket_formfield}
                  >
                    <MenuItem value='National'>National</MenuItem>
                  </TextField>

                  <TextField
                    fullWidth
                    label='Ticket Name'
                    placeholder='Ticket Name'
                    defaultValue='Final Match'
                    className={styles.editticket_formfield}
                  />

                  <TextField
                    fullWidth
                    label='Venue'
                    placeholder='Venue'
                    defaultValue='Dean Smith Center'
                    className={styles.editticket_formfield}
                    style={{ marginBottom: '.5rem' }}
                  />
                </Grid>
                <Grid item xs={12} md={6} className={`${styles.formimg_field} ${styles.orderSecond}`}>
                  <img src='../../../images/pages/ticket-vertical.png' alt='' />
                </Grid>
              </Grid>

              <Grid item xs={12} lg={6}>
                <Grid item xs={12} lg={12} className={styles.editticket_formfields}>
                  <TextField
                    select
                    fullWidth
                    label='Game'
                    id='form-layouts-separator-select'
                    value='Home'
                    className={styles.editticket_formfield}
                  >
                    <MenuItem value='Home'>Home</MenuItem>
                  </TextField>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12} lg={12} className={styles.editticket_formfields}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker label='Date' className={styles.editticket_formfield} />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} lg={12} className={styles.editticket_formfields}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker label='Time' className={styles.editticket_formfield} />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} lg={6}>
                <Grid item xs={12} lg={12} className={styles.editticket_formfields}>
                  <TextField
                    fullWidth
                    type='price'
                    label='Price'
                    placeholder='Price Value'
                    defaultValue='$25'
                    className={styles.editticket_formfield}
                  />
                </Grid>
                <Grid item xs={12} lg={12} className={styles.editticket_formfields}>
                  <TextField
                    rows={5}
                    multiline
                    label='Description'
                    defaultValue='There is now an abundance of readable dummy texts. These are usually used when a text is required.'
                    id='textarea-outlined-static'
                    className={styles.editticket_formfield}
                  />
                </Grid>
              </Grid>
            </Grid>
            <CardActions className={styles.edit_modal_action}>
              <Button type='reset' className={styles.deletetkt_btn}>
                Delete Ticket
              </Button>
              <Button type='submit' className={styles.updatetkt_btn}>
                Update Ticket
              </Button>
            </CardActions>
          </form>
        </div>
      </Dialog>
    </div>
  )
}

export default EditTicketVertical
