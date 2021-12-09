import { keyStores, Near, WalletConnection, utils } from "near-api-js";
import BN from "bn.js";

export const CONTRACT_ID = process.env.VUE_APP_CONTRACT_ID;
const gas = new BN( process.env.VUE_APP_gas );

export const near = new Near({
  networkId: process.env.VUE_APP_networkId,
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: process.env.VUE_APP_nodeUrl,
  walletUrl: process.env.VUE_APP_walletUrl,
});

export const wallet = new WalletConnection(near, "meme-museum");

// --------------------------------------------------------------------------
// functions to call contract Public VIEW methods
// --------------------------------------------------------------------------

// function  to get memes
export const getMemes = () => {
  return wallet.account().viewFunction(CONTRACT_ID, "get_meme_list", {});
};

// function  to get  info about meme
export const getMeme = (meme) => {
  const memeContractId = meme + "." + CONTRACT_ID;
  return wallet.account().viewFunction(memeContractId, "get_meme", {});
};

// function to get  meme`s  comment
export const getMemeComments = (meme) => {
  const memeContractId = meme + "." + CONTRACT_ID;
  return wallet.account().viewFunction(memeContractId, "get_recent_comments", {});
};

// --------------------------------------------------------------------------
// functions to call contract Public CHANGE methods
// --------------------------------------------------------------------------

// function  to add  meme
export const addMeme = ({ meme, title, data, category }) => {
  category = parseInt(category)
  return wallet.account().functionCall({
    contractId: CONTRACT_ID,
    methodName: "add_meme",
    gas,
    args: { meme, title, data, category },
    attachedDeposit: utils.format.parseNearAmount("3"),
  });
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

//function to donate
export const donate = ({ memeId, amount }) => {
  const memeContractId = `${memeId}.${CONTRACT_ID}`;
  return wallet.account().functionCall({
    contractId: memeContractId,
    methodName: "donate",
    attachedDeposit: utils.format.parseNearAmount(amount),
  });
};

//function to vote for the meme
export const vote = ({ memeId, value }) => {
  const memeContractId = `${memeId}.${CONTRACT_ID}`;

  return wallet.account().functionCall({
    contractId: memeContractId,
    methodName: "vote",
    args: { value },
  });
};