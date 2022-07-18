<template>
    <Form @submit="handleSubmit" :validation-schema="schema" class="mt-14 w-full">

        <div class="flex flex-col lg:flex-row justify-center items-baseline lg:space-x-5">
            <div v-for="field in formFields" :key="field" class="mt-4 lg:mt-0">
                <p :for="field.id" class="text-gray-400 pl-4">{{ field.label }}</p>
                <Field :v-model="field.id" type="text" :name="field.id" :id="field.id" :placeholder="field.label"
                    class="w-64 lg:w-44 xl:w-64 mt-2 py-3 rounded-md border-2 border-gray-900 focus:border-blue-600 outline-none pl-6" />
                <ErrorMessage :name="field.id" class="w-64 text-red-500" />
            </div>

            <div class="mt-4 lg:mt-0">
                <p class="text-gray-400 pl-4 lg:pl-0">Category</p>
                <Field as="select" v-model="category" name="category" id="category"
                    class="w-16 mt-2 py-3 rounded-md border-2 border-gray-900 focus:border-blue-600 outline-none px-3">
                    <option value="0">0</option>
                    <option value=1>1</option>
                    <option value=2>2</option>
                    <option value=3>3</option>
                    <option value=4>4</option>
                </Field>
            </div>
            <div class="mt-4 lg:mt-0">
                <p class="hidden lg:block text-transparent">buttons</p>
                <button
                    class="inline-block mt-2 w-64 lg:w-44 xl:w-64 py-3 bg-gradient-to-r from-blue-500 hover:from-white active:from-gray-200 to-blue-600 hover:to-white active:to-gray-200 text-white hover:text-blue-600 text-center font-semibold rounded-md">Send</button>
            </div>
        </div>

    </Form>
</template>

<script>
import { ref, watchEffect } from "vue";
import { useForm, useField, Form, Field, ErrorMessage } from "vee-validate";

export default {
    props: {
        addMeme: {
            type: Function,
            required: true
        },
        memes: {
            type: Array,
            required: true
        }
    },
    components: {
        Form,
        Field,
        ErrorMessage
    },
    setup(props) {
        const memeIds = ref()
        watchEffect(() => {
            memeIds.value = props.memes.map((meme) => {
                return meme.id;
            })
        })

        //set of rules which is used during validation process
        const schema = {
            meme(value) {
                if (!value) {
                    return "Name is required"
                }
                if (value.length < 2) {
                    return "Must be at least 2 characters"
                }
                if (value === memeIds.value.find((id) => id === value)) {
                    return "This id is already in use"
                }
                //check if id is correct, according to the near naming system
                if (
                    // eslint-disable-next-line
                    !/^(([a-z\d]+[\-_])*[a-z\d]+\.)*([a-z\d]+[\-_])*[a-z\d]+$/.test(value)
                ) {
                    return "This Id is not correct, according to the NEAR Protocol account names system.";
                }
                return true
            },
            title(value) {
                if (!value) {
                    return "title is required"
                }
                if (value.length < 2) {
                    return "Must be at least 2 characters"
                }
                return true
            },
            data(value) {
                if (
                    // Checks if this is a correct  format link
                    // eslint-disable-next-line
                    !/(https:|http:)+(\/\/)+(9gag\.com\/gag\/)+\S/.test(value)
                ) {
                    return "This should be a 9gag link"
                }
                return true
            },
        };

        useForm({
            validationSchema: schema
        })

        /* eslint-disable no-unused-vars */
        const { value: meme, errorMessage: memeError } = useField("meme");
        const { value: title, errorMessage: titleError } = useField("title");
        const { value: data, errorMessage: dataError } = useField("data");
        /* eslint-enable no-unused-vars */

        const category = ref(0);


        const handleSubmit = (values) => {
            props.addMeme(values);
        };

        const formFields = [
            {
                label: "Meme Name",
                id: "meme",
            },
            {
                label: "Title",
                id: "title",
            },
            {
                label: "9gag Link",
                id: "data",
            },
        ];

        return {
            schema,
            category,
            handleSubmit,
            formFields,
        };
    }
}
</script>