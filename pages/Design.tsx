import React, { useState, useRef, useEffect } from 'react';
import { Upload, Camera, Sparkles, Loader2, X, AlertCircle, Check, Wand2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { generateHairstyleImage, generateHairstyleDescription } from '../services/geminiService';
import CameraCapture from '../components/CameraCapture';

const HAIRSTYLE_PRESETS = [
  { id: 'long-wavy', name: '浪漫大波浪', desc: '优雅迷人', prompt: 'Long wavy hair, voluminous and elegant style, soft curls' },
  { id: 'french-bob', name: '法式Bob', desc: '随性慵懒', prompt: 'French bob hairstyle, chin length, messy chic, straight with slight texture' },
  { id: 'air-bangs', name: '空气刘海', desc: '减龄甜美', prompt: 'Medium length hair with airy see-through bangs, korean style' },
  { id: 'pixie', name: '精灵短发', desc: '干练帅气', prompt: 'Short pixie cut, textured layers, modern and chic' },
  { id: 'straight', name: '黑长直', desc: '清纯女神', prompt: 'Long straight hair, silky and smooth, sleek look' }, // Removed specific 'black' constraint to allow consistency
  { id: 'wool-curl', name: '羊毛卷', desc: '复古蓬松', prompt: 'Retro wool roll curls, fluffy and textured, vintage vibe' },
  { id: 'undercut', name: '商务背头', desc: '成熟稳重', prompt: 'Slicked back undercut, professional male style, clean cut' },
  { id: 'texture-perm', name: '韩系纹理烫', desc: '潮流时尚', prompt: 'Short textured perm, k-pop male style, voluminous top' },
];

const COLOR_KEYWORDS = [
  'dye', 'color', 'blonde', 'red', 'blue', 'green', 'pink', 'purple', 'black', 'brown', 'white', 'grey', 'gray', 'silver', 'gold', 'brunette', 'ginger', 'platinum',
  '染', '色', '红', '黄', '蓝', '绿', '紫', '黑', '白', '灰', '金', '棕', '漂'
];

const Design: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedDescription, setGeneratedDescription] = useState<string>('');
  const [isDescGenerating, setIsDescGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  useEffect(() => {
    // Check for openCamera state from navigation
    const state = location.state as { openCamera?: boolean };
    if (state?.openCamera) {
      setShowCamera(true);
      window.history.replaceState({}, '');
    }
  }, [location]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setShowCamera(false);
    setError(null);
  };

  const handlePresetSelect = (id: string) => {
    setSelectedPresetId(prev => prev === id ? null : id);
  };

  const handleGenerate = async () => {
    const selectedPreset = HAIRSTYLE_PRESETS.find(p => p.id === selectedPresetId);
    const presetPrompt = selectedPreset ? selectedPreset.prompt : '';
    const userPrompt = prompt.trim();

    if (!presetPrompt && !userPrompt && !selectedImage) {
      setError("请至少上传照片、选择发型或输入描述");
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);
    setGeneratedDescription('');
    setError(null);

    try {
      // Combine preset and user text
      const styleDescription = [presetPrompt, userPrompt].filter(Boolean).join('. ');

      // Check if user or preset explicitly asks for color
      const hasColorRequest = COLOR_KEYWORDS.some(keyword => 
        styleDescription.toLowerCase().includes(keyword.toLowerCase())
      );

      let consistencyInstruction = "Keep the facial features consistent. High quality, realistic texture.";
      
      // If no explicit color requested, enforce original hair color
      if (selectedImage && !hasColorRequest) {
        consistencyInstruction += " IMPORTANT: Strictly maintain the exact hair color from the original reference image. Do not change the hair color.";
      }

      const finalPrompt = selectedImage 
        ? `Change the hairstyle of the person in this image. Target style: ${styleDescription}. ${consistencyInstruction}` 
        : `A portrait of a person with the following hairstyle: ${styleDescription}. Professional studio lighting, photorealistic.`;

      const result = await generateHairstyleImage(finalPrompt, selectedImage || undefined);
      setGeneratedImage(result);
      
      // Initial description from input
      setGeneratedDescription(userPrompt || (selectedPreset ? selectedPreset.name : 'AI生成发型'));

    } catch (err: any) {
      setError("生成失败，请重试。可能原因：API配额限制或网络问题。");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateDescription = async () => {
    const selectedPreset = HAIRSTYLE_PRESETS.find(p => p.id === selectedPresetId);
    const styleDescription = [selectedPreset?.prompt, prompt].filter(Boolean).join(', ');
    
    if (!styleDescription) return;

    setIsDescGenerating(true);
    try {
      const desc = await generateHairstyleDescription(styleDescription);
      setGeneratedDescription(desc);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDescGenerating(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">个性化发型定制</h1>
        <p className="mt-4 text-gray-400">上传你的照片，选择心仪发型，让AI为你创造奇迹。</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left Column: Input */}
        <div className="flex flex-col gap-6 rounded-2xl bg-surface-dark p-6 shadow-xl ring-1 ring-white/5 sm:p-8">
          
          {/* Section 1: Upload */}
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm">1</span>
              上传你的照片
            </h2>
            
            <div className="space-y-4">
              {selectedImage ? (
                <div className="relative overflow-hidden rounded-xl border border-white/10">
                  <img src={selectedImage} alt="User upload" className="h-64 w-full object-cover" />
                  <button 
                    onClick={() => setSelectedImage(null)}
                    className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white backdrop-blur-md hover:bg-red-500/80 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <div 
                  className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-white/10 bg-background-dark/50 px-6 py-8 transition-colors hover:border-primary/50"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files?.[0];
                      if (file) {
                          const reader = new FileReader();
                          reader.onload = (ev) => setSelectedImage(ev.target?.result as string);
                          reader.readAsDataURL(file);
                      }
                  }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Upload size={24} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-white">点击上传或拖拽图片</p>
                    <p className="mt-1 text-xs text-gray-500">支持 JPG, PNG, WEBP</p>
                  </div>
                  <div className="flex gap-3">
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors"
                      >
                        选择文件
                      </button>
                      <button 
                        onClick={() => setShowCamera(true)}
                        className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors flex items-center gap-2"
                      >
                        <Camera size={16}/> 拍照
                      </button>
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="w-full border-t border-white/10 my-2"></div>

          {/* Section 2: Customization */}
          <div className="flex-1 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm">2</span>
              定制发型需求
            </h2>

            {/* Presets Grid */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">选择预设风格 (可选)</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {HAIRSTYLE_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetSelect(preset.id)}
                    className={`relative flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition-all ${
                      selectedPresetId === preset.id
                        ? 'border-primary bg-primary/10'
                        : 'border-white/10 bg-background-dark/50 hover:border-white/30 hover:bg-white/5'
                    }`}
                  >
                    <span className={`text-sm font-bold ${selectedPresetId === preset.id ? 'text-primary' : 'text-white'}`}>
                      {preset.name}
                    </span>
                    <span className="text-xs text-gray-500 line-clamp-1">{preset.desc}</span>
                    {selectedPresetId === preset.id && (
                      <div className="absolute right-2 top-2 rounded-full bg-primary p-0.5 text-white">
                        <Check size={10} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Text Input Area */}
            <div className="space-y-2">
               <label className="block text-sm font-medium text-gray-300">更多细节描述 (可选)</label>
               <textarea 
                 value={prompt}
                 onChange={(e) => setPrompt(e.target.value)}
                 placeholder="补充细节，例如：染成亚麻灰，稍微修剪刘海..."
                 className="w-full rounded-xl border-0 bg-background-dark p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary resize-none h-24 text-sm"
               />
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark py-4 text-base font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] hover:shadow-primary/30 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                正在生成中...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                立即生成
              </>
            )}
          </button>
          
          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-500/10 p-4 text-sm text-red-400">
              <AlertCircle size={16} />
              {error}
            </div>
          )}
        </div>

        {/* Right Column: Result */}
        <div className="flex flex-col gap-6 rounded-2xl bg-surface-dark p-6 shadow-xl ring-1 ring-white/5 sm:p-8">
           <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm">3</span>
            AI生成效果
          </h2>

          <div className="flex-1 flex flex-col items-center justify-center rounded-xl border border-white/10 bg-background-dark/50 min-h-[400px] overflow-hidden relative">
            {generatedImage ? (
                <img src={generatedImage} alt="AI Generated" className="h-full w-full object-contain" />
            ) : isGenerating ? (
               <div className="flex flex-col items-center gap-4 text-center p-8">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-primary">
                        <Sparkles size={20} />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">AI正在设计中</p>
                    <p className="text-sm text-gray-500">这可能需要几秒钟，请稍候...</p>
                  </div>
               </div>
            ) : (
                <div className="flex flex-col items-center gap-4 text-center p-8 opacity-50">
                   <div className="rounded-full bg-white/5 p-6">
                      <Sparkles size={40} className="text-white" />
                   </div>
                   <p className="font-medium text-white">您的专属发型将在此呈现</p>
                </div>
            )}
          </div>
          
          {generatedImage && (
             <div className="flex flex-col gap-4">
               {/* Description Area */}
               <div className="bg-background-dark/50 p-4 rounded-xl border border-white/10">
                 <div className="flex items-center justify-between mb-2">
                   <label className="text-sm font-medium text-gray-300">发型描述</label>
                   <button 
                     onClick={handleGenerateDescription}
                     disabled={isDescGenerating}
                     className="flex items-center gap-1.5 text-xs text-primary hover:text-white transition-colors disabled:opacity-50"
                   >
                     {isDescGenerating ? <Loader2 size={12} className="animate-spin"/> : <Wand2 size={12} />}
                     AI生成文案
                   </button>
                 </div>
                 <textarea
                   value={generatedDescription}
                   onChange={(e) => setGeneratedDescription(e.target.value)}
                   className="w-full bg-transparent text-sm text-white resize-none focus:outline-none placeholder-gray-600 h-20"
                   placeholder="输入或生成发型描述..."
                 />
               </div>

               <div className="flex gap-4">
                 <button className="flex-1 rounded-xl bg-white/10 py-3 text-sm font-bold text-white hover:bg-white/20 transition-colors">
                   下载图片
                 </button>
                 <button className="flex-1 rounded-xl bg-primary/20 py-3 text-sm font-bold text-primary hover:bg-primary/30 transition-colors">
                   保存到发型库
                 </button>
               </div>
             </div>
          )}
        </div>
      </div>

      {showCamera && (
        <CameraCapture 
          onCapture={handleCameraCapture} 
          onClose={() => setShowCamera(false)} 
        />
      )}
    </div>
  );
};

export default Design;