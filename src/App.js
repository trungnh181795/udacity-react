import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Route, RouterProvider, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import { router } from './router';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import BookDetail from './pages/BookDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className='main-body'>
          <Routes>
            <Route element={<Home />} path='/' />
            <Route element={<Search />} path='/search' />
            <Route element={<BookDetail />} path='/book/:id' />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
