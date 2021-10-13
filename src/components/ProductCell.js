import React, { useState } from "react";
import { InputNumber } from "antd";
import "./ProductCell.css";
import formatMoney from "../common/moneyFormatter";
import { useTranslation } from "react-i18next";

export default function ProductCell(props) {
  const { t } = useTranslation();
  const [index] = useState(props.data.index);

  const [count] = useState(props.data.buy_count);

  const _inputHandler = (event) => {
    if (event === "-") {
      return false;
    }
    if (typeof event == "string") {
      event = Number.parseInt(event);
    }
    let diff = event - count;
    if (diff > 0) {
      return _buy(diff);
    } else {
      return _sell(-diff);
    }
  };

  const _buy = (buy_count) => {
    props.TrySpend(index, buy_count);
  };

  const _sell = (sell_count) => {
    props.Sell(index, sell_count);
    return true;
  };

  return (
    <div className="ItemCell">
      <img
        className="ItemImage"
        src={props.data.image_src}
        alt={props.data.image_src}
        style={{ maxWidth: "100%", Height: "50%" }}
      ></img>
      <div className="ItemName">{t(props.data.product_name)}</div>
      <div className="ItemCost">${formatMoney(props.data.product_cost)}</div>
      <div className="ItemControl">
        <button
          className={
            `ItemSell${props.data.enable_sell ? "Enable" : "Disable"}` +
            " ItemSell"
          }
          onClick={(event) => {
            _sell(1);
          }}
          disabled={!props.data.enable_sell}
        >
          {t("Sell")}
        </button>
        <InputNumber
          onChange={_inputHandler}
          className="ItemCount"
          type="number"
          pattern="\d*"
          defaultValue={0}
          controls={false}
          min={0}
          value={props.data.buy_count}
        />
        <button
          className={
            `ItemBuy${props.data.enable_buy ? "Enable" : "Disable"}` +
            " ItemBuy"
          }
          onClick={(event) => {
            _buy(1);
          }}
          disabled={!props.data.enable_buy}
        >
          {t("Buy")}
        </button>
      </div>
    </div>
  );
}
