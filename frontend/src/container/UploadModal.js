// React Imports
import { useEffect, useRef, useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// Third-party Imports
import classnames from 'classnames'
import FileUpload from './fileUpload/FileUpload'

const UploadModal = ({ open, onClose, styles }) => {
  // States
  const [scroll, setScroll] = useState('paper')

  // Refs
  const descriptionElementRef = useRef(null)

  // Function to handle modal close
  const handleClose = () => {
    onClose() // Close the modal
  }

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef

      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  return (
    <div className='flex gap-4'>
      <Dialog
        open={open}
        scroll={scroll}
        onClose={handleClose}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
        className={`modal_boxpanel ${styles.modalboxfileupload}`}
      >
        <div className={styles.upload_modalhead}>
          <h2>Upload New Ticket</h2>
          <IconButton onClick={handleClose}>
            <Icon icon='tabler:x' fontSize={20} />
          </IconButton>
        </div>
        <div dividers={scroll === 'paper'} className={styles.upload_modalcontent}>
          <FileUpload styles={styles} />
        </div>
      </Dialog>
    </div>
  )
}

export default UploadModal
