export default {
  coins: {
    BCC: {
      algo: 'scrypt',
      coinMarketCapName: 'bitconnect',
      default_hash_rate_mhs: 100,
      cryptoid: 'bcc',
      name: 'BitConnect'
    },
    BCH: {
      algo: 'sha256',
      coinMarketCapName: 'bitcoin-cash',
      default_hash_rate_mhs: 14000000,
      name: 'Bitcoin Cash',
      whattomineID: 193
    },
    BTC: {
      algo: 'sha256',
      balance_url: 'https://blockexplorer.com/api/addr/$addr/balance',
      coinMarketCapName: 'bitcoin',
      default_hash_rate_mhs: 14000000,
      name: 'Bitcoin',
      whattomineID: 1
    },
    BTX: {
      algo: 'bitcore',
      coinMarketCapName: 'bitcore',
      balance_url: 'http://51.15.78.208:3001/ext/getbalance/$addr',
      default_hash_rate_mhs: 30,
      cryptoid: 'btx',
      name: 'Bitcore'
    },
    DNR: {
      algo: 'tribus',
      balance_url: 'http://denarius.name/ext/getbalance/$addr',
      coinMarketCapName: 'denarius-dnr',
      cryptoid: 'dnr',
      default_hash_rate_mhs: 100.0,
      name: 'Denarius',
      whattomineID: 187
    },
    DASH: {
      algo: 'x11',
      coinMarketCapName: 'dash',
      default_hash_rate_mhs: 15000,
      name: 'Dash',
      whattomineID: 34
    },
    ETH: {
      algo: 'daggerhashimoto',
      balance_path: 'ETH.balance',
      balance_url: 'https://api.ethplorer.io/getAddressInfo/$addr?apiKey=freekey',
      coinMarketCapName: 'ethereum',
      default_hash_rate_mhs: 30.0,
      name: 'Ethereum',
      whattomineID: 151
    },
    LBC: {
      algo: 'lbry',
      coinMarketCapName: 'library-credit',
      default_hash_rate_mhs: 500.0,
      name: 'LBRY Credits',
      whattomineID: 164
    },
    LTC: {
      algo: 'scrypt',
      balance_path: 'data.confirmed_balance',
      balance_url: 'https://chain.so/api/v2/get_address_balance/LTC/$addr',
      coinMarketCapName: 'litecoin',
      default_hash_rate_mhs: 100.0,
      name: 'Litecoin',
      whattomineID: 4
    },
    SIGT: {
      algo: 'skunk',
      coinMarketCapName: 'signatum',
      default_hash_rate_mhs: 50.0,
      name: 'Signatum',
      whattomineID: 191
    },
    VTC: {
      algo: 'lyra2v2',
      coinMarketCapName: 'vertcoin',
      default_hash_rate_mhs: 50.0,
      name: 'Vertcoin',
      whattomineID: 5
    },
    XLR: {
      algo: 'nist5',
      coinMarketCapName: 'solaris',
      default_hash_rate_mhs: 100.0,
      name: 'Solaris',
      whattomineID: 179
    },
    ZEC: {
      algo: 'equihash',
      coinMarketCapName: 'zcash',
      default_hash_rate_mhs: 1000.0,
      name: 'Zcash',
      whattomineID: 166
    }
  }
}
