import React from 'react'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

const ForgotPassword = (props) => {
  return (
    <Box
      position={'relative'}
      minHeight={'calc(100vh - 247px)'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      height={'100%'}
    >
      <Box>
        <Box marginBottom={4}>
          <Typography
            sx={{
              textTransform: 'uppercase',
              fontWeight: 'medium',
            }}
            gutterBottom
            color={'textSecondary'}
          >
            Recover account
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
            }}
          >
            Forgot your password?
          </Typography>
          <Typography color="text.secondary">
            Enter your email address below and we will get you back on track.
          </Typography>
        </Box>
        <form>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                Enter your email
              </Typography>
              <TextField
                label="Email *"
                variant="outlined"
                name={'email'}
                fullWidth
              />
            </Grid>
            <Grid item container xs={12}>
              <Box
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                alignItems={{ xs: 'stretched', sm: 'center' }}
                justifyContent={'space-between'}
                width={'100%'}
                maxWidth={600}
                margin={'0 auto'}
              >
                <Box marginBottom={{ xs: 1, sm: 0 }}>
                  <Button
                    size={'large'}
                    variant={'outlined'}
                    component={Link}
                    href={'/page-login-simple'}
                  >
                    Back to login
                  </Button>
                </Box>
                <Button size={'large'} variant={'contained'} type={'submit'}>
                  Send reset link
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  )
}

export default ForgotPassword
ForgotPassword.propTypes = {}
