<template>
  <div class="col-span-12 md:col-span-3 ">
              <!-- Add section open -->

                    <!-- Add meme section -->
                    <div class="mt-6 px-6 py-4 w-full rounded-md bg-indigo-200">
                        <h3 class="text-lg font-medium text-gray-900">Add meme</h3>
                        <p class="text-gray-500">Share your favorite MEME</p>
                        <Form
                            @submit="handleSubmit"
                            :validation-schema="schema"
                            class="mt-4">

                            <div 
                                v-for="field  in  formFields"
                                :key="field.id">
                                <div>
                                    <p :for="field.id" class="text-gray-800 font-semibold">{{ field.label }}</p>

                                    <Field
                                        :v-model="field.id"
                                        type="text"
                                        :name="field.id"
                                        :id="field.id"
                                        :placeholder="field.label"
                                        class="w-full mt-2 py-2 pl-6 text-gray-900 font-semibold bg-indigo-100 rounded-md outline-none border-2 focus:border-indigo-500"/>
                                </div>
                                <ErrorMessage :name="field.id" class="w-64 text-red-500" />
                            </div>

                            <Field 
                            as="select"
                            v-model="category"
                            name="category"
                            id="category"
                            class="w-full mt-6 py-2 pl-6 rounded-md bg-indigo-100 text-gray-900 font-medium outline-none border-2 focus:border-indigo-500"
                            >
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </Field>

                            <button class="w-full block mt-6 py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white text-center font-medium outline-none">Add</button>

                        </Form>
                    </div>
                  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import { useForm, useField, Form, Field, ErrorMessage } from "vee-validate";

export default {
    props: {
        addMeme: {
            type:Function,
            required:true,
        },
        memes: {
            type:Array,
            required:true,
        }
    },
    components: {
        Form,
        Field,
        ErrorMessage
    },
    setup(props) {
        const memesIds = ref();
        watchEffect(() => {
            memesIds.value = props.memes.map((meme) => {
                return meme.id
            });
        });

        const schema = {
            meme(value) {
                if (!value) {
                    return "This  field is required";
                }
                if (value.length < 2) {
                    return "minimum length is 2";
                } 
                if (value === memesIds.value.find((id) => id === value)) {
                    return "This meme is already taken, please choose another one";
                }
                if (
                    // eslint-disable-next-line
                    !/^(([a-z\d]+[\-_])*[a-z\d]+\.)*([a-z\d]+[\-_])*[a-z\d]+$/.test(value)
                ) {
                    return "This memeId doesn't follow  the NEAR Protocol account naming system";
                }
                return  true;
            },
            title(value) {
                if (!value) {
                    return "This  field is required";
                }
                if (value.length < 2) {
                    return "minimum length is 2";
                } 
                return  true;
            },
            data(value) {
                if (
                    // eslint-disable-next-line
                    !/(https:|http:)+(\/\/)+(9gag\.com\/gag\/)+\S/.test(value)
                ) {
                    return "This should be a 9gag link";
                }
                return true;
            },
        };

        useForm({
            validationSchema: schema
        });

        // eslint-disable-next-line no-unused-vars
        const { value: meme, errorMessage: memeError } = useField("meme");
        // eslint-disable-next-line no-unused-vars
        const { value: title, errorMessage: titleError } = useField("title");
        // eslint-disable-next-line no-unused-vars
        const { value: data, errorMessage: dataError } = useField("data");

        const category =  ref(0);

        const  handleSubmit = (values) => {
            props.addMeme(values)
        }

        const  formFields = [
            {
                label: "Meme  name",
                id: "meme",
            },
            {
                label: "Title",
                id: "title",
            },
            {
                label:"9gag Link",
                id: "data",
            },
        ];

        return {
            schema,
            category,
            handleSubmit,
            formFields
        }
    }

}
</script>