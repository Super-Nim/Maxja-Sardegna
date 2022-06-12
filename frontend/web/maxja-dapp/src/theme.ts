import { createTheme } from "@material-ui/core";

const theme = createTheme({

    overrides: {
        MuiButton: {
          root: {
            borderRadius: 8,
          }, 
        }, 
        MuiCardContent: {
          root: {
            padding: 0,
            "&:last-child": {
              paddingBottom: 0,
           },
          },
        },
      
      }, 

});

export default theme;