import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import FileUpload from './page/FileUpload'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/fileupload' element={<FileUpload />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App