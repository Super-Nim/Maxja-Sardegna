import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { MoralisProvider } from 'react-moralis';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const APP_ID = process.env.REACT_APP_MORALIS_APP_ID!;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL!;

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
    <App/>
    </MoralisProvider>
    </ThemeProvider>
  </React.StrictMode>
);


