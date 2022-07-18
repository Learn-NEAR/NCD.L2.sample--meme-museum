import { keyStores, Near, WalletConnection, Contract, utils } from "near-api-js";
import BN from "bn.js";

export const CONTRACT_ID = process.env.VUE_APP_CONTRACT_ID;
const gas = new BN(process.env.VUE_APP_gas);

export const near = new Near({
  networkId: process.env.VUE_APP_networkId,
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: process.env.VUE_APP_nodeUrl,
  walletUrl: process.env.VUE_APP_walletUrl,
});

export const wallet = new WalletConnection(near, "NCD.L2.sample--meme-museum");

function getMemeMuseumContract() {
  return new Contract(
    wallet.account(), // the account object that is connecting
    CONTRACT_ID, // name of contract you're connecting to
    {
      viewMethods: ['get_meme_list', 'get_meme', 'get_recent_comments'], // view methods do not change state but usually return a value
      changeMethods: ['add_meme', 'add_comment', 'donate', 'vote'] // change methods modify state
    }
  )
}

const memeMuseumContract = getMemeMuseumContract()

// --------------------------------------------------------------------------
// functions to call contract Public VIEW methods
// --------------------------------------------------------------------------

// function  to get memes
export const getMemes = () => {
  return memeMuseumContract.get_meme_list();
};

// function  to get  info about meme
// Contract class is not used because for each mem it will be needed to create new Contract instance for each function call
export const getMeme = (meme) => {
  const memeContractId = meme + "." + CONTRACT_ID;
  return wallet.account().viewFunction(memeContractId, "get_meme", {});
};

// function to get  meme's  comment
// Contract class is not used because for each mem it will be needed to create new Contract instance for each function call
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
  return memeMuseumContract.add_meme(
    { meme, title, data, category },
    gas,
    utils.format.parseNearAmount("3")
  );
};

// function  to  add comment
// Contract class is not used because for each mem it will be needed to create new Contract instance for each function call
export const addComment = ({ memeId, text }) => {
  const memeContractId = `${memeId}.${CONTRACT_ID}`;
  return wallet.account().functionCall({
    contractId: memeContractId,
    methodName: "add_comment",
    args: { text },
  });
};

//function to donate
// Contract class is not used because for each mem it will be needed to create new Contract instance for each function call
export const donate = ({ memeId, amount }) => {
  const memeContractId = `${memeId}.${CONTRACT_ID}`;
  return wallet.account().functionCall({
    contractId: memeContractId,
    methodName: "donate",
    attachedDeposit: utils.format.parseNearAmount(amount),
  });
};

//function to vote for the meme
// Contract class is not used because for each mem it will be needed to create new Contract instance for each function call
export const vote = ({ memeId, value }) => {
  console.log(memeId)
  console.log(value)
  const memeContractId = `${memeId}.${CONTRACT_ID}`;
  return wallet.account().functionCall({
    contractId: memeContractId,
    methodName: "vote",
    args: { value },
  });
};