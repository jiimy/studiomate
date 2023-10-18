import Detail from 'page/detail/Detail';
import Main from 'page/main/Main';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path="/pokemon/:id" element={<Detail />} />
    </Routes>
  );
}

export default App;
