import { Button } from '@mui/material'
import React from 'react'
// import { fontStyle } from '../../'
import { fontStyle1 } from '../../../utils/constants'

const CustomButton = ({ children, orange, stlyes, isLarge }) => {
  return (
    <Button
      variant={"contained"}
      sx={{
        bgcolor: orange ? "#FBB12F" : "#201E1E",
        borderRadius: 10,
        py: isLarge ? 1.5 : "",
        fontSize: "16px",
        textTransform: "none",
        fontWeight: 500,
        color: orange ? "#080F12" : "#fff",
        fontFamily: fontStyle1,
        ...stlyes
      }}
    >
      {children}
    </Button>
  )
}

export default CustomButton