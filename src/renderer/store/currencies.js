export default {
  coins: {
    ASP: {
      algo: 'x11',
      balance_path: 'balance',
      balance_url: 'http://45.77.183.30:3000/api/addr/AP1XbScHM1zhi7Un4r5w7hd67BRu2MFEWC/?noTxList=1',
      block_reward: 20,
      name: 'Aspectcoin',
      yiimp_explorer: 'https://miningpool.shop/explorer/graph?id=2016'
    },
    ATB: {
      balance_path: 'balance',
      balance_url: 'https://explorer.atbcoin.com/atb-insight-api/addr/$addr/?noTxList=1',
      coinMarketCapName: 'atbcoin',
      name: 'ATBCoin',
      mineable: false
    },
    B2X: {
      algo: 'x11',
      block_reward: 12.5,
      coinMarketCapName: 'segwit2x',
      name: 'SegWit2x',
      yiimp_explorer: 'http://pool.coin-miners.info/explorer/graph?id=4268'
    },
    BCC: {
      algo: 'scrypt',
      coinMarketCapName: 'bitconnect',
      cryptoid: 'bcc',
      name: 'BitConnect',
      mineable: false
    },
    BCH: {
      algo: 'sha256',
      coinMarketCapName: 'bitcoin-cash',
      name: 'Bitcoin Cash',
      whattomineID: 193
    },
    BSD: {
      algo: 'xevan',
      coinMarketCapName: 'bitsend',
      cryptoid: 'bsd',
      name: 'BitSend',
      whattomineID: 201
    },
    BTC: {
      algo: 'sha256',
      balance_url: 'https://blockexplorer.com/api/addr/$addr/balance',
      coinMarketCapName: 'bitcoin',
      name: 'Bitcoin',
      whattomineID: 1
    },
    BTX: {
      algo: 'bitcore',
      coinMarketCapName: 'bitcore',
      cryptoid: 'btx',
      name: 'Bitcore',
      whattomineID: 202
    },
    BWK: {
      algo: 'nist5',
      coinMarketCapName: 'bulwark',
      iquidus: 'http://bwk.explorerz.top:3011',
      name: 'Bulwark',
      yiimp_explorer: 'https://umine.org/explorer/graph?id=2001'
    },
    CRC: {
      algo: 'neoscrypt',
      block_reward: 10,
      coinMarketCapName: 'crowdcoin',
      name: 'CrowdCoin',
      iquidus: 'http://crowdcoin.site:3001',
      yiimp_explorer: 'https://www.unimining.net/explorer/graph?id=2012'
    },
    DNR: {
      algo: 'tribus',
      coinMarketCapName: 'denarius-dnr',
      cryptoid: 'dnr',
      name: 'Denarius',
      whattomineID: 187
    },
    DASH: {
      algo: 'x11',
      coinMarketCapName: 'dash',
      cryptoid: 'dash',
      name: 'Dash',
      whattomineID: 34
    },
    DSR: {
      algo: 'neoscrypt',
      balance_path: 'data',
      balance_url: 'http://desire.thecryptochat.net/api_fetch.php?method=getbalance&address=$addr',
      coinMarketCapName: 'desire',
      masternode: true,
      name: 'Desire',
      yiimp_explorer: 'https://pool.unimining.net/explorer/graph?id=1935'
    },
    ENT: {
      algo: 'x11',
      coinMarketCapName: 'eternity',
      cryptoid: 'ent',
      name: 'Eternity'
    },
    ETH: {
      algo: 'daggerhashimoto',
      balance_path: 'ETH.balance',
      balance_url: 'https://api.ethplorer.io/getAddressInfo/$addr?apiKey=freekey',
      coinMarketCapName: 'ethereum',
      name: 'Ethereum',
      whattomineID: 151
    },
    GBX: {
      algo: 'neoscrypt',
      block_reward: 7.5,
      coinMarketCapName: 'gobyte',
      iquidus: 'https://gobyte.ezmine.io',
      masternode: true,
      name: 'GoByte',
      yiimp_explorer: 'https://www.unimining.net/explorer/graph?id=1969'
    },
    HBC: {
      algo: 'x11',
      balance_path: 'data',
      block_reward: 10,
      balance_url: 'http://homeblock.thecryptochat.net/api_fetch.php?method=getbalance&address=$addr',
      coinMarketCapName: 'homeblockcoin',
      name: 'HomeBlockCoin',
      yiimp_explorer: 'https://pool.nosekefik.com/explorer/graph?id=2007'
    },
    HSR: {
      algo: 'hsr',
      balance_url: 'http://explorer.h.cash/api/getbalance/$addr',
      coinMarketCapName: 'hshare',
      name: 'Hshare'
    },
    INN: {
      algo: 'neoscrypt',
      block_reward: 10,
      coinMarketCapName: 'innova',
      iquidus: 'http://explorer.innovacoin.info',
      masternode: true,
      name: 'Innova',
      yiimp_explorer: 'https://altminer.net/explorer/graph?id=1964'
    },
    ITZ: {
      algo: 'c11',
      coinMarketCapName: 'interzone',
      iquidus: 'http://interzone.space:8080',
      masternode: true,
      name: 'Interzone',
      yiimp_explorer: 'https://umine.org/explorer/graph?id=1868'
    },
    LBC: {
      algo: 'lbry',
      coinMarketCapName: 'library-credit',
      name: 'LBRY Credits',
      whattomineID: 164
    },
    LIZ: {
      algo: 'skein',
      block_reward: 12.5,
      iquidus: 'https://lizusexplorer.zzori.com',
      name: 'Lizus',
      yiimp_explorer: 'https://protopool.net/explorer/graph?id=1886'
    },
    LTC: {
      algo: 'scrypt',
      balance_path: 'data.confirmed_balance',
      balance_url: 'https://chain.so/api/v2/get_address_balance/LTC/$addr',
      coinMarketCapName: 'litecoin',
      name: 'Litecoin',
      whattomineID: 4
    },
    LUX: {
      algo: 'phi',
      block_reward: 10,
      coinMarketCapName: 'luxcoin',
      iquidus: 'https://explorer.luxcoin.xyz',
      name: 'LUXCoin',
      yiimp_explorer: 'http://yiimp.eu/explorer/graph?id=2366'
    },
    MAG: {
      algo: 'x11',
      block_reward: 100,
      coinMarketCapName: 'magnet',
      iquidus: 'http://35.202.4.153:3001',
      name: 'Magnet',
      yiimp_explorer: 'https://miningpool.shop/explorer/graph?id=1978'
    },
    MONA: {
      algo: 'lyra2v2',
      coinMarketCapName: 'monacoin',
      name: 'MonaCoin',
      whattomineID: 148
    },
    NMS: {
      algo: 'skein',
      coinMarketCapName: 'numus',
      iquidus: 'https://numus.info',
      mineable: false,
      name: 'Numus',
      yiimp_explorer: 'http://hashfaster.com/explorer/graph?id=1973'
    },
    ONX: {
      algo: 'x11',
      coinMarketCapName: 'onix',
      iquidus: 'http://explorer.onixcoin.com',
      name: 'Onix',
      whattomineID: 194,
      yiimp_explorer: 'https://www.zpool.ca/explorer/graph?id=2351'
    },
    PCOIN: {
      algo: 'x11',
      block_reward: 22,
      coinMarketCapName: 'pioneer-coin',
      iquidus: 'https://www.pioneerchain.com',
      name: 'Pioneer Coin',
      yiimp_explorer: 'http://antminepool.com/explorer/graph?id=1937'
    },
    RAP: {
      algo: 'neoscrypt',
      block_reward: 7,
      iquidus: 'http://explorer.our-rapture.com',
      name: 'Rapture',
      yiimp_explorer: 'https://arcpool.com/explorer/graph?id=2033'
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
      name: 'SmartCash',
      whattomineID: 197
    },
    SPK: {
      algo: 'neoscrypt',
      block_reward: 9,
      name: 'SPARKS',
      iquidus: 'http://sparks.lchain.cc',
      yiimp_explorer: 'http://bsod.pw/explorer/graph?id=1995'
    },
    TUN: {
      algo: 'neoscrypt',
      block_reward: 5,
      name: 'Tune',
      yiimp_explorer: 'https://arcpool.com/explorer/graph?id=1997'
    },
    TZC: {
      algo: 'neoscrypt',
      iquidus: 'https://explorer.trezarcoin.com/',
      coinMarketCapName: 'trezarcoin',
      name: 'TrezarCoin',
      whattomineID: 215,
      yiimp_explorer: 'https://altminer.net/explorer/graph?id=1858'
    },
    VIVO: {
      algo: 'neoscrypt',
      coinMarketCapName: 'vivo',
      name: 'VIVO',
      whattomineID: 200
    },
    XVG: {
      algo: 'x17',
      coinMarketCapName: 'verge',
      iquidus: 'https://verge-blockchain.info',
      name: 'XVG-X17',
      yiimp_explorer: 'http://yiimp.eu/explorer/graph?id=562'
    },
    VLT: {
      algo: 'veltor',
      coinMarketCapName: 'veltor',
      name: 'Veltor'
    },
    VSX: {
      algo: 'xevan',
      block_reward: 150,
      coinMarketCapName: 'vsync-vsx',
      name: 'Vsync',
      yiimp_explorer: 'https://altminer.net/explorer/graph?id=1851'
    },
    VTC: {
      algo: 'lyra2v2',
      coinMarketCapName: 'vertcoin',
      name: 'Vertcoin',
      whattomineID: 5
    },
    XLR: {
      algo: 'xevan',
      iquidus: 'https://solaris.blockexplorer.pro',
      coinMarketCapName: 'solaris',
      masternode: true,
      name: 'Solaris',
      yiimp_explorer: 'https://umine.org/explorer/graph?id=1916',
      whattomineID: 179
    },
    XSH: {
      algo: 'x17',
      block_reward: 250,
      coinMarketCapName: 'shield-xsh',
      iquidus: 'http://188.226.178.216:3001',
      name: 'SHIELD'
    },
    XYLO: {
      algo: 'scrypt',
      coinMarketCapName: 'xylo',
      iquidus: 'http://xylo.unyun.cn',
      name: 'XYLO'
    },
    XZC: {
      algo: 'lyra2z',
      cryptoid: 'xzc',
      coinMarketCapName: 'zcoin',
      name: 'ZCoin',
      whattomineID: 175
    },
    ZEC: {
      algo: 'equihash',
      coinMarketCapName: 'zcash',
      name: 'Zcash',
      whattomineID: 166
    }
  }
}
