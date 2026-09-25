import React, { useState, useEffect, useRef } from 'react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: string;
  };
}

interface LiveChatWidgetProps {
  onOpenFitGuide?: () => void;
  onOpenStoreModal?: () => void;
  onOpenTrackOrder?: () => void;
}

const FAQ_CHIPS = [
  { label: '📦 Delivery & Timings', query: 'delivery' },
  { label: '🔒 Discreet Packaging', query: 'packaging' },
  { label: '💰 COD & Payment Modes', query: 'payment' },
  { label: '📏 Sizing & Fit Help', query: 'sizing' },
  { label: '🏷️ Price Range & Offers', query: 'price' },
  { label: '📍 Ahmedabad Store Location', query: 'store' },
  { label: '🔄 Returns & Exchanges', query: 'return' },
  { label: '💬 Talk on WhatsApp', query: 'whatsapp' },
];

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
  onOpenFitGuide,
  onOpenStoreModal,
  onOpenTrackOrder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [hasUnread, setHasUnread] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Welcome to She Emporium Live Chat (Ahmedabad). How may I assist you today with your intimate wear inquiry?',
      time: 'Just now',
    },
    {
      id: '2',
      sender: 'bot',
      text: 'You can tap any topic below or ask about delivery timings, pricing, discreet packaging, sizes, or our store in Navrangpura!',
      time: 'Just now',
    },
  ]);

  // Listen for global open-live-chat event (e.g. from Tablet menu or Header)
  useEffect(() => {
    const handleOpenLiveChat = () => {
      setIsOpen(true);
    };
    window.addEventListener('open-live-chat', handleOpenLiveChat);
    return () => {
      window.removeEventListener('open-live-chat', handleOpenLiveChat);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [isOpen, messages, isTyping]);

  const getAutomatedResponse = (query: string): { text: string; action?: { label: string; onClick: () => void; icon?: string } } => {
    const q = query.toLowerCase().trim();

    // Delivery & Timings
    if (q.includes('delivery') || q.includes('deliver') || q.includes('kab') || q.includes('time') || q.includes('shipping') || q.includes('dispatch')) {
      return {
        text: '🚀 Delivery Timelines:\n• Ahmedabad (Local): Same-Day Express or within 24 hours!\n• Rest of Gujarat (Surat, Vadodara, Rajkot): 1-2 business days.\n• All India Express: 2-4 business days via BlueDart Priority.\nAll parcels are packed discreetly with zero exterior product labels.',
        action: onOpenTrackOrder ? {
          label: 'Track Active Parcel',
          icon: 'local_shipping',
          onClick: () => onOpenTrackOrder(),
        } : undefined,
      };
    }

    // Discreet Packaging
    if (q.includes('discreet') || q.includes('pack') || q.includes('privacy') || q.includes('box') || q.includes('secret') || q.includes('plain')) {
      return {
        text: '🔒 100% Discreet & Confidential Packaging:\nEvery order is packed in a tamper-evident, unmarked brown/matte outer box with tamper seals. Neither the invoice exterior nor the courier label mentions "lingerie" or product names. Your privacy is 100% guaranteed.',
      };
    }

    // Price & Offers
    if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('offer') || q.includes('kitna') || q.includes('discount') || q.includes('sale')) {
      return {
        text: '💎 Pricing & Atelier Privileges:\n• Daily Comfort T-shirt & Cotton Bras: ₹890 to ₹1,490\n• Pure Mulberry Silk Slip & Sleepwear: ₹2,490 to ₹4,890\n• Chantilly French Lace Sets: ₹2,190 to ₹3,890\n• Saree Shapers & Contour Sculptwear: ₹1,290 to ₹2,490\n✨ Current Special: Use code "ATELIER15" for 15% off orders above ₹2,999!',
      };
    }

    // Sizing & Fit
    if (q.includes('size') || q.includes('fit') || q.includes('measure') || q.includes('cup') || q.includes('band') || q.includes('chota') || q.includes('bada')) {
      return {
        text: '📏 Fit & Measurement Calibration:\nWe offer standard Indian and international cup sizes from 32B to 40D, and XS to 2XL for sleepwear. Need exact measurement guidance? Click below to launch our interactive Virtual Fit Concierge!',
        action: onOpenFitGuide ? {
          label: 'Open Virtual Fit Guide',
          icon: 'straighten',
          onClick: () => onOpenFitGuide(),
        } : undefined,
      };
    }

    // Cash on Delivery & Payment Modes
    if (q.includes('cod') || q.includes('cash') || q.includes('pay') || q.includes('upi') || q.includes('card') || q.includes('gpay')) {
      return {
        text: '💰 Payment Modes:\n• Cash on Delivery (COD) is available across all serviceable Indian PIN codes (free on orders above ₹1,499).\n• Prepaid via UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, and Net Banking.',
      };
    }

    // Ahmedabad Store Location & Timings
    if (q.includes('store') || q.includes('shop') || q.includes('location') || q.includes('address') || q.includes('kaha') || q.includes('timing') || q.includes('navrangpura') || q.includes('ahmedabad') || q.includes('cg road')) {
      return {
        text: '📍 Ahmedabad Flagship Atelier:\n• Address: Shop 14, Ground Floor, Shreemad Gokul Complex, Opp. Municipal Market, C.G. Road, Navrangpura, Ahmedabad 380009.\n• Store Hours: Monday to Sunday, 10:30 AM – 9:00 PM.\n• Private Trial Rooms available with female fit stylists.',
        action: onOpenStoreModal ? {
          label: 'View Store Map & Timings',
          icon: 'store',
          onClick: () => onOpenStoreModal(),
        } : undefined,
      };
    }

    // Returns & Exchange
    if (q.includes('return') || q.includes('exchange') || q.includes('refund') || q.includes('change') || q.includes('badalna')) {
      return {
        text: '🔄 Returns & Easy Exchanges:\nWe offer a hassle-free 7-day size exchange for unworn items with original hygiene seals and tags intact. Doorstep reverse pickup is arranged seamlessly across India.',
      };
    }

    // WhatsApp Direct Contact
    if (q.includes('whatsapp') || q.includes('call') || q.includes('contact') || q.includes('sanjay') || q.includes('number') || q.includes('phone') || q.includes('talk')) {
      return {
        text: '💬 Direct WhatsApp Assistance:\nYou can directly chat with store owner Sanjay Bhai on WhatsApp at +91 99090 08789 for bespoke inquiries or immediate orders.',
        action: {
          label: 'WhatsApp Sanjay Bhai (+91 99090 08789)',
          icon: 'chat',
          onClick: () => {
            window.open('https://wa.me/919909008789?text=Hello%20Sanjay%20Bhai,%20I%20have%20an%20inquiry%20regarding%20She%20Emporium%20collections.', '_blank');
          },
        },
      };
    }

    // Default polite answer with suggestions
    return {
      text: 'Thank you for your question! We specialize in fine lingerie, mulberry silk loungewear, and saree sculptwear at She Emporium Ahmedabad. You can also connect directly with Sanjay Bhai on WhatsApp for personalized assistance.',
      action: {
        label: 'Chat on WhatsApp (+91 99090 08789)',
        icon: 'chat',
        onClick: () => {
          window.open(`https://wa.me/919909008789?text=${encodeURIComponent('Hello Sanjay Bhai, I have a question regarding: ' + query)}`, '_blank');
        },
      },
    };
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getAutomatedResponse(text);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: response.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: response.action,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 550);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      id="she-live-chat-root"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex flex-col items-end gap-3 select-none pointer-events-auto"
    >
      {/* 1. WHATSAPP BUTTON (Just Above Live Chat - Direct Redirect to Customer WhatsApp) */}
      <div className="relative group flex items-center justify-end">
        {/* Floating Tooltip Label */}
        <div className="pointer-events-none absolute right-full mr-3 whitespace-nowrap bg-[#1c1b1b]/95 text-white text-[11px] font-medium py-1.5 px-3 rounded-md shadow-xl opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 hidden sm:flex items-center gap-1.5 border border-[#3a3838]">
          <span className="w-2 h-2 rounded-full bg-[#25D366]"></span>
          <span>Chat on WhatsApp (+91 99090 08789)</span>
        </div>

        <a
          href="https://wa.me/919909008789?text=Hello%20Sanjay%20Bhai,%20I%20have%20an%20inquiry%20regarding%20She%20Emporium%20lingerie%20and%20orders."
          target="_blank"
          rel="noopener noreferrer"
          id="direct-whatsapp-button"
          aria-label="Direct WhatsApp Chat"
          className="relative flex items-center justify-center w-12 h-12 sm:w-[50px] sm:h-[50px] rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_26px_rgba(37,211,102,0.7)] transform hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-white/80"
          title="Direct WhatsApp: +91 99090 08789"
        >
          {/* Subtle gentle ripple behind WhatsApp */}
          <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-ping opacity-40 pointer-events-none"></span>

          {/* Official WhatsApp SVG Logo */}
          <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current relative z-10 drop-shadow-xs" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </a>
      </div>

      {/* 2. LIVE CHAT TRIGGER BUTTON (Icon-Only with Expanding Radiation Waves, Exactly Below WhatsApp) */}
      {!isOpen && (
        <div className="relative group flex items-center justify-end">
          {/* Floating Tooltip Label on Hover (Hidden on touch, shown on desktop) */}
          <div className="pointer-events-none absolute right-full mr-3 whitespace-nowrap bg-[#1c1b1b]/95 text-white text-[11px] font-medium py-1.5 px-3 rounded-md shadow-xl opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 hidden sm:flex items-center gap-1.5 border border-[#3a3838]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Live Chat Support</span>
          </div>

          {/* Continuous Multi-Layer Radiation Waves (Radar ripples) */}
          <span className="absolute inset-0 rounded-full bg-emerald-500/45 animate-radiation-1 pointer-events-none"></span>
          <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-radiation-2 pointer-events-none"></span>
          <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-radiation-3 pointer-events-none"></span>

          <button
            onClick={() => setIsOpen(true)}
            id="live-chat-trigger-button"
            aria-label="Open Live Chat"
            title="Live Chat Support"
            className="relative flex items-center justify-center w-12 h-12 sm:w-[50px] sm:h-[50px] rounded-full bg-[#4e051a] hover:bg-[#6b1d2f] text-white shadow-[0_4px_22px_rgba(78,5,26,0.5)] hover:shadow-[0_6px_28px_rgba(78,5,26,0.75)] transform hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-white/80 z-10"
          >
            {/* Chat Bubble Icon */}
            <span className="material-symbols-outlined text-[24px] sm:text-[26px] text-white drop-shadow-xs">
              chat_bubble
            </span>

            {/* Active online green indicator ping */}
            <span className="absolute top-0 right-0 flex h-3.5 w-3.5 -mt-0.5 -mr-0.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-90"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white shadow-[0_0_8px_#34d399]"></span>
            </span>

            {/* Unread badge indicator */}
            {hasUnread && (
              <span className="absolute -top-1.5 -left-1.5 bg-amber-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md border border-white">
                1
              </span>
            )}
          </button>
        </div>
      )}

      {/* Live Chat Window */}
      {isOpen && (
        <div className="w-[calc(100vw-2rem)] sm:w-[380px] max-w-[400px] h-[520px] max-h-[82vh] bg-white rounded-xl shadow-2xl border border-[#eae7e7] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-[#4e051a] text-white p-3.5 flex items-center justify-between shadow-md shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-full bg-white/15 border border-white/25 flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[19px]">support_agent</span>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#4e051a] rounded-full"></span>
              </div>
              <div>
                <h3 className="font-serif text-[14px] font-bold tracking-wide flex items-center gap-1.5">
                  She Emporium Live Chat
                </h3>
                <p className="text-[10.5px] text-[#f7e7ce] flex items-center gap-1 opacity-90">
                  <span>Navrangpura, Ahmedabad</span>
                  <span>•</span>
                  <span className="text-emerald-300 font-medium flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                    Online
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  window.open('https://wa.me/919909008789?text=Hello%20Sanjay%20Bhai,%20I%20have%20an%20inquiry%20regarding%20She%20Emporium.', '_blank');
                }}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Open WhatsApp Direct Chat"
              >
                <span className="material-symbols-outlined text-[15px]">chat</span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Close chat"
              >
                <span className="material-symbols-outlined text-[17px]">close</span>
              </button>
            </div>
          </div>

          {/* Quick FAQ Chips Strip */}
          <div className="bg-[#fcf9f8] border-b border-[#eae7e7] p-2 overflow-x-auto whitespace-nowrap scrollbar-none shrink-0 flex gap-1.5 text-left">
            {FAQ_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip.query)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-medium bg-white text-[#4e051a] border border-[#4e051a]/25 hover:bg-[#4e051a] hover:text-white transition-colors cursor-pointer shrink-0 shadow-2xs"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#fdfbfb]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 text-[12px] sm:text-[12.5px] leading-relaxed shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-[#4e051a] text-white rounded-br-none'
                      : 'bg-white text-[#1c1b1b] border border-[#eae7e7] rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Optional Action Button inside Message */}
                  {msg.action && (
                    <div className="mt-2.5 pt-2 border-t border-[#eae7e7]">
                      <button
                        onClick={msg.action.onClick}
                        className="w-full inline-flex items-center justify-center gap-1.5 bg-[#fcf9f8] hover:bg-[#f6f3f2] text-[#4e051a] font-bold text-[11px] py-1.5 px-3 rounded border border-[#4e051a]/30 transition-colors cursor-pointer"
                      >
                        {msg.action.icon && (
                          <span className="material-symbols-outlined text-[14px]">
                            {msg.action.icon}
                          </span>
                        )}
                        <span>{msg.action.label}</span>
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-[9.5px] text-[#877274] mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-[#6c5b4c] text-[11px] bg-white p-2.5 rounded-lg border border-[#eae7e7] w-fit">
                <span className="w-1.5 h-1.5 bg-[#4e051a] rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-[#4e051a] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-[#4e051a] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                <span className="ml-1 text-[10.5px]">Concierge is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-2.5 bg-white border-t border-[#eae7e7] shrink-0">
            <div className="flex items-center gap-1.5 bg-[#fcf9f8] border border-[#eae7e7] rounded-full px-3 py-1.5 focus-within:border-[#4e051a] focus-within:ring-1 focus-within:ring-[#4e051a]/30 transition-all">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask price, delivery, sizes, discreet packing..."
                className="flex-1 bg-transparent text-[12px] sm:text-[12.5px] text-[#1c1b1b] placeholder:text-[#877274] focus:outline-none"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputVal.trim()}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  inputVal.trim()
                    ? 'bg-[#4e051a] text-white hover:bg-[#6b1d2f]'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
                aria-label="Send Message"
              >
                <span className="material-symbols-outlined text-[15px]">arrow_upward</span>
              </button>
            </div>
            <p className="text-[9px] text-center text-[#877274] mt-1">
              Live automated concierge with direct WhatsApp escalation
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
