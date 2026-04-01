import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Dictionary with 5 completely translated languages!
const resources = {
  en: {
    translation: {
      nav: { roles: "Roles", farmer: "Farmer", vendor: "Vendor", mlRouter: "ML Routing", history: "History", dashboard: "Dashboard" },
      landing: { title: "AgriTrust", subtitle: "Intelligent Blockchain Supply Chain", farmerCard: { title: "I am a Farmer", desc: "Log produce, view ML suggestions." }, vendorCard: { title: "I am a Vendor", desc: "Purchase with blockchain escrow." } },
      farmerHub: { title: "Farmer Hub 👋", subtitle: "Manage your yield and AI predictions.", newEntry: "New Entry", routerBtn: "Crop Router", mlTitle: "ML Market Predictions", demand: "Milk Demand", expectedPeak: "Expected peak in 2 days", estPrice: "Est. Price/L", sellSuggest: "Sell Tomorrow at 8AM", activeOrders: "Active & Past Orders", viewAll: "View All" },
      vendorHub: { title: "Vendor Marketplace", subtitle: "Source high-quality produce with absolute blockchain trust.", avgPrice: "Avg Market Price", activeSupply: "Active Supply", highAvail: "High Availability", verifiedFarmers: "Direct From Verified Farmers", verified: "Verified on Blockchain", supply: "Supply Available", rating: "Rating", placeOrder: "Place Escrow Order" },
      router: { title: "Smart Routing Engine", subtitle: "Distribute crop byproducts for maximum profit.", selectCrop: "Select Crop / Produce", quantities: "Quantities (kg)", generate: "Generate AI Plan", planTitle: "Smart Utilization Plan", recalculate: "Recalculate", gradeA: "Grade A Produce", gradeB: "Grade B Produce", gradeC: "Grade C Produce", profitTitle: "Profit Insight", profitDesc: "Processing your Grade C produce gives roughly 30% higher value than raw marketplace selling.", nearbyRoutes: "Nearby Industry Routes" }
    }
  },
  hi: {
    translation: {
      nav: { roles: "भूमिकाएँ", farmer: "किसान", vendor: "विक्रेता", mlRouter: "एमएल रूटिंग", history: "इतिहास", dashboard: "डैशबोर्ड" },
      landing: { title: "एग्रीट्रस्ट", subtitle: "बुद्धिमान ब्लॉकचेन आपूर्ति श्रृंखला", farmerCard: { title: "मैं एक किसान हूँ", desc: "उपज दर्ज करें, एमएल सुझाव देखें।" }, vendorCard: { title: "मैं एक विक्रेता हूँ", desc: "ब्लॉकचेन एस्क्रो के साथ खरीदें।" } },
      farmerHub: { title: "किसान हब 👋", subtitle: "अपनी उपज और AI भविष्यवाणियों का प्रबंधन करें।", newEntry: "नई प्रविष्टि", routerBtn: "फसल रूटर", mlTitle: "एमएल बाजार भविष्यवाणियां", demand: "दूध की मांग", expectedPeak: "2 दिनों में उच्च मांग की उम्मीद", estPrice: "अनुमानित मूल्य/L", sellSuggest: "कल सुबह 8 बजे बेचें", activeOrders: "सक्रिय और पिछले आदेश", viewAll: "सभी देखें" },
      vendorHub: { title: "विक्रेता बाज़ार", subtitle: "निरपेक्ष ब्लॉकचेन विश्वास के साथ उच्च गुणवत्ता वाली उपज प्राप्त करें।", avgPrice: "औसत बाजार मूल्य", activeSupply: "सक्रिय आपूर्ति", highAvail: "उच्च उपलब्धता", verifiedFarmers: "सत्यापित किसानों से सीधा", verified: "ब्लॉकचेन पर सत्यापित", supply: "आपूर्ति उपलब्ध", rating: "रेटिंग", placeOrder: "एस्क्रो आदेश दें" },
      router: { title: "स्मार्ट रूटिंग इंजन", subtitle: "अधिकतम लाभ के लिए फसल के उपोत्पादों को वितरित करें।", selectCrop: "फसल / उपज चुनें", quantities: "मात्रा (किलो)", generate: "AI योजना जनरेट करें", planTitle: "स्मार्ट उपयोग योजना", recalculate: "पुनर्गणना करें", gradeA: "ग्रेड ए उपज", gradeB: "ग्रेड बी उपज", gradeC: "ग्रेड सी उपज", profitTitle: "लाभ की जानकारी", profitDesc: "आपके ग्रेड सी उपज को संसाधित करने से कच्चे बाजार में बिक्री की तुलना में लगभग 30% अधिक मूल्य मिलता है।", nearbyRoutes: "आस-पास के उद्योग मार्ग" }
    }
  },
  kn: {
    translation: {
      nav: { roles: "ಪಾತ್ರಗಳು", farmer: "ರೈತ", vendor: "ಮಾರಾಟಗಾರ", mlRouter: "ಎಂಎಲ್ ರೂಟಿಂಗ್", history: "ಇತಿಹಾಸ", dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್" },
      landing: { title: "ಅಗ್ರಿಟ್ರಸ್ಟ್", subtitle: "ಬುದ್ಧಿವಂತ ಬ್ಲಾಕ್‌ಚೈನ್ ಪೂರೈಕೆ ಸರಪಳಿ", farmerCard: { title: "ನಾನು ರೈತ", desc: "ಉತ್ಪನ್ನಗಳನ್ನು ಲಾಗ್ ಮಾಡಿ, ಎಂಎಲ್ ಸಲಹೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ." }, vendorCard: { title: "ನಾನು ಮಾರಾಟಗಾರ", desc: "ಬ್ಲಾಕ್‌ಚೈನ್ ಎಸ್ಕ್ರೊ ಮೂಲಕ ಖರೀದಿಸಿ." } },
      farmerHub: { title: "ರೈತ ಹಬ್ 👋", subtitle: "ನಿಮ್ಮ ಇಳುವರಿ ಮತ್ತು ಎಐ ಮುನ್ಸೂಚನೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ.", newEntry: "ಹೊಸ ನಮೂದು", routerBtn: "ಬೆಳೆ ರೂಟರ್", mlTitle: "ಎಂಎಲ್ ಮಾರುಕಟ್ಟೆ ಮುನ್ಸೂಚನೆಗಳು", demand: "ಹಾಲಿನ ಬೇಡಿಕೆ", expectedPeak: "2 ದಿನಗಳಲ್ಲಿ ಹೆಚ್ಚಿನ ಬೇಡಿಕೆ", estPrice: "ಅಂದಾಜು ಬೆಲೆ/ಲೀ", sellSuggest: "ನಾಳೆ ಬೆಳಿಗ್ಗೆ 8 ಗಂಟೆಗೆ ಮಾರಿ", activeOrders: "ಸಕ್ರಿಯ ಮತ್ತು ಹಿಂದಿನ ಆದೇಶಗಳು", viewAll: "ಎಲ್ಲವನ್ನೂ ವೀಕ್ಷಿಸಿ" },
      vendorHub: { title: "ಮಾರಾಟಗಾರರ ಮಾರುಕಟ್ಟೆ", subtitle: "ಬ್ಲಾಕ್‌ಚೈನ್ ನಂಬಿಕೆಯೊಂದಿಗೆ ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಉತ್ಪನ್ನಗಳನ್ನು ಪಡೆಯಿರಿ.", avgPrice: "ಸರಾಸರಿ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ", activeSupply: "ಸಕ್ರಿಯ ಪೂರೈಕೆ", highAvail: "ಹೆಚ್ಚಿನ ಲಭ್ಯತೆ", verifiedFarmers: "ಪರಿಶೀಲಿಸಿದ ರೈತರಿಂದ ನೇರ", verified: "ಬ್ಲಾಕ್‌ಚೈನ್‌ನಲ್ಲಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ", supply: "ಪೂರೈಕೆ ಲಭ್ಯವಿದೆ", rating: "ರೇಟಿಂಗ್", placeOrder: "ಎಸ್ಕ್ರೊ ಆದೇಶವನ್ನು ಇರಿಸಿ" },
      router: { title: "ಸ್ಮಾರ್ಟ್ ರೂಟಿಂಗ್ ಎಂಜಿನ್", subtitle: "ಗರಿಷ್ಠ ಲಾಭಕ್ಕಾಗಿ ಬೆಳೆ ಉಪಉತ್ಪನ್ನಗಳನ್ನು ವಿತರಿಸಿ.", selectCrop: "ಬೆಳೆ / ಉತ್ಪನ್ನವನ್ನು ಆರಿಸಿ", quantities: "ಪ್ರಮಾಣ (ಕೆಜಿ)", generate: "ಎಐ ಯೋಜನೆಯನ್ನು ರಚಿಸಿ", planTitle: "ಸ್ಮಾರ್ಟ್ ಬಳಕೆಯ ಯೋಜನೆ", recalculate: "ಮರು ಲೆಕ್ಕಾಚಾರ ಮಾಡಿ", gradeA: "ಗ್ರೇಡ್ ಎ ಉತ್ಪನ್ನ", gradeB: "ಗ್ರೇಡ್ ಬಿ ಉತ್ಪನ್ನ", gradeC: "ಗ್ರೇಡ್ ಸಿ ಉತ್ಪನ್ನ", profitTitle: "ಲಾಭದ ಒಳನೋಟ", profitDesc: "ನಿಮ್ಮ ಗ್ರೇಡ್ ಸಿ ಉತ್ಪನ್ನವನ್ನು ಸಂಸ್ಕರಿಸುವುದರಿಂದ ಕಚ್ಚಾ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಮಾರಾಟ ಮಾಡುವುದಕ್ಕಿಂತ 30% ಹೆಚ್ಚಿನ ಮೌಲ್ಯ ಸಿಗುತ್ತದೆ.", nearbyRoutes: "ಹತ್ತಿರದ ಉದ್ಯಮ ಮಾರ್ಗಗಳು" }
    }
  },
  ta: {
    translation: {
      nav: { roles: "பத்திரங்கள்", farmer: "விவசாயி", vendor: "விற்பனையாளர்", mlRouter: "எம்எல் ரூட்டிங்", history: "வரலாறு", dashboard: "டாஷ்போர்டு" },
      landing: { title: "அக்ரிட்ரஸ்ட்", subtitle: "அறிவார்ந்த பிளாக்செயின் விநியோகச் சங்கிலி", farmerCard: { title: "நான் ஒரு விவசாயி", desc: "விளைபொருட்களை பதிவு செய், எம்எல் பரிந்துரைகளை காண்." }, vendorCard: { title: "நான் ஒரு விற்பனையாளர்", desc: "பிளாக்செயின் எஸ்க்ரோ மூலம் வாங்கவும்." } },
      farmerHub: { title: "விவசாயி மையம் 👋", subtitle: "உங்கள் விளைச்சல் மற்றும் AI கணிப்புகளை நிர்வகிக்கவும்.", newEntry: "புதிய பதிவு", routerBtn: "பயிர் ரூட்டர்", mlTitle: "எம்எல் சந்தை கணிப்புகள்", demand: "பால் தேவை", expectedPeak: "2 நாட்களில் அதிக தேவை", estPrice: "மதிப்பிடப்பட்ட விலை/லி", sellSuggest: "நாளை காலை 8 மணிக்கு விற்கவும்", activeOrders: "செயலில் உள்ள மற்றும் கடந்த ஆர்டர்கள்", viewAll: "அனைத்தையும் காண்க" },
      vendorHub: { title: "விற்பனையாளர் சந்தை", subtitle: "பிளாக்செயின் நம்பிக்கையுடன் உயர்தர விளைபொருட்களைப் பெறுங்கள்.", avgPrice: "சராசரி சந்தை விலை", activeSupply: "செயலில் உள்ள விநியோகம்", highAvail: "அதிக கிடைக்கும் தன்மை", verifiedFarmers: "சரிபார்க்கப்பட்ட விவசாயிகளிடமிருந்து நேரடியாக", verified: "பிளாக்செயினில் சரிபார்க்கப்பட்டது", supply: "விநியோகம் கிடைக்கிறது", rating: "மதிப்பீடு", placeOrder: "எஸ்க்ரோ ஆர்டரை வைக்கவும்" },
      router: { title: "ஸ்மார்ட் ரூட்டிங் என்ஜின்", subtitle: "அதிகபட்ச லாபத்திற்காக பயிர் துணை தயாரிப்புகளை விநியோகிக்கவும்.", selectCrop: "பயிர் / விளைபொருளைத் தேர்ந்தெடுக்கவும்", quantities: "அளவுகள் (கிலோ)", generate: "AI திட்டத்தை உருவாக்கவும்", planTitle: "ஸ்மார்ட் பயன்பாட்டுத் திட்டம்", recalculate: "மீண்டும் கணக்கிடு", gradeA: "தரம் ஏ விளைபொருள்", gradeB: "தரம் பி விளைபொருள்", gradeC: "தரம் சி விளைபொருள்", profitTitle: "லாப நுண்ணறிவு", profitDesc: "உங்கள் தரம் சி விளைபொருளை பதப்படுத்துவது மூல சந்தையில் விற்பதை விட 30% அதிக மதிப்பை அளிக்கிறது.", nearbyRoutes: "அருகிலுள்ள தொழில் வழிகள்" }
    }
  },
  te: {
    translation: {
      nav: { roles: "పాత్రలు", farmer: "రైతు", vendor: "విక్రేత", mlRouter: "ఎంఎల్ రూటింగ్", history: "చరిత్ర", dashboard: "డాష్‌బోర్డ్" },
      landing: { title: "అగ్రిట్రస్ట్", subtitle: "తెలివైన బ్లాక్‌చెయిన్ సరఫరా గొలుసు", farmerCard: { title: "నేను ఒక రైతును", desc: "ఉత్పత్తిని లాగ్ చేయండి, ఎంఎల్ సూచనలను చూడండి." }, vendorCard: { title: "నేను ఒక విక్రేతను", desc: "బ్లాక్‌చెయిన్ ఎస్క్రో ద్వారా కొనుగోలు చేయండి." } },
      farmerHub: { title: "రైతు కేంద్రం 👋", subtitle: "మీ దిగుబడి మరియు ఎఐ అంచనాలను నిర్వహించండి.", newEntry: "కొత్త నమోదు", routerBtn: "పంట రూటర్", mlTitle: "ఎంఎల్ మార్కెట్ అంచనాలు", demand: "పాలు డిమాండ్", expectedPeak: "2 రోజుల్లో పీక్", estPrice: "అంచనా ధర/లీ", sellSuggest: "రేపు ఉదయం 8 గంటలకు అమ్మండి", activeOrders: "క్రియాశీల మరియు గత ఆజ్ఞలు", viewAll: "అన్నింటినీ చూడండి" },
      vendorHub: { title: "విక్రేతల మార్కెట్", subtitle: "బ్లాక్‌చెయిన్ నమ్మకంతో అధిక నాణ్యత గల ఉత్పత్తులను పొందండి.", avgPrice: "సగటు మార్కెట్ ధర", activeSupply: "క్రియాశీల సరఫరా", highAvail: "అధిక లభ్యత", verifiedFarmers: "ధృవీకరించబడిన రైతుల నుండి నేరుగా", verified: "బ్లాక్‌చెయిన్‌లో ధృవీకరించబడింది", supply: "సరఫరా అందుబాటులో ఉంది", rating: "రేటింగ్", placeOrder: "ఎస్క్రో ఆర్డర్ ఉంచండి" },
      router: { title: "స్మార్ట్ రూటింగ్ ఇంజిన్", subtitle: "గరిష్ట లాభం కోసం పంట ఉప ఉత్పత్తులను పంపిణీ చేయండి.", selectCrop: "పంట / ఉత్పత్తిని ఎంచుకోండి", quantities: "పరిమాణాలు (కిలోలు)", generate: "ఎఐ ప్రణాళికను సృష్టించండి", planTitle: "స్మార్ట్ వినియోగ ప్రణాళిక", recalculate: "తిరిగి లెక్కించండి", gradeA: "గ్రేడ్ ఎ ఉత్పత్తి", gradeB: "గ్రేడ్ బి ఉత్పత్తి", gradeC: "గ్రేడ్ సి ఉత్పత్తి", profitTitle: "లాభం అంతర్దృష్టి", profitDesc: "మీ గ్రేడ్ సి ఉత్పత్తిని ప్రాసెస్ చేయడం ద్వారా ముడి మార్కెట్లో అమ్మడం కంటే 30% ఎక్కువ విలువ వస్తుంది.", nearbyRoutes: "సమీప పరిశ్రమ మార్గాలు" }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;
