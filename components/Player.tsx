
import React from 'react';

const Player: React.FC = () => {
  return (
    <section className="w-full px-4 md:px-6 py-12 md:py-16 bg-gold-light dark:bg-white/5 border-y border-[#f2f2f2] dark:border-white/5 overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-gold font-bold uppercase tracking-wider text-[10px] md:text-xs mb-2">Öne Çıkan Melodi</p>
          <h3 className="text-2xl md:text-3xl font-bold text-primary dark:text-white">Melodinin Büyüsünü Dinleyin</h3>
        </div>
        <div className="bg-white dark:bg-[#222] rounded-3xl p-4 md:p-6 shadow-xl border border-gray-100 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
            <div className="relative shrink-0 group cursor-pointer w-full sm:w-auto">
              <div 
                className="w-full sm:w-24 aspect-square sm:aspect-auto sm:h-24 bg-center bg-cover rounded-2xl shadow-md" 
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAtHKkMxnJSYvA-Q6d4z0byvwUXvd3jgpe_MdiYt1V3CNWRfbYy4k8H4PaXyLpXU9_b29r4kT86imNIQO1QMEbFTtonPA-6tPH0Lhh8io85dCcsD-Fa1xH7DPH505kd4-R7rGtzza1gfLTINtojyDI5bVRPk76QB5D3GwW7ct346UwQ2g1PNvg4glyH-UdkMAnJB1vz_jgtbEHGjHrFTaqBl57wuebuEDzGNed7g0AMjwTxespaVZBzGFei3BMyFxrCY9TnPyQ8eio')` }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-white text-4xl">play_circle</span>
              </div>
            </div>
            <div className="flex-1 w-full mt-2 sm:mt-0">
              <div className="flex justify-between items-start mb-4">
                <div className="max-w-[80%]">
                  <h4 className="text-lg font-bold text-primary dark:text-white truncate">Sarah ve Tom'un Düğünü</h4>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Akustik Balad • Piyano ve Keman</p>
                </div>
                <button className="size-12 rounded-full bg-primary hover:bg-gold text-white flex items-center justify-center transition-all shadow-lg active:scale-90">
                  <span className="material-symbols-outlined fill-current text-2xl">play_arrow</span>
                </button>
              </div>
              
              {/* Waveform Visualization Mockup */}
              <div className="flex items-end gap-1 h-10 mb-2 opacity-50">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className={`flex-1 bg-gold rounded-full transition-all`} style={{ height: `${Math.random() * 30 + 10}px` }}></div>
                ))}
              </div>
              <div className="flex items-center justify-between text-[10px] md:text-xs font-bold text-gray-400">
                <span>1:17</span>
                <span>3:42</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Player;
