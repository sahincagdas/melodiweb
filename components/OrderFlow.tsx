
import React, { useState } from 'react';

interface OrderFlowProps {
  selectedProduct?: { title: string; price: number };
  onComplete: () => void;
}

const OrderFlow: React.FC<OrderFlowProps> = ({ selectedProduct, onComplete }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const [formData, setFormData] = useState({
    recipient: '',
    occasion: '',
    style: '',
    details: '',
    wantsVideo: false
  });

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const updateData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    // Auto-advance for simple choice steps
    if (key === 'recipient' || key === 'occasion' || key === 'style') {
      nextStep();
    }
  };

  const getLabel = (type: string, value: string) => {
    const maps: any = {
      recipient: { lover: 'Sevgili / Eş', fiance: 'Nişanlı', family: 'Aile', friend: 'Arkadaş' },
      occasion: { anniversary: 'Yıldönümü', birthday: 'Doğum Günü', wedding: 'Düğün', gift: 'Hediye' },
      style: { acoustic: 'Akustik Balad', pop: 'Modern Pop', lofi: 'Lo-Fi Soul', piano: 'Klasik Piyano' }
    };
    return maps[type]?.[value] || value;
  };

  const renderProgress = () => (
    <div className="w-full max-w-xl mx-auto mb-12">
      <div className="flex justify-between mb-2">
        <span className="text-xs font-bold text-gold uppercase tracking-widest">Adım {step} / {totalSteps}</span>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          {step === 1 && 'Kime?'}
          {step === 2 && 'Özel Gün'}
          {step === 3 && 'Tarz'}
          {step === 4 && 'Hikaye'}
          {step === 5 && 'Ödeme'}
        </span>
      </div>
      <div className="h-1.5 w-full bg-white rounded-full overflow-hidden border border-gold/10">
        <div 
          className="h-full bg-gold transition-all duration-500 ease-out" 
          style={{ width: `${(step / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F1E9] py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {renderProgress()}

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {step === 1 && (
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-black text-primary mb-10">Bu şarkı kimin için?</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <SelectionCard icon="favorite" label="Sevgili / Eş" onClick={() => updateData('recipient', 'lover')} />
                <SelectionCard icon="auto_fix_normal" label="Nişanlı" onClick={() => updateData('recipient', 'fiance')} />
                <SelectionCard icon="groups" label="Aile" onClick={() => updateData('recipient', 'family')} />
                <SelectionCard icon="mood" label="Arkadaş" onClick={() => updateData('recipient', 'friend')} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-black text-primary mb-10">Hangi özel günü kutluyoruz?</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <SelectionCard icon="calendar_today" label="Yıldönümü" onClick={() => updateData('occasion', 'anniversary')} />
                <SelectionCard icon="cake" label="Doğum Günü" onClick={() => updateData('occasion', 'birthday')} />
                <SelectionCard icon="celebration" label="Düğün" onClick={() => updateData('occasion', 'wedding')} />
                <SelectionCard icon="redeem" label="Hediye" onClick={() => updateData('occasion', 'gift')} />
              </div>
              <button onClick={prevStep} className="mt-12 text-gray-400 font-bold hover:text-gold transition-colors flex items-center gap-2 mx-auto">
                <span className="material-symbols-outlined text-sm">arrow_back</span> Geri Dön
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-black text-primary mb-10">Müzik tarzı nasıl olsun?</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <SelectionCard icon="music_note" label="Akustik Balad" onClick={() => updateData('style', 'acoustic')} />
                <SelectionCard icon="electric_bolt" label="Modern Pop" onClick={() => updateData('style', 'pop')} />
                <SelectionCard icon="psychology" label="Lo-Fi Soul" onClick={() => updateData('style', 'lofi')} />
                <SelectionCard icon="piano" label="Klasik Piyano" onClick={() => updateData('style', 'piano')} />
              </div>
              <button onClick={prevStep} className="mt-12 text-gray-400 font-bold hover:text-gold transition-colors flex items-center gap-2 mx-auto">
                <span className="material-symbols-outlined text-sm">arrow_back</span> Geri Dön
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-primary mb-6 text-center">Hikayenizi Anlatın</h2>
              <p className="text-gray-500 text-center mb-8">Şarkıda geçmesini istediğiniz özel anları, isimleri veya duyguları buraya yazın.</p>
              <textarea 
                className="w-full h-48 rounded-3xl border-none shadow-xl shadow-gold/5 p-8 text-lg focus:ring-4 focus:ring-gold/10 transition-all outline-none"
                placeholder="Örn: İlk randevumuzdaki o yağmurlu gün, bana her sabah 'Gülümse' demesi..."
                value={formData.details}
                onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
              />
              <div className="flex gap-4 mt-8">
                <button onClick={prevStep} className="flex-1 h-16 rounded-2xl border-2 border-gold/20 text-gold font-bold hover:bg-gold/5 transition-all active:scale-95">Geri</button>
                <button 
                  onClick={nextStep} 
                  disabled={!formData.details.trim()}
                  className="flex-[2] h-16 rounded-2xl bg-primary text-white font-bold hover:bg-gold transition-all active:scale-95 disabled:bg-gray-300"
                >
                  Devam Et
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-10 pb-20">
              <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-black text-primary mb-4">Harika Bir Seçim!</h2>
                <p className="text-gray-600">Siparişinizi tamamlamadan önce son bir kez kontrol edelim.</p>
              </div>

              {/* Order Review Section */}
              <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-xl border border-gold/10">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                  <h3 className="text-xl font-black text-primary flex items-center gap-3">
                    <span className="material-symbols-outlined text-gold">fact_check</span>
                    Sipariş Özetiniz
                  </h3>
                  <div className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full uppercase">Kontrol Noktası</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                  <SummaryItem 
                    label="Kimin İçin" 
                    value={getLabel('recipient', formData.recipient)} 
                    onEdit={() => setStep(1)} 
                  />
                  <SummaryItem 
                    label="Özel Gün" 
                    value={getLabel('occasion', formData.occasion)} 
                    onEdit={() => setStep(2)} 
                  />
                  <SummaryItem 
                    label="Müzik Tarzı" 
                    value={getLabel('style', formData.style)} 
                    onEdit={() => setStep(3)} 
                  />
                  <SummaryItem 
                    label="Hikayeniz" 
                    value={formData.details} 
                    onEdit={() => setStep(4)} 
                    isFullWidth 
                  />
                </div>
              </div>

              {/* Upsell Card */}
              <div 
                className={`p-6 md:p-8 rounded-[2rem] border-2 transition-all cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6 ${formData.wantsVideo ? 'bg-gold border-gold text-white shadow-2xl shadow-gold/30' : 'bg-white border-gold/20 text-primary hover:border-gold shadow-lg shadow-gold/5'}`}
                onClick={() => setFormData(prev => ({ ...prev, wantsVideo: !formData.wantsVideo }))}
              >
                <div className="flex items-center gap-6">
                  <div className={`size-16 rounded-2xl flex items-center justify-center ${formData.wantsVideo ? 'bg-white/20' : 'bg-gold-light text-gold'}`}>
                    <span className="material-symbols-outlined text-3xl">photo_library</span>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-black">Fotoğraflı Video Versiyonu</h3>
                    <p className={`${formData.wantsVideo ? 'text-white/80' : 'text-gray-500'} text-sm`}>Fotoğraflarınızdan oluşan duygusal bir slayt video klip.</p>
                  </div>
                </div>
                <div className="flex flex-col items-center md:items-end">
                  <span className="text-2xl font-black">+199 TL</span>
                  <div className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase mt-2 ${formData.wantsVideo ? 'bg-white text-gold' : 'bg-gold text-white'}`}>
                    {formData.wantsVideo ? 'Eklendi' : 'Eklemek İçin Tıkla'}
                  </div>
                </div>
              </div>

              {/* Checkout Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Credit Card Card */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col items-center text-center group hover:border-blue-200 transition-colors">
                  <div className="size-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl">credit_card</span>
                  </div>
                  <h3 className="text-2xl font-black text-primary mb-2">Kredi Kartı</h3>
                  <p className="text-gray-400 text-sm mb-6">Tüm kartlar ile 12 aya varan taksit seçenekleri.</p>
                  <div className="text-3xl font-black text-primary mb-8">{499 + (formData.wantsVideo ? 199 : 0)} TL</div>
                  <button className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg transition-all active:scale-95">
                    Shopier ile Güvenli Öde
                  </button>
                </div>

                {/* IBAN Card */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border-2 border-gold flex flex-col items-center text-center relative group hover:shadow-gold/10 transition-all">
                  <div className="absolute -top-4 bg-gold text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                    En Avantajlı Seçenek
                  </div>
                  <div className="size-16 rounded-full bg-gold-light text-gold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl">account_balance</span>
                  </div>
                  <h3 className="text-2xl font-black text-primary mb-2">Havale / EFT</h3>
                  <p className="text-gray-400 text-sm mb-4">Kampanyalı fiyattan yararlanın.</p>
                  <div className="text-3xl font-black text-gold mb-6">{399 + (formData.wantsVideo ? 199 : 0)} TL</div>
                  
                  <div className="w-full bg-gray-50 p-4 rounded-2xl text-left mb-6 font-mono text-xs text-gray-600 border border-gray-100">
                    <p className="opacity-60 mb-1">IBAN:</p>
                    <p className="font-bold tracking-tight">TR00 0000 0000 0000 0000 0000 00</p>
                    <p className="font-bold mt-2 text-[10px] text-primary uppercase">MELODY OF US - MUZIK LTD.</p>
                  </div>

                  <button className="w-full h-14 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">chat</span>
                    WhatsApp ile Dekont Gönder
                  </button>
                </div>
              </div>

              {/* Trust Footer */}
              <div className="pt-10 border-t border-gold/10 text-center space-y-6">
                <div className="flex flex-wrap justify-center gap-8">
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
                    <span className="material-symbols-outlined text-gold text-sm">verified_user</span>
                    KVKK Korumalı
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
                    <span className="material-symbols-outlined text-gold text-sm">bolt</span>
                    24 Saat Teslimat
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
                    <span className="material-symbols-outlined text-gold text-sm">security</span>
                    Sertifikalı Ödeme
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SelectionCard = ({ icon, label, onClick }: { icon: string, label: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="group flex flex-col items-center justify-center p-6 md:p-10 bg-white rounded-[2rem] border-2 border-transparent hover:border-gold shadow-xl shadow-gold/5 transition-all active:scale-95"
  >
    <div className="size-16 md:size-20 rounded-2xl bg-gold-light text-gold flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-white transition-all transform group-hover:scale-110">
      <span className="material-symbols-outlined text-3xl md:text-4xl">{icon}</span>
    </div>
    <span className="text-base md:text-lg font-bold text-primary">{label}</span>
  </button>
);

const SummaryItem = ({ label, value, onEdit, isFullWidth = false }: { label: string, value: string, onEdit: () => void, isFullWidth?: boolean }) => (
  <div className={`flex flex-col gap-2 ${isFullWidth ? 'md:col-span-2' : ''}`}>
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</span>
      <button 
        onClick={onEdit}
        className="text-[10px] font-bold text-gold hover:underline flex items-center gap-1"
      >
        Düzenle <span className="material-symbols-outlined text-[12px]">edit</span>
      </button>
    </div>
    <div className={`p-4 rounded-2xl bg-gray-50 text-sm font-bold text-primary border border-gray-100 ${isFullWidth ? 'min-h-[80px] line-clamp-3' : ''}`}>
      {value || 'Belirtilmedi'}
    </div>
  </div>
);

export default OrderFlow;
