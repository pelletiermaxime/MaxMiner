export default {
  coins: {
    BTX: {
      algo: 'bitcore',
      coinMarketCapName: 'bitcore',
      default_hash_rate_mhs: 30,
      cryptoid: 'btx'
    },
    DNR: {
      algo: 'tribus',
      coinMarketCapName: 'denarius-dnr',
      default_hash_rate_mhs: 100.0,
      whattomineID: 187,
      cryptoid: 'dnr'
    },
    ETH: {
      algo: 'daggerhashimoto',
      coinMarketCapName: 'ethereum',
      default_hash_rate_mhs: 30.0,
      whattomineID: 151
    },
    LBC: {
      algo: 'lbry',
      coinMarketCapName: 'library-credit',
      default_hash_rate_mhs: 500.0,
      whattomineID: 164
    },
    SIGT: {
      algo: 'skunk',
      coinMarketCapName: 'signatum',
      default_hash_rate_mhs: 50.0,
      whattomineID: 191
    },
    VTC: {
      algo: 'lyra2v2',
      coinMarketCapName: 'vertcoin',
      default_hash_rate_mhs: 50.0,
      whattomineID: 5
    },
    XLR: {
      algo: 'nist5',
      coinMarketCapName: 'solaris',
      default_hash_rate_mhs: 100.0,
      whattomineID: 179
    },
    ZEC: {
      algo: 'equihash',
      coinMarketCapName: 'zcash',
      default_hash_rate_mhs: 1000.0,
      whattomineID: 166
    }
  },
  names: [
    {
      label: 'Bitcore',
      value: 'BTX'
    },
    {
      label: 'Denarius',
      value: 'DNR'
    },
    {
      label: 'Ethereum',
      value: 'ETH'
    },
    {
      label: 'LBRY Credits',
      value: 'LBC'
    },
    {
      label: 'Signatum',
      value: 'SIGT'
    },
    {
      label: 'Solaris',
      value: 'XLR'
    },
    {
      label: 'Vertcoin',
      value: 'VTC'
    },
    {
      label: 'Zcash',
      value: 'ZEC'
    }
  ]
}
