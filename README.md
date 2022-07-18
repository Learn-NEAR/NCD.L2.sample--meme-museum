#  🎓 NCD.L2.sample--thanks dapp
This repository contains a complete frontend applications (Vue.js, React, Angular) to work with 
<a href="https://github.com/Learn-NEAR/NCD.L1.sample--meme-museum" target="_blank">NCD.L1.sample--meme-museum smart contract</a> targeting the NEAR platform:
1. Vue.Js (main branch)
2. React (react branch)
3. Angular (angular branch)

The goal of this repository is to make it as easy as possible to get started writing frontend with Vue.js, React and Angular for AssemblyScript contracts built to work with NEAR Protocol.


## ⚠️ Warning
Any content produced by NEAR, or developer resources that NEAR provides, are for educational and inspiration purposes only. NEAR does not encourage, induce or sanction the deployment of any such applications in violation of applicable laws or regulations.


## ⚡  Usage

![image](https://user-images.githubusercontent.com/38455192/139825787-9089159c-086e-4f28-b3be-cbf95cc8fa84.png)

UI walkthrough
<a href="https://www.loom.com/share/3b558ef14d4945338d4220964f075220" target="_blank">![image](https://user-images.githubusercontent.com/38455192/179209812-21dda94f-504f-4f87-bf7b-371cb9f1140b.png)</a>

You can use this app with contract id which was deployed by the creators of this repo or you can use it with your own deployed contract id.

To deploy sample--meme-museum to your account visit <a href="https://github.com/Learn-NEAR/NCD.L1.sample--meme-museum" target="_blank">this repo (smart contract deployment instructions are inside):</a> 

After you successfully deployed meme-museum and you have contract id, you can clone the repo and put contract ids inside .env file :

```
VUE_APP_THANKS_CONTRACT_ID = "put your thanks contract id here"
VUE_APP_REGISTRY_CONTRACT_ID="put your registry contract id here"
...
```

After you input your values inside .env file, you need to :
1. Install all dependencies 
```
npm install
```
or
```
yarn
```
2. Run the project locally
```
npm run serve
```
or 
```
yarn serve
```

Other commands:

Compiles and minifies for production
```
npm run build
```
or
```
yarn build
```
Lints and fixes files
```
npm run lint
```
or
```
yarn lint
```

## 👀 Code walkthrough for Near university students

<a href="https://www.loom.com/share/c38c6ac8c1d04afca0b4402f997374d2" target="_blank">Code walkthrough video</a>

We are using ```near-api-js``` to work with NEAR blockchain. In ``` /services/near.js ``` we are importing classes, functions and configs which we are going to use:
```
import { keyStores, Near, Contract, WalletConnection, utils } from "near-api-js";
```
Then we are connecting to NEAR:
```
// connecting to NEAR, new NEAR is being used here to awoid async/await
export const near = new Near({
    networkId: process.env.VUE_APP_networkId,
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: process.env.VUE_APP_nodeUrl,
    walletUrl: process.env.VUE_APP_walletUrl,
});

``` 
and creating wallet connection
```
export const wallet = new WalletConnection(near, "NCD.L2.sample--meme-museum");
```
After this by using Composition API we need to create ```useWallet()``` function and use inside ```signIn()``` and ```signOut()``` functions of wallet object. By doing this, login functionality can now be used in any component. 

And also we in return statement we are returning wallet object, we are doing this to call ``` wallet.getAccountId()``` to show accountId in ``` /components/Login.vue ```

``` useWallet()``` code :
```
export const useWallet = () => {
  const accountId = ref('')
  const err = ref(null)

  onMounted(async () => {
    try {
      accountId.value = wallet.getAccountId()
    } catch (e) {
      err.value = e;
      console.error(err.value);
    }
  });

  const handleSignIn = () => {
    wallet.requestSignIn({
      contractId: CONTRACT_ID,
      methodNames: [] // add methods names to restrict access
    })
  };

  const handleSignOut = () => {
    wallet.signOut()
    accountId.value = ''
  };

  return {
    accountId,
    signIn: handleSignIn,
    signOut: handleSignOut
  }
}
```

To work with smart meme-museum smart contract we will create separate ```useContracts()``` function with Composition API to split the logic. We are loading the contract inside  ``` /services/near.js:```
```
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
```

and we are creating function to export for each contract function

example of a call with no params: 
```
// function  to get memes
export const getMemes = () => {
  return memeMuseumContract.get_meme_list();
};
```

example of call with params 
```
// function  to add  meme
export const addMeme = ({ meme, title, data, category }) => {
  category = parseInt(category)
  return memeMuseumContract.add_meme(
    { meme, title, data, category },
    gas,
    utils.format.parseNearAmount("3")
  );
};
```

Then in ```composables/near.js``` we are just importing all logic from ```services/near.js```: 
```
import {
  wallet, 
  CONTRACT_ID,
  getMemes,
  addMeme,
  getMeme,
  getMemeComments,
  addComment,
  donate,
  vote,
} from "../services/near";
```

and using it to store some state of contracts and to call contracts functions: 
```
export const useMemes = () => {
  const memes = ref([]);
  const err = ref(null);

  //initialize memes  list
  onMounted(async () => {
    try {
      const memeIds = await getMemes();

      memes.value = (
        await Promise.all(
          memeIds.map(async (id) => {
            const info = await getMeme(id);
            const comments = await getMemeComments(id);

            return {
              id,
              info,
              comments,
              image: `https://img-9gag-fun.9cache.com/photo/${
                info.data.split("https://9gag.com/gag/")[1]
              }_460s.jpg`,
            };
          })
        )
      ).reverse();
    } catch (e) {
      err.value = e;
      console.log(err.value);
    }
  });

  return {
    memes,
    addMeme,
    addComment,
    donate,
    vote,
    CONTRACT_ID
  };
};
```

Also for each meme contract it is separate smart contract id, so for meme contract functions, this approach is used:
```
// function  to get  info about meme
// Contract class is not used because for each mem it will be needed to create new Contract instance for each function call
export const getMeme = (meme) => {
  const memeContractId = meme + "." + CONTRACT_ID;
  return wallet.account().viewFunction(memeContractId, "get_meme", {});
};
```

```/views/Home.vue```: 
```
setup() {
        const { accountId, signIn, signOut } = useWallet();
        const { memes, addMeme, addComment, donate, vote, CONTRACT_ID } = useMemes();
        return {
            accountId,
            signIn,
            signOut,
            memes,
            addMeme,
            addComment,
            donate,
            vote,
            CONTRACT_ID
        }
    }
```

And inside components we are using the same ``` useWallet()``` and ``` useMemes()``` functions to manage state of dapp. 