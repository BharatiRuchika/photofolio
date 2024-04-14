import './App.css';
import Header from './components/header/header';
import Container from './components/container/container';

// Main App component
function App() {
  return (
    // Rendering the main structure of the application
    <div className="App">   {/* Main container */}
      <Header/>   {/* Header component */}
      <Container/>    {/* Main content container */}
    </div>
  );
}

// Exporting the App component as the default export
export default App;
