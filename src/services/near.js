import BN from 'bn.js';
import { keyStores, Near, WalletConnection, utils } from 'near-api-js';

const gas = new BN(process.env.REACT_APP_GAS);

export const near = new Near({
  networkId: process.env.REACT_APP_NETWORK_ID,
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: process.env.REACT_APP_NODE_URL,
  walletUrl: process.env.REACT_APP_WALLET_URL,
});

export const wallet = new WalletConnection(near, 'meme-museum');

// --------------------------------------------------------------------------
// functions to sign
// --------------------------------------------------------------------------

export const signIn = () => {
  const CONTRACT_ID = localStorage.getItem('CONTRACT_ID');
  wallet.requestSignIn({
    contractId: CONTRACT_ID,
    methodNames: [], // add methods names to restrict access
  });
};

export const signOut = () => {
  wallet.signOut();
};

export const getAccountId = () => {
  return wallet.getAccountId();
};

// --------------------------------------------------------------------------
// functions to call contract Public VIEW methods
// --------------------------------------------------------------------------

// function  to get memes
export const getMemes = () => {
  const CONTRACT_ID = localStorage.getItem('CONTRACT_ID');
  return wallet.account().viewFunction(CONTRACT_ID, 'get_meme_list', {});
};

// function  to get  info about meme
export const getMeme = (meme) => {
  const CONTRACT_ID = localStorage.getItem('CONTRACT_ID');
  const memeContractId = meme + '.' + CONTRACT_ID;
  return wallet.account().viewFunction(memeContractId, 'get_meme', {});
};

// function to get  meme`s  comment
export const getMemeComments = (meme) => {
  const CONTRACT_ID = localStorage.getItem('CONTRACT_ID');
  const memeContractId = meme + '.' + CONTRACT_ID;
  return wallet.account().viewFunction(memeContractId, 'get_recent_comments', {});
};

// --------------------------------------------------------------------------
// functions to call contract Public CHANGE methods
// --------------------------------------------------------------------------

// function  to add  meme
export const addMeme = ({ meme, title, data, category }) => {
  const CONTRACT_ID = localStorage.getItem('CONTRACT_ID');
  category = parseInt(category);
  return wallet.account().functionCall({
    contractId: CONTRACT_ID,
    methodName: 'add_meme',
    gas,
    args: { meme, title, data, category },
    attachedDeposit: utils.format.parseNearAmount('3'),
  });
};

// function  to  add comment
export const addComment = ({ memeId, text }) => {
  const CONTRACT_ID = localStorage.getItem('CONTRACT_ID');
  const memeContractId = `${memeId}.${CONTRACT_ID}`;
  return wallet.account().functionCall({
    contractId: memeContractId,
    methodName: 'add_comment',
    args: { text },
  });
};

//function to donate
export const donate = ({ memeId, amount }) => {
  const CONTRACT_ID = localStorage.getItem('CONTRACT_ID');
  const memeContractId = `${memeId}.${CONTRACT_ID}`;
  return wallet.account().functionCall({
    contractId: memeContractId,
    methodName: 'donate',
    attachedDeposit: utils.format.parseNearAmount(amount),
  });
};

//function to vote for the meme
export const vote = ({ memeId, value }) => {
  const CONTRACT_ID = localStorage.getItem('CONTRACT_ID');
  const memeContractId = `${memeId}.${CONTRACT_ID}`;

  return wallet.account().functionCall({
    contractId: memeContractId,
    methodName: 'vote',
    args: { value },
  });
};
