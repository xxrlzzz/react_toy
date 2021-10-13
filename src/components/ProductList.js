import React from "react";
import StickyHeader from "./StickyHeader";
import ProductCell from "./ProductCell";
import "./ProductList.css";
import formatMoney from "../common/moneyFormatter";
import AnimatedNumber from "react-animated-number";
import { withTranslation } from "react-i18next";

class ProductList extends React.PureComponent {
  static product_data = [
    ["Big Mac", 2],
    ["Flip Flops", 3],
    ["Coca-Cola Pack", 5],
    ["Movie Ticket", 12],
    ["Book", 15],
    ["Lobster Dinner", 45],
    ["Video Game", 60],
    ["Amazon Echo", 99],
    ["Year of Netflix", 100],
    ["Air Jordans", 125],
    ["Airpods", 199],
    ["Gaming Console", 299],
    ["Drone", 350],
    ["Smartphone", 699],
    ["Bike", 800],
    ["Kitten", 1500],
    ["Puppy", 1500],
    ["Auto Rickshaw", 2300],
    ["Horse", 2500],
    ["Acre of Farmland", 3e3],
    ["Designer Handbag", 5500],
    ["Hot Tub", 6e3],
    ["Luxury Wine", 7e3],
    ["Diamond Ring", 1e4],
    ["Jet Ski", 12e3],
    ["Rolex", 15e3],
    ["Ford F-150", 3e4],
    ["Tesla", 75e3],
    ["Monster Truck", 15e4],
    ["Ferrari", 25e4],
    ["Single Family Home", 3e5],
    ["Gold Bar", 7e5],
    ["McDonalds Franchise", 15e5],
    ["Superbowl Ad", 525e4],
    ["Yacht", 75e5],
    ["M1 Abrams", 8e6],
    ["Formula 1 Car", 15e6],
    ["Apache Helicopter", 31e6],
    ["Mansion", 45e6],
    ["Make a Movie", 1e8],
    ["Boeing 747", 148e6],
    ["Mona Lisa", 78e7, 1],
    ["Skyscraper", 85e7],
    ["Cruise Ship", 93e7],
    ["NBA Team", 212e7, 30],
  ];

  constructor(props) {
    super(props);
    let data_list = ProductList.product_data.map((value, index) => {
      return {
        image_src: this._getImageUrl(String(value[0])),
        product_cost: value[1],
        product_name: value[0],
        inventory: value[2] ? value[2] : Number.MAX_SAFE_INTEGER,
        index: index,
        enable_buy: true,
        enable_sell: false,
        buy_count: 0,
      };
    });
    this.state = {
      column_count: 3,
      data_list: data_list,
      current_money: 100000000000,
    };

    this.TrySpend = this.TrySpend.bind(this);
    this.Sell = this.Sell.bind(this);
    this._updateEnableBuy = this._updateEnableBuy.bind(this);
    this._estimate = this._estimate.bind(this);
  }

  _getImageUrl(product) {
    product = product.replaceAll(" ", "-");
    return "https://neal.fun/spend/images/" + product.toLowerCase() + ".jpg";
  }

  Sell(index, count) {
    const data_list = this.state.data_list;
    if (data_list[index].buy_count < count) {
      return;
    }
    data_list[index].buy_count -= count;
    const current_money =
      this.state.current_money + data_list[index].product_cost;
    this._updateEnableBuy(data_list, current_money);
    this.setState({
      current_money: this.state.current_money + data_list[index].product_cost,
      data_list: data_list,
    });
  }

  TrySpend(index, count) {
    const data_list = this.state.data_list;
    count = Math.min(
      data_list[index].inventory - data_list[index].buy_count,
      Math.floor(this.state.current_money / data_list[index].product_cost),
      count
    );

    const money = data_list[index].product_cost * count;
    const current_money = this.state.current_money - money;
    if (current_money >= 0) {
      data_list[index].buy_count += count;
      this._updateEnableBuy(data_list, current_money);
      this.setState({
        current_money: current_money,
        data_list: data_list,
      });
      return true;
    }
    return false;
  }

  _updateEnableBuy(data_list, current_money) {
    return data_list.map((item) => {
      item.enable_buy =
        item.product_cost <= current_money && item.buy_count < item.inventory;
      item.enable_sell = item.buy_count > 0;
      return item;
    });
  }

  _estimate(money) {
    const kBillion = 1000000000;
    const kMillion = 1000000;
    const kThousand = 1000;
    if (money >= kBillion) {
      let dived = money / kBillion;
      let dived_str;
      if (money % kBillion === 0) {
        dived_str = dived.toFixed(0);
      } else {
        dived_str = dived.toFixed(1);
      }
      return dived_str + "b";
    } else if (money >= kMillion) {
      let dived = money / kMillion;
      let dived_str;
      if (money % kMillion === 0) {
        dived_str = dived.toFixed(0);
      } else {
        dived_str = dived.toFixed(1);
      }
      return dived_str + "m";
    } else if (money >= kThousand) {
      let dived = money / kThousand;
      let dived_str;
      if (money % kThousand === 0) {
        dived_str = dived.toFixed(0);
      } else {
        dived_str = dived.toFixed(1);
      }
      return dived_str + "k";
    } else {
      return money;
    }
  }

  renderList() {
    return (
      <div className="Products">
        {this.state.data_list.map((item, index) => {
          return (
            <ProductCell
              data={item}
              Sell={this.Sell}
              TrySpend={this.TrySpend}
              current_money={this.state.current_money}
              enable_buy={this.state.current_money >= item.product_cost}
            />
          );
        })}
      </div>
    );
  }

  renderReceipt() {
    let total_cost = 0;

    const view = (
      <div className="Receipt">
        <p
          style={{
            fontSize: "29pt",
            paddingTop: "15px 15px 25px",
            fontWeight: 700,
          }}
        >
          {this.props.t("Your Receipt")}
        </p>
        {this.state.data_list
          .filter((item) => {
            return item.buy_count > 0;
          })
          .map((item) => {
            total_cost += item.buy_count * item.product_cost;
            return (
              <div className="ReceiptItem">
                <span style={{ textAlign: "left", textOverflow: "ellipsis" }}>
                  {this.props.t(item.product_name)}
                </span>
                <span style={{ textAlign: "left" }}>x{item.buy_count}</span>
                <span className="ReceiptMoney">
                  ${this._estimate(item.product_cost)}
                </span>
              </div>
            );
          })}
        <div className="ReceiptTotal">
          {this.props.t("Total")}{" "}
          <span className="ReceiptMoney">${formatMoney(total_cost)}</span>
        </div>
      </div>
    );

    if (total_cost > 0) {
      return view;
    } else {
      return null;
    }
  }

  render() {
    let { current_money } = this.state;
    return (
      <div>
        <StickyHeader>
          $
          <AnimatedNumber
            component="text"
            style={{
              "font-size": "32px",
            }}
            value={current_money}
            formatValue={(n) => formatMoney(n.toFixed(0))}
          ></AnimatedNumber>
        </StickyHeader>
        {this.renderList()}
        {this.renderReceipt()}
      </div>
    );
  }
}

export default withTranslation()(ProductList);
