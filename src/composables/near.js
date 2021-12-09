import { ref, onMounted } from "vue";
import {
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

  const handleAddMeme = async ({ meme, title, data, category }) => {
    addMeme({ meme, title, data, category });
  };

  const handleAddComment = async ({ memeId, text }) => {
    await addComment({ memeId, text });
  };

  const handleDonate = async ({ memeId, amount }) => {
    await donate({ memeId, amount });
  };

  const handleVote = async ({ memeId, value }) => {
    await vote({ memeId, value });
  };

  return {
    memes,
    addMeme: handleAddMeme,
    addComment: handleAddComment,
    donate: handleDonate,
    vote: handleVote,
  };
};
