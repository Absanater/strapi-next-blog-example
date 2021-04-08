import React, {useState} from 'react';
import useSWR from 'swr';
import { useForm } from "react-hook-form";
import apiRequest from '../../utils/api';
import subMinutes from 'date-fns/subMinutes';
import lightFormat from 'date-fns/lightFormat';


const BlogComments = ({ blogPage }) => {
  const {loading, data, mutate} = useSWR(`/comments?blog_post.id=${blogPage}`);
  const { register, handleSubmit, watch, errors, reset } = useForm();

  const onSubmit = async (formData) => {
    const newComment = await apiRequest.post('/comments', {
      ...formData,
      blog_post: blogPage
    });

    await mutate([...data, newComment.data], false);
    reset();
  }

  return (
    <div>
      <h1>
        Blog Comments
      </h1>
      {loading ? (
        <p>Loading</p>
      ) : (
        <div>
          {data?.map(comment => (
            <div key={comment.id}>
              <h4>{comment.name} - {lightFormat(new Date(comment.published_at), 'yyyy-MM-dd')}</h4>
              <p>{comment.description}</p>
            </div>
          ))}
        </div>
      )}
      <h3>
        Add new comment
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="name" ref={register({ required: true })} style={{ display: 'block', width: '100% '}} type={'text'} />
        {errors.name && <span>This field is required</span>}
        <textarea name="description" ref={register({ required: true })} style={{ display: 'block', width: '100%', margin: '20px 0'}} />
        {errors.description && <span>This field is required</span>}
        <button style={{ display: 'block' }}>Submit</button>
      </form>
    </div>
  );
};

export default BlogComments;
