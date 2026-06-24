import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Upload, Activity, Shield, TrendingUp } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const API_BASE = 'http://localhost:5000';

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const processVideo = async () => {
    setLoading(true);
    const fd = new FormData(); fd.append('video', file);
    try {
      const res = await axios.post(`${API_BASE}/upload`, fd);
      setResult(res.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const chartData = result ? {
    labels: result.graph_data.map((_, i) => i),
    datasets: [{
      label: 'Motion Intensity (%)',
      data: result.graph_data,
      borderColor: '#38bdf8',
      backgroundColor: 'rgba(56, 189, 248, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 0
    }]
  } : null;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-12">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent mb-12">
        MentalHealth AI Dashboard
      </h1>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="border-2 border-dashed border-slate-700 rounded-3xl p-12 text-center">
            <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-4" />
            <p className="text-slate-500">Upload Walking Video (MP4/AVI)</p>
          </div>
          <button onClick={processVideo} disabled={!file || loading} className="w-full py-4 bg-sky-500 rounded-xl font-bold hover:bg-sky-400 transition-colors">
            {loading ? "Analyzing..." : "Run AI Analysis"}
          </button>
        </div>

        {result && (
          <div className="space-y-8">
            <div className="bg-slate-800 p-8 rounded-3xl border border-sky-500/50">
              <h2 className="text-xs uppercase text-slate-400 font-bold mb-1">Result</h2>
              <p className="text-4xl font-bold text-sky-400">{result.prediction} ({result.confidence}%)</p>
            </div>
            <div className="bg-slate-800 p-8 rounded-3xl">
              <Line data={chartData} options={{ maintainAspectRatio: false }} className="h-48" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
