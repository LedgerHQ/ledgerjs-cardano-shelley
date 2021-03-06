import { AddressTypeNibble, utils } from "../../../src/Ada";
import { str_to_path } from "../../test_utils";

export const inputs = {
  utxoByron: {
    txHashHex:
      "1af8fa0b754ff99253d983894e63a2b09cbb56c833ba18c3384210163f63dcfc",
    outputIndex: 0,
    path: str_to_path("44'/1815'/0'/0/0"),
  },
  utxoShelley: {
    txHashHex:
      "3b40265111d8bb3c3c608d95b3a0bf83461ace32d79336579a1939b3aad1c0b7",
    outputIndex: 0,
    path: str_to_path("1852'/1815'/0'/0/0"),
  },
  utxoNonReasonable: {
    txHashHex:
      "3b40265111d8bb3c3c608d95b3a0bf83461ace32d79336579a1939b3aad1c0b7",
    outputIndex: 0,
    path: str_to_path("1852'/1815'/456'/0/0"),
  },
};

export const outputs = {
  externalByronMainnet: {
    amountStr: "3003112",
    addressHex: utils.buf_to_hex(
      utils.base58_decode(
        "Ae2tdPwUPEZCanmBz5g2GEwFqKTKpNJcGYPKfDxoNeKZ8bRHr8366kseiK2"
      )
    ),
  },
  externalByronDaedalusMainnet: {
    amountStr: "3003112",
    addressHex: utils.buf_to_hex(
      utils.base58_decode(
        "DdzFFzCqrht7HGoJ87gznLktJGywK1LbAJT2sbd4txmgS7FcYLMQFhawb18ojS9Hx55mrbsHPr7PTraKh14TSQbGBPJHbDZ9QVh6Z6Di"
      )
    ),
  },
  externalByronTestnet: {
    amountStr: "3003112",
    addressHex: utils.buf_to_hex(
      utils.base58_decode(
        "2657WMsDfac6Cmfg4Varph2qyLKGi2K9E8jrtvjHVzfSjmbTMGy5sY3HpxCKsmtDA"
      )
    ),
  },
  externalShelley: {
    amountStr: "1",
    addressHex: utils.buf_to_hex(
      utils.bech32_decodeAddress(
        "addr1q97tqh7wzy8mnx0sr2a57c4ug40zzl222877jz06nt49g4zr43fuq3k0dfpqjh3uvqcsl2qzwuwsvuhclck3scgn3vya5cw5yhe5vyg5x20akz"
      )
    ),
  },
  externalShelleyScripthash: {
    amountStr: "1",
    addressHex: utils.buf_to_hex(
      utils.bech32_decodeAddress(
        "addr_test1zp0z7zqwhya6mpk5q929ur897g3pp9kkgalpreny8y304rfw6j2jxnwq6enuzvt0lp89wgcsufj7mvcnxpzgkd4hz70z3h2pnc8lhq8r"
      )
    ),
  },
  internalBaseWithStakingKeyHash: {
    addressTypeNibble: AddressTypeNibble.BASE,
    spendingPath: str_to_path("1852'/1815'/0'/0/0"),
    stakingKeyHashHex:
      "122a946b9ad3d2ddf029d3a828f0468aece76895f15c9efbd69b4277",
    amountStr: "7120787",
  },
  internalBaseWithStakingPath: {
    addressTypeNibble: AddressTypeNibble.BASE,
    spendingPath: str_to_path("1852'/1815'/0'/0/0"),
    stakingPath: str_to_path("1852'/1815'/0'/2/0"),
    amountStr: "7120787",
  },
  internalBaseWithStakingPathNonReasonable: {
    addressTypeNibble: AddressTypeNibble.BASE,
    spendingPath: str_to_path("1852'/1815'/456'/0/5000000"),
    stakingPath: str_to_path("1852'/1815'/456'/2/0"),
    amountStr: "7120787",
  },
  internalEnterprise: {
    addressTypeNibble: AddressTypeNibble.ENTERPRISE,
    spendingPath: str_to_path("1852'/1815'/0'/0/0"),
    amountStr: "7120787",
  },
  internalPointer: {
    addressTypeNibble: AddressTypeNibble.POINTER,
    spendingPath: str_to_path("1852'/1815'/0'/0/0"),
    stakingBlockchainPointer: {
      blockIndex: 1,
      txIndex: 2,
      certificateIndex: 3,
    },
    amountStr: "7120787",
  },
  multiassetOneToken: {
    addressHex: utils.buf_to_hex(
      utils.bech32_decodeAddress(
        "addr1q84sh2j72ux0l03fxndjnhctdg7hcppsaejafsa84vh7lwgmcs5wgus8qt4atk45lvt4xfxpjtwfhdmvchdf2m3u3hlsd5tq5r"
      )
    ),
    amountStr: "1234",
    tokenBundle: [
      {
        policyIdHex: "95a292ffee938be03e9bae5657982a74e9014eb4960108c9e23a5b39",
        tokens: [
          {
            assetNameHex: "74652474436f696e",
            amountStr: "7878754",
          },
        ],
      },
    ],
  },
  multiassetManyTokens: {
    addressHex: utils.buf_to_hex(
      utils.bech32_decodeAddress(
        "addr1q84sh2j72ux0l03fxndjnhctdg7hcppsaejafsa84vh7lwgmcs5wgus8qt4atk45lvt4xfxpjtwfhdmvchdf2m3u3hlsd5tq5r"
      )
    ),
    amountStr: "1234",
    tokenBundle: [
      {
        policyIdHex: "95a292ffee938be03e9bae5657982a74e9014eb4960108c9e23a5b39",
        tokens: [
          {
            assetNameHex: "74652474436f696e",
            amountStr: "7878754",
          },
          {
            assetNameHex: "",
            amountStr: "1234",
          },
        ],
      },
      {
        policyIdHex: "75a292ffee938be03e9bae5657982a74e9014eb4960108c9e23a5b39",
        tokens: [
          {
            assetNameHex: "7564247542686911",
            amountStr: "47",
          },
        ],
      },
    ],
  },
  multiassetChange: {
    addressTypeNibble: AddressTypeNibble.BASE,
    spendingPath: str_to_path("1852'/1815'/0'/0/0"),
    stakingPath: str_to_path("1852'/1815'/0'/2/0"),
    amountStr: "1234",
    tokenBundle: [
      {
        policyIdHex: "95a292ffee938be03e9bae5657982a74e9014eb4960108c9e23a5b39",
        tokens: [
          {
            assetNameHex: "74652474436f696e",
            amountStr: "7878754",
          },
        ],
      },
    ],
  },
  multiassetBigNumber: {
    addressHex: utils.buf_to_hex(
      utils.bech32_decodeAddress(
        "addr1q84sh2j72ux0l03fxndjnhctdg7hcppsaejafsa84vh7lwgmcs5wgus8qt4atk45lvt4xfxpjtwfhdmvchdf2m3u3hlsd5tq5r"
      )
    ),
    amountStr: "24103998870869519",
    tokenBundle: [
      {
        policyIdHex: "95a292ffee938be03e9bae5657982a74e9014eb4960108c9e23a5b39",
        tokens: [
          {
            assetNameHex: "74652474436f696e",
            amountStr: "24103998870869519",
          },
        ],
      },
    ],
  },
};

