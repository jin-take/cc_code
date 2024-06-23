import {
    Order_Side,
    Order_TimeInForce,
} from '@dydxprotocol/v4-proto/src/codegen/dydxprotocol/clob/order';
import Long from 'long';
import  'dotenv/config'
import { IPlaceOrder, OrderFlags } from './types';
import { StdFee } from '@cosmjs/stargate';

// Bech32 Prefix
export const BECH32_PREFIX = 'dydx';
export const NOBLE_BECH32_PREFIX = 'noble';

// Broadcast Defaults
export const BROADCAST_POLL_INTERVAL_MS: number = 300;
export const BROADCAST_TIMEOUT_MS: number = 8_000;

// API Defaults
export const API_TIMEOUT_DEFAULT_MS: number = 5_000;

// Gas
export const GAS_MULTIPLIER: number = 1.4;

export const ZERO_FEE: StdFee = {
  amount: [],
  gas: '0',
};

// Validation
export const MAX_UINT_32 = 4_294_967_295;
export const MAX_SUBACCOUNT_NUMBER = 128_000;

export const DEFAULT_SEQUENCE: number = 0;

export const SERIALIZED_INT_ZERO: Uint8Array = Uint8Array.from([0x02]);


//   export const DYDX_TEST_ADDRESS = 'dydx14zzueazeh0hj67cghhf9jypslcf9sh2n5k6art';
//   export const DYDX_TEST_PRIVATE_KEY = 'e92a6595c934c991d3b3e987ea9b3125bf61a076deab3a9cb519787b7b3e8d77';
//   export const DYDX_TEST_MNEMONIC = 'mirror actor skill push coach wait confirm orchard lunch mobile athlete gossip awake miracle matter bus reopen team ladder lazy list timber render wait';
export const DYDX_TEST_ADDRESS = process.env.JIN_DYDX_TESTNET_ADDRESS
export const DYDX_TEST_PRIVATE_KEY = process.env.JIN_DYDX_TESTNET_PRIVATE_KEY
export const DYDX_TEST_MNEMONIC = process.env.JIN_DYDX_TESTNET_MNEMONIC
export const DYDX_LOCAL_ADDRESS = 'dydx199tqg4wdlnu4qjlxchpd7seg454937hjrknju4';
export const DYDX_LOCAL_MNEMONIC = 'merge panther lobster crazy road hollow amused security before critic about cliff exhibit cause coyote talent happy where lion river tobacco option coconut small';

export const MARKET_BTC_USD: string = 'BTC-USD';
export const PERPETUAL_PAIR_BTC_USD: number = 0;

const quantums: Long = new Long(1_000_000_000);
const subticks: Long = new Long(1_000_000_000);

export const MAX_CLIENT_ID = 2 ** 32 - 1;

// PlaceOrder variables
export const defaultOrder: IPlaceOrder = {
clientId: 0,
orderFlags: OrderFlags.SHORT_TERM,
clobPairId: PERPETUAL_PAIR_BTC_USD,
side: Order_Side.SIDE_BUY,
quantums,
subticks,
timeInForce: Order_TimeInForce.TIME_IN_FORCE_UNSPECIFIED,
reduceOnly: false,
clientMetadata: 0,
};
