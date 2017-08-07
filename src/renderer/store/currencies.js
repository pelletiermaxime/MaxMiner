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
    'DNR': {
      algo: 'tribus',
      coinMarketCapName: 'denarius-dnr',
      default_hash_rate_mhs: 100.0,
      whattomineID: 187
    },
    'SIGT': {
      algo: 'skunk',
      coinMarketCapName: 'signatum',
      default_hash_rate_mhs: 50.0,
      whattomineID: 191
    }
  },
  names: [
    {
      label: 'Denarius',
      value: 'DNR'
    },
    {
      label: 'Signatum',
      value: 'SIGT'
    }
  ]
}
