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
  } = require('bybit-api');

  var fs = require("fs");

  const API_KEY = fs.readFileSync("../.api_key").toString('utf-8');
  const API_SECRET = fs.readFileSync("../.api_secret", "utf8");;
  const useTestnet = false;
  
  const client = new RestClientV5({
      key: API_KEY,
      secret: API_SECRET,
      testnet: useTestnet,
      enable_time_sync: 1,
      },
    );
  
  const getAllCountBallanceContract = () => {
    client.getAllCoinsBalance({
      accountType: 'CONTRACT'})
    .then(result => {
      return result.result;
    })
    .catch(err => {
      return err;
    });
  }

module.export = {getAllCountBallanceContract};