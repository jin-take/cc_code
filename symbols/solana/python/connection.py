import asyncio
from solana.rpc.async_api import AsyncClient

# connection api server
async def main():
    async with AsyncClient("https://api.mainnet-beta.solana.com") as client:
        res = await client.is_connected()
    print(res)  # True

    # Alternatively, close the client explicitly instead of using a context manager:
    client = AsyncClient("https://api.mainnet-beta.solana.com")
    res = await client.is_connected()
    print(res)  # True
    await client.close()

asyncio.run(main())