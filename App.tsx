
import React, { useState, useMemo } from 'react';
import Layout from './components/Layout';
import SongCard from './components/SongCard';
import Player from './components/Player';
import OrderFlow from './components/OrderFlow';
import { Page, SongProduct } from './types';
import { SONG_PRODUCTS } from './constants';
import { generateLyricsDraft } from './services/gemini';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [selectedCategory, setSelectedCategory] = useState<string>('Hepsi');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProduct, setActiveProduct] = useState<SongProduct | undefined>();

  // AI Composer State
  const [memories, setMemories] = useState('');
  const [style, setStyle] = useState('Akustik Balad');
  const [lyricsDraft, setLyricsDraft] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredProducts = useMemo(() => {
    return SONG_PRODUCTS.filter(p => {
      const matchesCategory = selectedCategory === 'Hepsi' || p.category === selectedCategory;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCompose = async () => {
    if (!memories.trim()) return;
    setIsGenerating(true);
    const draft = await generateLyricsDraft(memories, style);
    setLyricsDraft(draft || '');
    setIsGenerating(false);
  };

  const handleStartOrder = (product?: SongProduct | any) => {
    setActiveProduct(product);
    setCurrentPage(Page.Order);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderHome = () => (
    <>
      {/* Hero Section */}
      <section className="w-full px-4 md:px-6 py-10 md:py-20 lg:py-24 bg-white dark:bg-background-dark overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1 flex flex-col gap-4 md:gap-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight text-primary dark:text-white">
              Hikayeniz, Bir <span className="text-gold">Başyapıta</span> Dönüşsün
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Düğünler, yıldönümleri ve markalar için özel bestelenmiş şarkılar. Sadece sizin için profesyonelce yazıldı, kaydedildi ve düzenlendi.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center lg:justify-start">
              <button 
                onClick={() => setCurrentPage(Page.Catalog)}
                className="flex items-center justify-center rounded-xl h-14 px-8 bg-primary hover:bg-gold transition-all text-white text-base font-bold shadow-lg active:scale-95"
              >
                Şarkını Oluştur
              </button>
              <button 
                onClick={() => setCurrentPage(Page.Catalog)}
                className="flex items-center justify-center rounded-xl h-14 px-8 bg-transparent border border-gray-200 dark:border-gray-700 hover:border-gold hover:text-gold transition-all text-primary dark:text-white text-base font-bold active:scale-95"
              >
                Örneklere Göz At
              </button>
            </div>
          </div>
          <div className="order-1 lg:order-2 w-full aspect-[4/3] lg:aspect-auto lg:h-[500px] relative">
            <div className="absolute inset-0 bg-gold/10 rounded-2xl transform rotate-2 z-0"></div>
            <div 
              className="relative z-10 w-full h-full bg-center bg-cover rounded-2xl shadow-xl" 
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAm7dGPVl_KRJYABb1d7kSCWT2QHHn-e8OPecgAj0x9Fq5ntcoHrNJu3VstHwbr0hVjVs1bjZ4y-yz9dFzFVzPxadfWfldbGVkRFu9I0bP-RyW-AxST9tgIX_QRbamVX3_GJwbvFvpIeMR4ameWrHRkIV_REmkGiTvZYSEuoGKttzMZg6ntX03-BDybKOQiPSx_HG2ZRlbhYVU4ks7AjhotXo6wZnQjpvXZwnfVvTMjv4GHQLhSFga2x-vC5NVaxTamI02yoa_Ap5M')` }}
            ></div>
          </div>
        </div>
      </section>

      <Player />

      {/* Categories */}
      <section className="w-full px-4 md:px-6 py-16 md:py-20 bg-white dark:bg-background-dark" id="services">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">Melodinizi Seçin</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm md:text-base">Aşk, iş veya zamansız bir hediye için, her duruma uygun mükemmel sesi tasarlıyoruz.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <CategoryCard 
              icon="favorite" 
              title="Düğün Özelleri" 
              desc="Sizin için yazılmış bir melodiyle koridorda yürüyün. Aşk hikayenizi sonsuza dek sürecek bir şarkıda ölümsüzleştirin." 
              onAction={() => { setSelectedCategory('Düğün ve Yıldönümü'); setCurrentPage(Page.Catalog); }}
            />
            <CategoryCard 
              icon="campaign" 
              title="Kurumsal Markalar" 
              desc="İşletmenizi unutulmaz kılan sonik markalaşma. Akılda kalıcı, profesyonel ve markanıza uygun." 
              onAction={() => { setSelectedCategory('Kurumsal ve Marka'); setCurrentPage(Page.Catalog); }}
            />
            <CategoryCard 
              icon="card_giftcard" 
              title="Romantik Hediyeler" 
              desc="Yıldönümleri veya doğum günleri için mükemmel ve zamansız bir sürpriz. Duyguların hediyesini verin." 
              onAction={() => { setSelectedCategory('İçimden Geldi'); setCurrentPage(Page.Catalog); }}
            />
          </div>
        </div>
      </section>
    </>
  );

  const renderCatalog = () => (
    <div className="bg-background-light grow py-6 md:py-8 min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-center justify-between mb-8 md:mb-12 bg-white p-6 md:p-8 rounded-2xl border border-[#f2f2f2]">
          <div className="flex flex-col gap-3 md:gap-4 max-w-[600px]">
            <h1 className="text-primary tracking-tight text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
              Hayatın En İyi <span className="text-accent-gold">Anları İçin</span>
            </h1>
            <p className="text-[#555] text-sm md:text-base font-normal leading-relaxed">
              Anılarınızı zamansız bir özel başyapıta dönüştürün. Profesyonel sanatçılar tarafından el yapımı.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-gold bg-gold-light px-4 py-2 rounded-full">
            <span className="material-symbols-outlined text-[18px] md:text-[20px] fill-1">verified</span>
            <span>%100 Memnuniyet Garantisi</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-[280px] shrink-0 space-y-6 md:space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 lg:bg-transparent lg:p-0 lg:border-none">
              <h3 className="text-primary text-lg font-bold leading-tight mb-4">Özel Günler</h3>
              <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0 scrollbar-hide">
                {['Hepsi', 'Düğün ve Yıldönümü', 'Doğum Günü ve Kutlama', 'Kurumsal ve Marka', 'İçimden Geldi'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap flex items-center gap-3 p-3 rounded-xl transition-all text-sm font-medium shrink-0 ${
                      selectedCategory === cat ? 'bg-primary text-white shadow-md' : 'bg-gray-50 lg:bg-white text-gray-500 hover:bg-gray-100 lg:hover:shadow-sm'
                    }`}
                  >
                    <div className={`size-2 rounded-full ${selectedCategory === cat ? 'bg-gold' : 'bg-gray-300'}`}></div>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} onClick={() => handleStartOrder(product)} className="cursor-pointer">
                    <SongCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-white rounded-3xl border border-dashed border-gray-200">
                <span className="material-symbols-outlined text-6xl mb-4">search_off</span>
                <p className="text-lg font-medium">Kriterlerinize uygun bir melodi bulunamadı.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAIComposer = () => (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="text-center mb-10 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-black mb-4">AI ile Şarkı Sözü Taslağı</h1>
        <p className="text-gray-600 text-sm md:text-base">Yapay zekamıza birkaç anınızı anlatın, size ilham verecek bir lirik şaheser tasarlayalım.</p>
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-6 md:p-10">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Hikayenizi anlatın</label>
            <textarea 
              rows={5}
              value={memories}
              onChange={(e) => setMemories(e.target.value)}
              placeholder="Örn: Paris'te bir kafede tanıştık, her sabah bana kahve getirir..."
              className="w-full rounded-2xl border-gray-200 focus:ring-gold focus:border-gold transition-all p-4 md:p-6 text-base outline-none"
            />
          </div>
          <button 
            onClick={handleCompose}
            disabled={isGenerating || !memories.trim()}
            className="w-full h-16 bg-primary hover:bg-gold disabled:bg-gray-400 text-white rounded-2xl font-bold text-lg shadow-xl shadow-gold/20 transition-all flex items-center justify-center gap-3 active:scale-95"
          >
            {isGenerating ? 'Yazılıyor...' : 'Söz Taslağı Oluştur'}
          </button>
        </div>

        {lyricsDraft && (
          <div className="mt-10 p-6 md:p-10 bg-gold-light rounded-[2rem] border border-gold/20">
            <div className="whitespace-pre-wrap italic text-lg leading-relaxed text-gray-800">{lyricsDraft}</div>
            <button 
              onClick={() => handleStartOrder()}
              className="mt-10 w-full h-14 bg-primary text-white rounded-xl font-bold hover:bg-gold transition-all"
            >
              Bu Sözlerle Şarkı Siparişi Ver
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderPricing = () => (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-primary mb-6">Paketlerimiz</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">Sizin için en uygun olanı seçin. Her paket profesyonel ses kalitesi ve orijinal beste garantisi ile gelir.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PricingCard 
          title="Hatıra" 
          price="1.900" 
          desc="Küçük ama anlamlı anlar için hızlı ve etkileyici bir çözüm."
          features={['Tek Enstrüman (Piyano veya Gitar)', 'Profesyonel Vokal', '2 Dakika Süre', 'MP3 Teslimat', '1 Revizyon Hakkı']}
          onAction={() => handleStartOrder({ title: 'Hatıra Paketi', price: 1900 })}
        />
        <PricingCard 
          title="Duygu" 
          price="3.900" 
          isFeatured={true}
          desc="En popüler seçimimiz. Tam bir hikaye anlatımı ve zengin aranjman."
          features={['Çoklu Enstrüman', 'Profesyonel Stüdyo Kaydı', '3-4 Dakika Süre', 'Yüksek Kalite WAV Teslimat', 'Sınırsız Söz Revizyonu', 'Sosyal Medya Formatı']}
          onAction={() => handleStartOrder({ title: 'Duygu Paketi', price: 3900 })}
        />
        <PricingCard 
          title="Başyapıt" 
          price="5.900" 
          desc="En üst düzey deneyim. Sanatsal derinlik ve her detayda mükemmellik."
          features={['Tam Orkestral Aranjman', 'Düet Seçeneği', 'Özel Video Klip (Ücretsiz)', 'Ömür Boyu Telif Hakkı', 'Hızlı 24 Saat Teslimat', 'Fiziksel Sertifika & Plak (Ek Ücret)']}
          onAction={() => handleStartOrder({ title: 'Başyapıt Paketi', price: 5900 })}
        />
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-4xl md:text-6xl font-black text-primary mb-8">Bize Ulaşın</h1>
          <p className="text-gray-600 text-lg mb-12">Özel bir talebiniz mi var? Yoksa sadece bir şeyler mi sormak istiyorsunuz? Ekibimiz size yardımcı olmaya hazır.</p>
          
          <div className="space-y-8">
            <ContactInfo icon="mail" title="E-posta" value="merhaba@melodyofus.com" />
            <ContactInfo icon="call" title="Telefon" value="+90 (212) 000 00 00" />
            <ContactInfo icon="chat" title="WhatsApp" value="+90 (500) 000 00 00" />
            <ContactInfo icon="location_on" title="Ofis" value="Nişantaşı, İstanbul / Türkiye" />
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-gray-100">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Ad Soyad</label>
                <input type="text" className="w-full h-14 bg-gray-50 border-none rounded-xl focus:ring-4 focus:ring-gold/10 px-6 text-primary outline-none" placeholder="Adınız" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">E-posta</label>
                <input type="email" className="w-full h-14 bg-gray-50 border-none rounded-xl focus:ring-4 focus:ring-gold/10 px-6 text-primary outline-none" placeholder="Email adresiniz" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Konu</label>
              <input type="text" className="w-full h-14 bg-gray-50 border-none rounded-xl focus:ring-4 focus:ring-gold/10 px-6 text-primary outline-none" placeholder="Hangi konuda yazıyorsunuz?" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Mesajınız</label>
              <textarea rows={4} className="w-full bg-gray-50 border-none rounded-xl focus:ring-4 focus:ring-gold/10 p-6 text-primary outline-none" placeholder="Sizin için ne yapabiliriz?"></textarea>
            </div>
            <button className="w-full h-16 bg-primary hover:bg-gold text-white rounded-xl font-bold text-lg shadow-xl shadow-gold/20 transition-all active:scale-95">
              Mesajı Gönder
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {currentPage === Page.Home && renderHome()}
      {currentPage === Page.Catalog && renderCatalog()}
      {currentPage === Page.AIComposer && renderAIComposer()}
      {currentPage === Page.Pricing && renderPricing()}
      {currentPage === Page.Contact && renderContact()}
      {currentPage === Page.Order && (
        <OrderFlow 
          selectedProduct={activeProduct} 
          onComplete={() => setCurrentPage(Page.Home)} 
        />
      )}
    </Layout>
  );
};

const CategoryCard = ({ icon, title, desc, onAction }: { icon: string, title: string, desc: string, onAction: () => void }) => (
  <div className="group flex flex-col p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#222] shadow-sm hover:shadow-2xl transition-all duration-300">
    <div className="size-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold mb-6 group-hover:bg-gold group-hover:text-white transition-all transform group-hover:rotate-3">
      <span className="material-symbols-outlined text-3xl">{icon}</span>
    </div>
    <h3 className="text-xl font-bold text-primary dark:text-white mb-3">{title}</h3>
    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{desc}</p>
    <button onClick={onAction} className="text-sm font-bold text-primary dark:text-white flex items-center gap-1 group-hover:text-gold transition-colors w-fit">
      Göz At <span className="material-symbols-outlined text-sm">arrow_forward</span>
    </button>
  </div>
);

const PricingCard = ({ title, price, desc, features, isFeatured = false, onAction }: any) => (
  <div className={`relative flex flex-col p-8 md:p-10 rounded-[2.5rem] border-2 transition-all duration-500 hover:translate-y-[-8px] ${isFeatured ? 'bg-primary border-primary shadow-2xl shadow-primary/20 scale-105 z-10' : 'bg-white border-gray-100 shadow-xl'}`}>
    {isFeatured && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
        En Çok Tercih Edilen
      </div>
    )}
    <h3 className={`text-2xl font-black mb-2 ${isFeatured ? 'text-white' : 'text-primary'}`}>{title}</h3>
    <p className={`text-sm mb-8 ${isFeatured ? 'text-gray-400' : 'text-gray-500'}`}>{desc}</p>
    
    <div className="mb-10 flex items-baseline gap-1">
      <span className={`text-5xl font-black ${isFeatured ? 'text-gold' : 'text-primary'}`}>{price} ₺</span>
      <span className={`text-sm font-bold ${isFeatured ? 'text-gray-400' : 'text-gray-500'}`}>/ Şarkı</span>
    </div>

    <div className="space-y-4 mb-10 flex-grow">
      {features.map((f: string, i: number) => (
        <div key={i} className="flex items-center gap-3">
          <span className="material-symbols-outlined text-gold text-lg">check_circle</span>
          <span className={`text-sm font-medium ${isFeatured ? 'text-gray-300' : 'text-gray-600'}`}>{f}</span>
        </div>
      ))}
    </div>

    <button 
      onClick={onAction}
      className={`w-full h-14 rounded-xl font-bold transition-all active:scale-95 ${isFeatured ? 'bg-gold text-white hover:bg-white hover:text-primary' : 'bg-primary text-white hover:bg-gold'}`}
    >
      Hemen Başla
    </button>
  </div>
);

const ContactInfo = ({ icon, title, value }: any) => (
  <div className="flex items-center gap-6 group">
    <div className="size-14 rounded-2xl bg-gold-light text-gold flex items-center justify-center transition-all group-hover:bg-gold group-hover:text-white transform group-hover:rotate-6">
      <span className="material-symbols-outlined text-2xl">{icon}</span>
    </div>
    <div>
      <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">{title}</h4>
      <p className="text-lg font-bold text-primary">{value}</p>
    </div>
  </div>
);

export default App;
