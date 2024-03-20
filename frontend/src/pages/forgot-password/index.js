// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import styles from '../../pages/login/auth.module.css'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { IconButton, InputAdornment } from '@mui/material'

// Styled Components
const ForgotPasswordIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 650,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 650
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  fontSize: theme.typography.body1.fontSize
}))

const ForgotPassword = () => {
  // ** Hooks
  const theme = useTheme()

  // ** Vars
  // const hidden = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      <Box className={`${styles.auth_main_section} content-right`} sx={{ backgroundColor: 'background.paper' }}>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            borderRadius: '0',
            justifyContent: 'center',
            background: 'linear-gradient(150.24deg, #1AAEFF 12.02%, #41BCFF 84.41%)',
            margin: theme => theme.spacing(0)
          }}
          className={styles.authleft}
        >
          <div className={styles.auth_content_box}>
            <img src='../../../images/pages/Entrance-Granted-Logo.svg' className={styles.auth_logo} />

            <div className={styles.auth_content}>
              <h2>
                Welcome to <br />
                Entrance Granted
              </h2>
              <p>
                Entrance Granted… Welcome to the wonderful world of ticket collecting! Our team hopes you enjoy our
                ticket platform, and we look forward to showcasing your tickets!
              </p>
            </div>
          </div>
        </Box>
        <RightWrapper>
          <Box
            sx={{
              p: [6, 12],
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#131338'
            }}
          >
            <Box sx={{ width: '100%', maxWidth: 400 }} className={styles.authformcol}>
              <Box sx={{ my: 6 }}>
                <div className={styles.authformlogo}>
                  <img src='../../../images/pages/Entrance-Granted-Logo.svg' />
                  Entrance Granted
                </div>
                <Typography variant='h2' sx={{ mb: 1.5 }}>
                  Forgot Password?
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  Enter your email and we&prime;ll send you instructions to reset your password
                </Typography>
              </Box>
              <form
                noValidate
                autoComplete='off'
                onSubmit={e => e.preventDefault()}
                className={styles.authforn_section}
              >
                <CustomTextField
                  fullWidth
                  autoFocus
                  type='email'
                  label='Email'
                  sx={{ display: 'flex', marginBottom: '2rem' }}
                  placeholder='Enter Email'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton edge='end'>
                          <Icon fontSize='1.25rem' icon='tabler:mail' />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  className={styles.auth_field}
                />
                <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }} className={styles.auth_button}>
                  Send Reset Link
                </Button>
                <Typography
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { mr: 1 } }}
                >
                  <LinkStyled href='/login' className={styles.forgotlink}>
                    <Icon fontSize='1.25rem' icon='tabler:chevron-left' />
                    <span>Back to login</span>
                  </LinkStyled>
                </Typography>
              </form>
            </Box>
          </Box>
        </RightWrapper>
      </Box>
      <footer>
        <p className={styles.copyright}>© 2024 Entrance Granted. All rights reserved.</p>
      </footer>
    </>
  )
}
ForgotPassword.getLayout = page => <BlankLayout>{page}</BlankLayout>
ForgotPassword.guestGuard = true

export default ForgotPassword
