import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';
import { ADD_BANNER, GET_BANNER } from './graphql/query/query';
import { FormEvent, useState } from 'react';
const App = () => {
  // const { loading, error, data } = useQuery(gql(GET_BANNER));

  // GET ==> Banner
  const [getBanner, { data }] = useLazyQuery(gql(GET_BANNER));
  console.log(data);

  const [imageLink, setImageLink] = useState('');
  const [status, setStatus] = useState('');

  // POST ==> Banner
  const [createBanner, {loading, error, data: bannerData}] = useMutation(gql(ADD_BANNER));
  console.log(bannerData);


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createBanner({ variables: { imageLink, status } });
  };


  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <button type='button' onClick={() => getBanner()}>Get Banner</button>


      <form onSubmit={handleSubmit}>
        <input
          type="file"
          placeholder="Name"
          value={imageLink}
          onChange={(e) => setImageLink(e.target?.files[0])}
        />
        <input
          type="email"
          placeholder="Email"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />

        <input type="file" name="" id="" />

        <button type="submit">Create User</button>
      </form>



    </div>
  );
}
export default App;