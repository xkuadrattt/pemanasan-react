import { useState } from 'react'


function App() {
  const [sales, setSales] = useState(0);
  const [rate, setRate] = useState(10); 

  const totalKomisi = (sales * rate) / 100;

  return(
    <div className='min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4'>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <h1 className='text-xl font-bold mb-4'>Kalkulator Komisi</h1>
        <div className='mb-4'>
          <label className='block text-gray-700 mb-2'>Total Penjualan:</label>
          <input
            type="number"
            value={sales}
            onChange={(e) => setSales(e.target.value === '' ? '' : Number(e.target.value))}
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 mb-2'>Rate Komisi (%):</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>
        <p className='text-lg font-semibold'>Total Komisi: Rp {totalKomisi.toLocaleString()}</p>
        <p>{totalKomisi > 1000000 ? "Selamat! Anda mendapatkan komisi di atas 1.000.000" : "Tetap Semangat"}</p>
      </div>

      <button onClick={()=>{
        setSales(0);
        setRate(10)
      }} className='mt-4 bg-slate-800 text-white py-2 px-4 rounded-lg font-semibold hover:bg-slate-900 active:scale-95 transition-all'>
        Reset Data
      </button>
    </div>
  )
}

export default App
