import React from 'react';
import { Search, Heart, Trash2, RotateCcw } from 'lucide-react';
import { Hairstyle } from '../types';

// Mock Data
const MOCK_GALLERY: Hairstyle[] = [
  {
    id: '1',
    title: '复古波浪卷',
    description: '充满好莱坞黄金时代的经典韵味，柔美的大波浪卷发完美修饰脸型，尽显优雅气质。',
    date: '2024-05-20',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAPC6Zn7xav37goIrgYNfNVJy43tcfbD5WLS7rtC6xn-_twmnccyeg-p8DDbmLqawMOwzdH_9Stok0mn0VhbzR0zTvz7xxKEi0_fQcsmUVqLjCjCig3BVVxCEAbDbN387omg0QAE6LzLM1RbovAoLqVanZEjakb_WRfVwUcbwzHDfOiK3j3PTo55Cs_V-Clwoh54Qci4yXxNE1BYGfYX1MrmUuVaDwdiCZuLJE7DOd2kK9y5F3kXcEeSIe3KFPWrow-upXSLI42aZW',
    tags: ['Long', 'Wavy', 'Retro'],
    isFavorite: true
  },
  {
    id: '2',
    title: 'AI定制 #123',
    description: '根据个人特征定制的现代中长发，层次感丰富，自然蓬松，适合日常通勤与休闲。',
    date: '2024-05-19',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9JWDQoRpNdasyBu_2MSFq62WlszKZjc-ChGhJRbTin7yFSq1q_oCz7jfKcvBpBuq-gEYa9uBAeUIgBaWNRGsNHuuNd86A8qo67QZUOyo5zPrPWnDj6dQBUFdEB0FiuK3-nXkJQBishneaIcmMdWUdDkFJKsMcO12LJWzZFJrDTLvGqj2MI9jYLX6ZNo09OY4tLmumMN3_9JRGFTHEHNW-ZSvDWoDeqvgaPxD0PS0YO1AWHWgc5TLoiq3TWqiZXzY_fOhDGySN3sgH',
    tags: ['Blonde', 'Medium'],
    isFavorite: false
  },
  {
    id: '3',
    title: '阳光短碎发',
    description: '清爽利落的短碎发，洋溢着青春活力，棕色染发增添时尚感，非常适合夏季。',
    date: '2024-05-18',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtX2pKCaOUSMllkEOxGvLkg2uFZK4aNGHKRyWCYtdgEN26O5g8qAlarhcPzZ81d97_0BF0CS_tEpCZFEAX3CtlniuPW0PAv1fxQ-etUAZ3HisUTo4ww6msMz9eZEbZr8H1PAlERRiWaB6j6uPWpWae-yYJf64_-B-WiS4eVzuiOGv4mp7AwBAkvZoXYedrH06ysx_Rfb_s-87SzK-8zDVFTuTQVHbuL4D-fiWCw_pl3_Y5-GaTyLT6ZWNK1T_o9cI9Q-KIWgC0Qkvi',
    tags: ['Short', 'Brown'],
    isFavorite: false
  },
  {
    id: '4',
    title: '优雅长直发',
    description: '如丝绸般柔顺的长直发，简约而不简单，展现东方女性的温婉与大气。',
    date: '2024-05-17',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBfFI2QR_tEvHTdYKyIV8S8_erdZSGHpOuUH9SmEXw9J-dW3mm-nvH_Pa6AMkc1XlE0wsWJ6Y0sa1zTtnLV2tjd3Z03OSvIYhe-wrl2MdmY9B-VFCdzRYxT0J2BCtVmIWJ15_ks-YtZsUI208paNSH1O7ZwA4aBFs5uOOG3SuNn1e0wZpOUF7wt2n11esGcd3pxvnEbecoUNqchPO_t9IXQb_2k_AIuja5llDlS681Qboxv5JxkTjHUY3eeqaEInoxZdB6zn8OyAcS',
    tags: ['Long', 'Straight'],
    isFavorite: true
  },
  {
    id: '5',
    title: '时尚狼尾切',
    description: '个性十足的狼尾剪裁，前短后长，层次分明，彰显独特的潮流态度。',
    date: '2024-05-15',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzPdNcaMggGNHiMUV97_SQyLBZ2JUKVAkxih8AXjcsvPUO8AEHHJuCcsIxDpYHm-3jAyFjzXEAsiMkGMGfk8f6pavKJ9yq_LwYqA9JVID511L3kgeE4OIkvawYJ0H2Q1P3APXy_dFRvhj-0Deu9zEN5yXU60FU-XOkDVIij4qJhhLf2-eeJzB_kGJFRzLEc2DMVyIczmZHYCGEcTjp8xc1j7tKFW70sBQ12YBUVqkFsMua00W_HhmaFjohDwuWCRb_3X5XFvrGrClX',
    tags: ['Edgy', 'Short'],
    isFavorite: false
  },
  {
    id: '6',
    title: '经典大波浪',
    description: '永不过时的经典卷发，丰盈的卷度营造出浪漫氛围，适合各种正式场合。',
    date: '2024-05-14',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfCSvQsCyYbqY4ljRD683ndWptlU6HBCq29kzZyvhj2uEaOrZt0QTUpVLK_FVM-bYF1pVCJIpU_nT8JL1k_oSHemvS_Rcay-T5n43mtSXitGirnwC3PYg1xwOh-8GzvZ4xJ55yZ3_73V_7cCq2ANlwmGHyuV17LOtjCTKLij1Avu-NHohdjCPSuSAHWgP5Nlzcs51WP1PgSx66wMVtI1uxqiPaj5KlGLfHRckWqg0R2ehdoKhTyEuRstPXnulkhNKGKOkU55mZ8Xdx',
    tags: ['Curly', 'Long'],
    isFavorite: true
  },
  {
    id: '7',
    title: '俏皮丸子头',
    description: '减龄满分的丸子头扎发，搭配随意散落的碎发，营造出轻松活泼的少女感。',
    date: '2024-05-12',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKO8YnABO6yUdO1lw-j3ut-LL1A7WyURsFZu4hKOJYzGN5vhniXHxcjg0LII7hYrhnFmk4CdLSaaEkF4ysevI0bcCC6f8xUQ1eISWau5baPxJ3OjhAv6hbdeKr1vLpOTys7rFEtHEbfLL0NDnXNmxNSBTReYXjkIHC7gtCigGTAjSd13qE_LN5B0BnXw2zGOaaj6xhe5IlQCc8cfuZpC6XneG0i0kAcyhOKoqhNxOUAUkn5368n6-sZPk2CXQMPWVBcl5dNK9z-jBm',
    tags: ['Updo', 'Bun'],
    isFavorite: false
  },
  {
    id: '8',
    title: '空气感刘海',
    description: '轻盈通透的空气刘海，修饰额头的同时增添甜美气息，温柔又治愈。',
    date: '2024-05-11',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBa633kXH4G_2Pln5nryW3d2-50gjV7CAvHobFYTfxaS-gYpFc6R2i2XisE2NZFkSY2JLePqGOySF5HBSZ1hZrxHrM8MM9P883GjhnSkgn_ioPM5GLTXHJy8WmHFPCmOgABBeXpoYksAOhyRnpLJafeyXb_V8xtJXPHyC7tNBH7ncBKhe-hq7OFFvlhBztNft9o0JSVXFiV1_Q131bNQRua_-QSinATtV1JSuQClVVrXsgb-UfB4ucaTSGPx4ke5oih5EPLPfZfwBi',
    tags: ['Bangs', 'Medium'],
    isFavorite: false
  }
];

