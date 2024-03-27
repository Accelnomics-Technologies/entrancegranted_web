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
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

const ViewTicketVertical = ({ open, onClose, styles }) => {
  const handleClose = () => {
    onClose()
  }

  const [scroll, setScroll] = useState('paper')

  const cardData = [
    {
      title: "Men's Basketball",
      details: {
        national: 'National',
        location: 'North Carolina',
        opponent: 'NC Central',
        home: 'Home',
        away: 'Away',
        venue: 'Dean Smith Center',
        price: '$25',
        date: 'March 11, 2009',
        time: '7:00 PM',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
      }
    }
  ]

  return (
    <div className='flex gap-4'>
      <Dialog
        open={open}
        scroll={scroll}
        onClose={handleClose}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
        className='modal_boxpanel view_ticketbox view_ticketboxvr'
      >
        <div className={`${styles.upload_modalhead} ${styles.view_modalhead}`}>
          <h2>View Ticket</h2>
          <IconButton onClick={handleClose}>
            <Icon icon='tabler:x' fontSize={20} />
          </IconButton>
        </div>
        <div dividers={scroll === 'body'} className='viewticket_modal viewverticalmodal'>
          <form onSubmit={e => e.preventDefault()}>
            {cardData.map((card, index) => (
              <>
                <Card
                  className={`${styles.ticketcard_vl} ${styles.viewticketcard_vl}`}
                  style={{ margin: '0 auto', background: ' #1AAEFF1A !important' }}
                >
                  <CardContent className={`${styles.ticketcardcontent} ${styles.viewticketcardcontent}`}>
                    <Grid container spacing={12}>
                      <Grid item xs={12} md={8} lg={8}>
                        <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div className={styles.ticketfirstrow_h}>
                            <span>Men’s Basketball</span>
                            <span>National</span>
                          </div>
                        </Grid>
                        <hr className={styles.hrline} style={{ marginTop: '20px', marginBottom: '0px' }} />
                        <Grid
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: '15px'
                          }}
                          className={styles.ticketvs_row}
                        >
                          <div>
                            <h3>{card.details.location}</h3>
                            <p>{card.details.home}</p>
                          </div>
                          <img src='../../../images/pages/vs.svg' alt='vs' />
                          <div>
                            <h3>{card.details.opponent}</h3>
                            <p>{card.details.away}</p>
                          </div>
                        </Grid>
                        <Grid
                          sx={{ display: 'flex', justifyContent: 'space-between' }}
                          className={styles.ticketinforow_h}
                        >
                          <div>
                            <p>Venue</p>
                            <h5>{card.details.venue}</h5>
                          </div>
                          <div>
                            <p>Price</p>
                            <h5>{card.details.price}</h5>
                          </div>
                        </Grid>

                        <Grid sx={{ display: 'flex', marginTop: '15px' }}>
                          <div
                            className={styles.date_time_box}
                            style={{ display: 'flex', alignItems: 'center', gap: '5px', flexDirection: 'row' }}
                          >
                            <IconButton edge='end'>
                              <Icon fontSize='1.25rem' icon='tabler:calendar-week' /> {card.details.date}
                            </IconButton>
                            <IconButton edge='end'>
                              <Icon fontSize='1.25rem' icon='tabler:clock' /> {card.details.time}
                            </IconButton>
                          </div>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} md={4} lg={4} className={styles.vr_imgcol}>
                        <div className={`${styles.ticket_img} ${styles.ticket_imgvertical}`}>
                          <img src='../../../images/pages/ticket-vertical.png' alt='ticket' />
                        </div>
                      </Grid>
                    </Grid>
                    <div className={styles.ticketdescription} style={{ marginTop: '-10px' }}>
                      {card.details.description}
                    </div>
                  </CardContent>
                </Card>
              </>
            ))}
            <CardActions className={styles.edit_modal_action}>
              <Button type='submit' className={styles.share_btn}>
                Share Ticket
              </Button>
            </CardActions>
          </form>
        </div>
      </Dialog>
    </div>
  )
}

export default ViewTicketVertical
