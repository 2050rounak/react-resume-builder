import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-4xl font-bold mb-4">Professional Resume Builder</h1>
      <p className="mb-6 text-gray-600">Create your resume for Google, Microsoft and more</p>
      <button
        onClick={() => navigate('/builder')}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Start Building
      </button>
    </div>
  );
}
