/********************************************************************************
 *   Ledger Node JS API
 *   (c) 2016-2017 Ledger
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 ********************************************************************************/
//import type Transport from "@ledgerhq/hw-transport";

import cardano, {
  AddressTypeNibbles,
  CertificateTypes,
} from "./cardano";
import { INS } from "./interactions/common/ins";
import { deriveAddress } from "./interactions/deriveAddress";
import { getExtendedPublicKeys } from "./interactions/getExtendedPublicKeys";
import { getSerial } from "./interactions/getSerial";
import { getVersion } from "./interactions/getVersion";
import { runTests } from "./interactions/runTests";
import { showAddress } from "./interactions/showAddress";
import { signTransaction } from "./interactions/signTx";
import { TxErrors } from "./txErrors";
import utils, { Assert } from "./utils";

const CLA = 0xd7;

export type KeyOf<T> = keyof T;
export type ValueOf<T> = T[keyof T];

export type BIP32Path = Array<number>;

export type InputTypeUTxO = {
  txHashHex: string,
  outputIndex: number,
  path?: BIP32Path,
};

export type Token = {
  assetNameHex: string,
  amountStr: string,
};

export type AssetGroup = {
  policyIdHex: string,
  tokens: Array<Token>,
};

export type TxOutputTypeAddress = {
  amountStr: string,
  tokenBundle: Array<AssetGroup>,
  addressHex: string,
};

export type TxOutputTypeAddressParams = {
  amountStr: string,
  tokenBundle: Array<AssetGroup>,
  addressTypeNibble: ValueOf<typeof AddressTypeNibbles>,
  spendingPath: BIP32Path,
  stakingPath?: BIP32Path,
  stakingKeyHashHex?: string,
  stakingBlockchainPointer?: StakingBlockchainPointer,
};

export type TxOutput = TxOutputTypeAddress | TxOutputTypeAddressParams;

export type StakingBlockchainPointer = {
  blockIndex: number,
  txIndex: number,
  certificateIndex: number,
};

export type PoolOwnerParams = {
  stakingPath?: BIP32Path,
  stakingKeyHashHex?: string,
};

export type SingleHostIPRelay = {
  portNumber?: number,
  ipv4?: string, // e.g. "192.168.0.1"
  ipv6?: string, // e.g. "2001:0db8:85a3:0000:0000:8a2e:0370:7334"
};

export type SingleHostNameRelay = {
  portNumber?: number,
  dnsName: string,
};

export type MultiHostNameRelay = {
  dnsName: string,
};

export type RelayParams = {
  type: number, // single host ip = 0, single hostname = 1, multi host name = 2
  params: SingleHostIPRelay | SingleHostNameRelay | MultiHostNameRelay,
};

export type PoolMetadataParams = {
  metadataUrl: string,
  metadataHashHex: string,
};

export type Margin = {
  numeratorStr: string,
  denominatorStr: string,
};

export type PoolParams = {
  poolKeyHashHex: string,
  vrfKeyHashHex: string,
  pledgeStr: string,
  costStr: string,
  margin: Margin,
  rewardAccountHex: string,
  poolOwners: Array<PoolOwnerParams>,
  relays: Array<RelayParams>,
  metadata: PoolMetadataParams,
};

export type Certificate = {
  type: ValueOf<typeof CertificateTypes>,
  path: BIP32Path,
  poolKeyHashHex?: string,
  poolRegistrationParams?: PoolParams,
};

export type Withdrawal = {
  path: BIP32Path,
  amountStr: string,
};

export type Flags = {
  isDebug: boolean,
};

export type GetVersionResponse = {
  major: number,
  minor: number,
  patch: number,
  flags: Flags,
};

export type GetSerialResponse = {
  serial: string,
};

export type DeriveAddressResponse = {
  addressHex: string,
};

export type GetExtendedPublicKeyResponse = {
  publicKeyHex: string,
  chainCodeHex: string,
};

export type Witness = {
  path: BIP32Path,
  // Note: this is *only* a signature
  // you need to add proper extended public key
  // to form a full witness
  witnessSignatureHex: string,
};

export type SignTransactionResponse = {
  txHashHex: string,
  witnesses: Array<Witness>,
};

export const TxOutputTypeCodes = {
  SIGN_TX_OUTPUT_TYPE_ADDRESS_BYTES: 1,
  SIGN_TX_OUTPUT_TYPE_ADDRESS_PARAMS: 2,
};

