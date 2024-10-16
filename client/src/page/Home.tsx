import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';
import { ADD_BANNER, GET_BANNER, UPLOAD_BANNER } from '../graphql/query/query';
import { ChangeEvent, FormEvent, useState } from 'react';
const Home = () => {
  // GET ==> Banner
  const [getBanner, { loading, data }] = useLazyQuery(gql(GET_BANNER));
  if(loading == false) {
    console.log(data)
  }
  // const [status, setStatus] = useState('');

  // POST ==> Banner
  // const [createBanner, {loading, error, data: bannerData}] = useMutation(gql(ADD_BANNER));
  // console.log(bannerData);

  // POST ==> Upload Banner 

  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   createBanner({ variables: { imageLink, status } });
  // };

  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <button type='button' onClick={() => getBanner()}>Get Banner</button>

{/* 
      <form onSubmit={handleSubmit} encType={'multipart/form-data'}>
   
        <button type="submit">Create User</button>
      </form> */}



    </div>
  );
}
export default Home