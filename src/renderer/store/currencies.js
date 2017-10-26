export default {
  coins: {
    ATB: {
      balance_path: 'balance',
      balance_url: 'https://explorer.atbcoin.com/atb-insight-api/addr/$addr/?noTxList=1',
      coinMarketCapName: 'atbcoin',
      name: 'ATBCoin',
      mineable: false
    },
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
    BSD: {
      algo: 'xevan',
      coinMarketCapName: 'bitsend',
      cryptoid: 'bsd',
      default_hash_rate_mhs: 5,
      name: 'BitSend',
      whattomineID: 201
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
      default_hash_rate_mhs: 30,
      cryptoid: 'btx',
      name: 'Bitcore'
    },
    DNR: {
      algo: 'tribus',
      coinMarketCapName: 'denarius-dnr',
      cryptoid: 'dnr',
      default_hash_rate_mhs: 100.0,
      name: 'Denarius',
      whattomineID: 187
    },
    DASH: {
      algo: 'x11',
      coinMarketCapName: 'dash',
      cryptoid: 'dash',
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
    HSR: {
      algo: 'hsr',
      coinMarketCapName: 'hshare',
      default_hash_rate_mhs: 20.0,
      iquidus: 'http://hshare-explorer.h.cash',
      name: 'Hshare'
    },
    ITZ: {
      algo: 'c11',
      coinMarketCapName: 'interzone',
      default_hash_rate_mhs: 20.0,
      iquidus: 'http://interzone.space:8080',
      masternode: true,
      name: 'Interzone',
      yiimp_explorer: 'https://umine.org/explorer/graph?id=1868'
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
    MONA: {
      algo: 'lyra2v2',
      coinMarketCapName: 'monacoin',
      default_hash_rate_mhs: 50.0,
      name: 'MonaCoin',
      whattomineID: 148
    },
    SIGT: {
      algo: 'skunk',
      iquidus: 'http://explorer.signatum.download',
      coinMarketCapName: 'signatum',
      name: 'Signatum',
      mineable: false
    },
    SMART: {
      algo: 'keccak',
      iquidus: 'https://explorer.smartcash.cc',
      coinMarketCapName: 'smartcash',
      default_hash_rate_mhs: 1000,
      name: 'SmartCash',
      whattomineID: 197
    },
    VLT: {
      algo: 'veltor',
      coinMarketCapName: 'veltor',
      default_hash_rate_mhs: 50,
      name: 'Veltor'
    },
    VTC: {
      algo: 'lyra2v2',
      coinMarketCapName: 'vertcoin',
      default_hash_rate_mhs: 50.0,
      name: 'Vertcoin',
      whattomineID: 5
    },
    XLR: {
      algo: 'xevan',
      iquidus: 'https://solaris.blockexplorer.pro',
      coinMarketCapName: 'solaris',
      default_hash_rate_mhs: 10.0,
      masternode: true,
      name: 'Solaris',
      yiimp_explorer: 'https://umine.org/explorer/graph?id=1916'
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
