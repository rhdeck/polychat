const NFTSTORAGE_APIKEY = "NOSOUPFORYOU";
export const upload = async (buf: Buffer) => {
  //   const cid = "bafkreiaeppbzsvhoxifxq3dgwmiidto2p3j3agfb3vn5e3ur2rlhg5rqj4";
  const formData = new FormData();
  formData.append("file", new Blob([buf]));
  console.log(process.env);
  const result = await fetch("https://api.nft.storage/upload", {
    headers: {
      Authorization: "Bearer " + NFTSTORAGE_APIKEY,
    },
    method: "POST",
    body: formData,
  });
  const obj = await result.json();
  console.log("obj result is ", obj);
  return obj.value.cid + "/blob";
  //   const cid = await nftStorage.storeBlob(new Blob([buf]), {});
  //   return cid;
};