export const certificates = {
  stakeRegistration: {
    type: 0,
    path: str_to_path("1852'/1815'/0'/2/0"),
  },
  stakeDeregistration: {
    type: 1,
    path: str_to_path("1852'/1815'/0'/2/0"),
  },
  stakeDelegation: {
    type: 2,
    path: str_to_path("1852'/1815'/0'/2/0"),
    poolKeyHashHex: "f61c42cbf7c8c53af3f520508212ad3e72f674f957fe23ff0acb4973",
  },
};

export const withdrawals = {
  withdrawal0: {
    path: str_to_path("1852'/1815'/0'/2/0"),
    amountStr: "111",
  },
};

export const sampleMetadataHashHex = "deadbeef".repeat(8);
export const sampleFeeStr = "42";
export const sampleTtlStr = "10";
export const sampleValidityIntervalStartStr = "47";
export const sampleBigIntStr = "24103998870869519";

export const resultsByron = {
  noChangeByronMainnet: {
    /*
     * txBody: a400818258201af8fa0b754ff99253d983894e63a2b09cbb56c833ba18c3384210163f63dcfc00018182582b82d818582183581c9e1c71de652ec8b85fec296f0685ca3988781c94a2e1a5d89d92f45fa0001a0d0c25611a002dd2e802182a030a
     */
    txHashHex:
      "73e09bdebf98a9e0f17f86a2d11e0f14f4f8dae77cdf26ff1678e821f20c8db6",
    witnesses: [
      {
        path: str_to_path("44'/1815'/0'/0/0"),
        witnessSignatureHex:
          "9c12b678a047bf3148e867d969fba4f9295042c4fff8410782425a356820c79e7549de" +
          "798f930480ba83615a5e2a19389c795a3281a59077b7d37cd5a071a606",
      },
    ],
  },
  noChangeByronDaedalusMainnet: {
    txHashHex:
      "3cf35b4d9bfa87b8eab5de659e0520bdac37b0de0b3840c1d8abd683330a9756",
    witnesses: [
      {
        path: str_to_path("44'/1815'/0'/0/0"),
        witnessSignatureHex:
          "fdca7969a3e8bc091c9ee32c04732f79bb7c0091f1796fd2c0e1de8aa8547a00457d50d0576f4dd421baf754499cf0e77584e848e3547addd5d5b7167597a307",
      },
    ],
  },
  noChangeByronTestnet: {
    txHashHex:
      "e2319ee8317ac537af4c2c3322aaf9fb6c64a95e3921ad75ab91b4f5b5306963",
    witnesses: [
      {
        path: str_to_path("44'/1815'/0'/0/0"),
        witnessSignatureHex:
          "224d103185f4709f7b749339ff7ba432d50ca5cb742678847f5e574858cf7dda7ed402399a9ddba81ecd731b6f939ba07a247cd570dcd543f83a9aeadc4f9603",
      },
    ],
  },
};

