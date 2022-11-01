import {CosmosClient} from "@azure/cosmos";

const endpoint = process.env.COSMOS_ENDPOINT || "https://blog-comments-azure-friday.documents.azure.com:443/";
const key = process.env.COSMOS_KEY;

const client = new CosmosClient({endpoint, key});

const databaseId = process.env.COSMOS_DATABASE_ID || "blog";
const containerId = process.env.COSOMOS_CONTAINER_ID || "comments";

const database = client.database(databaseId);
export const container = database.container(containerId);