const Gallery: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">我的发型库</h1>
          <p className="mt-2 text-gray-400">查看并管理您所有已保存和生成的发型</p>
        </div>
        
        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="搜索发型..." 
            className="w-full rounded-lg border-0 bg-surface-dark py-2.5 pl-10 pr-4 text-white ring-1 ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mt-8 flex gap-4 overflow-x-auto pb-4">
        <button className="whitespace-nowrap rounded-full bg-primary/20 px-6 py-2 text-sm font-bold text-primary">
          全部
        </button>
        <button className="whitespace-nowrap rounded-full bg-surface-dark px-6 py-2 text-sm font-medium text-gray-300 hover:bg-white/10 transition-colors">
          我的收藏
        </button>
        <button className="whitespace-nowrap rounded-full bg-surface-dark px-6 py-2 text-sm font-medium text-gray-300 hover:bg-white/10 transition-colors">
          近期生成
        </button>
      </div>

      {/* Grid */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
        {MOCK_GALLERY.map((item) => (
          <div key={item.id} className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-surface-dark cursor-pointer shadow-lg">
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity" />
            
            {/* Content info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
              <p className="text-sm font-bold text-white truncate">{item.title}</p>
              {item.description && (
                <p className="mt-1 text-xs text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.description}
                </p>
              )}
              <p className="mt-2 text-xs text-gray-500">{item.date}</p>
            </div>

            {/* Hover Actions */}
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <button className="rounded-full bg-black/40 p-2 text-white backdrop-blur-sm hover:bg-primary transition-colors" title="Use as reference">
                <RotateCcw size={16} />
              </button>
              <button className={`rounded-full p-2 text-white backdrop-blur-sm transition-colors ${item.isFavorite ? 'bg-red-500' : 'bg-black/40 hover:bg-red-500'}`} title="Like">
                <Heart size={16} fill={item.isFavorite ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;