export const resultsShelley = {
  noChangeShelley: {
    /*
     * txBody: a400818258201af8fa0b754ff99253d983894e63a2b09cbb56c833ba18c3384210163f63dcfc000181825841017cb05fce110fb999f01abb4f62bc455e217d4a51fde909fa9aea545443ac53c046cf6a42095e3c60310fa802771d0672f8fe2d1861138b09da61d425f34611140102182a030a
     */
    txHashHex:
      "97e40841b9b494d4c63993c35038484a72e70f0d5356471e9f1e3e311663b67e",
    witnesses: [
      {
        path: str_to_path("1852'/1815'/0'/0/0"),
        witnessSignatureHex:
          "5137e748df308525b46deaef18e61e04994f6658c32ada286b06d32b99d6676aef94f36895a51b9025d94b2ab0776749eedc7451ac1f0e61bef8b9cf5ec0240e",
      },
    ],
  },
  noOutputs: {
    txHashHex:
      "ffd4d009f554ba4fd8ed1f1d703244819861a9d34fd4753bcf3ff32f043ce188",
    witnesses: [
      {
        path: str_to_path("1852'/1815'/0'/0/0"),
        witnessSignatureHex:
          "190dcee0cc7125fd0ec104cf685674f1ad77f3e439a4a249e596a3306f9eb110ced8fb8ec59da15b721203c8973bd341d88e6a60b85c1e9f2623152fee8dc00a",
      },
    ],
  },
  noChangeShelleyScripthash: {
    txHashHex:
      "23d82edc8fbd2d55237cba955a2280161ebd5643b23844e9b5abdc843b966e62",
    witnesses: [
      {
        path: str_to_path("1852'/1815'/0'/0/0"),
        witnessSignatureHex:
          "cbf9a954367715f15e5f0e68638b362676c5590c29498734af1c9ef59e7ec5ed7c3d1453d931e5d166cebab2bd3126a26acb39b5f1da43d2fbb73b6c2aeb1a03",
      },
    ],
  },
  changeBaseWithStakingPath: {
    txHashHex:
      "bd9e06485299c3c2be83135438f18fa4bde6e324420ae0a79dd2a12295f28597",
    witnesses: [
      {
        path: str_to_path("1852'/1815'/0'/0/0"),
        witnessSignatureHex:
          "ce028294627e27e8d80c5902f7dae91da851bf530df8b12efef44f7afa316b613cdb2b404e39df2a47f7fa64818a66b2b34d4b45ca3a04bf519c24c7a4ac3f00",
      },
    ],
  },
  changeBaseWithStakingKeyHash: {
    txHashHex:
      "f475a32afbf7b028fb794f81311a10f655afbbdf1d0201e5c801010a8cde9ea7",
    witnesses: [
      {
        path: str_to_path("1852'/1815'/0'/0/0"),
        witnessSignatureHex:
          "4ac5017c014886406a38a45417a165156280be63ca6975a5acffcabc0cc842ca603248b8a7ebfa729d7affce34518f4ca94fe797420a4d7aa0ef8c2b0ddfba0b",
      },
    ],
  },
  changePointer: {
    txHashHex:
      "4b19e27ffc006ace16592311c4d2f0cafc255eaa47a6178ff540c0a46d07027c",
    witnesses: [
      {
        path: str_to_path("1852'/1815'/0'/0/0"),
        witnessSignatureHex:
          "1838884e08cf6966ebe6b3e775191c4f08d90834723421779efd6aa96e52ffc91a24e5073abe6db94c74fe080d008258b3d989c159d9b87a9c778a51404abc08",
      },
    ],
  },
  changeEnterprise: {
    txHashHex:
      "c192b24a87d45c768f7f33ed37998054db96d34558e59afebabe51cfb7034b65",
    witnesses: [
      {
        path: str_to_path("1852'/1815'/0'/0/0"),
        witnessSignatureHex:
          "70559415746a9646dc492b7758e18cb367c005ab0479558b3d540be2310eb1bb1dd0839081e22c0b4727e8bd8e163cfbfe9def99a8506fb4a6787a200862e00f",
      },
    ],
  },
  withWithdrawal: {
    /*
     * txBody: a500818258203b40265111d8bb3c3c608d95b3a0bf83461ace32d79336579a1939b3aa
     * d1c0b700018182582b82d818582183581c9e1c71de652ec8b85fec296f0685ca3988781c94a2e1
     * a5d89d92f45fa0001a0d0c25611a002dd2e802182a030a05a1581de11d227aefa4b77314917088
     * 5aadba30aab3127cc611ddbc4999def61c186f
     */
    txHashHex:
      "dfc63f395fba4bbf8d3507d05c455f0db7d85d0cabdd6f033c6112d6c32a6b93",
    witnesses: [
      {
        path: str_to_path("1852'/1815'/0'/0/0"),
        witnessSignatureHex:
          "22ef3b54a54a1f5390436911b23328225f92c660eb251189fceab2fa428187a2cec584ea5f6f9c9fcdf7f19bc496b3b2b9bb416ad07a3d31d73fbc0c05bec10c",
      },
      {
        path: str_to_path("1852'/1815'/0'/2/0"),
        witnessSignatureHex:
          "04b995979c2072b469c1e0ace5331c3d188e3e65d5a6f06aa4e608fb18a3588621370ee1b5d39d55afe0744aa4906785baa07210dc4cb49594eba507f7215102",
      },
    ],
  },
  withRegistrationCertificate: {
    /*
     * txBody: a500818258201af8fa0b754ff99253d983894e63a2b09cbb56c833ba18c3384210163
     * f63dcfc00018182582b82d818582183581c9e1c71de652ec8b85fec296f0685ca3988781c94a2
     * e1a5d89d92f45fa0001a0d0c25611a002dd2e802182a030a048182008200581c1d227aefa4b77
     * 3149170885aadba30aab3127cc611ddbc4999def61c
     */
    txHashHex:
      "a119ec712822b2f4bc96737121f286cf149ac2f8de2230e0d675f074094d1cd6",
    witnesses: [
      {
        path: str_to_path("1852'/1815'/0'/0/0"),
        witnessSignatureHex:
          "9825594e5a91333b9f5762665ba316af34c2208bd7ef073178af5e48f2aae8673d50436045e292d5bb9be7492eeeda475a04e58621a326c91049a2ef26a33200",
      },
      {
        path: str_to_path("1852'/1815'/0'/2/0"),
        witnessSignatureHex:
          "a2a22faa4ac4ba4b5a89c770dd7b2afe877ba8c86f0205df8c01a2184275aaafada9b6be4640aa573cafbbca26ac2eccd98f804065b39b10a0559c7dc441fa0a",
      },
    ],
  },
  withDelegationCertificate: {
    /*
     * txBody: a500818258201af8fa0b754ff99253d983894e63a2b09cbb56c833ba18c3384210163
     * f63dcfc00018182582b82d818582183581c9e1c71de652ec8b85fec296f0685ca3988781c94a2
     * e1a5d89d92f45fa0001a0d0c25611a002dd2e802182a030a048183028200581c1d227aefa4b77
     * 3149170885aadba30aab3127cc611ddbc4999def61c581cf61c42cbf7c8c53af3f520508212ad
     * 3e72f674f957fe23ff0acb4973
     */
    txHashHex:
      "7afd028b504c3668102b129b37a86c09a2872f76741dc7a68e2149c808b3a8aa",
    witnesses: [
      {
        path: str_to_path("1852'/1815'/0'/0/0"),
        witnessSignatureHex:
          "d94c8f8fe73946c25f3bd0919d05a60b8373ef0a7261fa73eefe1f2a20e8a4c3401feb5eea701222184fceab2c45b47bd823ac76123e2d17f804d3e4ed2df909",
      },
      {
        path: str_to_path("1852'/1815'/0'/2/0"),
        witnessSignatureHex:
          "035b4e6ae6f7a8089f2a302ddcb60bc56d48bcf267fdcb071844da5ce3086d51e816777a6fb5eabfcb326a32b830674ac0de40ee1b2360a69adba4b64c662404",
      },
    ],
  },
  withDeregistrationCertificate: {
    /*
     * txBody: a500818258201af8fa0b754ff99253d983894e63a2b09cbb56c833ba18c3384210163
     * f63dcfc00018182582b82d818582183581c9e1c71de652ec8b85fec296f0685ca3988781c94a2
     * e1a5d89d92f45fa0001a0d0c25611a002dd2e802182a030a048182018200581c1d227aefa4b77
     * 3149170885aadba30aab3127cc611ddbc4999def61c
     */
    txHashHex:
      "8b143fae3b37748fee1decdc10fbfa554158b58fbc99623ecdd2ba7aa709e471",
    witnesses: [
      {
        path: str_to_path("1852'/1815'/0'/0/0"),
        witnessSignatureHex:
          "6136510eb91449474f6137c8d1c7c69eb518e3844a3e63a626be8cf4af91afa24e12f4fa578398bf0e7992e22dcfc5f9773fb8546b88c19e3abfdaa3bbe7a304",
      },
      {
        path: str_to_path("1852'/1815'/0'/2/0"),
        witnessSignatureHex:
          "77210ce6533a76db3673af1076bf3933747a8d81cabda80c8bc9c852c78685f8a42c9372721bdfe9b47611039364afb3391031211b5c427cfec0c5c505cfec0c",
      },
    ],
  },
  withDuplicateWitnessPaths: {
    txHashHex:
      "8d720755bcbc724fc71a1868bafbd057d855a176362417f62711a34f2d9b896d",
    witnesses: [
      {
        path: str_to_path("1852'/1815'/0'/0/0"),
        witnessSignatureHex:
          "04e071e39903e7e1e3ea9d26ce6822d5cbef88ee389f4f63a585668a5a6df98924dca16f8f61c01909162730014bb309fc7043b80ac54375697d6e9c01df0a0c",
      },
      {
        path: str_to_path("1852'/1815'/0'/2/0"),
        witnessSignatureHex:
          "7b53ba805658d801baa39546777b611ed071c89938daea50c2c3275358abec2c1d67c8062b24fc4778e09af13e58ea33dd7d0627e221574386716aaa25e1f20b",
      },
    ],
  },
  withMetadata: {
    /*
     * txBody: a500818258201af8fa0b754ff99253d983894e63a2b09cbb56c833ba18c3384210163
     * f63dcfc00018182582b82d818582183581c9e1c71de652ec8b85fec296f0685ca3988781c94a2
     * e1a5d89d92f45fa0001a0d0c25611a002dd2e802182a030a075820deadbeefdeadbeefdeadbee
     * fdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef
     */
    txHashHex:
      "34c1dd59c14252008b680bf6a727c8f371e2d96e8bca6b783bcf3f8f36407e6f",
    witnesses: [
      {
        path: str_to_path("1852'/1815'/0'/0/0"),
        witnessSignatureHex:
          "953c5243ba09570dd4e52642236834c138ad4abbbb21796a90540a11e8dc96e47043401d370cdaed70ebc332dd4db80c9b167fd7f20971c4f142875cea57200c",
      },
    ],
  },
  nonReasonable: {
    txHashHex:
      "40b3a79c645be040139078befee154d5f935c8ba2af6144cebcf447f8ef2e580",
    witnesses: [
      {
        path: str_to_path("1852'/1815'/456'/0/0"),
        witnessSignatureHex:
          "bb1a035acf4a7b5dd68914f0007dfc4d1cc7b4d88748c0ad24326fd06597542ce0352075ed861b3ae012ab976cacd3dbbc58802cdf82409917ebf9a8bb182e04",
      },
    ],
  },
};

