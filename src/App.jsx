import { useState } from "react";

function App() {
  const [sales, setSales] = useState(0);
  const [rate, setRate] = useState(10);
  const [history, setHistory] = useState([]);

  const totalKomisi = (sales * rate) / 100;
  const handleSave = () => {
    if(sales < 0 || rate < 0) return;
    const newEntry = {
      sales,
      rate,
      totalKomisi,
      date: new Date().toLocaleString(),
    };
    setHistory([newEntry, ...history]);
  }

  const handleDelete = (index) => {
    const newHistory = history.filter((_, i) => i !== index);
    setHistory(newHistory);
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold mb-4">Kalkulator Komisi</h1>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Total Penjualan:</label>
          <input
            type="number"
            value={sales}
            onChange={(e) =>
              setSales(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Rate Komisi (%):</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <p className="text-lg font-semibold">
          Total Komisi: Rp {totalKomisi.toLocaleString()}
        </p>
        <p>
          {totalKomisi > 1000000
            ? "Selamat! Anda mendapatkan komisi di atas 1.000.000"
            : "Tetap Semangat"}
        </p>
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex justify-between items-end">
          <p className="text-sm font-bold text-slate-700 uppercase tracking-wider">
            Progres Target
          </p>
          <span className="text-sm font-black text-indigo-700">
            {Math.round(Math.min(100, (sales / 1000000) * 100))}%
          </span>
        </div>

        {/* Container Bar */}
        <div className="w-full bg-slate-200 rounded-lg h-6 overflow-hidden border border-slate-300 shadow-inner">
          {/* Fill Bar */}
          <div
            className={`h-full transition-all duration-500 ease-out flex items-center justify-center text-[10px] font-bold text-white
        ${(sales / 1000000) * 100 >= 100 ? "bg-emerald-600" : "bg-indigo-600"}`}
            style={{ width: `${Math.min(100, (sales / 1000000) * 100)}%` }}
          >
            {sales >= 500000 && ((sales / 1000000) * 100).toFixed(0) + "%"}
          </div>
        </div>
        <p className="text-[10px] text-slate-500 italic">
          *Target: Rp 1.000.000
        </p>
      </div>
      <button
        onClick={() => {
          setSales(0);
          setRate(10);
        }}
        className="mt-4 bg-slate-800 text-white py-2 px-4 rounded-lg font-semibold hover:bg-slate-900 active:scale-95 transition-all"
      >
        Reset Data
      </button>
      <button onClick={handleSave} className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 active:scale-95 transition-all">
        Simpan ke Riwayat
      </button>
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4">Riwayat Komisi</h2>
        {history.length === 0 ? (
          <p className="text-slate-500">Belum ada riwayat komisi.</p>
        ) : (
          <ul className="space-y-4 max-h-64 overflow-y-auto">
            {history.map((entry, index) => (
              <li key={index} className="bg-slate-50 p-4 rounded-lg shadow">
                <p>Total Penjualan: Rp {entry.sales.toLocaleString()}</p>
                <p>Rate Komisi: {entry.rate}%</p>
                <p>Total Komisi: Rp {entry.totalKomisi.toLocaleString()}</p>
                <p className="text-sm text-slate-400">Tanggal: {entry.date}</p>
                <button
                  onClick={() => handleDelete(index)}
                  className="mt-2 text-red-600 hover:underline text-sm"
                >
                  Hapus
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
