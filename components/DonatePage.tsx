import React, { useState, useEffect } from 'react';
import { Heart, QrCode, Copy, Check, IndianRupee, Coffee, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const DonatePage: React.FC = () => {
  const [amount, setAmount] = useState<string>('100');
  const [copied, setCopied] = useState(false);
  const upiId = 'mojahidgfx@fam';
  const name = 'Mojahid Hassan';

  const presets = ['50', '100', '200', '500'];

  // Generate UPI Link
  // Format: upi://pay?pa=ADDRESS&pn=NAME&am=AMOUNT&cu=INR
  const getUpiLink = (amt: string) => {
    const cleanAmt = amt ? amt : '0';
    return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${cleanAmt}&cu=INR`;
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(getUpiLink(amount))}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handlePayNow = () => {
    window.location.href = getUpiLink(amount);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-red-50 rounded-full mb-4">
          <Heart className="w-8 h-8 text-red-500 fill-red-500 animate-pulse-slow" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
          Support chudAI
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          If this tool saved you time or sparked your creativity, consider buying me a coffee. 
          Your support keeps the servers running and the updates coming!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        
        {/* QR Code Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden flex flex-col items-center p-8 relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 z-0"></div>
          
          <h3 className="text-xl font-bold text-slate-800 mb-6 z-10 flex items-center gap-2">
            <QrCode className="w-5 h-5 text-violet-600" />
            Scan to Pay via UPI
          </h3>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 z-10 mb-6 group-hover:shadow-md transition-shadow duration-300">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img 
                src={qrCodeUrl} 
                alt="UPI QR Code" 
                className="w-64 h-64 object-contain"
                key={amount} // Force re-render on amount change
             />
          </div>

          <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 w-full max-w-xs z-10">
            <div className="flex-1 text-center">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">UPI ID</p>
                <p className="font-mono text-sm font-bold text-slate-800 select-all">{upiId}</p>
            </div>
            <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 shrink-0" 
                onClick={handleCopy}
                title="Copy UPI ID"
            >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-slate-400" />}
            </Button>
          </div>
        </div>

        {/* Payment Options Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 flex flex-col justify-center space-y-8">
            <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <Coffee className="w-5 h-5 text-amber-500" />
                    Select Amount
                </h3>
                <p className="text-slate-500 text-sm">Choose how much you want to contribute.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {presets.map((preset) => (
                    <button
                        key={preset}
                        onClick={() => setAmount(preset)}
                        className={`
                            py-3 px-4 rounded-xl font-bold text-lg transition-all border-2 flex items-center justify-center gap-1
                            ${amount === preset 
                                ? 'border-violet-600 bg-violet-50 text-violet-700 shadow-sm' 
                                : 'border-slate-100 bg-white text-slate-600 hover:border-violet-200 hover:bg-slate-50'
                            }
                        `}
                    >
                        <IndianRupee className="w-4 h-4" /> {preset}
                    </button>
                ))}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 ml-1">Custom Amount</label>
                <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="pl-10 h-12 text-lg font-semibold border-slate-200 focus-visible:ring-violet-500"
                        placeholder="Enter amount"
                    />
                </div>
            </div>

            <Button 
                onClick={handlePayNow}
                className="w-full h-14 text-lg font-bold rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
                Pay Now <Zap className="w-5 h-5 ml-2 fill-white" />
            </Button>
            
            <p className="text-xs text-center text-slate-400">
                Clicking "Pay Now" will open your UPI app on mobile. <br/> On desktop, please scan the QR code.
            </p>
        </div>

      </div>
    </div>
  );
};

export default DonatePage;
