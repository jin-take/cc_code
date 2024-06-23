import { IndexerClient, Network } from "@dydxprotocol/v4-client-js";

// setting up network for testnet and client config
const NETWORK = Network.testnet();
const client = new IndexerClient(NETWORK.indexerConfig);

// get server time
async function getServerTime() {
  try {
    const response = await client.utility.getTime();
    const timeIso = response.iso;
    const timeEpoch = response.epoch;
    console.log("timeIso", timeIso);
    console.log("timeEpoch", timeEpoch);

    return [timeIso, timeEpoch];
  } catch (error) {
    console.error("Error fetching server time:", error);
    throw error;
  }
}
getServerTime();


