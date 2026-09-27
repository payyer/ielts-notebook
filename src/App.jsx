import { Routes, Route, NavLink, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import LessonPage from './pages/LessonPage.jsx';
import ReviewPage from './pages/ReviewPage.jsx';
import GrammarHub from './pages/GrammarHub.jsx';

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="logo">📘 IELTS Notebook</Link>
        <nav>
          <NavLink to="/" end>Lessons</NavLink>
          <NavLink to="/review">Vocabulary</NavLink>
          <NavLink to="/grammar">Grammar</NavLink>
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lesson/:id" element={<LessonPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/grammar" element={<GrammarHub />} />
          <Route path="*" element={<p>Page not found. <Link to="/">Back to home</Link></p>} />
        </Routes>
      </main>
    </div>
  );
}
