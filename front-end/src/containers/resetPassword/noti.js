import * as React from 'react'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import { TextField, Typography} from '@mui/material'
import {ThemeProvider} from '@mui/system'
import useTheme from '../../css/muiTheme'
import { styled } from "@mui/material/styles";
import AppLayout from '../appLayout'
import PropTypes from "prop-types"

const BoxShadowDiv = styled('div')(
  ({ theme }) => `
  box-shadow: ${theme.shadows[12]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 40%;
  left: 35%;
  position: absolute;
  top: 100px;
  gap: 20px;
  height: 40%;
  padding: 20px 30px 40px 30px;
`,
);

export default function Noti(props){
  const theme = useTheme()
  const Icon = props.icon
  const backToHomePage= ()=>{
    window.location.href = "/"
  }
  return(
    <ThemeProvider theme={theme}>
        <BoxShadowDiv>
              <Icon color= {props.iconColour} sx={{ fontSize: 60}}/>
              <Typography variant="h5" color= "primary.main" style={{marginBottom: '10px'}}>{props.message}</Typography>
            <Button type="submit" variant="contained" color="secondary" style={{marginTop: '20px'}} onClick={() => backToHomePage()}>Back To Home Page</Button>
        </BoxShadowDiv>
  </ThemeProvider>

  )}

  Noti.propTypes = {message: PropTypes.string, icon: PropTypes.element, iconColour: PropTypes.string}
