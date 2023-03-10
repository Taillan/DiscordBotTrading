const {
  InverseClient,
  LinearClient,
  InverseFuturesClient,
  SpotClientV3,
  UnifiedMarginClient,
  USDCOptionClient,
  USDCPerpetualClient,
  AccountAssetClient,
  CopyTradingClient,
  RestClientV5,
} = require("bybit-api");

var fs = require("fs");

const API_KEY = fs.readFileSync("../.api_key").toString("utf-8");
const API_SECRET = fs.readFileSync("../.api_secret", "utf8");
const useTestnet = false;

const client = new RestClientV5({
  key: API_KEY,
  secret: API_SECRET,
  testnet: useTestnet,
  enable_time_sync: 1,
});

function getAllCountBallanceContract() {
  return client
    .getAllCoinsBalance({
      accountType: "CONTRACT",
    })
    .then((result) => {
      return JSON.stringify(result.result);
    })
    .catch((err) => {
      return err;
    });
}

function getCountBallanceContract(
  AccoutnType,
  Coin,
  withBonus = undefined,
  memberId = undefined
) {
  return client
    .getCoinBalance({
      accountType: AccoutnType,
      coin: Coin,
      withBonus: withBonus,
      memberId: memberId,
    })
    .then((result) => {
      return JSON.stringify(result.result);
    })
    .catch((err) => {
      console.error(err);
    });
}

function getOrders(
  AccountCategory,
  symbol = undefined,
  baseCoin = undefined,
  settleCoin = undefined,
  orderLinkId = undefined,
  openOnly = undefined,
  orderFilter = undefined,
  limit = undefined,
  cursor = undefined
) {
  return client
    .getActiveOrders({
      category: AccountCategory,
      symbol: symbol,
      baseCoin: baseCoin,
      settleCoin: settleCoin,
      orderId: orderId,
      orderLinkId: orderLinkId,
      openOnly: openOnly,
      orderFilter: orderFilter,
      limit: limit,
      cursor: cursor,
    })
    .then((result) => {
      return JSON.stringify(result.result);
    })
    .catch((err) => {
      console.error(err);
    });
}

function getPosition(
  AccountCategory,
  symbol = undefined,
  baseCoin = undefined,
  settleCoin = undefined,
  limit = undefined,
  cursor = undefined
) {
  return client
    .getPositionInfo({
      category: AccountCategory,
      symbol: symbol,
      baseCoin: baseCoin,
      settleCoin: settleCoin,
      limit: limit,
      cursor: cursor,
    })
    .then((result) => {
      return JSON.stringify(result.result);
    })
    .catch((err) => {
      console.error(err);
    });
}

function getExecution(
  AccountCategory,
  symbol = undefined,
  baseCoin = undefined,
  orderId = undefined,
  orderLinkId = undefined,
  startTime = undefined,
  endTime = undefined,
  execType = undefined,
  limit = undefined,
  cursor = undefined
) {
  return client
    .getExecutionList({
      category: AccountCategory,
      symbol: symbol,
      orderId: orderId,
      orderLinkId: orderLinkId,
      baseCoin: baseCoin,
      startTime: startTime,
      endTime: endTime,
      execType: execType,
      limit: limit,
      cursor: cursor,
    })
    .then((result) => {
      return JSON.stringify(result.result);
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = {
  getAllCountBallanceContract,
  getCountBallanceContract,
  getOrders,
  getPosition,
  getExecution,
};
