import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './components/home/HomePage';
import BlogPage from './components/blog/BlogPage';
import BlogPostPage from './components/blog/BlogPostPage';
import ConductPage from './components/codeofconduct/ConductPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/code-of-conduct" element={<ConductPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App; 