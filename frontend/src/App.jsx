import { Fragment } from "react";
import NavBar from "./components/Navbar";
import {Outlet} from 'react-router-dom';

function App() {
  return (
    <Fragment>
      <NavBar />
      <Outlet />
    </Fragment>
  );
}

export default App;