export const resultsAllegra = {
  noTtlNoValidityIntervalStart: {
    /*
     * txbody: a300818258203b40265111d8bb3c3c608d95b3a0bf83461ace32d79336579a1939b3aad1c0b7000181825841017cb05fce110fb999f01abb4f62bc455e217d4a51fde909fa9aea545443ac53c046cf6a42095e3c60310fa802771d0672f8fe2d1861138b09da61d425f34611140102182a
     */
    txHashHex:
      "971dc8ccbc34fde78028b9642352ac84b6c8867cfd72ca9bc92d68203d7ed86f",
    witnesses: [
      {
        path: str_to_path("1852'/1815'/0'/0/0"),
        witnessSignatureHex:
          "6dc4da7a0bee07e4ecc687b0d1b9e73d772dfb6a09b2bf435fe1e3d481ed8214f8d751ceff0e9fa41ef0ad7318ea9ca561c9b773e5673adb8049569c380f5301",
      },
    ],
  },

  noTtlYesValidityIntervalStart: {
    /*
     * txbody: a400818258203b40265111d8bb3c3c608d95b3a0bf83461ace32d79336579a1939b3aad1c0b7000181825841017cb05fce110fb999f01abb4f62bc455e217d4a51fde909fa9aea545443ac53c046cf6a42095e3c60310fa802771d0672f8fe2d1861138b09da61d425f34611140102182a08182f
     */
    txHashHex:
      "bfe53d40c5eb0cd04b53d555b85be4474168adbc1d8f82cf5c9792854234cf70",
    witnesses: [
      {
        path: str_to_path("1852'/1815'/0'/0/0"),
        witnessSignatureHex:
          "b1bc7a4b110523f8b0a1a3aa0ae0f45a718faf7beb648a021d0d777755ab214ba1b079d79d8517a275ebb74c79aa244600f0877c611ca00383d67fc447074003",
      },
    ],
  },
};

