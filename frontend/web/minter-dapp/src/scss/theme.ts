import { createTheme } from "@material-ui/core";

const theme = createTheme({

    overrides: {
        MuiInput: {
            root: {
                background: 'white',
            }
        }
    }

});

export default theme;