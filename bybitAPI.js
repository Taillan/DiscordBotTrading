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
    testnet: useTestnet
  },
    // requestLibraryOptions
  );
  
  // For public-only API calls, simply don't provide a key & secret or set them to undefined
  // const client = new RestClientV5({});
  // 'CONTRACT' | 'SPOT' | 'INVESTMENT' | 'OPTION' | 'UNIFIED' | 'FUND'
  client.getWalletBalance({accountType:'CONTRACT',coin:'USDT'})
    .then(result => {
      console.log("getWalletBalance result: ", result.result.coin);
    })
    .catch(err => {
      console.error("getWalletBalance error: ", err);
    });