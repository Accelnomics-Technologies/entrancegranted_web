import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Button, Dialog } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Pagination from '@mui/material/Pagination'
import Icon from 'src/@core/components/icon'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CustomTextField from 'src/@core/components/mui/text-field'
import styles from './home.module.css'
import UploadModal from 'src/container/UploadModal'
import EditTicket from 'src/container/EditTicket'
import ViewTicket from 'src/container/ViewTicketVertical'
import EditTicketVertical from 'src/container/EditTicketVertical'
import ViewTicketVertical from 'src/container/ViewTicketVertical'
import ViewTicketHl from 'src/container/ViewTicketHl'

const Home = () => {
  // Sample card data
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
    },
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
    },
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
    },
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
    },
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
    },
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
    },
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
    },
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
    },
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

  // Pagination state
  const [page, setPage] = React.useState(1)

  // Function to handle page change
  const handlePageChange = (event, value) => {
    setPage(value)
  }

  // Pagination constants
  const cardsPerPage = 6
  const totalPages = Math.ceil(cardData.length / cardsPerPage)
  const startIndex = (page - 1) * cardsPerPage
  const endIndex = Math.min(startIndex + cardsPerPage, cardData.length)

  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editVerticalModalOpen, setEditVerticalModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [viewVerticalModalOpen, setViewVerticalModalOpen] = useState(false)

  const handleUploadClick = () => {
    setModalOpen(true)
  }

  const handleEditModalOpen = () => {
    setEditModalOpen(true)
  }

  const handleVerticalEditModalOpen = () => {
    setEditVerticalModalOpen(true)
  }

  const handleViewModalOpen = () => {
    setViewModalOpen(true)
  }

  const handleVerticalViewModalOpen = () => {
    setViewVerticalModalOpen(true)
  }

  // Function to handle modal close
  const handleCloseModal = () => {
    setModalOpen(false)
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
          className={styles.content_header_sectcion}
        >
          <h2>Uploaded Tickets</h2>

          <div style={{ display: 'flex', alignItems: 'center' }} className='search_field_dashboard'>
            <CustomTextField
              fullWidth
              placeholder='Search'
              InputProps={{
                startAdornment: (
                  <>
                    <InputAdornment position='end' className={styles.searchicon}>
                      <IconButton edge='end'>
                        <Icon fontSize='1.25rem' icon='tabler:search' />
                      </IconButton>
                    </InputAdornment>
                    <InputAdornment position='end' className={styles.filtericon}>
                      <IconButton edge='end'>
                        <Icon fontSize='1.25rem' icon='tabler:adjustments-horizontal' />
                      </IconButton>
                    </InputAdornment>
                  </>
                )
              }}
              className={styles.search_fieldhome}
            />

            <Button onClick={handleUploadClick} variant='contained' className={styles.upload_btn}>
              Upload New Ticket
            </Button>
          </div>
        </Grid>
      </Grid>
      <UploadModal open={modalOpen} onClose={handleCloseModal} styles={styles} />
      <Grid container spacing={6} sx={{ marginTop: '0rem', marginBottom: '5rem' }}>
        {cardData.slice(startIndex, endIndex).map((card, index) => (
          <>
            {index % 2 === 0 ? (
              <Grid item xs={12} md={4} lg={4} key={index}>
                <Card className={styles.ticketcard_hl}>
                  <CardContent className={styles.ticketcardcontent}>
                    <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div className={styles.ticketfirstrow_h}>
                        <span>{card.details.location}</span>
                        <span>{card.details.national}</span>
                      </div>
                      <div className={styles.ticketactionicons}>
                        <IconButton edge='end' onClick={handleEditModalOpen}>
                          <Icon fontSize='1.25rem' icon='tabler:pencil-minus' />
                        </IconButton>
                        <IconButton edge='end' onClick={handleViewModalOpen}>
                          <Icon fontSize='1.25rem' icon='tabler:eye' />
                        </IconButton>
                      </div>
                    </Grid>
                    <EditTicket open={editModalOpen} onClose={() => setEditModalOpen(false)} styles={styles} />
                    <ViewTicketHl open={viewModalOpen} onClose={() => setViewModalOpen(false)} styles={styles} />

                    <Grid sx={{ display: 'flex', justifyContent: 'space-around' }} className={styles.ticketvs_row}>
                      <div>
                        <h3>{card.details.opponent}</h3>
                        <p>{card.details.home}</p>
                      </div>
                      <img src='../../../images/pages/vs.svg' alt='vs' />
                      <div>
                        <h3>{card.details.opponent}</h3>
                        <p>{card.details.away}</p>
                      </div>
                    </Grid>
                    <Grid sx={{ display: 'flex', justifyContent: 'space-between' }} className={styles.ticketinforow_h}>
                      <div>
                        <p>Venue</p>
                        <h5>{card.details.venue}</h5>
                      </div>
                      <div>
                        <p>Price</p>
                        <h5>{card.details.price}</h5>
                      </div>
                      <div className={styles.date_time_box}>
                        <IconButton edge='end'>
                          <Icon fontSize='1.25rem' icon='tabler:calendar-week' /> {card.details.date}
                        </IconButton>
                        <IconButton edge='end'>
                          <Icon fontSize='1.25rem' icon='tabler:clock' /> {card.details.time}
                        </IconButton>
                      </div>
                    </Grid>
                    <hr className={styles.hrline} />
                    <div className={styles.ticket_img}>
                      <img src='../../../images/pages/ticket-horizondal.png' alt='ticket' />
                    </div>
                    <div className={styles.ticketdescription}>{card.details.description}</div>
                  </CardContent>
                </Card>
              </Grid>
            ) : (
              <Grid item xs={12} md={4} lg={4} key={index}>
                <Card className={styles.ticketcard_vl}>
                  <CardContent className={styles.ticketcardcontent}>
                    <Grid container spacing={12}>
                      <Grid item xs={8} md={7} lg={7}>
                        <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div className={styles.ticketfirstrow_h}>
                            <span>Men’s Basketball</span>
                            <span>National</span>
                          </div>
                        </Grid>
                        <Grid sx={{ display: 'flex', flexDirection: 'column' }} className={styles.ticketvs_row}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <h3>{card.details.location}</h3>
                            <p>{card.details.home}</p>
                          </div>
                          <img src='../../../images/pages/vs.svg' alt='vs' />
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
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
                        <hr className={styles.hrline} />
                        <Grid sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                          <div className={styles.date_time_box}>
                            <IconButton edge='end'>
                              <Icon fontSize='1.25rem' icon='tabler:calendar-week' /> {card.details.date}
                            </IconButton>
                            <IconButton edge='end'>
                              <Icon fontSize='1.25rem' icon='tabler:clock' /> {card.details.time}
                            </IconButton>
                          </div>
                          <div className={styles.ticketactionicons}>
                            <IconButton edge='end' onClick={handleVerticalEditModalOpen}>
                              <Icon fontSize='1.25rem' icon='tabler:pencil-minus' />
                            </IconButton>
                            <IconButton edge='end' onClick={handleVerticalViewModalOpen}>
                              <Icon fontSize='1.25rem' icon='tabler:eye' />
                            </IconButton>
                          </div>
                        </Grid>
                      </Grid>
                      <Grid item xs={4} md={5} lg={5} className={styles.vr_imgcol}>
                        <div className={styles.ticket_img}>
                          <img src='../../../images/pages/ticket-vertical.png' alt='ticket' />
                        </div>
                      </Grid>
                    </Grid>
                    <div className={styles.ticketdescription}>{card.details.description}</div>
                  </CardContent>
                  <EditTicketVertical
                    open={editVerticalModalOpen}
                    onClose={() => setEditVerticalModalOpen(false)}
                    styles={styles}
                  />
                  <ViewTicketVertical
                    open={viewVerticalModalOpen}
                    onClose={() => setViewVerticalModalOpen(false)}
                    styles={styles}
                  />
                </Card>
              </Grid>
            )}
          </>
        ))}
      </Grid>
      <Grid item xs={12} className={styles.pagination_row}>
        <div className='flex justify-center mt-4'>
          <Pagination count={totalPages} page={page} color='primary' onChange={handlePageChange} />
        </div>
      </Grid>
    </>
  )
}

export default Home
