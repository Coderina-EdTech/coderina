import React from 'react'
import { Box, Container, Stack } from '@mui/material'
import logo from '../../../assets/coderinaLogo.png'
import { Link, NavLink } from 'react-router-dom'
import CustomButton from './CustomButton'

const Navbar = () => {
  const links = [
    { label: 'About us', path: '/about' },
    { label: 'What we do', path: '/what we do' },
    { label: 'Events', path: '/events' },
    { label: 'Media', path: '/media' },
  ]


  return (
    <Box component={"nav"} className='nav__body'>
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
          <CustomButton orange>
            Get Involved
          </CustomButton>
        </Stack>
      </Container>
    </Box>
  )
}

export default Navbar