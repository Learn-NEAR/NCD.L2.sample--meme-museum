<template>
  <div class="mt-1">
                        <!-- Meme -->
                        <div class="p-4 bg-white rounded-md"
                            v-for="meme  in memes"
                            :key="meme"
                            >

                            <a 
                                :href="meme.info.data"
                                rel="noopener noreferrer nofollow"
                                target="_blank">
                                
                                <img class="w-full"
                                :src="meme.image"
                                :alt="meme.info.title"/>

                            </a>

                            <div class="mt-3 flex">
                                <div class="">
                                    <h2 class="text-xl text-gray-900 font-medium">{{meme.info.title}}</h2>
                                    <h3 class="text-gray-600">{{meme.id}}.dev-1631287157094-93706410058436</h3>
                                </div>
                                <div class="ml-auto">
                                    <h4 class="text-gray-600">
                                        {{
                                        format(
                                            new Date(
                                            fromUnixTime(
                                            parseInt(meme.info.created_at.substring(0, 10))
                                            )
                                        ),
                                        "MMM do yyyy"
                                        )
                                        }}
                                    </h4>
                                </div>
                            </div>

                            <div class="mt-6 grid grid-cols-3 space-x-6">
                                <div class="">
                                    <h5 class="text-gray-600 font-light text-xl text-center">Donations</h5>
                                    <h6 class="text-xl text-gray-800 font-medium text-center"> {{ meme.info.total_donations / 1e24 }} Ⓝ</h6>
                                </div>
                                <div class="">
                                    <h5 class="text-gray-600 font-light text-xl text-center">Category</h5>
                                    <h6 class="text-xl text-gray-800 font-medium text-center">{{meme.info.category}}</h6>
                                </div>
                                <div class="">
                                    <h5 class="text-gray-600 font-light text-xl text-center">Score</h5>
                                    <h6 class="text-xl text-gray-800 font-medium text-center">{{meme.info.vote_score}}</h6>
                                </div>
                            </div>

                            <div class="mt-6 p-6 bg-indigo-200 flex items-center rounded-md">
                                <p class="text-xl text-gray-900 font-medium">Vote</p>
                                <ul class="flex ml-6 space-x-4">
                                    <li class="">
                                        <button   @click.prevent="vote({ memeId: meme.id, value: -1 })" href="#" class="text-gray-600 hover:text-indigo-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                                            </svg>
                                        </button>
                                    </li>
                                    <li class="">
                                        <button @click.prevent="vote({ memeId: meme.id, value: 1 })" href="#" class="text-indigo-700 hover:text-indigo-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                            </svg>
                                        </button>
                                    </li>
                                </ul>
                                <a href="#" class="block ml-auto py-2 px-4 hover:bg-indigo-300 rounded-md border border-gray-900 font-medium">Donate 1 Ⓝ</a>
                            </div>

                            <hr class="mt-6 bg-gray-200">

                            <div class="mt-6">
                                <h4 class="text-lg text-gray-800 font-medium">Comments</h4>
                                <CommentForm :addComment="addComment" :memeId="meme.id"/>
                            </div>
                            <div class="mt-6 px-6 py-4 bg-indigo-200 rounded-md"
                                v-for="comment  in meme.comments"
                                :key="comment">
                                <div class="flex">
                                    <h3 class="text-gray-600 font-light">{{ comment.author }}</h3>
                                    <p class="ml-auto text-gray-600 font-light">{{
                    format(
                      new Date(
                        fromUnixTime(
                          parseInt(comment.created_at.substring(0, 10))
                        )
                      ),
                      "MMM do yyyy"
                    )
                  }}</p>
                                </div>
                                <p class="text-lg text-gray-900 font-medium">
                                    {{ comment.text }}
                                </p>
                            </div>

                        </div>
                    </div>
</template>

<script>
import { format, fromUnixTime } from "date-fns";
import CommentForm from '@/components/CommentForm.vue';

export default {
    components: {
        CommentForm
    },
    props: {
        memes: {
            type: Array,
            required: true
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
    setup() {
        return { format, fromUnixTime }
    }
}
</script>