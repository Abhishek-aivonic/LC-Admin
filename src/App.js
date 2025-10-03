// App.js
import { useEffect, useState } from "react";
import supabase from "./data/supabase";

function App() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIssues = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("issues").select("*");
    if (error) {
      console.error("Error fetching issues:", error);
    } else {
      setIssues(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
         Issues
      </h1>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : issues.length === 0 ? (
        <div className="text-center text-gray-500">No issues found.</div>
      ) : (
        <div className="overflow-x-auto container">
          <table className="table table-striped table-hover w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">State</th>
                <th className="px-4 py-2">District</th>
                <th className="px-4 py-2">Village</th>
                <th className="px-4 py-2">Issue</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue, index) => (
                <tr key={index} className="hover:bg-gray-100 transition-colors">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{issue.state}</td>
                  <td className="border px-4 py-2">{issue.district}</td>
                  <td className="border px-4 py-2">{issue.village}</td>
                  <td className="border px-4 py-2">{issue.issue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;

