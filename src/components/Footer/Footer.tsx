import React from "react";
import cn from "classnames";

import c from "../../assets/styles/Common.module.scss";
import f from "./Footer.module.scss";
import "../../assets/styles/index.css";

const Footer = () => {
  return (
    <footer>
      <div className={cn(c.container, f.footer)}>
        <p>Make with <span className={f.footerEmoji} role="img" aria-label="Snowman">&#9731;</span></p>
        <span>Ours Team</span>
      </div>
    </footer>
  );
};

export default Footer;
