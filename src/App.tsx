import React, { useState } from "react";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Button from "./components/Button/button";
import Transition from "./components/Transition/transition";
library.add(fas);

const App: React.FC = () => {
  const [show, setShow] = useState(false);
  const nodeRef = React.useRef(null);
  return (
    <div className="App">
      <header className="App-header">
        <Menu
          defaultIndex="0"
          onSelect={(index) => {
            alert(index);
          }}
          defaultOpenSubMenus={["2"]}
        >
          <MenuItem>cool link</MenuItem>
          <MenuItem>cool link2</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>dropdown1</MenuItem>
            <MenuItem>dropdown2</MenuItem>
            <MenuItem>dropdown3 </MenuItem>
          </SubMenu>
          <MenuItem>cool link3</MenuItem>
        </Menu>
        <Button
          size="lg"
          onClick={() => {
            setShow(!show);
            alert(show);
          }}
        >
          Toggle
        </Button>
        <Transition
          animation="zoom-in-bottom"
          in={show}
          timeout={300}
          nodeRef={nodeRef}
        >
          <div>
            <p>
              Edit <code>src/App.tsx</code>and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code>and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code>and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code>and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code>and save to reload.
            </p>
          </div>
        </Transition>
      </header>
    </div>
  );
};

export default App;
