import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import jsPDF from 'jspdf';

export function DocGenerator() {
  const [formData, setFormData] = useState({
    docType: 'Workplace Harassment Complaint (ICC)',
    name: '',
    date: '',
    incident: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const docTypes = [
    'Workplace Harassment Complaint (ICC)',
    'Cyberbullying Report (Cyber Cell)',
    'Domestic Violence Protection Request',
    'General Police Complaint (FIR Draft)'
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);
    setCopied(false);

    try {
      const response = await fetch('/api/generate-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: formData.docType,
          details: `Name: ${formData.name}\nDate of Incident: ${formData.date}\nDescription: ${formData.incident}`
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setGeneratedDoc(data.text);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedDoc) {
      navigator.clipboard.writeText(generatedDoc);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const exportToPDF = () => {
    if (!generatedDoc) return;
    const doc = new jsPDF();
    const margin = 10;
    const maxLineWidth = 190;
    
    doc.setFontSize(12);
    
    const lines = doc.splitTextToSize(generatedDoc, maxLineWidth);
    
    let cursorY = margin;
    lines.forEach((line: string) => {
      if (cursorY > 280) {
        doc.addPage();
        cursorY = margin;
      }
      doc.text(line, margin, cursorY);
      cursorY += 7;
    });
    
    doc.save('Legal_Document.pdf');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-12 p-4 md:p-8">
      <div className="border-b border-white/20 pb-8">
        <span className="text-[10px] uppercase tracking-widest opacity-40 block mb-4">Utility.03</span>
        <h2 className="text-4xl md:text-6xl font-serif italic text-white tracking-tight">Doc Generator</h2>
      </div>

      <div className="grid md:grid-cols-12 gap-12">
        {/* Form Section */}
        <div className="md:col-span-5 flex flex-col">
          <form onSubmit={handleGenerate} className="space-y-8">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">Type of Document</label>
              <select 
                value={formData.docType}
                onChange={e => setFormData({...formData, docType: e.target.value})}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/20 focus:outline-none focus:border-white text-xs text-white/80 transition-colors"
              >
                {docTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">Your Name (Optional)</label>
              <input 
                type="text" 
                placeholder="LEAVE BLANK FOR ANONYMITY"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-transparent border-b border-white/20 focus:outline-none focus:border-white text-xs uppercase tracking-widest placeholder:text-white/20 transition-colors text-white"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">Approximate Date of Incident</label>
              <input 
                type="date" 
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                className="w-full px-4 py-3 bg-transparent border-b border-white/20 focus:outline-none focus:border-white text-xs uppercase tracking-widest transition-colors text-white/80"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">Brief Description of Incident</label>
              <textarea 
                required
                rows={4}
                placeholder="BRIEFLY DESCRIBE WHAT HAPPENED..."
                value={formData.incident}
                onChange={e => setFormData({...formData, incident: e.target.value})}
                className="w-full px-4 py-3 bg-transparent border border-white/20 focus:outline-none focus:border-white text-xs placeholder:text-white/20 transition-colors resize-none leading-relaxed text-white/90"
              />
            </div>

            <button 
              type="submit" 
              disabled={isGenerating || !formData.incident.trim()}
              className="w-full py-4 border border-white text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white transition-colors"
            >
              {isGenerating ? 'Generating Draft...' : 'Generate Document'}
            </button>
            {error && <p className="text-red-400 text-[10px] uppercase tracking-widest mt-4 border border-red-900/50 p-3 bg-red-950/20">{error}</p>}
          </form>
        </div>

        {/* Result Section */}
        <div className="md:col-span-7 flex flex-col h-[600px] md:h-auto border-l md:border-white/10 md:pl-12">
          <div className="flex items-baseline justify-between mb-8">
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-40">Generated Draft</span>
            {generatedDoc && (
              <div className="flex gap-4">
                <button 
                  onClick={copyToClipboard}
                  className="text-[9px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors"
                >
                  {copied ? 'Copied' : 'Copy Text'}
                </button>
                <button 
                  onClick={exportToPDF}
                  className="text-[9px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors"
                >
                  Export PDF
                </button>
              </div>
            )}
          </div>
          
          <div className="flex-1 bg-neutral-900/30 border border-white/10 p-8 overflow-y-auto">
            <AnimatePresence mode="wait">
            {generatedDoc ? (
              <motion.pre 
                key="doc"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="whitespace-pre-wrap font-serif text-sm leading-relaxed text-white/90 bg-transparent p-0"
              >
                {generatedDoc}
              </motion.pre>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-white/20 space-y-4"
              >
                <span className="text-4xl font-serif italic">Empty</span>
                <p className="text-[10px] uppercase tracking-widest">Fill out the form to generate.</p>
              </motion.div>
            )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
