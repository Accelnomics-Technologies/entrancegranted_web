import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import styles from './home.module.css'

const TicketCard = ({ title, ticketImage, content }) => {
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <img src={ticketImage} alt={title} className={styles.ticketImage} />
        <Typography variant='body2' color='textSecondary' component='p'>
          {content}
        </Typography>
      </CardContent>
    </Card>
  )
}

// Dummy ticket data
const ticketData = [
  {
    title: 'Concert Ticket',
    ticketImage: 'https://example.com/concert-ticket.jpg',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget mauris eu massa pretium congue.'
  },
  {
    title: 'Sports Event Ticket',
    ticketImage: 'https://example.com/sports-ticket.jpg',
    content: 'Nulla facilisi. Nullam auctor elit sit amet lorem blandit, non rutrum arcu tincidunt.'
  }
]

export { TicketCard, ticketData }
