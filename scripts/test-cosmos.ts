// DBの接続テスト用

import * as dotenv from "dotenv";// .envファイルの読み込み
dotenv.config({ path: ".env.local" }); 
import { CosmosClient } from "@azure/cosmos";

const endpoint = process.env.COSMOS_DB_ENDPOINT!;
const key = process.env.COSMOS_DB_KEY!;
const databaseId = process.env.COSMOS_DB_DATABASE!;
const containerId = process.env.COSMOS_DB_CONTAINER!;

const client = new CosmosClient({
    endpoint,
    key
});

async function main() {
    try{
        const {database} = await client.databases.createIfNotExists({id:databaseId});
        console.log(`Database "${databaseId}" created`);

        const {container} = await database.containers.createIfNotExists({id:containerId});
        console.log(`Container "${containerId}" created`);

        // テストデータの挿入
        const sampleItem={
            id:"test-id",
            title:"test-title",
            url:"https://example.com",
        }

        await container.items.upsert(sampleItem);
        console.log("Sample item inserted");

        // データの取得
        const {resources:items} = await container.items.readAll().fetchAll();
        console.log("Fetched items:", items);
        
    }catch(error){
        console.error("Error:", error);
    }
}

main();
