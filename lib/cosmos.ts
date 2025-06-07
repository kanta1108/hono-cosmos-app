// DB初期化ロジック
import { CosmosClient, Container } from "@azure/cosmos";

const endpoint = process.env.COSMOS_DB_ENDPOINT!;
const key = process.env.COSMOS_DB_KEY!;
const databaseId = process.env.COSMOS_DB_DATABASE!;
const containerId = process.env.COSMOS_DB_CONTAINER!;

// CosmosClient はアプリ内で再利用できるように1回だけ生成
const client = new CosmosClient({endpoint, key})

/**
 * Cosmos DBのコンテナを取得する
 */
export const getContainer = async():Promise<Container> =>{
    const {database} = await client.databases.createIfNotExists({id:databaseId})
    const {container} = await database.containers.createIfNotExists({id:containerId})
    return container
}