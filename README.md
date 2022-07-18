#  🎓 NCD.L2.sample--meme-museum dapp
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
<a href="https://www.loom.com/share/3b558ef14d4945338d4220964f075220" target="_blank">UI walkthrough</a>

You can use this app with contract id which was deployed by the creators of this repo or you can use it with your own deployed contract id.

To deploy sample--meme-museum to your account visit <a href="https://github.com/Learn-NEAR/NCD.L1.sample--meme-museum" target="_blank">this repo (smart contract deployment instructions are inside):</a> 

After you successfully deployed meme-museum and you have contract id, you can paste it here <a href="https://meme-museum-react-en7k.onrender.com/" target="_blank">deployed version</a> or you can clone the repo and put contract ids inside .env file :

```
REACT_APP_CONTRACT_ID=dev-1635829277525-22589246953534
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
npm run start
```
or 
```
yarn start
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

We are using ```near-api-js``` to work with NEAR blockchain. In ``` /services/near.js ``` we are importing classes, functions and configs which we are going to use:
```
import { keyStores, Near, Contract, WalletConnection, utils } from "near-api-js";
```
Then we are connecting to NEAR:
```
export const near = new Near({
  networkId: process.env.REACT_APP_NETWORK_ID,
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: process.env.REACT_APP_NODE_URL,
  walletUrl: process.env.REACT_APP_WALLET_URL,
});
``` 
and creating wallet connection
```
export const wallet = new WalletConnection(near, 'meme-museum');
```
After this by using API we can use ```wallet``` and call ```signIn()``` and ```signOut()``` functions of wallet object. By doing this, login functionality can now be used in any component.

```wallet``` code:
```
  await wallet().requestSignIn(contractId);
  wallet().getAccountId();
  wallet().signOut();
```

We are creating function to export for each contract function:

example of a call with no params: 
```
// function  to get memes
export const getMemes = () => {
  const CONTRACT_ID = localStorage.getItem('CONTRACT_ID');
  return wallet.account().viewFunction(CONTRACT_ID, 'get_meme_list', {});
};
```

example of call with params 
```
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
```

Then in ```context/ContractsProvider/index.jsx``` we are just state all global data and functions from ```services/near.js```: For example in AddMeme component
```
export const AddMemeForm = ({ memeIds }) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: yupResolver(memeFormSchema(memeIds)),
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    addMeme(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-14 w-full">
      <div className="flex flex-col lg:flex-row justify-center items-baseline lg:space-x-5">
        {formFields.map((field) => (
          <div key={field.id} className="flex flex-col relative mt-4 lg:mt-0">
            <p htmlFor={field.id} className="text-gray-400 pl-4">
              {field.label}
            </p>
            <input
              {...register(field.id)}
              type="text"
              id={field.id}
              placeholder={field.label}
              className="w-64 lg:w-44 xl:w-64 mt-2 py-3 rounded-md border-2 border-gray-900 focus:border-blue-600 outline-none pl-6"
            />
            {errors?.[field.id] && (
              <span className="absolute top-20 left-1 w-64 text-red-500">{errors?.[field.id]?.message}</span>
            )}
          </div>
        ))}

        <div className="mt-4 lg:mt-0">
          <p className="text-gray-400 pl-4 lg:pl-0">Category</p>
          <select
            {...register('category')}
            name="category"
            id="category"
            className="w-16 mt-2 py-3 rounded-md border-2 border-gray-900 focus:border-blue-600 outline-none px-3"
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className="mt-4 lg:mt-0">
          <p className="hidden lg:block text-transparent">buttons</p>
          <button
            type="submit"
            className="inline-block mt-2 w-64 lg:w-44 xl:w-64 py-3 bg-gradient-to-r from-blue-500 hover:from-white active:from-gray-200 to-blue-600 hover:to-white active:to-gray-200 text-white hover:text-blue-600 text-center font-semibold rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </form>
  );
};
```

Inside ```/pages/HomePage.jsx``` we have lifecycle hook ```useEffect()``` where we are getting all the data from the smart contract
```
export const HomePage = () => {
  const [accountId, setAccountId] = useState('');

  const { memes, memeIds } = useMemes();

  useEffect(() => {
    setAccountId(getAccountId() ?? '');
  }, []);

  return (
    <>
      <Header memeIds={memeIds} accountId={accountId} setAccountId={setAccountId} />
      <Memes accountId={accountId} memes={memes} />
      <Footer />
    </>
  );
};
```

And inside components we are using API request from services/near.js,for an example ```MemeCard.jsx:
```
export const MemeCard = ({
  selectedMeme,
  setSelectedMeme,
  dateFormat,
  match9gag,
  contractId,
  handleDonate,
  handleVote,
}) => {
  const [comments, setComments] = useState([]);

  const [inputComment, setInputComment] = useState([]);

  const getComments = useCallback(async () => {
    try {
      setComments(await getMemeComments(selectedMeme.id));
    } catch (error) {
      console.log(error);
    }
  }, [selectedMeme]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  const sendComment = () => {
    addComment({
      memeId: selectedMeme.id,
      text: inputComment,
    });
  };

```