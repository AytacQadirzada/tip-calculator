import React, { useState, useEffect } from 'react';

const TipCalculator = () => {
  const [selectedTip, setSelectedTip] = useState<string | null>(null);
  const [bill, setBill] = useState<number>(0);
  const [custom, setCustom] = useState<number>(0);
  const [peopleCount, setPeopleCount] = useState<number>(0);
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const tipOptions = ['5%', '10%', '15%', '25%', '50%'];

  useEffect(() => {
    if (bill !== 0 && custom !== 0 && peopleCount !== 0) {
      const totalTip = bill + (bill * custom) / 100;
      setTipAmount(totalTip / peopleCount);
      setTotalAmount(totalTip);
    }
  }, [bill, custom, peopleCount]);

  return (
    <div className="min-h-screen bg-[#c5e4e7] flex items-center justify-center font-sans">
      <div className="bg-white rounded-2xl shadow-lg !p-8 w-full max-w-5xl flex flex-col md:flex-row gap-8">

        <div className="flex-1 space-y-6">
          <div>
            <label className="block text-[#5e7a7d] !mb-2">Bill</label>
            <div className="relative">
              <span className="absolute !left-4 !top-1/2 transform -translate-y-1/2 text-[#9ebbbf]">$</span>
              <input
                type="number"
                className="w-full !px-10 !py-2 rounded-md border-2 border-[#26c2ae] text-right text-2xl text-[#00474b] font-bold outline-none focus:ring-2 focus:ring-[#26c2ae]"
                placeholder="0"
                onChange={(e) => setBill(Number(e.target.value))}
              />
            </div>
          </div>

          <div>
            <label className="block text-[#5e7a7d] !mb-2">Select Tip %</label>
            <div className="grid grid-cols-3 gap-4">
              {tipOptions.map((tip) => (
                <button
                  key={tip}
                  onClick={() => {
                    setSelectedTip(tip);
                    setCustom(Number(tip.replace('%', '')));
                  }}
                  className={`text-xl font-bold !py-2 rounded-md transition
                    ${selectedTip === tip
                      ? 'bg-[#26c2ae] text-[#00474b]'
                      : 'bg-[#00474b] text-white hover:bg-[#26c2ae] hover:text-[#00474b]'
                    }`}
                >
                  {tip}
                </button>
              ))}
              <input
                type="number"
                placeholder="Custom"
                onChange={(e) => {
                  setSelectedTip(null);
                  setCustom(Number(e.target.value));
                }}
                className="text-right !px-4 !py-2 rounded-md text-xl border-2 border-[#f3f9fa] bg-[#f3f9fa] text-[#547878] font-bold outline-none focus:ring-2 focus:ring-[#26c2ae]"
              />
            </div>
          </div>

          <div>
            <label className="flex justify-between text-[#5e7a7d] !mb-2">
              <span>Number of People</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9ebbbf]">
                <i className="fas fa-user" />
              </span>
              <input
                type="number"
                className={`w-full !px-10 !py-2 rounded-md border-2 text-right text-2xl text-[#00474b] font-bold outline-none focus:ring-2 ${
                  error ? 'border-red-500 focus:ring-red-500' : 'border-[#26c2ae] focus:ring-[#26c2ae]'
                }`}
                placeholder="0"
                min="0"
                onChange={(e) => {
                  const rawValue = e.target.value;

                  if (rawValue === "") {
                    setError("Boş buraxıla bilməz!");
                    setPeopleCount(0);
                    return;
                  }

                  const value = Number(rawValue);
                  if (value <= 0) {
                    setError("Düzgün dəyər daxil edin");
                    setPeopleCount(0);
                  } else {
                    setError(null);
                    setPeopleCount(value);
                  }
                }}
              />
              {error && (
                <p className="text-red-500 text-sm mt-1 absolute left-0 -bottom-6">{error}</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 bg-[#00474b] text-white rounded-xl !p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm">Tip Amount</p>
                <p className="text-xs text-[#7f9c9f]">/ person</p>
              </div>
              <p className="text-3xl text-[#26c2ae] font-bold">${tipAmount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm">Total</p>
                <p className="text-xs text-[#7f9c9f]">/ person</p>
              </div>
              <p className="text-3xl text-[#26c2ae] font-bold">${totalAmount.toFixed(2)}</p>
            </div>
          </div>

          <button
            onClick={() => {
              setBill(0);
              setCustom(0);
              setPeopleCount(0);
              setTipAmount(0);
              setTotalAmount(0);
              setSelectedTip(null);
              setError(null);
            }}
            className="w-full !mt-8 !py-3 rounded-md bg-[#26c2ae] text-[#00474b] font-bold uppercase hover:bg-[#9fe8df] transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default TipCalculator;
