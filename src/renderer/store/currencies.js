export default {
  algos: {
    bitcore: {
      miners: {
        gpu: ['ccminer']
      }
    },
    blake2s: {
      miners: {
        gpu: ['ccminer']
      }
    },
    blakecoin: {
      miners: {
        gpu: ['ccminer']
      }
    },
    c11: {
      miners: {
        gpu: ['ccminer']
      }
    },
    daggerhashimoto: {
      miners: {
        gpu: ['excavator']
      }
    },
    decred: {
      miners: {
        gpu: ['ccminer']
      }
    },
    equihash: {
      miners: {
        gpu: ['ccminer', 'EWBF']
      }
    },
    groestl: {
      miners: {
        gpu: ['ccminer']
      }
    },
    hmq1725: {
      miners: {
        gpu: ['ccminer']
      }
    },
    jha: {
      miners: {
        gpu: ['ccminer']
      }
    },
    keccak: {
      miners: {
        gpu: ['ccminer']
      }
    },
    lbry: {
      miners: {
        gpu: ['ccminer']
      }
    },
    lyra2v2: {
      miners: {
        gpu: ['ccminer']
      }
    },
    m7m: {
      miners: {
        gpu: ['ccminer']
      }
    },
    'myr-gr': {
      miners: {
        gpu: ['ccminer']
      }
    },
    neoscrypt: {
      miners: {
        gpu: ['ccminer']
      }
    },
    nist5: {
      miners: {
        gpu: ['ccminer']
      }
    },
    pascal: {
      miners: {
        gpu: ['ccminer']
      }
    },
    quark: {
      miners: {
        gpu: ['ccminer']
      }
    },
    qubit: {
      miners: {
        gpu: ['ccminer']
      }
    },
    scrypt: {
      miners: {
        asic: []
      }
    },
    sha256: {
      miners: {
        asic: []
      }
    },
    sia: {
      miners: {
        gpu: ['ccminer']
      }
    },
    sib: {
      miners: {
        gpu: ['ccminer']
      }
    },
    skein: {
      miners: {
        gpu: ['ccminer']
      }
    },
    skunk: {
      miners: {
        gpu: ['ccminer']
      }
    },
    timetravel: {
      miners: {
        gpu: ['ccminer']
      }
    },
    tribus: {
      miners: {
        gpu: ['ccminer']
      }
    },
    veltor: {
      miners: {
        gpu: ['ccminer']
      }
    },
    x11: {
      miners: {
        asic: []
      }
    },
    x11evo: {
      miners: {
        gpu: ['ccminer']
      }
    },
    x13: {
      miners: {
        gpu: ['ccminer']
      }
    },
    x14: {
      miners: {
        gpu: ['ccminer']
      }
    },
    x15: {
      miners: {
        gpu: ['ccminer']
      }
    },
    x17: {
      miners: {
        gpu: ['ccminer']
      }
    },
    xevan: {
      miners: {
        cpu: []
      }
    },
    yescrypt: {
      miners: {
        cpu: []
      }
    }
  },
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
