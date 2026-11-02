import {
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { Canvas } from "@react-three/fiber";

import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroScene from "./three/HeroScene";

import "./App.css";
import "./Step13.css";
import "./LanguageToggle.css";

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   BRAND — DO NOT TRANSLATE
========================================================= */

const BRAND_NAME =
  "SHUBHAM CHINGUDE PHOTOFILMS";

const BRAND_SHORT =
  "SC";


/* =========================================================
   DEMO CONTACT DETAILS
========================================================= */

const CONTACT_EMAIL =
  "hello@shubhamchingude.com";

const CONTACT_PHONE =
  "+91 99999 99999";

const WHATSAPP_NUMBER =
  "919999999999";


/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {

  /* =======================================================
     SIMPLE MARATHI
  ======================================================= */

  mr: {

    nav: {
      home: "होम",
      about: "माझ्याबद्दल",
      portfolio: "माझे फोटो",
      services: "सेवा",
      contact: "संपर्क",
    },


    preloader: {
      loading: "वेबसाइट सुरू होत आहे",
    },


    hero: {

      line1:
        "तुमचे खास क्षण",

      line2:
        "कायमचे जपतो",

      categories: [
        "लग्न",
        "प्री-वेडिंग",
        "पोर्ट्रेट",
        "कार्यक्रम",
        "फॅशन",
      ],

      description1:
        "प्रत्येक फोटोमागे एक खास आठवण असते.",

      description2:
        "तुमच्या आयुष्यातले सुंदर क्षण आम्ही फोटोमध्ये कायमचे जपतो.",

      portfolioButton:
        "माझे फोटो पहा →",

      showreel:
        "▶  व्हिडिओ पहा",

      interactive:
        "फोटो गॅलरी",

      interaction:
        "टच • क्लिक • स्क्रोल",

      scroll:
        "खाली स्क्रोल करा",
    },


    about: {

      eyebrow:
        "माझ्याबद्दल",

      heading1:
        "फक्त फोटो नाही,",

      heading2:
        "आठवणी जपतो.",

      lead:
        "फोटोग्राफी म्हणजे फक्त कॅमेऱ्याने फोटो काढणं नाही.",

      copy1:
        "एक सुंदर हसू, आनंदाचा क्षण, कुटुंबासोबतचा वेळ किंवा आयुष्यातला खास दिवस — अशा छोट्या छोट्या गोष्टी फोटोमध्ये जपणं मला आवडतं.",

      copy2:
        "माझा प्रयत्न एवढाच असतो की अनेक वर्षांनी हे फोटो पाहिल्यावर तुम्हाला तो दिवस पुन्हा आठवावा.",

      photographer:
        "फोटोग्राफर",

      label:
        "तुमचे खास क्षण जपताना",

      experience:
        "वर्षांचा अनुभव",

      shoots:
        "फोटोशूट्स",

      clients:
        "आनंदी ग्राहक",
    },


    portfolio: {

      eyebrow:
        "माझे फोटो",

      heading1:
        "मी टिपलेले",

      heading2:
        "खास क्षण.",

      intro:
        "लग्न, प्री-वेडिंग, पोर्ट्रेट आणि विविध कार्यक्रमांमध्ये टिपलेले काही खास फोटो.",

      filters: {
        all: "सर्व",
        wedding: "लग्न",
        portrait: "पोर्ट्रेट",
        events: "कार्यक्रम",
      },

      viewStory:
        "फोटो पहा",

      selected:
        "निवडक फोटो",

      coming:
        "आणखी फोटो लवकरच",
    },


    photos: {

      wedding: {
        title:
          "लग्नाचे खास क्षण",

        shortTitle:
          "नव्या आयुष्याची सुरुवात",

        category:
          "लग्न फोटोग्राफी",
      },


      portrait: {
        title:
          "पोर्ट्रेट फोटो",

        shortTitle:
          "चेहरा आणि भावना",

        category:
          "पोर्ट्रेट फोटोग्राफी",
      },


      events: {
        title:
          "कार्यक्रमाचे फोटो",

        shortTitle:
          "प्रत्येक खास क्षण",

        category:
          "इव्हेंट फोटोग्राफी",
      },
    },


    services: {

      eyebrow:
        "आमच्या सेवा",

      heading1:
        "तुमच्या खास दिवसासाठी",

      heading2:
        "सुंदर फोटोग्राफी.",

      intro:
        "प्रत्येक कार्यक्रम आणि प्रत्येक व्यक्ती वेगळी असते. त्यामुळे तुमची गरज समजून फोटोशूट करण्यावर आमचा भर असतो.",

      explore:
        "सेवा पहा",

      quote:
        "चांगला फोटो तोच, जो पाहिल्यावर त्या क्षणाची आठवण पुन्हा जिवंत होते.",

      items: [

        {
          number: "01",

          title:
            "लग्न फोटोग्राफी",

          subtitle:
            "तुमचा खास दिवस",

          description:
            "लग्नातील विधी, कुटुंब, हसू, आनंद आणि छोट्या छोट्या खास क्षणांचे सुंदर फोटो.",

          image:
            "/images-optimized/wedding.webp",
        },


        {
          number: "02",

          title:
            "प्री-वेडिंग",

          subtitle:
            "लग्नाआधीचे खास क्षण",

          description:
            "तुमच्या आवडीच्या ठिकाणी आणि तुमच्या स्टाईलनुसार सुंदर कपल फोटोशूट.",

          image:
            "/images-optimized/event.webp",
        },


        {
          number: "03",

          title:
            "पोर्ट्रेट",

          subtitle:
            "तुमची खास ओळख",

          description:
            "नैसर्गिक हावभाव आणि सुंदर प्रकाशात प्रोफेशनल पोर्ट्रेट फोटो.",

          image:
            "/images-optimized/portrait.webp",
        },


        {
          number: "04",

          title:
            "कार्यक्रम",

          subtitle:
            "प्रत्येक क्षणाची आठवण",

          description:
            "वाढदिवस, साखरपुडा, कौटुंबिक कार्यक्रम, कंपनी इव्हेंट आणि इतर कार्यक्रमांचे फोटो.",

          image:
            "/images-optimized/event.webp",
        },


        {
          number: "05",

          title:
            "फॅशन / कमर्शियल",

          subtitle:
            "प्रोफेशनल फोटो",

          description:
            "फॅशन, ब्रँड, व्यवसाय आणि जाहिरातींसाठी आकर्षक आणि प्रोफेशनल फोटोशूट.",

          image:
            "/images-optimized/portrait.webp",
        },

      ],
    },


    testimonials: {

      eyebrow:
        "ग्राहकांचे अनुभव",

      heading1:
        "आमच्याबद्दल",

      heading2:
        "ग्राहक काय म्हणतात.",

      intro:
        "चांगले फोटो जितके महत्त्वाचे आहेत, तितकाच फोटोशूटचा चांगला अनुभवही महत्त्वाचा आहे.",

      clientExperience:
        "ग्राहकांचा अनुभव",

      items: [

        {
          number: "01",

          name:
            "आरव आणि मीरा",

          type:
            "लग्न फोटोग्राफी",

          location:
            "पुणे",

          quote:
            "आमच्या लग्नातील प्रत्येक खास क्षण खूप सुंदरपणे टिपला गेला. फोटो पाहिल्यावर आजही त्या दिवसाची आठवण ताजी होते.",
        },


        {
          number: "02",

          name:
            "रिया शर्मा",

          type:
            "पोर्ट्रेट फोटोशूट",

          location:
            "मुंबई",

          quote:
            "फोटोशूट करताना अजिबात ताण वाटला नाही. फोटो खूप नैसर्गिक आणि सुंदर आले.",
        },


        {
          number: "03",

          name:
            "कुणाल इव्हेंट्स",

          type:
            "इव्हेंट फोटोग्राफी",

          location:
            "नाशिक",

          quote:
            "कार्यक्रमातील महत्त्वाचे आणि कॅन्डिड दोन्ही प्रकारचे क्षण खूप छान टिपले गेले.",
        },


        {
          number: "04",

          name:
            "अनाया स्टुडिओ",

          type:
            "कमर्शियल फोटोशूट",

          location:
            "पुणे",

          quote:
            "फोटो खूप प्रोफेशनल आले आणि आमच्या ब्रँडला एक चांगला लूक मिळाला.",
        },

      ],
    },


    contact: {

      eyebrow:
        "संपर्क करा",

      heading1:
        "तुमचा खास दिवस",

      heading2:
        "आपण सुंदर आठवणीत जपूया.",

      intro:
        "तुमच्या कार्यक्रमाबद्दल किंवा फोटोशूटबद्दल थोडी माहिती आम्हाला सांगा.",


      getInTouch:
        "आमच्याशी संपर्क करा",


      question1:
        "तुमचा एखादा",

      question2:
        "खास कार्यक्रम आहे का?",


      copy:
        "लग्न, प्री-वेडिंग, पोर्ट्रेट, वाढदिवस, कार्यक्रम किंवा कमर्शियल फोटोशूटसाठी आमच्याशी संपर्क करा.",


      phone:
        "फोन",


      email:
        "ई-मेल",


      location:
        "ठिकाण",


      availability:
        "सेवा",


      locationValue:
        "महाराष्ट्र, भारत",


      travel:
        "बाहेरगावीही उपलब्ध",


      quick:
        "लगेच संपर्क करा",


      whatsapp:
        "WhatsApp वर मेसेज करा",


      demo:
        "Live करण्याआधी खरा फोन नंबर, WhatsApp नंबर आणि ई-मेल टाका.",


      booking:
        "फोटोशूट बुक करा",


      name:
        "तुमचे नाव *",


      namePlaceholder:
        "तुमचे नाव लिहा",


      phoneLabel:
        "फोन नंबर *",


      emailLabel:
        "ई-मेल *",


      emailPlaceholder:
        "तुमचा ई-मेल",


      service:
        "कोणती सेवा हवी आहे? *",


      selectService:
        "सेवा निवडा",


      eventDate:
        "कार्यक्रमाची तारीख",


      shootLocation:
        "कार्यक्रमाचे ठिकाण",


      locationPlaceholder:
        "शहर / हॉल / ठिकाण",


      message:
        "फोटोशूटबद्दल थोडी माहिती द्या *",


      messagePlaceholder:
        "कार्यक्रम कोणता आहे, ठिकाण कुठे आहे आणि तुम्हाला कशा प्रकारचे फोटो हवे आहेत ते सांगा...",


      send:
        "WHATSAPP वर चौकशी पाठवा",


      opening:
        "WHATSAPP उघडत आहे...",


      response:
        "तुमची चौकशी WhatsApp मध्ये उघडेल",


      success:
        "✓ WhatsApp वर मेसेज तयार झाला आहे. मेसेज तपासून Send करा.",


      error:
        "कृपया लाल रंगात दाखवलेली माहिती तपासा.",


      validation: {

        name:
          "कृपया तुमचे नाव लिहा.",

        email:
          "कृपया ई-मेल लिहा.",

        emailInvalid:
          "कृपया योग्य ई-मेल लिहा.",

        phone:
          "कृपया फोन नंबर लिहा.",

        phoneInvalid:
          "कृपया योग्य फोन नंबर लिहा.",

        service:
          "कृपया सेवा निवडा.",

        message:
          "कृपया फोटोशूटबद्दल थोडी माहिती द्या.",
      },


      bookingServices: {

        wedding:
          "लग्न फोटोग्राफी",

        preWedding:
          "प्री-वेडिंग",

        portrait:
          "पोर्ट्रेट",

        event:
          "इव्हेंट फोटोग्राफी",

        commercial:
          "फॅशन / कमर्शियल",

        other:
          "इतर",
      },
    },


    footer: {

      copy:
        "तुमचे खास क्षण फोटोमध्ये कायमचे जपतो.",

      explore:
        "वेबसाइट",

      services:
        "सेवा",

      contact:
        "संपर्क",

      weddings:
        "लग्न",

      portraits:
        "पोर्ट्रेट",

      events:
        "कार्यक्रम",

      commercial:
        "कमर्शियल",

      haveStory:
        "फोटोशूट करायचं आहे?",

      cta1:
        "चला तुमचे",

      cta2:
        "खास क्षण जपूया",

      rights:
        "सर्व हक्क राखीव.",

      made:
        "फोटो, भावना आणि आठवणी.",

      back:
        "वर जा ↑",
    },


    whatsappMessage: {

      hello:
        `नमस्कार ${BRAND_NAME},`,

      intro:
        "मला फोटोशूटबद्दल चौकशी करायची आहे.",

      name:
        "नाव",

      phone:
        "फोन",

      email:
        "ई-मेल",

      service:
        "सेवा",

      date:
        "तारीख",

      location:
        "ठिकाण",

      details:
        "फोटोशूटची माहिती",

      undecided:
        "अजून ठरलेली नाही",

      unspecified:
        "माहिती दिलेली नाही",

      ending:
        "कृपया उपलब्ध तारीख आणि पुढील माहिती सांगा.",
    },

  },


  /* =======================================================
     ENGLISH
  ======================================================= */

  en: {

    nav: {
      home: "Home",
      about: "About",
      portfolio: "Portfolio",
      services: "Services",
      contact: "Contact",
    },


    preloader: {
      loading:
        "Loading Experience",
    },


    hero: {

      line1:
        "Capturing",

      line2:
        "Timeless Stories",

      categories: [
        "Wedding",
        "Pre-Wedding",
        "Portrait",
        "Events",
        "Fashion",
      ],

      description1:
        "Every photograph tells a story.",

      description2:
        "Capturing emotions, moments and memories that deserve to live forever.",

      portfolioButton:
        "Explore Portfolio →",

      showreel:
        "▶  Watch Showreel",

      interactive:
        "Interactive Gallery",

      interaction:
        "Hover • Click • Scroll",

      scroll:
        "Scroll to Discover",
    },


    about: {

      eyebrow:
        "About the Photographer",

      heading1:
        "Capturing Emotion,",

      heading2:
        "Not Just Images.",

      lead:
        "Photography is more than pressing a shutter.",

      copy1:
        "It is about noticing the smallest moments — a glance, a smile, a movement and an emotion that may exist only for a second.",

      copy2:
        "My goal is to transform those moments into photographs that still feel alive years later.",

      photographer:
        "Photographer",

      label:
        "Stories Through Light",

      experience:
        "Years Experience",

      shoots:
        "Photo Shoots",

      clients:
        "Happy Clients",
    },


    portfolio: {

      eyebrow:
        "Selected Work",

      heading1:
        "Stories Through",

      heading2:
        "My Lens.",

      intro:
        "A collection of moments, emotions and stories captured across weddings, portraits and special events.",

      filters: {
        all: "All",
        wedding: "Wedding",
        portrait: "Portrait",
        events: "Events",
      },

      viewStory:
        "View Story",

      selected:
        "Selected Stories",

      coming:
        "More Stories Coming Soon",
    },


    photos: {

      wedding: {
        title:
          "Wedding Stories",
        shortTitle:
          "Forever Begins Here",
        category:
          "Wedding Photography",
      },

      portrait: {
        title:
          "Portrait Stories",
        shortTitle:
          "Faces & Feelings",
        category:
          "Portrait Photography",
      },

      events: {
        title:
          "Event Stories",
        shortTitle:
          "Moments In Motion",
        category:
          "Event Photography",
      },
    },


    services: {

      eyebrow:
        "What I Capture",

      heading1:
        "Photography Crafted",

      heading2:
        "Around Your Story.",

      intro:
        "Every assignment is approached differently — with attention to emotion, personality, atmosphere and the story behind the moment.",

      explore:
        "Explore Service",

      quote:
        "The best photograph is the one that makes you feel the moment again.",

      items: [

        {
          number: "01",
          title:
            "Wedding Photography",
          subtitle:
            "Timeless celebration",
          description:
            "Natural emotions, rituals, details and unforgettable moments captured with a cinematic storytelling approach.",
          image:
            "/images-optimized/wedding.webp",
        },

        {
          number: "02",
          title:
            "Pre-Wedding",
          subtitle:
            "Your story before forever",
          description:
            "Creative couple portraits designed around your personality, chemistry, location and unique love story.",
          image:
            "/images-optimized/event.webp",
        },

        {
          number: "03",
          title:
            "Portrait",
          subtitle:
            "Character through light",
          description:
            "Expressive portraits focused on personality, mood, natural expressions and beautiful light.",
          image:
            "/images-optimized/portrait.webp",
        },

        {
          number: "04",
          title:
            "Events",
          subtitle:
            "Every moment remembered",
          description:
            "Professional coverage for celebrations, corporate functions, birthdays, ceremonies and special occasions.",
          image:
            "/images-optimized/event.webp",
        },

        {
          number: "05",
          title:
            "Fashion / Commercial",
          subtitle:
            "Visuals that stand out",
          description:
            "Editorial, fashion and commercial photography focused on strong compositions and premium visual presentation.",
          image:
            "/images-optimized/portrait.webp",
        },

      ],
    },


    testimonials: {

      eyebrow:
        "Client Stories",

      heading1:
        "What They Felt,",

      heading2:
        "In Their Words.",

      intro:
        "The photographs matter, but the experience of creating them matters just as much.",

      clientExperience:
        "Client Experience",

      items: [

        {
          number: "01",
          name: "Aarav & Meera",
          type:
            "Wedding Photography",
          location: "Pune",
          quote:
            "Every special moment from our wedding was captured beautifully. Looking at the photographs brings the day back to life.",
        },

        {
          number: "02",
          name: "Riya Sharma",
          type:
            "Portrait Session",
          location: "Mumbai",
          quote:
            "The shoot felt easy and comfortable. The final photographs looked natural and beautiful.",
        },

        {
          number: "03",
          name: "Kunal Events",
          type:
            "Event Photography",
          location: "Nashik",
          quote:
            "Both important and candid moments from the event were captured beautifully.",
        },

        {
          number: "04",
          name: "Anaya Studio",
          type:
            "Commercial Photography",
          location: "Pune",
          quote:
            "The photographs looked professional and gave our brand a stronger visual identity.",
        },

      ],
    },


    contact: {

      eyebrow:
        "Start a Conversation",

      heading1:
        "Let's Create Something",

      heading2:
        "Timeless Together.",

      intro:
        "Tell me about your story, event and the moments you want to remember.",

      getInTouch:
        "Get in Touch",

      question1:
        "Have a story",

      question2:
        "worth capturing?",

      copy:
        "Whether you're planning a wedding, portrait session, event or commercial shoot, send the details and let's create something meaningful.",

      phone:
        "Phone",

      email:
        "Email",

      location:
        "Location",

      availability:
        "Availability",

      locationValue:
        "Maharashtra, India",

      travel:
        "Available for Travel",

      quick:
        "Quick Enquiry",

      whatsapp:
        "Chat on WhatsApp",

      demo:
        "Replace demo phone, WhatsApp and email before publishing.",

      booking:
        "Book Your Shoot",

      name:
        "Your Name *",

      namePlaceholder:
        "Enter your name",

      phoneLabel:
        "Phone *",

      emailLabel:
        "Email *",

      emailPlaceholder:
        "you@example.com",

      service:
        "Service *",

      selectService:
        "Select service",

      eventDate:
        "Event Date",

      shootLocation:
        "Location",

      locationPlaceholder:
        "City / Venue",

      message:
        "Tell Me About Your Shoot *",

      messagePlaceholder:
        "Tell me about your event, ideas, venue and preferred style...",

      send:
        "Send on WhatsApp",

      opening:
        "Opening WhatsApp...",

      response:
        "Enquiry opens directly in WhatsApp",

      success:
        "✓ WhatsApp enquiry is ready. Review the message and tap Send.",

      error:
        "Please check the highlighted fields.",

      validation: {

        name:
          "Please enter your name.",

        email:
          "Please enter your email.",

        emailInvalid:
          "Please enter a valid email.",

        phone:
          "Please enter your phone number.",

        phoneInvalid:
          "Please enter a valid phone number.",

        service:
          "Please select a service.",

        message:
          "Please tell us something about your shoot.",
      },


      bookingServices: {

        wedding:
          "Wedding Photography",

        preWedding:
          "Pre-Wedding",

        portrait:
          "Portrait",

        event:
          "Event Photography",

        commercial:
          "Fashion / Commercial",

        other:
          "Other",
      },
    },


    footer: {

      copy:
        "Capturing moments that deserve to live forever.",

      explore:
        "Explore",

      services:
        "Services",

      contact:
        "Contact",

      weddings:
        "Weddings",

      portraits:
        "Portraits",

      events:
        "Events",

      commercial:
        "Commercial",

      haveStory:
        "Have a Story?",

      cta1:
        "Let's create",

      cta2:
        "something timeless",

      rights:
        "All Rights Reserved.",

      made:
        "Made with light, emotion & stories.",

      back:
        "Back to Top ↑",
    },


    whatsappMessage: {

      hello:
        `Hello ${BRAND_NAME},`,

      intro:
        "I would like to enquire about a photography shoot.",

      name:
        "Name",

      phone:
        "Phone",

      email:
        "Email",

      service:
        "Service",

      date:
        "Event Date",

      location:
        "Location",

      details:
        "Shoot Details",

      undecided:
        "Not decided",

      unspecified:
        "Not specified",

      ending:
        "Please share availability and further details.",
    },

  },

};


/* =========================================================
   CONFIG
========================================================= */

const navItems = [
  "home",
  "about",
  "portfolio",
  "services",
  "contact",
];


const filterKeys = [
  "all",
  "wedding",
  "portrait",
  "events",
];


const bookingServiceKeys = [
  "wedding",
  "preWedding",
  "portrait",
  "event",
  "commercial",
  "other",
];


const initialFormData = {
  name: "",
  email: "",
  phone: "",
  service: "",
  eventDate: "",
  location: "",
  message: "",
};


/* =========================================================
   DATE
========================================================= */

function getLocalToday() {

  const now =
    new Date();

  const year =
    now.getFullYear();

  const month =
    String(
      now.getMonth() + 1
    ).padStart(
      2,
      "0"
    );

  const day =
    String(
      now.getDate()
    ).padStart(
      2,
      "0"
    );

  return `${year}-${month}-${day}`;
}


function formatEventDate(
  value
) {

  if (!value) {
    return "";
  }

  return value
    .split("-")
    .reverse()
    .join("-");
}


/* =========================================================
   APP
========================================================= */

function App() {

  /* =======================================================
     LANGUAGE
  ======================================================= */

  const [
    language,
    setLanguage,
  ] =
    useState(() => {

      try {

        const saved =
          localStorage.getItem(
            "sc-language"
          );

        return saved === "en"
          ? "en"
          : "mr";

      } catch {

        return "mr";

      }

    });


  const t =
    translations[
      language
    ];


  /* =======================================================
     STATE
  ======================================================= */

  const [
    isLoading,
    setIsLoading,
  ] =
    useState(true);


  const [
    loadingProgress,
    setLoadingProgress,
  ] =
    useState(0);


  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] =
    useState(false);


  const [
    activeSection,
    setActiveSection,
  ] =
    useState("home");


  const [
    selectedIndex,
    setSelectedIndex,
  ] =
    useState(null);


  const [
    activeFilter,
    setActiveFilter,
  ] =
    useState("all");


  const [
    testimonialIndex,
    setTestimonialIndex,
  ] =
    useState(0);


  const [
    testimonialPaused,
    setTestimonialPaused,
  ] =
    useState(false);


  const [
    formData,
    setFormData,
  ] =
    useState(
      initialFormData
    );


  const [
    formErrors,
    setFormErrors,
  ] =
    useState({});


  const [
    formStatus,
    setFormStatus,
  ] =
    useState("");


  const [
    isSubmitting,
    setIsSubmitting,
  ] =
    useState(false);


  /* =======================================================
     REFS
  ======================================================= */

  const appRef =
    useRef();

  const navbarRef =
    useRef();

  const heroRef =
    useRef();

  const heroContentRef =
    useRef();

  const threeAreaRef =
    useRef();

  const topTextRef =
    useRef();

  const titleRef =
    useRef();

  const categoriesRef =
    useRef();

  const descriptionRef =
    useRef();

  const buttonsRef =
    useRef();

  const mouseInfoRef =
    useRef();

  const aboutRef =
    useRef();

  const aboutVisualRef =
    useRef();

  const aboutTextRef =
    useRef();

  const statsRef =
    useRef();

  const portfolioRef =
    useRef();

  const portfolioHeadingRef =
    useRef();

  const portfolioGridRef =
    useRef();

  const servicesRef =
    useRef();

  const servicesHeadingRef =
    useRef();

  const servicesGridRef =
    useRef();

  const testimonialsRef =
    useRef();

  const testimonialsHeadingRef =
    useRef();

  const testimonialShellRef =
    useRef();

  const testimonialCardRef =
    useRef();

  const contactRef =
    useRef();

  const contactHeadingRef =
    useRef();

  const contactGridRef =
    useRef();

  const footerRef =
    useRef();

  const eventDatePickerRef =
    useRef();

  const heroScrollProgress =
    useRef(0);


  const today =
    getLocalToday();


  /* =======================================================
     LANGUAGE SAVE
  ======================================================= */

  useEffect(() => {

    try {

      localStorage.setItem(
        "sc-language",
        language
      );

    } catch {
      // ignore
    }


    document.documentElement.lang =
      language === "mr"
        ? "mr"
        : "en";

  }, [
    language,
  ]);


  const changeLanguage =
    (newLanguage) => {

      setLanguage(
        newLanguage
      );

      setFormErrors({});

      setFormStatus("");

      setMobileMenuOpen(
        false
      );

    };


  /* =======================================================
     PRELOADER
  ======================================================= */

  useEffect(() => {

    let current = 0;

    let closeTimeout;


    const interval =
      window.setInterval(
        () => {

          current +=
            5 +
            Math.floor(
              Math.random() * 7
            );


          if (
            current >= 100
          ) {

            setLoadingProgress(
              100
            );


            window.clearInterval(
              interval
            );


            closeTimeout =
              window.setTimeout(
                () => {

                  setIsLoading(
                    false
                  );

                },
                400
              );


            return;

          }


          setLoadingProgress(
            current
          );

        },
        70
      );


    return () => {

      window.clearInterval(
        interval
      );

      window.clearTimeout(
        closeTimeout
      );

    };

  }, []);


  /* =======================================================
     BODY LOCK
  ======================================================= */

  useEffect(() => {

    const lock =
      isLoading ||
      mobileMenuOpen ||
      selectedIndex !== null;


    document.body.style.overflow =
      lock
        ? "hidden"
        : "";


    return () => {

      document.body.style.overflow =
        "";

    };

  }, [
    isLoading,
    mobileMenuOpen,
    selectedIndex,
  ]);


  /* =======================================================
     DATA
  ======================================================= */

  const photos = [

    {
      id: 0,

      key:
        "wedding",

      categoryKey:
        "wedding",

      src:
        "/images-optimized/wedding.webp",

      className:
        "portfolio-tall",
    },


    {
      id: 1,

      key:
        "portrait",

      categoryKey:
        "portrait",

      src:
        "/images-optimized/portrait.webp",

      className:
        "portfolio-wide",
    },


    {
      id: 2,

      key:
        "events",

      categoryKey:
        "events",

      src:
        "/images-optimized/event.webp",

      className:
        "portfolio-event",
    },

  ];


  const filteredPhotos =

    activeFilter === "all"

      ? photos

      : photos.filter(
          (photo) =>
            photo.categoryKey ===
            activeFilter
        );


  const services =
    t.services.items;


  const testimonials =
    t.testimonials.items;


  const activeTestimonial =
    testimonials[
      testimonialIndex
    ];


  /* =======================================================
     GSAP
  ======================================================= */

  useLayoutEffect(() => {

    if (
      isLoading
    ) {
      return;
    }


    const context =
      gsap.context(() => {

        const entrance =
          gsap.timeline({
            defaults: {
              ease:
                "power3.out",
            },
          });


        entrance.fromTo(
          navbarRef.current,
          {
            opacity: 0,
            y: -25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          }
        );


        entrance.fromTo(
          topTextRef.current,
          {
            opacity: 0,
            x: -35,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
          },
          "-=0.25"
        );


        entrance.fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          "-=0.35"
        );


        entrance.fromTo(
          categoriesRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.4"
        );


        entrance.fromTo(
          descriptionRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.4"
        );


        entrance.fromTo(
          buttonsRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.35"
        );


        navItems.forEach(
          (item) => {

            ScrollTrigger.create({

              trigger:
                `#${item}`,

              start:
                "top 55%",

              end:
                "bottom 45%",

              onEnter:
                () =>
                  setActiveSection(
                    item
                  ),

              onEnterBack:
                () =>
                  setActiveSection(
                    item
                  ),

            });

          }
        );


        ScrollTrigger.create({

          trigger:
            heroRef.current,

          start:
            "top top",

          end:
            "bottom top",

          scrub: 1,

          onUpdate:
            (self) => {

              heroScrollProgress.current =
                self.progress;

            },

        });


        /*
          IMPORTANT:
          MobileHeroFix.css handles
          Three.js position on phone.
        */

        if (
          window.innerWidth >
          800
        ) {

          gsap.to(
            threeAreaRef.current,
            {
              xPercent: 8,
              scale: 0.94,
              opacity: 0.72,
              ease: "none",

              scrollTrigger: {
                trigger:
                  heroRef.current,
                start:
                  "top top",
                end:
                  "bottom top",
                scrub: 1,
              },
            }
          );

        }


        gsap.to(
          heroContentRef.current,
          {
            opacity: 0,
            y: -90,

            scrollTrigger: {
              trigger:
                heroRef.current,
              start:
                "20% top",
              end:
                "85% top",
              scrub: 1,
            },
          }
        );


        const reveal =
          (
            target,
            trigger,
            x = 0,
            y = 60
          ) => {

            if (
              !target ||
              !trigger
            ) {
              return;
            }


            gsap.fromTo(
              target,
              {
                opacity: 0,
                x,
                y,
              },
              {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 1,
                ease:
                  "power3.out",

                scrollTrigger: {
                  trigger,
                  start:
                    "top 82%",
                },
              }
            );

          };


        reveal(
          aboutVisualRef.current,
          aboutRef.current,
          -70,
          0
        );


        reveal(
          aboutTextRef.current,
          aboutRef.current,
          70,
          0
        );


        reveal(
          portfolioHeadingRef.current,
          portfolioRef.current
        );


        reveal(
          portfolioGridRef.current,
          portfolioGridRef.current
        );


        reveal(
          servicesHeadingRef.current,
          servicesRef.current
        );


        reveal(
          testimonialsHeadingRef.current,
          testimonialsRef.current
        );


        reveal(
          testimonialShellRef.current,
          testimonialShellRef.current
        );


        reveal(
          contactHeadingRef.current,
          contactRef.current
        );


        reveal(
          contactGridRef.current,
          contactGridRef.current
        );


        reveal(
          footerRef.current,
          footerRef.current
        );


        ScrollTrigger.refresh();

      }, appRef);


    return () => {

      context.revert();

    };

  }, [
    isLoading,
  ]);


  /* =======================================================
     FILTER ANIMATION
  ======================================================= */

  useEffect(() => {

    if (
      !portfolioGridRef.current
    ) {
      return;
    }


    const cards =
      portfolioGridRef.current
        .querySelectorAll(
          ".portfolio-card"
        );


    const animation =
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.07,
        }
      );


    return () => {

      animation.kill();

    };

  }, [
    activeFilter,
    language,
  ]);


  /* =======================================================
     TESTIMONIAL AUTO
  ======================================================= */

  useEffect(() => {

    if (
      testimonialPaused ||
      isLoading
    ) {
      return;
    }


    const interval =
      window.setInterval(
        () => {

          setTestimonialIndex(
            (current) =>
              (
                current + 1
              ) %
              testimonials.length
          );

        },
        6000
      );


    return () => {

      window.clearInterval(
        interval
      );

    };

  }, [
    testimonialPaused,
    isLoading,
    testimonials.length,
  ]);


  /* =======================================================
     KEYBOARD
  ======================================================= */

  useEffect(() => {

    const handler =
      (event) => {

        if (
          event.key ===
          "Escape"
        ) {

          setMobileMenuOpen(
            false
          );

          setSelectedIndex(
            null
          );

        }


        if (
          selectedIndex !== null &&
          event.key ===
            "ArrowRight"
        ) {

          setSelectedIndex(
            (current) =>
              (
                current + 1
              ) %
              photos.length
          );

        }


        if (
          selectedIndex !== null &&
          event.key ===
            "ArrowLeft"
        ) {

          setSelectedIndex(
            (current) =>
              (
                current -
                1 +
                photos.length
              ) %
              photos.length
          );

        }

      };


    window.addEventListener(
      "keydown",
      handler
    );


    return () => {

      window.removeEventListener(
        "keydown",
        handler
      );

    };

  }, [
    selectedIndex,
  ]);


  /* =======================================================
     TILT
  ======================================================= */

  const handlePortfolioMove =
    (event) => {

      const card =
        event.currentTarget;

      const rect =
        card.getBoundingClientRect();

      const x =
        (
          event.clientX -
          rect.left
        ) /
        rect.width;

      const y =
        (
          event.clientY -
          rect.top
        ) /
        rect.height;


      card.style.setProperty(
        "--card-rotate-x",
        `${(y - 0.5) * -10}deg`
      );


      card.style.setProperty(
        "--card-rotate-y",
        `${(x - 0.5) * 10}deg`
      );

    };


  const resetPortfolioTilt =
    (event) => {

      event.currentTarget.style
        .setProperty(
          "--card-rotate-x",
          "0deg"
        );

      event.currentTarget.style
        .setProperty(
          "--card-rotate-y",
          "0deg"
        );

    };


  const handleServiceMove =
    (event) => {

      const card =
        event.currentTarget;

      const rect =
        card.getBoundingClientRect();

      const x =
        (
          event.clientX -
          rect.left
        ) /
        rect.width;

      const y =
        (
          event.clientY -
          rect.top
        ) /
        rect.height;


      card.style.setProperty(
        "--service-rotate-x",
        `${(y - 0.5) * -8}deg`
      );


      card.style.setProperty(
        "--service-rotate-y",
        `${(x - 0.5) * 8}deg`
      );

    };


  const resetServiceTilt =
    (event) => {

      event.currentTarget.style
        .setProperty(
          "--service-rotate-x",
          "0deg"
        );

      event.currentTarget.style
        .setProperty(
          "--service-rotate-y",
          "0deg"
        );

    };


  /* =======================================================
     FORM
  ======================================================= */

  const handleFormChange =
    (event) => {

      const {
        name,
        value,
      } =
        event.target;


      setFormData(
        (current) => ({
          ...current,
          [name]: value,
        })
      );


      setFormErrors(
        (current) => ({
          ...current,
          [name]: "",
        })
      );


      setFormStatus("");

    };


  const validateForm =
    () => {

      const errors = {};


      if (
        !formData.name.trim()
      ) {

        errors.name =
          t.contact.validation.name;

      }


      if (
        !formData.email.trim()
      ) {

        errors.email =
          t.contact.validation.email;

      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
          .test(
            formData.email.trim()
          )
      ) {

        errors.email =
          t.contact.validation.emailInvalid;

      }


      if (
        !formData.phone.trim()
      ) {

        errors.phone =
          t.contact.validation.phone;

      } else if (
        !/^[0-9+\-\s()]{8,18}$/
          .test(
            formData.phone.trim()
          )
      ) {

        errors.phone =
          t.contact.validation.phoneInvalid;

      }


      if (
        !formData.service
      ) {

        errors.service =
          t.contact.validation.service;

      }


      if (
        !formData.message.trim()
      ) {

        errors.message =
          t.contact.validation.message;

      }


      return errors;

    };


  const createWhatsAppMessage =
    () => {

      const w =
        t.whatsappMessage;


      const eventDate =
        formData.eventDate

          ? formatEventDate(
              formData.eventDate
            )

          : w.undecided;


      const location =
        formData.location.trim()

          ? formData.location.trim()

          : w.unspecified;


      const service =
        t.contact
          .bookingServices[
            formData.service
          ] ||
        formData.service;


      return [

        w.hello,

        "",

        w.intro,

        "",

        `${w.name}: ${formData.name.trim()}`,

        `${w.phone}: ${formData.phone.trim()}`,

        `${w.email}: ${formData.email.trim()}`,

        `${w.service}: ${service}`,

        `${w.date}: ${eventDate}`,

        `${w.location}: ${location}`,

        "",

        `${w.details}:`,

        formData.message.trim(),

        "",

        w.ending,

      ].join("\n");

    };


  const handleBookingSubmit =
    (event) => {

      event.preventDefault();


      if (
        isSubmitting
      ) {
        return;
      }


      const errors =
        validateForm();


      if (
        Object.keys(
          errors
        ).length > 0
      ) {

        setFormErrors(
          errors
        );

        setFormStatus(
          "error"
        );

        return;

      }


      setFormErrors({});

      setIsSubmitting(
        true
      );


      const message =
        createWhatsAppMessage();


      const url =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          message
        )}`;


      const opened =
        window.open(
          url,
          "_blank",
          "noopener,noreferrer"
        );


      if (
        !opened
      ) {

        window.location.href =
          url;

      }


      window.setTimeout(
        () => {

          setIsSubmitting(
            false
          );

          setFormStatus(
            "success"
          );

          setFormData(
            initialFormData
          );

        },
        450
      );

    };


  /* =======================================================
     LIGHTBOX
  ======================================================= */

  const openPhoto =
    (index) => {

      setSelectedIndex(
        index
      );

    };


  const closePhoto =
    () => {

      setSelectedIndex(
        null
      );

    };


  const previousPhoto =
    () => {

      setSelectedIndex(
        (current) =>
          current === null
            ? null
            : (
                current -
                1 +
                photos.length
              ) %
              photos.length
      );

    };


  const nextPhoto =
    () => {

      setSelectedIndex(
        (current) =>
          current === null
            ? null
            : (
                current + 1
              ) %
              photos.length
      );

    };


  /* =======================================================
     UI
  ======================================================= */

  return (

    <>

      {/* PRELOADER */}

      {
        isLoading && (

          <div
            className={
              loadingProgress >=
              100

                ? "site-preloader complete"

                : "site-preloader"
            }
          >

            <div
              className="preloader-center"
            >

              <div
                className="preloader-logo"
              >

                <span>
                  {BRAND_SHORT}
                </span>

                <small>
                  PHOTOFILMS
                </small>

              </div>


              <p>
                SHUBHAM CHINGUDE
              </p>


              <div
                className="preloader-track"
              >

                <span
                  style={{
                    width:
                      `${loadingProgress}%`,
                  }}
                />

              </div>


              <div
                className="preloader-bottom"
              >

                <small>
                  {t.preloader.loading}
                </small>

                <strong>
                  {String(
                    loadingProgress
                  ).padStart(
                    3,
                    "0"
                  )}%
                </strong>

              </div>

            </div>

          </div>

        )
      }


      <main
        ref={appRef}
        className={
          `website ${
            language === "mr"
              ? "language-marathi"
              : "language-english"
          }`
        }
      >

        {/* HEADER */}

        <header
          className="navbar"
          ref={navbarRef}
        >

          <a
            href="#home"
            className="logo brand-logo"
            onClick={() =>
              setMobileMenuOpen(
                false
              )
            }
          >

            <span>
              SC
            </span>

            <div>

              <strong>
                SHUBHAM CHINGUDE
              </strong>

              <small>
                PHOTOFILMS
              </small>

            </div>

          </a>


          <nav>

            {
              navItems.map(
                (item) => (

                  <a
                    key={item}
                    href={`#${item}`}
                    className={
                      activeSection ===
                      item
                        ? "active"
                        : ""
                    }
                  >
                    {t.nav[item]}
                  </a>

                )
              )
            }

          </nav>


          <div
            className="header-actions"
          >

            <div
              className="language-switch"
              aria-label="Language"
            >

              <button
                type="button"
                className={
                  language === "mr"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  changeLanguage(
                    "mr"
                  )
                }
              >
                मराठी
              </button>


              <span>
                /
              </span>


              <button
                type="button"
                className={
                  language === "en"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  changeLanguage(
                    "en"
                  )
                }
              >
                EN
              </button>

            </div>


            <button
              type="button"
              className={
                mobileMenuOpen
                  ? "menu-toggle open"
                  : "menu-toggle"
              }
              onClick={() =>
                setMobileMenuOpen(
                  (current) =>
                    !current
                )
              }
              aria-label="Menu"
            >

              <span />
              <span />
              <span />

            </button>

          </div>

        </header>


        {/* MOBILE MENU */}

        <div
          className={
            mobileMenuOpen
              ? "mobile-menu open"
              : "mobile-menu"
          }
        >

          <div
            className="mobile-menu-bg-word"
          >
            SC
          </div>


          <div
            className="mobile-menu-inner"
          >

            <p>
              MENU
            </p>


            <nav>

              {
                navItems.map(
                  (
                    item,
                    index
                  ) => (

                    <a
                      key={item}
                      href={`#${item}`}
                      className={
                        activeSection ===
                        item
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setMobileMenuOpen(
                          false
                        )
                      }
                    >

                      <small>
                        0{index + 1}
                      </small>

                      <span>
                        {t.nav[item]}
                      </span>

                      <b>
                        ↗
                      </b>

                    </a>

                  )
                )
              }

            </nav>


            <div
              className="mobile-menu-footer"
            >

              <span>
                SHUBHAM CHINGUDE
              </span>

              <small>
                PHOTOFILMS
              </small>

            </div>

          </div>

        </div>


        {/* HERO */}

        <section
          className="hero"
          id="home"
          ref={heroRef}
        >

          <div
            className="three-area"
            ref={threeAreaRef}
          >

            <Canvas
              camera={{
                position: [
                  0,
                  0,
                  7,
                ],
                fov: 45,
              }}
              dpr={[
                1,
                1.5,
              ]}
            >

              <Suspense
                fallback={null}
              >

                <HeroScene
                  onSelectPhoto={
                    openPhoto
                  }
                  scrollProgressRef={
                    heroScrollProgress
                  }
                />

              </Suspense>

            </Canvas>

          </div>


          <div
            className="dark-overlay"
          />


          <div
            className="hero-content"
            ref={heroContentRef}
          >

            <p
              className="top-text"
              ref={topTextRef}
            >
              {BRAND_NAME}
            </p>


            <h1
              ref={titleRef}
            >

              {t.hero.line1}

              <br />

              <span>
                {t.hero.line2}
              </span>

            </h1>


            <p
              className="categories"
              ref={categoriesRef}
            >

              {
                t.hero.categories.map(
                  (
                    category,
                    index
                  ) => (

                    <span
                      key={category}
                    >

                      {category}

                      {
                        index <
                          t.hero.categories
                            .length -
                            1 && (
                          <b>
                            •
                          </b>
                        )
                      }

                    </span>

                  )
                )
              }

            </p>


            <p
              className="description"
              ref={descriptionRef}
            >

              {t.hero.description1}

              <br />

              {t.hero.description2}

            </p>


            <div
              className="buttons"
              ref={buttonsRef}
            >

              <button
                className="portfolio-button"
                onClick={() =>
                  document
                    .getElementById(
                      "portfolio"
                    )
                    ?.scrollIntoView({
                      behavior:
                        "smooth",
                    })
                }
              >
                {t.hero.portfolioButton}
              </button>


              <button
                className="showreel"
              >
                {t.hero.showreel}
              </button>

            </div>

          </div>


          <div
            className="mouse-info"
            ref={mouseInfoRef}
          >

            <span>
              {t.hero.interactive}
            </span>

            <strong>
              {t.hero.interaction}
            </strong>

          </div>


          <div
            className="hero-scroll"
          >

            <span />

            <small>
              {t.hero.scroll}
            </small>

          </div>

        </section>


        {/* ABOUT */}

        <section
          className="about-section"
          id="about"
          ref={aboutRef}
        >

          <div
            className="about-noise"
          />


          <div
            className="about-visual"
            ref={aboutVisualRef}
          >

            <div
              className="about-gold-frame"
            >

              <img
                src="/images-optimized/portrait.webp"
                alt="Photographer"
              />

            </div>


            <div
              className="about-photo-number"
            >
              01
            </div>


            <div
              className="about-photo-label"
            >

              <span>
                {t.about.photographer}
              </span>

              <strong>
                {t.about.label}
              </strong>

            </div>

          </div>


          <div
            className="about-content"
            ref={aboutTextRef}
          >

            <p
              className="section-eyebrow"
            >
              <span />
              {t.about.eyebrow}
            </p>


            <h2>

              {t.about.heading1}

              <br />

              <em>
                {t.about.heading2}
              </em>

            </h2>


            <p
              className="about-lead"
            >
              {t.about.lead}
            </p>


            <p
              className="about-copy"
            >

              {t.about.copy1}

              <br />
              <br />

              {t.about.copy2}

            </p>


            <div
              className="about-signature"
            >

              SC

              <span>
                {t.about.photographer}
              </span>

            </div>


            <div
              className="stats"
              ref={statsRef}
            >

              <div
                className="stat"
              >

                <strong>
                  5+
                </strong>

                <span>
                  {t.about.experience}
                </span>

              </div>


              <div
                className="stat"
              >

                <strong>
                  200+
                </strong>

                <span>
                  {t.about.shoots}
                </span>

              </div>


              <div
                className="stat"
              >

                <strong>
                  100+
                </strong>

                <span>
                  {t.about.clients}
                </span>

              </div>

            </div>

          </div>

        </section>


        {/* PORTFOLIO */}

        <section
          className="portfolio-section"
          id="portfolio"
          ref={portfolioRef}
        >

          <div
            className="portfolio-background-text"
          >
            PHOTOS
          </div>


          <div
            className="portfolio-heading"
            ref={portfolioHeadingRef}
          >

            <div>

              <p
                className="section-eyebrow"
              >
                <span />
                {t.portfolio.eyebrow}
              </p>


              <h2>

                {t.portfolio.heading1}

                <br />

                <em>
                  {t.portfolio.heading2}
                </em>

              </h2>

            </div>


            <p
              className="portfolio-intro"
            >
              {t.portfolio.intro}
            </p>

          </div>


          <div
            className="portfolio-filters"
          >

            {
              filterKeys.map(
                (filter) => (

                  <button
                    key={filter}
                    className={
                      activeFilter ===
                      filter
                        ? "filter-button active"
                        : "filter-button"
                    }
                    onClick={() =>
                      setActiveFilter(
                        filter
                      )
                    }
                  >
                    {
                      t.portfolio
                        .filters[
                          filter
                        ]
                    }
                  </button>

                )
              )
            }

          </div>


          <div
            className={
              activeFilter ===
              "all"

                ? "portfolio-grid"

                : "portfolio-grid filtered"
            }
            ref={portfolioGridRef}
          >

            {
              filteredPhotos.map(
                (photo) => {

                  const content =
                    t.photos[
                      photo.key
                    ];


                  return (

                    <button
                      type="button"
                      key={photo.id}
                      className={
                        `portfolio-card ${photo.className}`
                      }
                      onMouseMove={
                        handlePortfolioMove
                      }
                      onMouseLeave={
                        resetPortfolioTilt
                      }
                      onClick={() =>
                        openPhoto(
                          photo.id
                        )
                      }
                    >

                      <div
                        className="portfolio-card-inner"
                      >

                        <img
                          src={photo.src}
                          alt={
                            content.title
                          }
                        />


                        <div
                          className="portfolio-card-shade"
                        />


                        <div
                          className="portfolio-index"
                        >
                          0{photo.id + 1}
                        </div>


                        <div
                          className="portfolio-card-content"
                        >

                          <span>
                            {content.category}
                          </span>

                          <h3>
                            {content.shortTitle}
                          </h3>

                          <p>

                            {t.portfolio.viewStory}

                            <b>
                              →
                            </b>

                          </p>

                        </div>

                      </div>

                    </button>

                  );

                }
              )
            }

          </div>


          <div
            className="portfolio-footer"
          >

            <span>
              03 {t.portfolio.selected}
            </span>

            <div />

            <p>
              {t.portfolio.coming}
            </p>

          </div>

        </section>


        {/* SERVICES */}

        <section
          className="services-section"
          id="services"
          ref={servicesRef}
        >

          <div
            className="services-bg-word"
          >
            SERVICES
          </div>


          <div
            className="services-heading"
            ref={servicesHeadingRef}
          >

            <div>

              <p
                className="section-eyebrow"
              >
                <span />
                {t.services.eyebrow}
              </p>


              <h2>

                {t.services.heading1}

                <br />

                <em>
                  {t.services.heading2}
                </em>

              </h2>

            </div>


            <p
              className="services-heading-copy"
            >
              {t.services.intro}
            </p>

          </div>


          <div
            className="services-grid"
            ref={servicesGridRef}
          >

            {
              services.map(
                (
                  service,
                  index
                ) => (

                  <article
                    key={
                      service.number
                    }
                    className={
                      index === 0

                        ? "service-card service-card-featured"

                        : "service-card"
                    }
                    onMouseMove={
                      handleServiceMove
                    }
                    onMouseLeave={
                      resetServiceTilt
                    }
                  >

                    <div
                      className="service-card-inner"
                    >

                      <img
                        src={
                          service.image
                        }
                        alt={
                          service.title
                        }
                      />


                      <div
                        className="service-shade"
                      />


                      <span
                        className="service-number"
                      >
                        {service.number}
                      </span>


                      <div
                        className="service-content"
                      >

                        <p
                          className="service-subtitle"
                        >
                          {service.subtitle}
                        </p>

                        <h3>
                          {service.title}
                        </h3>

                        <p
                          className="service-description"
                        >
                          {service.description}
                        </p>

                        <div
                          className="service-link"
                        >

                          <span>
                            {t.services.explore}
                          </span>

                          <b>
                            →
                          </b>

                        </div>

                      </div>

                    </div>

                  </article>

                )
              )
            }

          </div>


          <div
            className="services-bottom"
          >

            <div
              className="services-bottom-line"
            />

            <p>
              “ {t.services.quote} ”
            </p>

            <div
              className="services-bottom-line"
            />

          </div>

        </section>


        {/* TESTIMONIALS */}

        <section
          className="testimonials-section"
          ref={testimonialsRef}
        >

          <div
            className="testimonials-bg-word"
          >
            LOVE
          </div>


          <div
            className="testimonials-heading"
            ref={testimonialsHeadingRef}
          >

            <div>

              <p
                className="section-eyebrow"
              >
                <span />
                {t.testimonials.eyebrow}
              </p>


              <h2>

                {t.testimonials.heading1}

                <br />

                <em>
                  {t.testimonials.heading2}
                </em>

              </h2>

            </div>


            <p
              className="testimonials-intro"
            >
              {t.testimonials.intro}
            </p>

          </div>


          <div
            className="testimonial-shell"
            ref={testimonialShellRef}
            onMouseEnter={() =>
              setTestimonialPaused(
                true
              )
            }
            onMouseLeave={() =>
              setTestimonialPaused(
                false
              )
            }
          >

            <div
              className="testimonial-side"
            >

              <span
                className="testimonial-big-number"
              >
                {activeTestimonial.number}
              </span>

              <div
                className="testimonial-vertical-text"
              >
                {t.testimonials.clientExperience}
              </div>

            </div>


            <div
              className="testimonial-card"
              ref={testimonialCardRef}
            >

              <span
                className="testimonial-quote-mark"
              >
                “
              </span>


              <blockquote>
                {activeTestimonial.quote}
              </blockquote>


              <div
                className="testimonial-client"
              >

                <div
                  className="testimonial-avatar"
                >
                  {
                    activeTestimonial
                      .name
                      .charAt(0)
                  }
                </div>


                <div>

                  <strong>
                    {activeTestimonial.name}
                  </strong>

                  <span>

                    {activeTestimonial.type}

                    {" • "}

                    {activeTestimonial.location}

                  </span>

                </div>

              </div>

            </div>


            <div
              className="testimonial-controls"
            >

              <button
                onClick={() =>
                  setTestimonialIndex(
                    (current) =>
                      (
                        current -
                        1 +
                        testimonials.length
                      ) %
                      testimonials.length
                  )
                }
              >
                ←
              </button>


              <div
                className="testimonial-counter"
              >

                <strong>
                  {String(
                    testimonialIndex +
                    1
                  ).padStart(
                    2,
                    "0"
                  )}
                </strong>

                <span>
                  /
                </span>

                <small>
                  {String(
                    testimonials.length
                  ).padStart(
                    2,
                    "0"
                  )}
                </small>

              </div>


              <button
                onClick={() =>
                  setTestimonialIndex(
                    (current) =>
                      (
                        current +
                        1
                      ) %
                      testimonials.length
                  )
                }
              >
                →
              </button>

            </div>

          </div>

        </section>


        {/* CONTACT */}

        <section
          className="contact-section"
          id="contact"
          ref={contactRef}
        >

          <div
            className="contact-bg-word"
          >
            CONNECT
          </div>


          <div
            className="contact-heading"
            ref={contactHeadingRef}
          >

            <p
              className="section-eyebrow"
            >
              <span />
              {t.contact.eyebrow}
            </p>


            <h2>

              {t.contact.heading1}

              <br />

              <em>
                {t.contact.heading2}
              </em>

            </h2>


            <p>
              {t.contact.intro}
            </p>

          </div>


          <div
            className="contact-grid"
            ref={contactGridRef}
          >

            <aside
              className="contact-info-panel"
            >

              <div>

                <p
                  className="contact-small-title"
                >
                  {t.contact.getInTouch}
                </p>


                <h3>

                  {t.contact.question1}

                  <br />

                  {t.contact.question2}

                </h3>


                <p
                  className="contact-info-copy"
                >
                  {t.contact.copy}
                </p>

              </div>


              <div
                className="contact-detail-list"
              >

                <a
                  href={
                    `tel:${CONTACT_PHONE.replace(/\s/g, "")}`
                  }
                >

                  <span>
                    {t.contact.phone}
                  </span>

                  <strong>
                    {CONTACT_PHONE}
                  </strong>

                </a>


                <a
                  href={
                    `mailto:${CONTACT_EMAIL}`
                  }
                >

                  <span>
                    {t.contact.email}
                  </span>

                  <strong>
                    {CONTACT_EMAIL}
                  </strong>

                </a>


                <div>

                  <span>
                    {t.contact.location}
                  </span>

                  <strong>
                    {t.contact.locationValue}
                  </strong>

                </div>


                <div>

                  <span>
                    {t.contact.availability}
                  </span>

                  <strong>
                    {t.contact.travel}
                  </strong>

                </div>

              </div>


              <a
                className="whatsapp-button"
                href={
                  `https://wa.me/${WHATSAPP_NUMBER}`
                }
                target="_blank"
                rel="noreferrer"
              >

                <span
                  className="whatsapp-icon"
                >
                  ↗
                </span>

                <div>

                  <small>
                    {t.contact.quick}
                  </small>

                  <strong>
                    {t.contact.whatsapp}
                  </strong>

                </div>

              </a>

            </aside>


            {/* FORM */}

            <div
              className="booking-panel"
            >

              <div
                className="booking-panel-head"
              >

                <span>
                  {t.contact.booking}
                </span>

                <strong>
                  01 — 07
                </strong>

              </div>


              <form
                className="booking-form"
                onSubmit={
                  handleBookingSubmit
                }
                noValidate
              >

                <div
                  className="booking-row"
                >

                  <label
                    className={
                      formErrors.name
                        ? "booking-field has-error"
                        : "booking-field"
                    }
                  >

                    <span>
                      {t.contact.name}
                    </span>

                    <input
                      type="text"
                      name="name"
                      value={
                        formData.name
                      }
                      onChange={
                        handleFormChange
                      }
                      placeholder={
                        t.contact
                          .namePlaceholder
                      }
                    />

                    {
                      formErrors.name && (
                        <small>
                          {formErrors.name}
                        </small>
                      )
                    }

                  </label>


                  <label
                    className={
                      formErrors.phone
                        ? "booking-field has-error"
                        : "booking-field"
                    }
                  >

                    <span>
                      {t.contact.phoneLabel}
                    </span>

                    <input
                      type="tel"
                      name="phone"
                      value={
                        formData.phone
                      }
                      onChange={
                        handleFormChange
                      }
                      placeholder="+91"
                    />

                    {
                      formErrors.phone && (
                        <small>
                          {formErrors.phone}
                        </small>
                      )
                    }

                  </label>

                </div>


                <div
                  className="booking-row"
                >

                  <label
                    className={
                      formErrors.email
                        ? "booking-field has-error"
                        : "booking-field"
                    }
                  >

                    <span>
                      {t.contact.emailLabel}
                    </span>

                    <input
                      type="email"
                      name="email"
                      value={
                        formData.email
                      }
                      onChange={
                        handleFormChange
                      }
                      placeholder={
                        t.contact
                          .emailPlaceholder
                      }
                    />

                    {
                      formErrors.email && (
                        <small>
                          {formErrors.email}
                        </small>
                      )
                    }

                  </label>


                  <label
                    className={
                      formErrors.service
                        ? "booking-field has-error"
                        : "booking-field"
                    }
                  >

                    <span>
                      {t.contact.service}
                    </span>

                    <select
                      name="service"
                      value={
                        formData.service
                      }
                      onChange={
                        handleFormChange
                      }
                    >

                      <option value="">
                        {t.contact.selectService}
                      </option>

                      {
                        bookingServiceKeys.map(
                          (service) => (

                            <option
                              key={service}
                              value={service}
                            >
                              {
                                t.contact
                                  .bookingServices[
                                    service
                                  ]
                              }
                            </option>

                          )
                        )
                      }

                    </select>

                    {
                      formErrors.service && (
                        <small>
                          {formErrors.service}
                        </small>
                      )
                    }

                  </label>

                </div>


                <div
                  className="booking-row"
                >

                  <label
                    className="booking-field"
                  >

                    <span>
                      {t.contact.eventDate}
                    </span>

                    <div
                      className="custom-date-field"
                    >

                      <input
                        type="text"
                        value={
                          formatEventDate(
                            formData.eventDate
                          )
                        }
                        placeholder="DD-MM-YYYY"
                        readOnly
                        onClick={() =>
                          eventDatePickerRef
                            .current
                            ?.showPicker?.()
                        }
                      />

                      <button
                        type="button"
                        className="calendar-button"
                        onClick={() =>
                          eventDatePickerRef
                            .current
                            ?.showPicker?.()
                        }
                      >
                        📅
                      </button>


                      <input
                        ref={
                          eventDatePickerRef
                        }
                        className="hidden-date-picker"
                        type="date"
                        name="eventDate"
                        min={today}
                        value={
                          formData.eventDate
                        }
                        onChange={
                          handleFormChange
                        }
                      />

                    </div>

                  </label>


                  <label
                    className="booking-field"
                  >

                    <span>
                      {t.contact.shootLocation}
                    </span>

                    <input
                      type="text"
                      name="location"
                      value={
                        formData.location
                      }
                      onChange={
                        handleFormChange
                      }
                      placeholder={
                        t.contact
                          .locationPlaceholder
                      }
                    />

                  </label>

                </div>


                <label
                  className={
                    formErrors.message
                      ? "booking-field booking-message has-error"
                      : "booking-field booking-message"
                  }
                >

                  <span>
                    {t.contact.message}
                  </span>

                  <textarea
                    name="message"
                    rows="5"
                    value={
                      formData.message
                    }
                    onChange={
                      handleFormChange
                    }
                    placeholder={
                      t.contact
                        .messagePlaceholder
                    }
                  />

                  {
                    formErrors.message && (
                      <small>
                        {formErrors.message}
                      </small>
                    )
                  }

                </label>


                {
                  formStatus ===
                    "success" && (

                    <div
                      className="form-message success"
                    >
                      {t.contact.success}
                    </div>

                  )
                }


                {
                  formStatus ===
                    "error" && (

                    <div
                      className="form-message error"
                    >
                      {t.contact.error}
                    </div>

                  )
                }


                <div
                  className="booking-submit-row"
                >

                  <button
                    type="submit"
                    className="booking-submit"
                    disabled={
                      isSubmitting
                    }
                  >

                    <span>

                      {
                        isSubmitting
                          ? t.contact.opening
                          : t.contact.send
                      }

                    </span>

                    <b>
                      →
                    </b>

                  </button>


                  <p>
                    {t.contact.response}
                  </p>

                </div>

              </form>

            </div>

          </div>

        </section>


        {/* FOOTER */}

        <footer
          className="footer"
          ref={footerRef}
        >

          <div
            className="footer-top"
          >

            <a
              className="footer-brand brand-logo"
              href="#home"
            >

              <span>
                SC
              </span>

              <div>

                <strong>
                  SHUBHAM CHINGUDE
                </strong>

                <small>
                  PHOTOFILMS
                </small>

              </div>

            </a>


            <p>
              {t.footer.copy}
            </p>

          </div>


          <div
            className="footer-middle"
          >

            <div>

              <span>
                {t.footer.explore}
              </span>

              <a href="#home">
                {t.nav.home}
              </a>

              <a href="#about">
                {t.nav.about}
              </a>

              <a href="#portfolio">
                {t.nav.portfolio}
              </a>

              <a href="#services">
                {t.nav.services}
              </a>

            </div>


            <div>

              <span>
                {t.footer.services}
              </span>

              <a href="#services">
                {t.footer.weddings}
              </a>

              <a href="#services">
                {t.footer.portraits}
              </a>

              <a href="#services">
                {t.footer.events}
              </a>

              <a href="#services">
                {t.footer.commercial}
              </a>

            </div>


            <div>

              <span>
                {t.footer.contact}
              </span>

              <a
                href={
                  `mailto:${CONTACT_EMAIL}`
                }
              >
                {t.contact.email}
              </a>

              <a
                href={
                  `https://wa.me/${WHATSAPP_NUMBER}`
                }
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>

              <a href="#contact">
                {t.contact.booking}
              </a>

            </div>


            <div
              className="footer-big-cta"
            >

              <span>
                {t.footer.haveStory}
              </span>

              <a href="#contact">

                {t.footer.cta1}

                <br />

                {t.footer.cta2}

                <b>
                  ↗
                </b>

              </a>

            </div>

          </div>


          <div
            className="footer-bottom"
          >

            <p>
              © {new Date().getFullYear()} Shubham Chingude Photofilms. {t.footer.rights}
            </p>

            <p>
              {t.footer.made}
            </p>

            <a href="#home">
              {t.footer.back}
            </a>

          </div>

        </footer>


        {/* LIGHTBOX */}

        {
          selectedIndex !== null && (

            <div
              className="lightbox"
              onClick={
                closePhoto
              }
            >

              <button
                className="lightbox-close"
                onClick={
                  closePhoto
                }
              >
                ×
              </button>


              <button
                className="lightbox-arrow lightbox-prev"
                onClick={
                  (event) => {

                    event.stopPropagation();

                    previousPhoto();

                  }
                }
              >
                ‹
              </button>


              <div
                className="lightbox-content"
                onClick={
                  (event) =>
                    event.stopPropagation()
                }
              >

                <img
                  src={
                    photos[
                      selectedIndex
                    ].src
                  }
                  alt={
                    t.photos[
                      photos[
                        selectedIndex
                      ].key
                    ].title
                  }
                />


                <div
                  className="lightbox-info"
                >

                  <span>

                    {
                      t.photos[
                        photos[
                          selectedIndex
                        ].key
                      ].category
                    }

                  </span>

                  <h2>

                    {
                      t.photos[
                        photos[
                          selectedIndex
                        ].key
                      ].title
                    }

                  </h2>

                  <p>

                    {selectedIndex + 1}

                    {" / "}

                    {photos.length}

                  </p>

                </div>

              </div>


              <button
                className="lightbox-arrow lightbox-next"
                onClick={
                  (event) => {

                    event.stopPropagation();

                    nextPhoto();

                  }
                }
              >
                ›
              </button>

            </div>

          )
        }

      </main>

    </>

  );

}


export default App;