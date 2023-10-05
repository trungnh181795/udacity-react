import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import SearchBox from "../SearchBox/SearchBox";
import { Box } from "@mui/material";

function ResponsiveAppBar() {
  const navigate = useNavigate()

  const handleOnSubmit = (value) => {
    navigate(`/search?q=${value}`)
  }

  return (
    <AppBar position="static" sx={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>

            <AdbIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              My readings
            </Typography>
          </Box>
          <SearchBox onSubmit={handleOnSubmit} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
