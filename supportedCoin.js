import { CoinGeckoClient } from 'coingecko-api-v3';
const client = new CoinGeckoClient({
    timeout: 10000,
    autoRetry: true,
});

/**
 * This script generates supported coin from coinGecko API
 */
const supportedCoins = async () => {
    const coinList = await client.coinList();

    const coins = coinList.filter((coin) => {
        if (["oec-biance-coin", "ethereum", "solana", "bitcoin", "fantom", "avalanche-2", "ime-lab", "algorand", "cardano", "polkadot", "chainlink", "matic-network"].includes(coin.id)) {
            return coin.id;
        }
    });

    fs.writeFileSync(join("./", "coins.json"), JSON.stringify(coins));
}

supportedCoins()