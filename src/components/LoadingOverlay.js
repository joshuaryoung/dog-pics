import { Backdrop } from "@mui/material";
import React from "react";
import loadingGif from '../assets/loading.gif'


function App(props) {

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.showLoadingOverlay}
      onClick={props.handleCloseLoadingOverlay}
    >
      <img src={loadingGif} alt="loadingGif" />
    </Backdrop>
  )
}

export default App