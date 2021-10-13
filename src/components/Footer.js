import React from "react";
import { HeartOutlined } from "@ant-design/icons";
import "./Footer.css";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <div style={{ backgroundColor: "white", marginTop: "15px" }}>
      <p style={{ fontSize: "22pt", paddingTop: "20px" }}>{t("Recommend")}</p>
      <div className="RelatedPost">
        <a className="RelatedWrapper" href="https://neal.fun/life-checklist/">
          <div className="RelatedBackground"></div>
          <div className="RelatedTitle">recommend1</div>
        </a>
        <a className="RelatedWrapper" href="https://neal.fun/life-checklist/">
          <div className="RelatedBackground"></div>
          <div className="RelatedTitle">recommend2</div>
        </a>
      </div>
      <div style={{ marginTop: "10px" }}>
        Made with <HeartOutlined /> by&nbsp;&nbsp;
        <a
          data-v-6180cf70=""
          rel="noopener noreferrer"
          target="_blank"
          href="https://twitter.com/nealagarwal"
          style={{ color: "rgb(51, 51, 51)" }}
        >
          Neal Agarwal
        </a>
      </div>
      <div style={{ marginTop: "18px" }}>
        <a
          style={{
            fontSize: "26px",
            color: "rgb(51, 51, 51)",
            textDecoration: "none",
            fontWeight: "700",
          }}
          href="https://neal.fun/"
        >
          Neal.fun
        </a>
      </div>
    </div>
  );
}
