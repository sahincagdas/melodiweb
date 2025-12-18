
import React from 'react';
import { SongProduct } from '../types';

interface SongCardProps {
  product: SongProduct;
}

const SongCard: React.FC<SongCardProps> = ({ product }) => {
  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-[#f2f2f2] active:scale-[0.98]">
      <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-gray-100">
        <img 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          src={product.image} 
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors"></div>
        
        {/* Play Button Overlay */}
        <button className="absolute inset-0 m-auto size-16 bg-white/30 backdrop-blur-md border border-white/40 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all group-hover:scale-110 active:scale-90 shadow-2xl">
          <span className="material-symbols-outlined text-4xl ml-1">play_arrow</span>
        </button>

        {product.isBestseller && (
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[10px] font-black text-primary uppercase tracking-wider shadow-lg">
            En Çok Satan
          </div>
        )}
        {product.isNew && (
          <div className="absolute top-4 left-4 bg-accent-gold text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-lg">
            Yeni
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <span 
              key={i} 
              className={`material-symbols-outlined text-accent-gold text-[16px] md:text-[18px] ${i < Math.floor(product.rating) ? 'fill-1' : ''}`}
            >
              star
            </span>
          ))}
          <span className="text-xs text-gray-400 ml-1 font-medium">({product.reviews})</span>
        </div>
        
        <h3 className="text-xl font-bold text-primary mb-2 leading-tight">{product.title}</h3>
        <p className="text-sm text-gray-500 mb-6 line-clamp-2 leading-relaxed">{product.description}</p>
        
        <div className="mt-auto flex items-center justify-between pt-5 border-t border-[#f2f2f2]">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Fiyat</span>
            <span className="text-xl font-black text-primary">{product.price} ₺</span>
          </div>
          <button className="bg-primary text-white h-11 px-5 rounded-xl text-sm font-bold hover:bg-gold transition-colors active:scale-95 shadow-lg shadow-black/5">
            Sipariş
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
