import "./App.css";
import { BrowserRouter } from "react-router-dom";
import CommunityPage from "./pages/CommunityPage";
import MaxjaNFTPage from "./pages/MaxjaNFTPage";
// import FAQPage from "./pages/FAQPage";
// import TechInfoPage from "./pages/TechInfoPage";
// import BlogPage from "./pages/BlogPage";

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={CommunityPage} />
          <Route path="/maxja-nft" exact component={MaxjaNFTPage} />
          {/* <Route path="/faq" exact component={FAQPage} /> */}
          {/* <Route path="/tech-info" exact component={TechInfoPage} /> */}
          {/* <Route path="/blog" exact component={BlogPage} /> */}
          <Route component={CommunityPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
