import { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  return (
    <div
      className="w-screen h-screen flex items-center justify-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/33894777/pexels-photo-33894777.jpeg')`,
      }}
    >
      {/* Rectangular glass box */}
      <div className="relative w-[95%] max-w-[640px] p-12 
                      bg-white/20 backdrop-blur-2xl border border-white/40 
                      shadow-[0_8px_32px_rgba(0,0,0,0.3)] 
                      flex flex-col items-center 
                      transition-all duration-500 hover:scale-[1.02] 
                      overflow-hidden break-words rounded-xl">
        
        {/* gradient border overlay */}
        <div className="absolute inset-0 rounded-xl border border-white/50 
                        bg-gradient-to-br from-white/10 to-transparent 
                        pointer-events-none"></div>
        
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
          className="w-full flex flex-col items-center gap-8 relative z-10"
        >
          {/* From Box */}
          <div className="w-full">
            <InputBox
              label={<span className="text-base font-semibold text-gray-800">From</span>}
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
              onAmountChange={(amount) => setAmount(amount)}
              className="bg-white/70 rounded-lg shadow-inner p-5 w-full 
                         focus-within:ring-2 focus-within:ring-blue-500 transition"
            />
          </div>

          {/* Swap Button */}
          <div className="w-full flex justify-center">
            <button
              type="button"
              className="flex items-center gap-2 px-8 py-3 rounded-lg 
                         text-white font-semibold text-lg
                         bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                         shadow-lg hover:scale-110 transition-all"
              onClick={swap}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" 
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M4 4v6h6M20 20v-6h-6M4 10a8.001 8.001 0 0114.906 2.32M20 14a8.001 8.001 0 01-14.906-2.32" />
              </svg>
              Swap
            </button>
          </div>

          {/* To Box */}
          <div className="w-full">
            <InputBox
              label={<span className="text-base font-semibold text-gray-800">To</span>}
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisable
              className="bg-white/70 rounded-lg shadow-inner p-5 w-full 
                         focus-within:ring-2 focus-within:ring-purple-500 transition"
            />
          </div>

          {/* Convert Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 via-purple-500 to-pink-600 
                       text-white px-10 py-5 rounded-xl font-bold shadow-md 
                       border border-white/30 transition-all duration-300 
                       hover:scale-105 hover:from-blue-800 hover:to-pink-800 
                       text-xl tracking-wide"
          >
            Convert {from.toUpperCase()} → {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