export const DeviceErrorCodes = {
  ERR_STILL_IN_CALL: 0x6e04, // internal
  ERR_INVALID_DATA: 0x6e07,
  ERR_INVALID_BIP_PATH: 0x6e08,
  ERR_REJECTED_BY_USER: 0x6e09,
  ERR_REJECTED_BY_POLICY: 0x6e10,
  ERR_DEVICE_LOCKED: 0x6e11,
  ERR_UNSUPPORTED_ADDRESS_TYPE: 0x6e12,

  // Not thrown by ledger-app-cardano itself but other apps
  ERR_CLA_NOT_SUPPORTED: 0x6e00,
};

const GH_ERRORS_LINK =
  "https://github.com/cardano-foundation/ledger-app-cardano/blob/master/src/errors.h";

const DeviceErrorMessages = {
  [DeviceErrorCodes.ERR_INVALID_DATA]: "Invalid data supplied to Ledger",
  [DeviceErrorCodes.ERR_INVALID_BIP_PATH]:
    "Invalid derivation path supplied to Ledger",
  [DeviceErrorCodes.ERR_REJECTED_BY_USER]: "Action rejected by user",
  [DeviceErrorCodes.ERR_REJECTED_BY_POLICY]:
    "Action rejected by Ledger's security policy",
  [DeviceErrorCodes.ERR_DEVICE_LOCKED]: "Device is locked",
  [DeviceErrorCodes.ERR_CLA_NOT_SUPPORTED]: "Wrong Ledger app",
  [DeviceErrorCodes.ERR_UNSUPPORTED_ADDRESS_TYPE]: "Unsupported address type",
};

export const Errors = {
  INCORRECT_APP_VERSION:
    "Operation not supported by the Ledger device, make sure to have the latest version of the Cardano app installed",
};

export const getErrorDescription = (statusCode: number) => {
  const statusCodeHex = `0x${statusCode.toString(16)}`;
  const defaultMsg = `General error ${statusCodeHex}. Please consult ${GH_ERRORS_LINK}`;

  return DeviceErrorMessages[statusCode] || defaultMsg;
};

function wrapConvertError<T extends Function>(fn: T): T {
  // @ts-ignore
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (e) {
      if (e && e.statusCode) {
        // keep HwTransport.TransportStatusError
        // just override the message
        e.message = `Ledger device: ${getErrorDescription(e.statusCode)}`;
      }
      throw e;
    }
  };
}

/**
 * Cardano ADA API
 *
 * @example
 * import Ada from "@ledgerhq/hw-app-ada";
 * const ada = new Ada(transport);
 */

export type SendParams = {
  ins: INS,
  p1: number,
  p2: number,
  data: Buffer,
  expectedResponseLength?: number,
};
export type SendFn = (params: SendParams) => Promise<Buffer>;

export type Transport = any

export default class Ada {
  transport: Transport;
  _send: SendFn;

  constructor(transport: Transport, scrambleKey: string = "ADA") {
    this.transport = transport;
    const methods = [
      "getVersion",
      "getSerial",
      "getExtendedPublicKey",
      "signTransaction",
      "deriveAddress",
      "showAddress",
    ];
    this.transport.decorateAppAPIMethods(this, methods, scrambleKey);
    this._send = async (params: SendParams): Promise<Buffer> => {
      let response = await wrapConvertError(this.transport.send)(
        CLA,
        params.ins,
        params.p1,
        params.p2,
        params.data
      );
      response = utils.stripRetcodeFromResponse(response);

      if (params.expectedResponseLength != null) {
        Assert.assert(
          response.length === params.expectedResponseLength,
          `unexpected response length: ${response.length} instead of ${params.expectedResponseLength}`
        );
      }

      return response;
    };
  }

  /**
   * Returns an object containing the app version.
   *
   * @returns {Promise<GetVersionResponse>} Result object containing the application version number.
   *
   * @example
   * const { major, minor, patch, flags } = await ada.getVersion();
   * console.log(`App version ${major}.${minor}.${patch}`);
   *
   */
  async getVersion(): Promise<GetVersionResponse> {
    return getVersion(this._send);
  }

  /**
   * Returns an object containing the device serial number.
   *
   * @returns {Promise<GetSerialResponse>} Result object containing the device serial number.
   *
   * @example
   * const { serial } = await ada.getSerial();
   * console.log(`Serial number ${serial}`);
   *
   */
  async getSerial(): Promise<GetSerialResponse> {
    return getSerial(this._send);
  }


  /**
   * Runs unit tests on the device (DEVEL app build only)
   *
   * @returns {Promise<void>}
   */
  async runTests(): Promise<void> {
    return runTests(this._send);
  }


