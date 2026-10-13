import React, { useState } from 'react';
import { X, Star, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CustomerFeedbackModal: React.FC = () => {
  const { isFeedbackModalOpen, setIsFeedbackModalOpen, addFeedback } = useShop();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState<'Fabric Quality' | 'Delivery Speed' | 'Website Experience' | 'Service' | 'Suggestion'>('Fabric Quality');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isFeedbackModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    addFeedback({
      name: name.trim(),
      email: email.trim(),
      rating,
      category,
      message: message.trim()
    });

    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsFeedbackModalOpen(false);
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-[#E0D5C5]">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 text-stone-500 hover:text-black rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900">
              Shukriya for Your Feedback!
            </h3>
            <p className="text-xs text-stone-600 max-w-sm mx-auto">
              Your thoughts and suggestions help us continually elevate our Pakistani fashion collections and concierge services.
            </p>
            <button
              onClick={handleClose}
              className="mt-4 bg-[#1E1B18] text-white text-xs font-semibold px-6 py-2.5 rounded-xl hover:bg-stone-800 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <HeartHandshake className="w-5 h-5 text-[#8C6239]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C6239]">
                Your Voice Matters
              </span>
            </div>
            <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-1">
              How Was Your Shopping Experience?
            </h2>
            <p className="text-xs text-stone-600 mb-5">
              Tell us about your browsing, clothing quality, or suggestions for our Pakistani atelier.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-amber-500 p-0.5"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating ? 'fill-current' : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-medium text-stone-700 ml-2">{rating} of 5 Stars</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Feedback Topic
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[#FAF8F5] border border-[#E0D5C5] rounded-lg p-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#8C6239]"
                >
                  <option value="Fabric Quality">Fabric Quality & Embroidery</option>
                  <option value="Delivery Speed">Delivery Speed & Packaging</option>
                  <option value="Website Experience">Website Experience & Mall Ambiance</option>
                  <option value="Service">Customer Care & Support</option>
                  <option value="Suggestion">New Dress Style / Collection Suggestion</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maham Noor"
                    className="w-full bg-[#FAF8F5] border border-[#E0D5C5] rounded-lg p-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#8C6239]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email / Phone (Optional)
                  </label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="maham@example.com"
                    className="w-full bg-[#FAF8F5] border border-[#E0D5C5] rounded-lg p-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#8C6239]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Your Comments & Experience *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details about what you loved or how we can improve..."
                  className="w-full bg-[#FAF8F5] border border-[#E0D5C5] rounded-lg p-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#8C6239]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1E1B18] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
