import React, { useState } from 'react'
import { Box, Container, IconButton, Stack } from '@mui/material'
import logo from '../../../assets/coderinaLogo.png'
import { Link, NavLink } from 'react-router-dom'
import CustomButton from './CustomButton'
import { yellowBg } from '../../../utils/constants'
import SideBar from './SideBar'
import { GiHamburgerMenu } from 'react-icons/gi'

const Navbar = () => {
  const [noBg, addBg] = useState("navTwo")
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

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
          <Stack display={{ xs: "none", md: "flex" }}>
            {links.map(({ label, path }) => (
              <NavLink key={label} to={path}>{label}</NavLink>
            ))}
          </Stack>
          <CustomButton orange bold stlyes={{
            display: { xs: "none", md: "flex" }
          }}>
            Get Involved
          </CustomButton>
          <IconButton
            sx={{ display: { xs: "flex", md: "none" } }}
            // size={"medium"}
            onClick={() => setIsDrawerOpen(true)}
          >
            <GiHamburgerMenu />
          </IconButton>
        </Stack>
      </Container>
      <SideBar
        isOpen={isDrawerOpen}
        handleClose={() => setIsDrawerOpen(false)}
        Links={links}
      />
    </Box>
  )
}

export default Navbar