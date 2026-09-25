import React, { useState } from 'react';
import { StoreReview } from '../data/storeData';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: StoreReview) => void;
  onShowToast: (msg: string) => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview,
  onShowToast
}) => {
  if (!isOpen) return null;

  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('Ahmedabad');
  const [fitExperience, setFitExperience] = useState<'True to Size' | 'Runs Small' | 'Runs Large'>('True to Size');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) {
      onShowToast('Please provide your name and review experience.');
      return;
    }

    const initials = author
      .trim()
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const newReview: StoreReview = {
      id: `custom-rev-${Date.now()}`,
      author: author.trim(),
      avatarText: initials || 'SE',
      rating,
      timeAgo: 'Just now',
      content: `${content.trim()} [Fit Feedback: ${fitExperience} • Verified Customer from ${location}]`,
      reviewsCountText: '1 review · Verified Buyer',
      userType: 'Verified Customer'
    };

    onSubmitReview(newReview);
    onShowToast('Thank you! Your verified review has been published.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 text-left">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-2xl overflow-hidden border border-[#eae7e7] max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#eae7e7] flex items-center justify-between bg-[#fcf9f8]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#4e051a] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[19px]">rate_review</span>
            </div>
            <div>
              <h3 className="font-serif text-[18px] sm:text-[20px] text-[#4e051a] font-bold">
                Share Your She Emporium Experience
              </h3>
              <p className="text-[11px] text-[#6c5b4c]">
                Verified fitting & quality review for She Emporium Ahmedabad
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-[#544244] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {/* Rating Selector */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider font-bold text-[#4e051a] mb-1.5">
              Your Overall Rating
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-[26px] transition-transform hover:scale-110 cursor-pointer focus:outline-none"
                >
                  <span className={star <= rating ? 'text-amber-500' : 'text-stone-300'}>
                    ★
                  </span>
                </button>
              ))}
              <span className="text-[13px] font-bold text-[#1c1b1b] ml-2 font-mono">
                {rating}.0 of 5 Stars
              </span>
            </div>
          </div>

          {/* Name & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-[#4e051a] mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Priya Shah"
                className="w-full px-3 py-2 text-[12.5px] border border-[#eae7e7] rounded-xs focus:outline-none focus:border-[#4e051a]"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-[#4e051a] mb-1">
                City / Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Ahmedabad / Mumbai"
                className="w-full px-3 py-2 text-[12.5px] border border-[#eae7e7] rounded-xs focus:outline-none focus:border-[#4e051a]"
              />
            </div>
          </div>

          {/* Fit Feedback */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider font-bold text-[#4e051a] mb-1.5">
              Atelier Fit Calibration
            </label>
            <div className="grid grid-cols-3 gap-2 text-[11px]">
              {(['Runs Small', 'True to Size', 'Runs Large'] as const).map((fit) => (
                <button
                  key={fit}
                  type="button"
                  onClick={() => setFitExperience(fit)}
                  className={`py-2 px-2 rounded-xs border text-center font-bold cursor-pointer transition-all ${
                    fitExperience === fit
                      ? 'border-[#4e051a] bg-[#4e051a] text-white'
                      : 'border-[#eae7e7] bg-[#fcf9f8] text-[#544244] hover:border-[#4e051a]'
                  }`}
                >
                  {fit}
                </button>
              ))}
            </div>
          </div>

          {/* Review Text */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider font-bold text-[#4e051a] mb-1">
              Your Review / Experience *
            </label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tell us about the fabric feel, cup support, packaging discretion, or Sanjay Bhai's store service..."
              className="w-full p-3 text-[12.5px] border border-[#eae7e7] rounded-xs focus:outline-none focus:border-[#4e051a] resize-none leading-relaxed"
            />
          </div>

          {/* Discreet review disclaimer */}
          <div className="p-3 bg-[#fcf9f8] rounded border border-[#eae7e7] flex items-center gap-2.5 text-[11px] text-[#6c5b4c]">
            <span className="material-symbols-outlined text-[16px] text-amber-500">verified</span>
            <span>Your review will appear as a verified boutique testimonial.</span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[11px] uppercase font-bold text-[#544244] border border-[#eae7e7] rounded-xs hover:bg-black/5 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#4e051a] hover:bg-[#6b1d2f] text-white text-[11px] uppercase tracking-wider font-bold rounded-xs shadow-xs cursor-pointer transition-colors"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
