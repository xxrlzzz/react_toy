export default function formatMoney(money) {
  let formatted = "";
  if (typeof money == "string") {
    let i = money.length - 3;
    for (; i >= 0; i -= 3) {
      formatted = money.substr(i, 3) + "," + formatted;
    }
    if (i < 0 && i !== -3) {
      formatted = money.substr(0, i + 3) + "," + formatted;
    }
  } else if (typeof money == "number") {
    while (money !== 0) {
      let subMoney = money % 1000;
      if (money >= 1000) {
        if (subMoney < 10) {
          subMoney = "00" + subMoney;
        } else if (subMoney < 100) {
          subMoney = "0" + subMoney;
        }
      }
      formatted = subMoney + "," + formatted;
      money = Math.floor(money / 1000);
    }
  }
  formatted = formatted.substr(0, formatted.length - 1);

  return formatted;
}
