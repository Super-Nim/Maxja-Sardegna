import { createTheme } from "@material-ui/core";

const theme = createTheme({

    overrides: {
        MuiButton: {
          root: {
            borderRadius: 8,
          }, 
        }, 
      }, 

});

export default theme;