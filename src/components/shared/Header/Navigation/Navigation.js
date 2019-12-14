import React, { useState } from "react";

import DesktopNav from "./DesktopNav/DesktopNav";
import MobileNav from "./MobileNav/MobileNav";
import Hamburger from "./Hamburger/Hamburger";
import Backdrop from "../../Backdrop/Backdrop";

const Navigation = () => {
  const [mobileMenuVisible, mobileMenuClickHandler] = useState(false);

  return (
    <>
      <DesktopNav />
      <Hamburger
        clickHandler={() => mobileMenuClickHandler(!mobileMenuVisible)}
      />
      <MobileNav isVisible={mobileMenuVisible} />
      {mobileMenuVisible ? (
        <Backdrop
          clickHandler={() => mobileMenuClickHandler(!mobileMenuVisible)}
        />
      ) : null}
    </>
  );
};

export default Navigation;
