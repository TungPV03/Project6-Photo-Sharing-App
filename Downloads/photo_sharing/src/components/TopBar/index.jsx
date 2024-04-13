import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar () {
    return (
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar className="toolbar">
          <Typography variant="h5" color="inherit">
            Phạm Việt Tùng - B21DCCN774
          </Typography>
          <div id="modal">
          </div>
        </Toolbar>
      </AppBar>
    );
}

export default TopBar;
