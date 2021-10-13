import { Switch } from "antd";
import React from "react";
import i18n from "../locale/i18n";
import "./Header.css";

function Header() {
  const onChangeLang = (isCn) => {
    i18n.changeLanguage(isCn ? "zh_CN" : "en");
  };
  return (
    <div>
      <div className="Header">
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "15px",
            maxWidth: "1000px",
          }}
        >
          <a
            href="https://neal.fun/"
            style={{
              color: "#333",
              fontSize: "xx-large",
              "text-decoration": "none",
            }}
          >
            Neal.fun
          </a>
        </div>

        <div className="languageSwitcher">
          <Switch
            checkedChildren="中文"
            unCheckedChildren="English"
            defaultChecked
            onChange={onChangeLang}
          />
        </div>
      </div>
      {/* <div style="float:clear"></div> */}
    </div>
  );
}

export default Header;
