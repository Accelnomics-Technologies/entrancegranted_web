// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import useBgColor from 'src/@core/hooks/useBgColor'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import styles from './auth.module.css'

// ** Demo Imports

// ** Styled Components
const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 680,
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
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    color: theme.palette.text.secondary
  }
}))

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required()
})

const defaultValues = {
  password: 'admin',
  email: 'admin@brett.fraser.com'
}

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  // ** Hooks
  const auth = useAuth()
  const theme = useTheme()
  const bgColors = useBgColor()
  const { settings } = useSettings()

  // const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    const { email, password } = data
    auth.login({ email, password, rememberMe }, () => {
      setError('email', {
        type: 'manual',
        message: 'Email or Password is invalid'
      })
    })
  }
  const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

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
                  Login Account
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>Hello, Welcome back to our account</Typography>
              </Box>

              <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className={styles.authforn_section}>
                <Box sx={{ marginBottom: '2rem' }}>
                  <Controller
                    name='email'
                    control={control}
                    rules={{ required: true }}
                    className='input_field'
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        autoFocus
                        label='Email'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        placeholder='admin@brett.fraser.com'
                        error={Boolean(errors.email)}
                        {...(errors.email && { helperText: errors.email.message })}
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
                    )}
                  />
                </Box>
                <Box sx={{ mb: 4, border: 'none !important' }}>
                  <Controller
                    name='password'
                    control={control}
                    className='input_field'
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        label='Password'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        id='auth-login-v2-password'
                        error={Boolean(errors.password)}
                        {...(errors.password && { helperText: errors.password.message })}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton edge='end'>
                                <Icon fontSize='1.25rem' icon='tabler:lock' />
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                        className={styles.auth_field}
                      />
                    )}
                  />
                </Box>
                <Box
                  sx={{
                    mb: 1.75,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div></div>
                  <Typography
                    component={LinkStyled}
                    href='/forgot-password'
                    sx={{ marginBottom: '2rem' }}
                    className={styles.forgotlink}
                  >
                    Forgot Password?
                  </Typography>
                </Box>
                <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }} className={styles.auth_button}>
                  Login
                </Button>
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
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
LoginPage.guestGuard = true

export default LoginPage