export const resultsMary = {
  multiassetOneToken: {
    /*
     * txbody: a500818258203b40265111d8bb3c3c608d95b3a0bf83461ace32d79336579a1939b3aad1c0b700018282583901eb0baa5e570cffbe2934db29df0b6a3d7c0430ee65d4c3a7ab2fefb91bc428e4720702ebd5dab4fb175324c192dc9bb76cc5da956e3c8dff821904d2a1581c95a292ffee938be03e9bae5657982a74e9014eb4960108c9e23a5b39a14874652474436f696e1a007838628258390114c16d7f43243bd81478e68b9db53a8528fd4fb1078d58d54a7f11241d227aefa4b773149170885aadba30aab3127cc611ddbc4999def61c1a006ca79302182a030a08182f
     */
    txHashHex:
      "8502ab1a781627663e8bfcff54a58747e319da3bb592a3446fc35fa5d2f2fbe9",
    witnesses: [
      {
        path: str_to_path("1852'/1815'/0'/0/0"),
        witnessSignatureHex:
          "b48877586d90a249579a5f3994c3ad0c21c5f78960a04aadd182ca49c3b606f1d8a578edf17923188e4e0e40f191e019a5174081c092c458a82e9f0c1e1fae08",
      },
    ],
  },

  multiassetManyTokens: {
    /*
     * txbody: a500818258203b40265111d8bb3c3c608d95b3a0bf83461ace32d79336579a1939b3aad1c0b700018282583901eb0baa5e570cffbe2934db29df0b6a3d7c0430ee65d4c3a7ab2fefb91bc428e4720702ebd5dab4fb175324c192dc9bb76cc5da956e3c8dff821904d2a2581c95a292ffee938be03e9bae5657982a74e9014eb4960108c9e23a5b39a24874652474436f696e1a00783862401904d2581c75a292ffee938be03e9bae5657982a74e9014eb4960108c9e23a5b39a1487564247542686911182f8258390114c16d7f43243bd81478e68b9db53a8528fd4fb1078d58d54a7f11241d227aefa4b773149170885aadba30aab3127cc611ddbc4999def61c1a006ca79302182a030a08182f
     */
    txHashHex:
      "76e0af0eb9eb19b374d002b0eedbb9175eb3e5c5327db376be0ae94a4fcf4b84",
    witnesses: [
      {
        path: str_to_path("1852'/1815'/0'/0/0"),
        witnessSignatureHex:
          "562497549b44d34926598d8a6511c4b58da0cb8da77033b633983f2897dbd59f1d45a4bef987574d83ebe74a016ccab042d0462df813e86896db624d221a5207",
      },
    ],
  },

  withMultiassetChange: {
    /*
     * txbody: a500818258203b40265111d8bb3c3c608d95b3a0bf83461ace32d79336579a1939b3aad1c0b7000182825841017cb05fce110fb999f01abb4f62bc455e217d4a51fde909fa9aea545443ac53c046cf6a42095e3c60310fa802771d0672f8fe2d1861138b09da61d425f3461114018258390114c16d7f43243bd81478e68b9db53a8528fd4fb1078d58d54a7f11241d227aefa4b773149170885aadba30aab3127cc611ddbc4999def61c821904d2a1581c95a292ffee938be03e9bae5657982a74e9014eb4960108c9e23a5b39a14874652474436f696e1a0078386202182a030a08182f
     */
    txHashHex:
      "75ef0b3ac08d56e8ca4a6d3a3de054ed028bad025b0fad3cbb351fc94e967bc5",
    witnesses: [
      {
        path: str_to_path("1852'/1815'/0'/0/0"),
        witnessSignatureHex:
          "f19c5f698d3d46dac99c83268d8b5154262c22f9599d38b5221b78d08cef8f5bb81de648a0c94d328b74e88c58d46535de289123f08a47a05a1c253980d6b80e",
      },
    ],
  },

  bigNumbersEverywhere: {
    /*
     * txbody: a500818258203b40265111d8bb3c3c608d95b3a0bf83461ace32d79336579a1939b3aad1c0b700018182583901eb0baa5e570cffbe2934db29df0b6a3d7c0430ee65d4c3a7ab2fefb91bc428e4720702ebd5dab4fb175324c192dc9bb76cc5da956e3c8dff821b0055a275925d560fa1581c95a292ffee938be03e9bae5657982a74e9014eb4960108c9e23a5b39a14874652474436f696e1b0055a275925d560f021b0055a275925d560f031b0055a275925d560f081b0055a275925d560f
     */
    txHashHex:
      "e60735a3cc71a8a3f89652797c3e650d6ed80059c0b59978c59858dcf6f8ca48",
    witnesses: [
      {
        path: str_to_path("1852'/1815'/0'/0/0"),
        witnessSignatureHex:
          "632cd935550a71c1e1869e6f5749ee4cb8c268cbe014138561fc2d1045b5b2be84526cfd5a6fea01de99bdf903fa17c79a58a832b5cdcb1c999bcbe995a56806",
      },
    ],
  },
};