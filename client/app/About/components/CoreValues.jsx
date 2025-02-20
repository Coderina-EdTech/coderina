import {
  Box,
  Card,
  CardContent,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const CoreValues = () => {
  const coreValues = [
    {
      title: "Core values we stand by",
      value1: ["Innovation", " Excellence", "Dedication"],
      value2: ["Inclusion", "Collaboration", "Integrity", "Quality"],
      value3: ["Parnerships", "Creativity", "Excellence"],
    },
  ];

  return (
    <Box>
      <Card className="cv__container">
        {coreValues.map((cv, i) => (
          <CardContent key={i}
            sx={{
              justifyContent: { xs: "center", sm: "space-between !important" },
            }}>
            <Stack width={{ xs: "100%", sm: "25%" }}>
              <Typography variant="h3" fontSize={{ xs: "30px", md: "40px" }}>
                {cv.title}
              </Typography>
            </Stack>
            <Stack className="core__values">
              <Stack gap={{ xs: ".5em", md: "1em" }}>
                {cv.value1.map((v) => (
                  <Paper key={v}>
                    <Typography fontSize={{ xs: "6px", md: "17px" }}>
                      {v}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
              <Stack gap={{ xs: ".5em", md: "1em" }}>
                {cv.value2.map((v) => (
                  <Paper key={v}>
                    <Typography fontSize={{ xs: "6px", md: "17px" }}>
                      {v}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
              <Stack gap={{ xs: ".5em", md: "1em" }}>
                {cv.value3.map((v) => (
                  <Paper key={v}>
                    <Typography fontSize={{ xs: "6px", md: "17px" }}>
                      {v}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            </Stack>
          </CardContent>
        ))}
      </Card>
    </Box>
  );
};

export default CoreValues;
