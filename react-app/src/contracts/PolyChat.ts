/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface PolyChatInterface extends utils.Interface {
  functions: {
    "globalMessagingFee()": FunctionFragment;
    "messagingFeeFor(address)": FunctionFragment;
    "messagingFeeSenders(address,uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "publicKeyOf(address)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "sendMessageTo(string,address)": FunctionFragment;
    "setGlobalMessagingFee(uint256)": FunctionFragment;
    "setMessagingFee(uint256)": FunctionFragment;
    "setPublicKey(bytes)": FunctionFragment;
    "setWhiteListFee(address,uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "withdraw(address,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "globalMessagingFee"
      | "messagingFeeFor"
      | "messagingFeeSenders"
      | "owner"
      | "publicKeyOf"
      | "renounceOwnership"
      | "sendMessageTo"
      | "setGlobalMessagingFee"
      | "setMessagingFee"
      | "setPublicKey"
      | "setWhiteListFee"
      | "transferOwnership"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "globalMessagingFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "messagingFeeFor",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "messagingFeeSenders",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "publicKeyOf",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "sendMessageTo",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setGlobalMessagingFee",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setMessagingFee",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setPublicKey",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "setWhiteListFee",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "globalMessagingFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "messagingFeeFor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "messagingFeeSenders",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "publicKeyOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sendMessageTo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setGlobalMessagingFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setMessagingFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setPublicKey",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setWhiteListFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "Message(address,address,string)": EventFragment;
    "NewGlobalMessagingFee(uint256)": EventFragment;
    "NewMessagingFee(address,uint256)": EventFragment;
    "NewPublicKey(address,bytes)": EventFragment;
    "NewWhitelistMessagingFee(address,address,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Message"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewGlobalMessagingFee"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewMessagingFee"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewPublicKey"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewWhitelistMessagingFee"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export interface MessageEventObject {
  _sender: string;
  _recepient: string;
  _message: string;
}
export type MessageEvent = TypedEvent<
  [string, string, string],
  MessageEventObject
>;

export type MessageEventFilter = TypedEventFilter<MessageEvent>;

export interface NewGlobalMessagingFeeEventObject {
  _messagingFee: BigNumber;
}
export type NewGlobalMessagingFeeEvent = TypedEvent<
  [BigNumber],
  NewGlobalMessagingFeeEventObject
>;

export type NewGlobalMessagingFeeEventFilter =
  TypedEventFilter<NewGlobalMessagingFeeEvent>;

export interface NewMessagingFeeEventObject {
  _account: string;
  _messagingFee: BigNumber;
}
export type NewMessagingFeeEvent = TypedEvent<
  [string, BigNumber],
  NewMessagingFeeEventObject
>;

export type NewMessagingFeeEventFilter = TypedEventFilter<NewMessagingFeeEvent>;

export interface NewPublicKeyEventObject {
  _account: string;
  _publicKey: string;
}
export type NewPublicKeyEvent = TypedEvent<
  [string, string],
  NewPublicKeyEventObject
>;

export type NewPublicKeyEventFilter = TypedEventFilter<NewPublicKeyEvent>;

export interface NewWhitelistMessagingFeeEventObject {
  _account: string;
  fromAccount: string;
  _messagingFee: BigNumber;
}
export type NewWhitelistMessagingFeeEvent = TypedEvent<
  [string, string, BigNumber],
  NewWhitelistMessagingFeeEventObject
>;

export type NewWhitelistMessagingFeeEventFilter =
  TypedEventFilter<NewWhitelistMessagingFeeEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface PolyChat extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PolyChatInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    globalMessagingFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    messagingFeeFor(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    messagingFeeSenders(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    publicKeyOf(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    sendMessageTo(
      _message: PromiseOrValue<string>,
      _address: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setGlobalMessagingFee(
      _newMessagingFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setMessagingFee(
      _newFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setPublicKey(
      _public_key: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setWhiteListFee(
      _from: PromiseOrValue<string>,
      _newFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      _address: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  globalMessagingFee(overrides?: CallOverrides): Promise<BigNumber>;

  messagingFeeFor(
    _address: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  messagingFeeSenders(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  publicKeyOf(
    _address: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  sendMessageTo(
    _message: PromiseOrValue<string>,
    _address: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setGlobalMessagingFee(
    _newMessagingFee: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setMessagingFee(
    _newFee: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setPublicKey(
    _public_key: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setWhiteListFee(
    _from: PromiseOrValue<string>,
    _newFee: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    _address: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    globalMessagingFee(overrides?: CallOverrides): Promise<BigNumber>;

    messagingFeeFor(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    messagingFeeSenders(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    publicKeyOf(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    sendMessageTo(
      _message: PromiseOrValue<string>,
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setGlobalMessagingFee(
      _newMessagingFee: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setMessagingFee(
      _newFee: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setPublicKey(
      _public_key: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    setWhiteListFee(
      _from: PromiseOrValue<string>,
      _newFee: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw(
      _address: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Message(address,address,string)"(
      _sender?: null,
      _recepient?: PromiseOrValue<string> | null,
      _message?: null
    ): MessageEventFilter;
    Message(
      _sender?: null,
      _recepient?: PromiseOrValue<string> | null,
      _message?: null
    ): MessageEventFilter;

    "NewGlobalMessagingFee(uint256)"(
      _messagingFee?: null
    ): NewGlobalMessagingFeeEventFilter;
    NewGlobalMessagingFee(
      _messagingFee?: null
    ): NewGlobalMessagingFeeEventFilter;

    "NewMessagingFee(address,uint256)"(
      _account?: PromiseOrValue<string> | null,
      _messagingFee?: null
    ): NewMessagingFeeEventFilter;
    NewMessagingFee(
      _account?: PromiseOrValue<string> | null,
      _messagingFee?: null
    ): NewMessagingFeeEventFilter;

    "NewPublicKey(address,bytes)"(
      _account?: PromiseOrValue<string> | null,
      _publicKey?: null
    ): NewPublicKeyEventFilter;
    NewPublicKey(
      _account?: PromiseOrValue<string> | null,
      _publicKey?: null
    ): NewPublicKeyEventFilter;

    "NewWhitelistMessagingFee(address,address,uint256)"(
      _account?: PromiseOrValue<string> | null,
      fromAccount?: null,
      _messagingFee?: null
    ): NewWhitelistMessagingFeeEventFilter;
    NewWhitelistMessagingFee(
      _account?: PromiseOrValue<string> | null,
      fromAccount?: null,
      _messagingFee?: null
    ): NewWhitelistMessagingFeeEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    globalMessagingFee(overrides?: CallOverrides): Promise<BigNumber>;

    messagingFeeFor(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    messagingFeeSenders(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    publicKeyOf(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    sendMessageTo(
      _message: PromiseOrValue<string>,
      _address: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setGlobalMessagingFee(
      _newMessagingFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setMessagingFee(
      _newFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setPublicKey(
      _public_key: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setWhiteListFee(
      _from: PromiseOrValue<string>,
      _newFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdraw(
      _address: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    globalMessagingFee(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    messagingFeeFor(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    messagingFeeSenders(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    publicKeyOf(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    sendMessageTo(
      _message: PromiseOrValue<string>,
      _address: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setGlobalMessagingFee(
      _newMessagingFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setMessagingFee(
      _newFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setPublicKey(
      _public_key: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setWhiteListFee(
      _from: PromiseOrValue<string>,
      _newFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      _address: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
