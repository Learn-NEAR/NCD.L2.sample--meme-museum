<template>
  <form class="grid grid-cols-6 space-x-4 mt-2">
                                    <input class="col-span-4 py-2 pl-6 border border-gray-500 rounded-md w-full outline-none"
                                        v-model="comment"
                                        type="comment"
                                        name="comment"
                                        id="comment"
                                        placeholder="Write a comment">
                                        <button class="col-span-2 block bg-indigo-500 hover:bg-indigo-600 py-2 px-4 text-white text-center font-medium rounded-md"
                                    @click="handleSubmit">Send</button>
                                </form>
</template>

<script>
import { ref } from "vue";
export default {
    props: {
        addComment: {
            type:  Function,
            required: true,
        },
        memeId: {
            type: String,
            required: true,
        },
    },

    setup(props)  {
        const comment =  ref("")

        const handleSubmit = () => {
            props.addComment({
                memeId: props.memeId,
                text: comment.value
            })
        };

        return {
            comment,
            handleSubmit,
        };
    },
}
</script>