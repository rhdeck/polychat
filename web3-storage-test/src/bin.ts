#!/usr/bin/env node
import commander from "commander";
import dotenv from "dotenv";
import { getFilesFromPath, Web3Storage } from "web3.storage";
dotenv.config();
commander.description("CLI for testing web3.storage upload");
commander.usage("[options] <path> [morePaths ...]");
commander.option(
  "-t --token <token>",
  "Token to use for the request",
  process.env.WEB3STORAGE_APITOKEN
);
commander.option(
  "-e --endpoint <endpoint>",
  "Endpoint to use for the request",
  "https://api.web3.storage"
);
commander
  .parseAsync(process.argv)
  .then(async (args) => {
    //#region error handling
    const { token, endpoint } = commander as unknown as {
      token: string;
      endpoint: URL;
    };
    if (!token) {
      console.error("--token required");
      process.exit(1);
    }
    if (!endpoint) {
      console.error("--endpoint required");
      process.exit(1);
    }
    const paths = commander.args as string[];
    if (!paths.length) {
      console.error("Please supply the path to a file or directory");
      process.exit(1);
    }
    //#endregion
    const w3s = new Web3Storage({ token, endpoint });
    const files = [];
    for (const path of paths) {
      const pathFiles = await getFilesFromPath(path);
      files.push(...pathFiles);
    }
    console.log(`Uploading ${files.length} files`);
    const cid = await w3s.put(files);
    console.log("Content added with CID:", cid);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    process.exit();
  });
export { commander };