  /**
   * @description Get several public keys; one for each of the specified BIP 32 paths.
   *
   * @param {Array<BIP32Path>} paths The paths. A path must begin with `44'/1815'/account'` or `1852'/1815'/account'`, and may be up to 10 indexes long.
   * @return {Promise<Array<GetExtendedPublicKeyResponse>>} The extended public keys (i.e. with chaincode) for the given paths.
   *
   * @example
   * const [{ publicKey, chainCode }] = await ada.getExtendedPublicKeys([[ HARDENED + 44, HARDENED + 1815, HARDENED + 1 ]]);
   * console.log(publicKey);
   *
   */

  async getExtendedPublicKeys(
    paths: Array<BIP32Path>
  ): Promise<Array<GetExtendedPublicKeyResponse>> {
    return getExtendedPublicKeys(this._send, paths);
  }

  /**
   * @description Get a public key from the specified BIP 32 path.
   *
   * @param {BIP32Path} indexes The path indexes. Path must begin with `44'/1815'/n'`, and may be up to 10 indexes long.
   * @return {Promise<GetExtendedPublicKeyResponse>} The public key with chaincode for the given path.
   *
   * @example
   * const { publicKey, chainCode } = await ada.getExtendedPublicKey([ HARDENED + 44, HARDENED + 1815, HARDENED + 1 ]);
   * console.log(publicKey);
   *
   */
  async getExtendedPublicKey(
    path: BIP32Path
  ): Promise<GetExtendedPublicKeyResponse> {
    return (await this.getExtendedPublicKeys([path]))[0];
  }

  /**
   * @description Gets an address from the specified BIP 32 path.
   *
   * @param {BIP32Path} indexes The path indexes. Path must begin with `(44 or 1852)'/1815'/i'/(0 or 1)/j`, and may be up to 10 indexes long.
   * @return {Promise<DeriveAddressResponse>} The address for the given path.
   *
   * @throws 5001 - The path provided does not have the first 3 indexes hardened or 4th index is not 0, 1 or 2
   * @throws 5002 - The path provided is less than 5 indexes
   * @throws 5003 - Some of the indexes is not a number
   *
   * TODO update error codes
   *
   * @example
   * const { address } = await ada.deriveAddress(
   *   0b1000, // byron address
   *   764824073,
   *   [ HARDENED | 44, HARDENED | 1815, HARDENED | 1, 0, 5 ],
   *   null
   *   null
   *   null
   * );
   *
   * @example
   * const { address } = await ada.deriveAddress(
   *   0b0000, // base address
   *   0x00,
   *   [ HARDENED | 1852, HARDENED | 1815, HARDENED | 0, 0, 5 ],
   *   [ HARDENED | 1852, HARDENED | 1815, HARDENED | 0, 2, 0 ]
   *   null
   *   null
   * );
   *
   */
  async deriveAddress(
    addressTypeNibble: ValueOf<typeof AddressTypeNibbles>,
    networkIdOrProtocolMagic: number,
    spendingPath: BIP32Path,
    stakingPath: BIP32Path | null = null,
    stakingKeyHashHex: string | null = null,
    stakingBlockchainPointer: StakingBlockchainPointer | null = null
  ): Promise<DeriveAddressResponse> {
    return deriveAddress(
      this._send,
      addressTypeNibble,
      networkIdOrProtocolMagic,
      spendingPath,
      stakingPath,
      stakingKeyHashHex,
      stakingBlockchainPointer
    );
  }


  async showAddress(
    addressTypeNibble: ValueOf<typeof AddressTypeNibbles>,
    networkIdOrProtocolMagic: number,
    spendingPath: BIP32Path,
    stakingPath: BIP32Path | null = null,
    stakingKeyHashHex: string | null = null,
    stakingBlockchainPointer: StakingBlockchainPointer | null = null
  ): Promise<void> {
    return showAddress(
      this._send,
      addressTypeNibble,
      networkIdOrProtocolMagic,
      spendingPath,
      stakingPath,
      stakingKeyHashHex,
      stakingBlockchainPointer
    );
  }


  async signTransaction(
    networkId: number,
    protocolMagic: number,
    inputs: Array<InputTypeUTxO>,
    outputs: Array<TxOutput>,
    feeStr: string,
    ttlStr: string | undefined,
    certificates: Array<Certificate>,
    withdrawals: Array<Withdrawal>,
    metadataHashHex?: string,
    validityIntervalStartStr?: string
  ): Promise<SignTransactionResponse> {
    return signTransaction(
      this._send,
      networkId,
      protocolMagic,
      inputs,
      outputs,
      feeStr,
      ttlStr,
      certificates,
      withdrawals,
      metadataHashHex,
      validityIntervalStartStr
    );
  }
}

// reexport
export { AddressTypeNibbles, CertificateTypes, TxErrors, cardano, utils };