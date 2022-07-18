<template>
    <!-- Header -->
    <header id="header" class="relative header-bg">

        <!-- Decorative emoji -->
        <img src="@/assets/img/image272.png" alt="explode" class="hidden md:block absolute top-0 right-0">
        <img src="@/assets/img/image1342.png" alt="trophy" class="hidden md:block absolute -bottom-12 left-0">
        <img src="@/assets/img/image1411.png" alt="trophy" class="hidden md:block absolute -bottom-12 right-0">

        <!-- Decorative lights -->
        <img src="@/assets/img/Ellipse22.png" alt="lights" class="hidden md:block absolute left-0 top-16">
        <img src="@/assets/img/Ellipse24.png" alt="lights" class="hidden md:block absolute left-44 xl:left-96 top-0">
        <img src="@/assets/img/Ellipse21.png" alt="lights" class="hidden md:block absolute right-0 top-44">


        <!-- Decorative line -->
        <div class="w-full h-3 bg-gradient-pink"></div>

        <div class="container mx-auto px-6">
            <!-- Navbar -->
            <nav class="mt-6 flex items-center justify-between py-3">
                <a href="https://github.com/Learn-NEAR/NCD.L1.sample--meme-museum" target="_blank" class="flex">
                    <img src="@/assets/img/near_logo_stack_1.png" alt="" class="border-r-2 border-white">
                    <div class="ml-2">
                        <p class="text-gradient-blue text-2xl font-bold tracking-tight">Memes</p>
                        <p class="-mt-2 font-josefin text-white text-2xl">museum</p>
                    </div>
                </a>
                <div class="flex items-center space-x-3">
                    <div class="flex items-center justify-center w-14 h-14 rounded-full bg-white">
                        <img src="@/assets/img/near_logo_stack2.png" alt="">
                    </div>

                    <!-- If logined -->
                    <div v-if="accountId">
                        <p class="text-gradient-blue text-sm md:text-base">{{ accountId }}</p>
                        <button @click="signOut" class="text-white font-bold ml-3">Log out</button>
                    </div>

                    <!-- If don't logined -->
                    <button v-else @click="signIn" class="ml-4 text-white text-sm md:text-xl font-bold">Log in with
                        <span class="text-gradient-blue">NEAR Wallet</span></button>

                </div>
            </nav>

            <!-- Offer -->
            <div class="pb-24 xl:pb-40 2xl:pb-48">
                <div class="lg:mt-3 2xl:mt-14 text-center">
                    <h1
                        class="flex justify-center items-baseline space-x-2 text-4xl lg:text-6xl 2xl:text-8xl text-white font-bold">
                        <img src="@/assets/img/image1123.png" alt="pig" class="w-9 lg:w-20 h-9 lg:h-20 mr-3 -pb-4">
                        Meme Museum
                        <span class="inline-block rounded-sm bg-gradient-blue w-2 md:w-5 h-2 md:h-5"></span>
                    </h1>
                    <p class="mt-2 2xl:mt-4 text-white text-base md:text-2xl tracking-wide">
                        Share your favorite MEME. Comment, vote and <br class="hidden lg:block"> engage with all the
                        cool memes
                    </p>
                </div>
                <AddMemeForm v-if="accountId" :addMeme="addMeme" :memes="memes" />
            </div>
        </div>

    </header>
</template>

<script>
import AddMemeForm from "@/components/AddMemeForm.vue"
export default {
    components: {
        AddMemeForm
    },
    props: {
        addMeme: {
            type: Function,
            required: true
        },
        memes: {
            type: Array,
            required: true
        },
        accountId: {
            typeof: String,
            required: true
        },
        signIn: {
            typeof: Function,
            required: true
        },
        signOut: {
            typeof: Function,
            required: true
        },
    }
}
</script>