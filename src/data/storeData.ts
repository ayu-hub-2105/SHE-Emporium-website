export interface StoreReview {
  id: string;
  author: string;
  avatarText: string;
  rating: number;
  timeAgo: string;
  content: string;
  photosCount?: number;
  userType?: string;
  reviewsCountText?: string;
  ownerReply?: {
    author: string;
    timeAgo: string;
    content: string;
  };
}

export const REAL_STORE_DATA = {
  name: "She Emporium",
  tagline: "Premier Lingerie & Intimates Store in Ahmedabad",
  rating: 4.7,
  totalReviews: 15,
  category: "Lingerie store in Ahmedabad, Gujarat",
  address: "Relief Rd, opp. HDFC BANK, Old City, EXACTLY, Lal Darwaja, Ahmedabad, Gujarat 380001",
  landmark: "Opposite HDFC Bank, Lal Darwaja, Old City",
  city: "Ahmedabad, Gujarat",
  pincode: "380001",
  phone: "99090 08789",
  displayPhone: "+91 99090 08789",
  whatsapp: "919909008789",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=She+Emporium+Relief+Rd+opp+HDFC+BANK+Lal+Darwaja+Ahmedabad+Gujarat+380001",
  ownerName: "Sanjay Bhai",
  hours: [
    { day: "Wednesday", hours: "9:30 am – 9:30 pm" },
    { day: "Thursday", hours: "9:30 am – 9:30 pm" },
    { day: "Friday", hours: "9:30 am – 9:30 pm" },
    { day: "Saturday", hours: "9:30 am – 9:30 pm" },
    { day: "Sunday", hours: "10:30 am – 7:30 pm" },
    { day: "Monday", hours: "9:30 am – 9:30 pm" },
    { day: "Tuesday", hours: "9:30 am – 9:30 pm" }
  ],
  reviews: [
    {
      id: "rev-1",
      author: "Furkan Saifi",
      avatarText: "FS",
      rating: 5,
      timeAgo: "2 months ago",
      content: "Good item and soft fabric. Price and quality bath are best. And I am also satisfied with the she Emporium. 😊",
      reviewsCountText: "1 review",
      userType: "Verified Customer"
    },
    {
      id: "rev-2",
      author: "Jagdish Sawnani",
      avatarText: "JS",
      rating: 5,
      timeAgo: "2 months ago",
      content: "Best and latest products, reasonable price with best services. Thank you Sanjay Bhai ..U have gained a repeat costumer.",
      reviewsCountText: "2 reviews",
      userType: "Repeat Customer"
    },
    {
      id: "rev-3",
      author: "Riaan Moorjani",
      avatarText: "RM",
      rating: 5,
      timeAgo: "2 months ago",
      content: "Geniune branded products with reasonable rates. Highly satisfied. Thank you Sanjay Bhai.",
      reviewsCountText: "3 reviews · 1 photo",
      photosCount: 1,
      userType: "Verified Customer"
    },
    {
      id: "rev-4",
      author: "Dahoo Thakor",
      avatarText: "DT",
      rating: 5,
      timeAgo: "2 months ago",
      content: "Very Nice Products,Top Quality and Very Nice Service.All Premium Brands available.Owner's Nature is also very Nice..Thank you She Emporium",
      reviewsCountText: "1 review",
      userType: "Verified Customer"
    },
    {
      id: "rev-5",
      author: "Divyanka Murjani",
      avatarText: "DM",
      rating: 5,
      timeAgo: "Edited 2 months ago",
      content: "This is the only lingerie and hosiery shop in Ahmedabad which has premium and exclusive collection with reasonable rates. The best family shop with the best services.",
      reviewsCountText: "3 reviews · 1 photo",
      photosCount: 1,
      userType: "Verified Customer"
    },
    {
      id: "rev-6",
      author: "Badal Ravat 777",
      avatarText: "BR",
      rating: 5,
      timeAgo: "2 months ago",
      content: "Nice products and affordable rates. All branded products available.",
      reviewsCountText: "1 review",
      userType: "Verified Customer"
    },
    {
      id: "rev-7",
      author: "Jitu Parmar",
      avatarText: "JP",
      rating: 5,
      timeAgo: "2 months ago",
      content: "Supeer Products and Quality.Really happy with my Purchase.Nice Collection 😊",
      reviewsCountText: "2 reviews",
      userType: "Verified Customer"
    },
    {
      id: "rev-8",
      author: "Tracky miles",
      avatarText: "TM",
      rating: 5,
      timeAgo: "2 months ago",
      content: "The range of products is very good. Quality is also good of products.",
      reviewsCountText: "15 reviews · 2 photos",
      photosCount: 2,
      userType: "Local Guide"
    },
    {
      id: "rev-9",
      author: "Saurin Shah",
      avatarText: "SS",
      rating: 5,
      timeAgo: "Edited a year ago",
      content: "Excellent Socks with an Awesome Quality. Thank You Sanjay Bhai as you have gained me a repeat customer in your list. ❤️2",
      reviewsCountText: "9 reviews · 1 photo",
      photosCount: 1,
      userType: "Local Guide",
      ownerReply: {
        author: "She Emporium (owner)",
        timeAgo: "3 months ago",
        content: "Thank you so much, Saurin Bhai, for your wonderful review and kind words! 😊 We're truly grateful for your trust and support. It means a lot to know that you're happy with the quality of our socks and that you've become one of our valued repeat customers. We look forward to serving you again with the same quality, service, and care. See you soon at She Emporium! ❤️ Team She Emporium"
      }
    },
    {
      id: "rev-10",
      author: "Minal Shah",
      avatarText: "MS",
      rating: 5,
      timeAgo: "a year ago",
      content: "Very fast delivered. Awesome product.",
      reviewsCountText: "25 reviews · 2 photos",
      photosCount: 2,
      userType: "Local Guide",
      ownerReply: {
        author: "She Emporium (owner)",
        timeAgo: "3 months ago",
        content: "Thank you so much, Minal Shah, for your wonderful 5-star review! 😊 We're delighted to know that you were happy with our fast delivery and the quality of the product. Your trust and support mean a lot to us. We look forward to serving you again with the same quality products and excellent service. Thank you for choosing She Emporium! ❤️"
      }
    },
    {
      id: "rev-11",
      author: "Ansar Shaikh",
      avatarText: "AS",
      rating: 4,
      timeAgo: "4 months ago",
      content: "I bought a genuine branded undergarment, but after washing it started pilling.",
      reviewsCountText: "1 review · 4 photos",
      photosCount: 4,
      userType: "Verified Customer",
      ownerReply: {
        author: "She Emporium (owner)",
        timeAgo: "3 months ago",
        content: "Dear Ansar Shaikh, We're sorry to hear that you were not satisfied with your purchase. At our store, we sell only genuine branded products sourced through authorized channels, and customer satisfaction is our highest priority. If there is a genuine manufacturing defect, we would be more than happy to inspect the product and assist you with the appropriate resolution as per the brand's policy. We kindly request you to visit our store or contact us with your original purchase bill so that we can verify and help resolve it. Thank you."
      }
    },
    {
      id: "rev-12",
      author: "Kedarnath Nagendra",
      avatarText: "KN",
      rating: 5,
      timeAgo: "2 months ago",
      content: "Top notch collection and authentic branded innerwear with great service by Sanjay Bhai.",
      reviewsCountText: "4 reviews · 12 photos",
      photosCount: 12,
      userType: "Local Guide"
    },
    {
      id: "rev-13",
      author: "Naved Peerji",
      avatarText: "NP",
      rating: 5,
      timeAgo: "a year ago",
      content: "Best lingerie store in Old Ahmedabad, very honest pricing and polite staff.",
      reviewsCountText: "2 reviews · 3 photos",
      photosCount: 3,
      userType: "Verified Customer"
    },
    {
      id: "rev-14",
      author: "Harsh Moorjani",
      avatarText: "HM",
      rating: 5,
      timeAgo: "2 years ago",
      content: "Great shopping experience for genuine branded products at Lal Darwaja.",
      reviewsCountText: "5 reviews · 5 photos",
      photosCount: 5,
      userType: "Verified Customer"
    },
    {
      id: "rev-15",
      author: "INSIDE ME The Lingerie Hub",
      avatarText: "IM",
      rating: 5,
      timeAgo: "3 years ago",
      content: "Professional setup, wide collection of branded lingerie and courteous behavior.",
      reviewsCountText: "2 reviews",
      userType: "Industry Peer"
    }
  ]
};
