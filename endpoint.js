const endpoint = {};

module.exports = {
     TEST_NET : "https://api-testnet.bybit.com",
     GET_BALLANCE_URL : TEST_NET + `/v5/account/wallet-balance?accountType=${accountType}&coin=${coin}`
};


module.exports.endpoint = endpoint;