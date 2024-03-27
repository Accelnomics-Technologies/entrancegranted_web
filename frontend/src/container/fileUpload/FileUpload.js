import { Fragment, useState } from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import LinearProgress from '@mui/material/LinearProgress' // Import LinearProgress

import Icon from 'src/@core/components/icon'
import { useDropzone } from 'react-dropzone'

const FileUpload = ({ styles }) => {
  const [file, setFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const onDrop = acceptedFiles => {
    if (acceptedFiles.length > 0 && acceptedFiles[0].type.startsWith('image')) {
      setFile(acceptedFiles[0])
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1 // Allow only one file to be uploaded
  })

  const handleRemoveFile = () => {
    setFile(null)
  }

  const handleUpload = async () => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('YOUR_UPLOAD_ENDPOINT', {
        method: 'POST',
        body: formData,
        onUploadProgress: progressEvent => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100)
          setUploadProgress(progress)
        }
      })

      // Handle response
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

  return (
    <Fragment>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Box
            sx={{
              mb: 3,
              width: 80,
              height: 80,
              display: 'flex',
              borderRadius: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            className='dropimg'
          >
            <img src='../../../images/pages/cloud-computing.svg' />
          </Box>
          <Typography variant='p' sx={{ mb: 2.5 }} className={styles.dropcontent}>
            Drag and Drop image file here or <span>Choose image file</span>
          </Typography>
        </Box>
      </div>
      {file ? (
        <Fragment>
          <ListItem>
            <div className={`${styles.filedetail} file-details`}>
              <div className={`${styles.filepreview} file-preview`}>
                <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />
              </div>
              <div className={styles.item_details}>
                <Typography className={`${styles.filename} file-name`}>{file.name}</Typography>
                <Typography className={`${styles.filesize} file-size`} variant='body2'>
                  {(file.size / 1024).toFixed(2)} KB
                </Typography>
                <LinearProgress variant='determinate' value={uploadProgress} />
              </div>
            </div>
            <IconButton onClick={handleRemoveFile}>
              <Icon icon='tabler:x' fontSize={20} />
            </IconButton>
          </ListItem>

          <div className={styles.upload_btn}>
            <Button variant='contained' onClick={handleUpload}>
              Upload File
            </Button>
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  )
}

export default FileUpload
