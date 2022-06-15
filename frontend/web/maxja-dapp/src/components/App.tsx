import '../scss/App.scss';
import Footer from './Footer';
import Header from './Header';
import SignUp from './SignUp';
import Main from './Main';

function App() {
  return (
    <div className="App">
      <div className="background">
      <Header/>
      <Main/>
      <Footer/>
      </div>
    </div>
  );
}

export default App;
