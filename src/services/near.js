import { keyStores, Near, WalletConnection, utils } from "near-api-js";
import BN from "bn.js";

export const CONTRACT_ID = "dev-1631287157094-93706410058436";
const gas = new BN("70000000000000");

// use new NEAR to avoid async/await
export const near = new Near({
  networkId: "testnet",
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
});

export const wallet = new WalletConnection(near, "museum");

// function  to get Memes
export const getMemes = () => {
  return wallet.account().viewFunction(CONTRACT_ID, "get_meme_list", {});
};

// function  to add  meme (not working)
export const addMeme = ({ meme, title, data, category }) => {
  return wallet.account().functionCall({
    contractId: CONTRACT_ID,
    methodName: "add_meme",
    gas,
    args: { meme, title, data, category },
    attachedDeposit: utils.format.parseNearAmount("3"),
  });
};

// function  to get  info about meme
export const getMeme = (meme) => {
  const memeContractId = meme + "." + CONTRACT_ID;
  return wallet.account().viewFunction(memeContractId, "get_meme", {});
};

// function to get  meme`s  comment
export const getMemeComments = (meme) => {
  const memeContractId = meme + "." + CONTRACT_ID;
  return wallet
    .account()
    .viewFunction(memeContractId, "get_recent_comments", {});
};

// function  to  add comment
export const addComment = ({ memeId, text }) => {
  const memeContractId = `${memeId}.${CONTRACT_ID}`;
  return wallet.account().functionCall({
    contractId: memeContractId,
    methodName: "add_comment",
    args: { text },
  });
};

export const donate = ({ memeId, amount }) => {
  const memeContractId = `${memeId}.${CONTRACT_ID}`;

  return wallet.account().functionCall({
    contractId: memeContractId,
    methodName: "donate",
    attachedDeposit: utils.format.parseNearAmount(amount),
  });
};

export const vote = ({ memeId, value }) => {
  const memeContractId = `${memeId}.${CONTRACT_ID}`;

  return wallet.account().functionCall({
    contractId: memeContractId,
    methodName: "vote",
    args: { value },
  });
};