import "./App.css";
import Navbar from "./components/Navbar";
import Table from "./components/Table";

function App() {
  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="news-table">
        <Table />
      </div>
    </div>
  );
}

export default App;
