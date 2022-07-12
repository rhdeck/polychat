#!/usr/bin/env node
import commander from "commander";
import { NFTStorage } from "nft.storage";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import Blob from "cross-blob";
dotenv.config();
commander.parseAsync(process.argv).then(async (args) => {
    const token = process.env.NFTSTORAGE_APIKEY;
    if (!token) {
        process.exit(1);
        return;
    }
    const ns = new NFTStorage({ token });
    const contents = readFileSync("../first-app/public/logo512.png");
    const cid = await ns.storeBlob(new Blob([contents]), {});
    console.log("Exported cid", cid);
});
export { commander };
//# sourceMappingURL=bin.mjs.map