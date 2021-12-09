<template>
    
     <TransitionRoot as="template" :show="modalOpen">
        <Dialog as="div" class="fixed z-1000 inset-0 overflow-y-auto"  @close="this.$emit('closeModal')">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                    <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div class="fixed top-0  w-full h-screen bg-50 z-50">
        <section class="fixed overflow-y-auto w-full h-full bg-50 z-50 py-12">
        <div class="flex justify-center">

            <!-- Meme -->
            <div class="relative w-meme pt-4 pb-12 bg-white rounded-3xl mt-16">

                <!-- Decorative images -->
                <img src="@/assets/img/image1411meme.png" alt="" class="absolute -top-12 right-16">
                <img src="@/assets/img/image198.png" alt="" class="absolute -bottom-4 -left-4">

                <!-- Close button -->
                <div class="flex justify-end">
                    <button @click="this.$emit('closeModal')" class="mx-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                            <path d="M24.9191 7.08331L16.9999 15.0025L9.08075 7.08331L7.08325 9.08081L15.0024 17L7.08325 24.9191L9.08075 26.9166L16.9999 18.9975L24.9191 26.9166L26.9166 24.9191L18.9974 17L26.9166 9.08081L24.9191 7.08331Z" fill="#2E3A59"/>
                        </svg>
                    </button>
                </div>

                <div class="px-8">

                    <!-- Meme name - date -->
                    <div class="flex items-center justify-between">
                        <p class="text-gradient-pink text-xl md:text-3xl font-bold">{{ meme.info.title }}</p>
                        <p class="text-gray-400 text-xs md:text-sm">
                            {{
                                format(
                                    new Date(
                                        fromUnixTime(
                                            parseInt(meme.info.created_at.substring(0,10))
                                        )
                                    ),
                                    "MMMM do yyyy"
                                )
                            }}
                            </p>
                    </div>
                    
                    <!-- Owner -->
                    <a class="text-gray-900 hover:underline text-sm md:text-base">{{ meme.id }}.{{ contractId }}.testnet</a>

                    <!-- Meme image -->
                    <img    :src="meme.image" 
                            :alt="meme.info.title"  
                            class="w-full mt-4 rounded-3xl"/>

                    <!-- Donations - Category - Score -->
                    <div class="flex justify-between mt-9">
                        <div class="text-center">
                            <p class="text-black text-xl font-bold">donations</p>
                            <p class="text-gradient-pink font-bold text-2xl">{{ meme.info.total_donations / 1e24 }} Ⓝ</p>
                        </div>
                        <div class="text-center">
                            <p class="text-black text-xl font-bold">category</p>
                            <p class="text-gradient-pink font-bold text-2xl">{{ meme.info.category }}</p>
                        </div>
                        <div class="text-center">
                            <p class="text-black text-xl font-bold">score</p>
                            <p class="text-gradient-pink font-bold text-2xl">{{ meme.info.vote_score }}</p>
                        </div>
                    </div>

                    <!-- Buttons -->
                    <div class="flex space-x-1 lg:space-x-2 mt-11">
                        <button @click="donate({ memeId: meme.id, amount: '1'})" class="mt-2 flex items-center justify-center w-1/2 border-2 border-white text-xs md:text-lg py-2 bg-gradient-to-r from-blue-500 hover:border-blue-600 to-blue-600 hover:text-blue-600 hover:from-white hover:to-white hover:shadow-xl text-white text-center font-bold rounded-md transform active:scale-95 duration-200">
                            Donate 1 Ⓝ
                        </button>
                        <!-- Vote like -->
                        <button @click="vote({ memeId: meme.id, value: 1 })" class="flex items-center justify-center mt-2 py-3 text-blue-600 text-xs md:text-lg font-bold w-1/4 hover:bg-blue-600 hover:text-white rounded-md border-2 border-blue-600 transform active:scale-95 duration-200">
                            <svg class="mr-0 lg:mr-2" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <path d="M2.19672 9.30004C2.19647 7.85037 2.7791 6.46149 3.81353 5.44586C4.84796 4.43024 6.2473 3.87319 7.69672 3.90004C9.41404 3.89092 11.0527 4.61921 12.1967 5.90004C13.3407 4.61921 14.9794 3.89092 16.6967 3.90004C18.1461 3.87319 19.5455 4.43024 20.5799 5.44586C21.6143 6.46149 22.197 7.85037 22.1967 9.30004C22.1967 14.656 15.8177 18.7 12.1967 21.9C8.58372 18.673 2.19672 14.66 2.19672 9.30004Z" fill="currentColor"/>
                            </svg>
                            Vote
                        </button>

                        <!-- Vote dislike -->
                        <button  @click="vote({ memeId: meme.id, value: -1 })" class="flex items-center justify-center mt-2 py-3 text-red-500 text-xs md:text-lg font-bold w-1/4 hover:bg-red-500 hover:text-white rounded-md border-2 border-red-500 transform active:scale-95 duration-200">
                            <svg class="mr-0 lg:mr-2" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <g clip-path="url(#clip0)">
                                <path d="M12.4896 21.9452C11.8446 21.3732 11.1156 20.7782 10.3446 20.1452H10.3346C7.61959 17.9252 4.54259 15.4132 3.18359 12.4032C2.7371 11.4449 2.50049 10.4023 2.48957 9.34516C2.48659 7.89464 3.06836 6.50414 4.10339 5.48792C5.13843 4.4717 6.53937 3.91555 7.98959 3.94516C9.17021 3.94702 10.3254 4.28824 11.3176 4.92816C11.7536 5.21112 12.148 5.55341 12.4896 5.94516C12.8331 5.55495 13.2276 5.21286 13.6626 4.92816C14.6543 4.28811 15.8092 3.94687 16.9896 3.94516C18.4398 3.91555 19.8407 4.4717 20.8758 5.48792C21.9108 6.50414 22.4926 7.89464 22.4896 9.34516C22.4794 10.404 22.2428 11.4483 21.7956 12.4082C20.4366 15.4182 17.3606 17.9292 14.6456 20.1452L14.6356 20.1532C13.8636 20.7822 13.1356 21.3772 12.4906 21.9532L12.4896 21.9452ZM7.98959 5.94516C7.0581 5.9335 6.15966 6.29 5.48959 6.93716C4.84397 7.57132 4.48314 8.4402 4.4895 9.34516C4.50091 10.1157 4.67541 10.875 5.00159 11.5732C5.6431 12.8719 6.50869 14.0472 7.55859 15.0452C8.54959 16.0452 9.68958 17.0132 10.6756 17.8272C10.9486 18.0522 11.2266 18.2792 11.5046 18.5062L11.6796 18.6492C11.9466 18.8672 12.2226 19.0932 12.4896 19.3152L12.5026 19.3032L12.5086 19.2982H12.5146L12.5236 19.2912H12.5286H12.5336L12.5516 19.2762L12.5926 19.2432L12.5996 19.2372L12.6106 19.2292H12.6166L12.6256 19.2212L13.2896 18.6762L13.4636 18.5332C13.7446 18.3042 14.0226 18.0772 14.2956 17.8522C15.2816 17.0382 16.4226 16.0712 17.4136 15.0662C18.4636 14.0687 19.3292 12.8937 19.9706 11.5952C20.3027 10.891 20.4796 10.1237 20.4896 9.34516C20.4937 8.44299 20.1331 7.57745 19.4896 6.94516C18.8208 6.29507 17.9222 5.93564 16.9896 5.94516C15.8515 5.93548 14.7635 6.41252 13.9996 7.25616L12.4896 8.99616L10.9796 7.25616C10.2156 6.41252 9.12766 5.93548 7.98959 5.94516Z" fill="currentColor"/>
                                <line x1="1.46788" y1="22.4232" x2="23.6918" y2="3.46749" stroke="currentColor" stroke-width="1.96094"/>
                                </g>
                                <defs>
                                <clipPath id="clip0">
                                <rect x="0.489594" y="0.945312" width="24" height="24" rx="6" fill="currentColor"/>
                                </clipPath>
                                </defs>
                            </svg>
                            Vote
                        </button>
                    </div>

                    <!-- Write comment -->
                    <div class="mt-8">
                        <p class="flex items-center text-xs md:text-xl font-bold pl-6">
                            write comment
                            <img src="@/assets/img/image284.png" alt="" class="ml-2">
                        </p>
                        <div class="flex">
                            <form>
                                <input  
                                    v-model="comment"
                                    type="comment"
                                    name="comment"
                                    id="comment"
                                    placeholder="Write a comment ..."
                                    class="mt-5 py-5 pl-6 bg-gray-200 rounded-l-2xl w-full outline-none border-2 border-gray-200 hover:border-blue-200 focus:border-blue-600"/>
                            </form>
                            <button @click="handleSubmit" class="flex items-center justify-center mt-5 w-40 bg-gray-200 hover:bg-blue-200 rounded-r-2xl text-blue-600  font-bold transform active:scale-95 duration-100">
                                Send
                                <img src="@/assets/img/image1382.png" alt="" class="ml-1">
                            </button>
                        </div>
                    </div>

                    <!-- Comments -->
                    <div class="">

                        <div    
                            v-for="comment in meme.comments"
                            :key="comment"
                            class="mt-5 px-6 py-5 rounded-3xl w-full bg-gradient-pink text-white">

                            <!-- Owner -->
                            <div class="flex justify-between items-center">
                                <a href="#" class="text-sm md:text-xl">{{ comment.author }}</a>
                                <p class="text-xs md:text-sm">
                                   {{
                                       format(
                                           new Date(
                                               fromUnixTime(
                                                   parseInt(comment.created_at.substring(0, 10))
                                               )
                                           ),
                                           "MMM do yyyy"
                                       )
                                   }}
                                </p>
                            </div>

                            <!-- Comment text -->
                            <p class="text-lg w-full md:w-3/4 mt-2">
                                {{ comment.text }}
                            </p>

                        </div>

                    </div>

                </div>
            </div>

        </div>
    </section>
    </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>

</template>

<script>
import { ref } from 'vue'
import { format, fromUnixTime } from "date-fns";
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue'
export default {
    components: {
        Dialog,
        DialogOverlay,
        TransitionChild,
        TransitionRoot
    },
    props: {
        meme: {
            type: Object,
            required: true
        },
        modalOpen: {
            type: Boolean,
            required: true
        },
        contractId: {
            type: String,
            required:true
        },
        addComment: {
            type: Function,
            required: true
        },
        donate: {
            type: Function,
            required: true
        },
        vote: {
            type: Function,
            required: true
        }
    },
    setup(props) {
        const comment = ref("");

        const handleSubmit = () => {
            props.addComment({
                memeId: props.meme.id,
                text: comment.value
            })
        }

        return { 
            format, 
            fromUnixTime,
            comment,
            handleSubmit
            }
    }
}
</script>