import { ref, onMounted } from "vue";
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
