import React from 'react';
import { useForm } from 'react-hook-form';
import { addMeme } from '../../../services/near';
import { memeFormSchema } from '../../../validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultValues, formFields } from '../../../constants/inputData';

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
