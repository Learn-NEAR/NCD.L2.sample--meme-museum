<template>
    <Header :accountId="accountId" :signIn="signIn"
        :signOut="signOut" :addMeme="addMeme" :memes="memes" />
    <Memes :accountId="accountId" :signIn="signIn" :memes="memes" :contractId="CONTRACT_ID" :addComment="addComment"
        :donate="donate" :vote="vote" />
    <Footer />
</template>

<script>
import Header from '@/components/Header.vue'
import Memes from '@/components/Memes.vue'
import Footer from '@/components/Footer.vue'
import { useMemes, useWallet } from "@/composables/near"
export default {
    components: {
        Header,
        Memes,
        Footer
    },
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
}
</script>