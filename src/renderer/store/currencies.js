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
      name: 'Bitcore',
      whattomineID: 202
    },
    BWK: {
      algo: 'nist5',
      iquidus: 'http://bwk.explorerz.top:3011',
      name: 'Bulwark',
      yiimp_explorer: 'https://umine.org/explorer/graph?id=2001'
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
    DSR: {
      algo: 'neoscrypt',
      balance_path: 'data',
      balance_url: 'http://desire.thecryptochat.net/api_fetch.php?method=getbalance&address=$addr',
      coinMarketCapName: 'desire',
      default_hash_rate_mhs: 2,
      masternode: true,
      name: 'Desire',
      yiimp_explorer: 'https://pool.unimining.net/explorer/graph?id=1935'
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
      balance_url: 'http://explorer.h.cash/api/getbalance/$addr',
      coinMarketCapName: 'hshare',
      default_hash_rate_mhs: 20.0,
      name: 'Hshare'
    },
    INN: {
      algo: 'neoscrypt',
      block_reward: 10,
      coinMarketCapName: 'innova',
      default_hash_rate_mhs: 2.0,
      iquidus: 'http://explorer.innovacoin.info',
      masternode: true,
      name: 'Innova',
      yiimp_explorer: 'https://altminer.net/explorer/graph?id=1964'
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
    LUX: {
      algo: 'phi',
      block_reward: 10,
      coinMarketCapName: 'luxcoin',
      default_hash_rate_mhs: 50,
      iquidus: 'https://explorer.luxcoin.xyz',
      name: 'LUXCoin',
      yiimp_explorer: 'http://yiimp.eu/explorer/graph?id=2366'
    },
    MONA: {
      algo: 'lyra2v2',
      coinMarketCapName: 'monacoin',
      default_hash_rate_mhs: 50.0,
      name: 'MonaCoin',
      whattomineID: 148
    },
    ONX: {
      algo: 'x11',
      coinMarketCapName: 'onix',
      default_hash_rate_mhs: 15000,
      iquidus: 'http://explorer.onixcoin.com',
      name: 'Onix',
      whattomineID: 194,
      yiimp_explorer: 'https://www.zpool.ca/explorer/graph?id=2351'
    },
    SIGT: {
      algo: 'skunk',
      coinMarketCapName: 'signatum',
      name: 'Signatum',
      mineable: false
    },
    SMART: {
      algo: 'keccak',
      coinMarketCapName: 'smartcash',
      default_hash_rate_mhs: 1000,
      name: 'SmartCash',
      whattomineID: 197
    },
    TZC: {
      algo: 'neoscrypt',
      iquidus: 'https://explorer.trezarcoin.com/',
      coinMarketCapName: 'trezarcoin',
      default_hash_rate_mhs: 2,
      name: 'TrezarCoin',
      whattomineID: 215,
      yiimp_explorer: 'https://altminer.net/explorer/graph?id=1858'
    },
    VIVO: {
      algo: 'neoscrypt',
      coinMarketCapName: 'vivo',
      default_hash_rate_mhs: 2,
      name: 'VIVO',
      whattomineID: 200
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
      yiimp_explorer: 'https://umine.org/explorer/graph?id=1916',
      whattomineID: 179
    },
    XZC: {
      algo: 'lyra2z',
      cryptoid: 'xzc',
      coinMarketCapName: 'zcoin',
      default_hash_rate_mhs: 2,
      name: 'ZCoin',
      whattomineID: 175
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
