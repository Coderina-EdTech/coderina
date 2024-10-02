import React, { useState } from 'react'
import { Box, Container, Stack } from '@mui/material'
import logo from '../../../assets/coderinaLogo.png'
import { Link, NavLink } from 'react-router-dom'
import CustomButton from './CustomButton'
import { yellowBg } from '../../../utils/constants'

const Navbar = () => {
  const [noBg, addBg] = useState("navTwo")

  const links = [
    { label: 'About us', path: '/about' },
    { label: 'What we do', path: '/what we do' },
    { label: 'Events', path: '/events' },
    { label: 'Media', path: '/media' },
  ]

  const addBgColor = () => {
    if (window.scrollY >= 10) {
      addBg(yellowBg)
    } else {
      addBg('')
    }
  }
  window.addEventListener("scroll", addBgColor)

  return (
    <Box component={"nav"} className='nav__body' bgcolor={noBg}>
      <Container maxWidth="xl">
        <Stack className='nav__container'>
          <Link to={"/"}>
            <img src={logo} alt="Coderina Logo" />
          </Link>
          <Stack>
            {links.map(({ label, path }) => (
              <NavLink key={label} to={path}>{label}</NavLink>
            ))}
          </Stack>
          <CustomButton orange bold>
            Get Involved
          </CustomButton>
        </Stack>
      </Container>
    </Box>
  )
}

export default Navbar