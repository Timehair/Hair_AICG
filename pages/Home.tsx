import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, Sparkles, ArrowRight, Lock } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const showcaseImages = [
    {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8IjcxYCNEzuM5FK3S97YDvhxh4sCcFK2u0jvxStdXztgB-FQcNYJqdU27_FMVuNnPtxfaRZF_rXEbi433S-lNYRjaEclWQHJW2_qbtzxBJLIthyy2u_iOUtd7FgdoXu-yrq4u4cnQHpn3V9VVyqMKzzHF_PbUYq0LoatDiDRsocJstFGE6z0fkGyXy6Vmo9V0oSoHzXWRvvY5pGKD6G7pn3NS7fSa88TkPvLpofurRTV6iSUPkK3usZIn9qUT9jgCmIsvHPvtgeCc",
      title: "短发 - 现代简约"
    },
    {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9xEXGbIXojK5UZjnERdblS14wxCqZ9_FeQPQR_luEFa_kSZfzg5imRHVQ6JBzH6vwOoNx9P99t8_VztqZeDfXC3RBJ9YkyU5eTiLcdt7lz0g8Ck133BtknzAu1uvJOUznsREleocGFggFX7jGDfxGG9Lvtd6UB1kVFQ29Jq8WrMRGv7bECM_-lhtmenTQVhWsWKYobWPoXxxHA71e1GgiTPzggMG0FunhLrNn7mOshytWNvjE2ZfudasR7dUWqKI23QDBzEcjcvVm",
      title: "男士 - 纹理剪裁"
    },
    {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9GVdxx0j7wed4cvOkiy67GQ4rp7U3EQehkUH84fzfPJ4ChhJiWhSDznLiDAc2DNQjJp4SSzCY4Zo42PGuPWqgidn6-Kf1hz5hq9nhqjy9ou-JOS1JFoZ7ZNI22C-GKa8QgppmVvHHmcGAR-8bhHM1yiXWRJ5mOyI8innXrbFvmdeLHsHwNZ7B8-Hk15GKFZR7H2kg40fQ5yMGlfZRxgq_zmI32OP4Usg4oqKy5O6WEILEG2r-lsE7zWmTX8_pvZKFgd7i_T3Oh66d",
      title: "长发 - 波浪卷"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background-dark to-background-dark -z-10" />
        
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6">
            <h1 className="max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              即刻预见，<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                你的下一个惊艳发型
              </span>
            </h1>
            
            <p className="max-w-2xl text-lg text-gray-400">
              只需一张照片，即可探索无限发型可能。上传您的头像或使用摄像头，让人工智能为您匹配最适合的发型。
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl text-left">
              {/* Upload Card */}
              <div className="flex flex-col gap-6 p-6 sm:p-8 rounded-2xl bg-surface-dark border border-white/10 shadow-xl transition-all hover:border-primary/50 hover:shadow-primary/10 group">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Upload size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white">从本地上传</h3>
                </div>
                <p className="text-gray-400">选择一张清晰的正面照片，开始匹配。</p>
                <button 
                  onClick={() => navigate('/design')}
                  className="mt-auto w-full rounded-xl bg-primary py-3 text-base font-bold text-white transition-transform active:scale-95 hover:bg-primary-dark"
                >
                  上传头像
                </button>
              </div>

              {/* Camera Card */}
              <div className="flex flex-col gap-6 p-6 sm:p-8 rounded-2xl bg-surface-dark border border-white/10 shadow-xl transition-all hover:border-primary/50 hover:shadow-primary/10 group">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Camera size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white">实时拍照</h3>
                </div>
                <p className="text-gray-400">允许使用摄像头，立即捕捉你的形象。</p>
                <button 
                  onClick={() => navigate('/design', { state: { openCamera: true } })}
                  className="mt-auto w-full rounded-xl bg-white/10 py-3 text-base font-bold text-white transition-all hover:bg-white/20 active:scale-95"
                >
                  开启摄像头
                </button>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2 text-xs text-gray-500">
              <Lock size={14} />
              <span>我们尊重您的隐私，照片仅用于发型生成，不会被储存或分享。</span>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-24 bg-surface-dark/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">发型效果预览</h2>
            <p className="mt-4 text-gray-400">查看由AI生成的不同风格发型，发现你的无限可能。</p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {showcaseImages.map((img, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-2xl bg-surface-dark shadow-xl ring-1 ring-white/10 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10">
                <div className="aspect-[3/4] w-full overflow-hidden">
                  <img 
                    src={img.url} 
                    alt={img.title} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-lg font-bold text-white">{img.title}</p>
                  <button className="mt-2 flex items-center text-sm font-medium text-primary hover:text-white">
                    尝试此风格 <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;