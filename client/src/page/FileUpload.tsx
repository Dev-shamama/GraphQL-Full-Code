import { gql, useMutation } from '@apollo/client';

const UPLOAD_FILE = gql`
  mutation SingleUpload($file: Upload!) {
  singleUpload(file: $file) {
    url
  }
}
`

const FileUpload = () => {

  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: data => console.log(data)
  })

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if(!file) return
    uploadFile({variables: {file: file}})
  } 

  return (
    <>
    <h1>Upload File</h1>
    <input type="file" onChange={handleFileChange} />
    </>
  );
};


export default FileUpload