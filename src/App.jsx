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

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   BRAND
========================================================= */

const BRAND_NAME = "SHUBHAM CHINGUDE PHOTOFILMS";
const BRAND_SHORT = "SC";


/* =========================================================
   CONTACT
   PRODUCTION वेळी REAL NUMBER/EMAIL टाका
========================================================= */

const CONTACT_EMAIL = "hello@shubhamchingude.com";
const CONTACT_PHONE = "+91 99999 99999";

/*
  IMPORTANT:
  Country code सहित number.
  +, spaces किंवा dash नको.

  Example:
  919876543210
*/

const WHATSAPP_NUMBER = "919730693378";


/* =========================================================
   DATA
========================================================= */

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "portfolio", label: "Portfolio" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];


const photos = [
  {
    id: 0,
    title: "Wedding Stories",
    shortTitle: "Forever Begins Here",
    category: "Wedding",
    categoryLabel: "Wedding Photography",
    src: "/images-optimized/wedding.webp",
    className: "portfolio-tall",
  },
  {
    id: 1,
    title: "Portrait Stories",
    shortTitle: "Faces & Feelings",
    category: "Portrait",
    categoryLabel: "Portrait Photography",
    src: "/images-optimized/portrait.webp",
    className: "portfolio-wide",
  },
  {
    id: 2,
    title: "Event Stories",
    shortTitle: "Moments In Motion",
    category: "Events",
    categoryLabel: "Event Photography",
    src: "/images-optimized/event.webp",
    className: "portfolio-event",
  },
];


const filters = [
  "All",
  "Wedding",
  "Portrait",
  "Events",
];


const services = [
  {
    number: "01",
    title: "Wedding Photography",
    subtitle: "Timeless celebration",
    description:
      "Natural emotions, rituals, details and unforgettable moments captured with a cinematic storytelling approach.",
    image: "/images-optimized/wedding.webp",
  },
  {
    number: "02",
    title: "Pre-Wedding",
    subtitle: "Your story before forever",
    description:
      "Creative couple portraits designed around your personality, chemistry, location and unique love story.",
    image: "/images-optimized/event.webp",
  },
  {
    number: "03",
    title: "Portrait",
    subtitle: "Character through light",
    description:
      "Expressive individual portraits that focus on personality, mood, natural expressions and beautiful light.",
    image: "/images-optimized/portrait.webp",
  },
  {
    number: "04",
    title: "Events",
    subtitle: "Every moment remembered",
    description:
      "Professional coverage for celebrations, corporate functions, birthdays, ceremonies and special occasions.",
    image: "/images-optimized/event.webp",
  },
  {
    number: "05",
    title: "Fashion / Commercial",
    subtitle: "Visuals that stand out",
    description:
      "Editorial, fashion and commercial photography focused on strong compositions and premium visual presentation.",
    image: "/images-optimized/portrait.webp",
  },
];


const testimonials = [
  {
    number: "01",
    name: "Aarav & Meera",
    type: "Wedding Photography",
    location: "Pune",
    quote:
      "The photographs feel natural, emotional and timeless. Every small moment from our wedding was captured beautifully without making us feel like we were constantly posing.",
  },
  {
    number: "02",
    name: "Riya Sharma",
    type: "Portrait Session",
    location: "Mumbai",
    quote:
      "The entire shoot felt relaxed and effortless. The final portraits looked elegant, cinematic and still completely like me.",
  },
  {
    number: "03",
    name: "Kunal Events",
    type: "Event Photography",
    location: "Nashik",
    quote:
      "From the atmosphere to the smallest candid moments, the complete event was documented beautifully. The photographs truly tell the story of the day.",
  },
  {
    number: "04",
    name: "Anaya Studio",
    type: "Fashion / Commercial",
    location: "Pune",
    quote:
      "The visual direction was clean, premium and thoughtful. Every frame had purpose and gave our campaign a stronger identity.",
  },
];


const bookingServices = [
  "Wedding Photography",
  "Pre-Wedding",
  "Portrait",
  "Event Photography",
  "Fashion / Commercial",
  "Other",
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
  const now = new Date();

  const year = now.getFullYear();

  const month = String(
    now.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    now.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


function formatEventDate(value) {
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

  const [isLoading, setIsLoading] =
    useState(true);

  const [loadingProgress, setLoadingProgress] =
    useState(0);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [activeSection, setActiveSection] =
    useState("home");

  const [selectedIndex, setSelectedIndex] =
    useState(null);

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [testimonialIndex, setTestimonialIndex] =
    useState(0);

  const [testimonialPaused, setTestimonialPaused] =
    useState(false);

  const [formData, setFormData] =
    useState(initialFormData);

  const [formErrors, setFormErrors] =
    useState({});

  const [formStatus, setFormStatus] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);


  /* =======================================================
     REFS
  ======================================================= */

  const appRef = useRef();
  const navbarRef = useRef();

  const heroRef = useRef();
  const heroContentRef = useRef();
  const threeAreaRef = useRef();
  const topTextRef = useRef();
  const titleRef = useRef();
  const categoriesRef = useRef();
  const descriptionRef = useRef();
  const buttonsRef = useRef();
  const mouseInfoRef = useRef();

  const aboutRef = useRef();
  const aboutVisualRef = useRef();
  const aboutTextRef = useRef();
  const statsRef = useRef();

  const portfolioRef = useRef();
  const portfolioHeadingRef = useRef();
  const portfolioGridRef = useRef();

  const servicesRef = useRef();
  const servicesHeadingRef = useRef();
  const servicesGridRef = useRef();

  const testimonialsRef = useRef();
  const testimonialsHeadingRef = useRef();
  const testimonialShellRef = useRef();
  const testimonialCardRef = useRef();

  const contactRef = useRef();
  const contactHeadingRef = useRef();
  const contactGridRef = useRef();

  const footerRef = useRef();

  const eventDatePickerRef = useRef();

  const heroScrollProgress =
    useRef(0);


  const today =
    getLocalToday();


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
            4 +
            Math.floor(
              Math.random() * 7
            );


          if (current >= 100) {

            current = 100;

            setLoadingProgress(100);

            window.clearInterval(
              interval
            );


            closeTimeout =
              window.setTimeout(
                () => {
                  setIsLoading(false);
                },
                450
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
      window.clearInterval(interval);
      window.clearTimeout(closeTimeout);
    };

  }, []);


  /* =======================================================
     BODY LOCK
  ======================================================= */

  useEffect(() => {

    const shouldLock =
      isLoading ||
      mobileMenuOpen ||
      selectedIndex !== null;


    document.body.style.overflow =
      shouldLock
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
     FILTER
  ======================================================= */

  const filteredPhotos =
    activeFilter === "All"
      ? photos
      : photos.filter(
          (photo) =>
            photo.category ===
            activeFilter
        );


  const activeTestimonial =
    testimonials[
      testimonialIndex
    ];


  /* =======================================================
     GSAP
  ======================================================= */

  useLayoutEffect(() => {

    if (isLoading) {
      return;
    }


    const context =
      gsap.context(() => {

        const entrance =
          gsap.timeline({
            defaults: {
              ease: "power3.out",
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
            y: 65,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
          },
          "-=0.35"
        );


        entrance.fromTo(
          categoriesRef.current,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.55"
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
          "-=0.45"
        );


        entrance.fromTo(
          buttonsRef.current,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.4"
        );


        entrance.fromTo(
          mouseInfoRef.current,
          {
            opacity: 0,
            x: 25,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
          },
          "-=0.35"
        );


        navItems.forEach(
          (item) => {

            ScrollTrigger.create({
              trigger:
                `#${item.id}`,

              start:
                "top 55%",

              end:
                "bottom 45%",

              onEnter: () => {
                setActiveSection(
                  item.id
                );
              },

              onEnterBack: () => {
                setActiveSection(
                  item.id
                );
              },
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

          onUpdate: (self) => {
            heroScrollProgress.current =
              self.progress;
          },
        });


        gsap.to(
          heroContentRef.current,
          {
            opacity: 0,
            y: -100,
            scale: 0.94,
            ease: "none",

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


        gsap.to(
          mouseInfoRef.current,
          {
            opacity: 0,
            x: 50,
            ease: "none",

            scrollTrigger: {
              trigger:
                heroRef.current,

              start:
                "top top",

              end:
                "60% top",

              scrub: 1,
            },
          }
        );


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


        gsap.fromTo(
          aboutVisualRef.current,
          {
            opacity: 0,
            x: -90,
            scale: 0.9,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",

            scrollTrigger: {
              trigger:
                aboutRef.current,

              start:
                "top 78%",
            },
          }
        );


        gsap.fromTo(
          aboutTextRef.current,
          {
            opacity: 0,
            x: 90,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1.1,
            ease: "power3.out",

            scrollTrigger: {
              trigger:
                aboutRef.current,

              start:
                "top 75%",
            },
          }
        );


        gsap.fromTo(
          statsRef.current.children,
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.16,
            ease: "power3.out",

            scrollTrigger: {
              trigger:
                statsRef.current,

              start:
                "top 85%",
            },
          }
        );


        gsap.fromTo(
          portfolioHeadingRef.current,
          {
            opacity: 0,
            y: 70,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",

            scrollTrigger: {
              trigger:
                portfolioRef.current,

              start:
                "top 78%",
            },
          }
        );


        gsap.fromTo(
          portfolioGridRef.current,
          {
            opacity: 0,
            y: 80,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",

            scrollTrigger: {
              trigger:
                portfolioGridRef.current,

              start:
                "top 88%",
            },
          }
        );


        gsap.fromTo(
          servicesHeadingRef.current,
          {
            opacity: 0,
            y: 70,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",

            scrollTrigger: {
              trigger:
                servicesRef.current,

              start:
                "top 78%",
            },
          }
        );


        gsap.fromTo(
          servicesGridRef.current.children,
          {
            opacity: 0,
            y: 80,
            scale: 0.94,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.13,
            ease: "power3.out",

            scrollTrigger: {
              trigger:
                servicesGridRef.current,

              start:
                "top 85%",
            },
          }
        );


        gsap.fromTo(
          testimonialsHeadingRef.current,
          {
            opacity: 0,
            y: 65,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",

            scrollTrigger: {
              trigger:
                testimonialsRef.current,

              start:
                "top 78%",
            },
          }
        );


        gsap.fromTo(
          testimonialShellRef.current,
          {
            opacity: 0,
            y: 80,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.15,
            ease: "power3.out",

            scrollTrigger: {
              trigger:
                testimonialShellRef.current,

              start:
                "top 87%",
            },
          }
        );


        gsap.fromTo(
          contactHeadingRef.current,
          {
            opacity: 0,
            y: 70,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",

            scrollTrigger: {
              trigger:
                contactRef.current,

              start:
                "top 78%",
            },
          }
        );


        gsap.fromTo(
          contactGridRef.current.children,
          {
            opacity: 0,
            y: 70,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.18,
            ease: "power3.out",

            scrollTrigger: {
              trigger:
                contactGridRef.current,

              start:
                "top 86%",
            },
          }
        );


        gsap.fromTo(
          footerRef.current,
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,

            scrollTrigger: {
              trigger:
                footerRef.current,

              start:
                "top 95%",
            },
          }
        );


        ScrollTrigger.refresh();

      }, appRef);


    return () => {
      context.revert();
    };

  }, [isLoading]);


  /* =======================================================
     PORTFOLIO FILTER ANIMATION
  ======================================================= */

  useEffect(() => {

    if (!portfolioGridRef.current) {
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
          y: 30,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform",
        }
      );


    return () => {
      animation.kill();
    };

  }, [activeFilter]);


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
  ]);


  useEffect(() => {

    if (
      !testimonialCardRef.current ||
      isLoading
    ) {
      return;
    }


    const elements =
      testimonialCardRef.current
        .querySelectorAll(
          "[data-testimonial-animate]"
        );


    const animation =
      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: 24,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.07,
          ease: "power3.out",
        }
      );


    return () => {
      animation.kill();
    };

  }, [
    testimonialIndex,
    isLoading,
  ]);


  /* =======================================================
     KEYBOARD
  ======================================================= */

  useEffect(() => {

    const handleKeyboard =
      (event) => {

        if (
          event.key ===
          "Escape"
        ) {

          setMobileMenuOpen(
            false
          );

          if (
            selectedIndex !== null
          ) {
            setSelectedIndex(
              null
            );
          }

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
      handleKeyboard
    );


    return () => {

      window.removeEventListener(
        "keydown",
        handleKeyboard
      );

    };

  }, [selectedIndex]);


  /* =======================================================
     CARD TILT
  ======================================================= */

  const handlePortfolioMove =
    (event) => {

      const card =
        event.currentTarget;

      const rectangle =
        card.getBoundingClientRect();


      const x =
        (
          event.clientX -
          rectangle.left
        ) /
        rectangle.width;


      const y =
        (
          event.clientY -
          rectangle.top
        ) /
        rectangle.height;


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

      const rectangle =
        card.getBoundingClientRect();


      const x =
        (
          event.clientX -
          rectangle.left
        ) /
        rectangle.width;


      const y =
        (
          event.clientY -
          rectangle.top
        ) /
        rectangle.height;


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
     TESTIMONIAL
  ======================================================= */

  const previousTestimonial =
    () => {

      setTestimonialIndex(
        (current) =>
          (
            current -
            1 +
            testimonials.length
          ) %
          testimonials.length
      );

    };


  const nextTestimonial =
    () => {

      setTestimonialIndex(
        (current) =>
          (
            current + 1
          ) %
          testimonials.length
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


      if (!formData.name.trim()) {

        errors.name =
          "Please enter your name.";

      }


      if (!formData.email.trim()) {

        errors.email =
          "Please enter your email.";

      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
          .test(
            formData.email.trim()
          )
      ) {

        errors.email =
          "Please enter a valid email.";

      }


      if (!formData.phone.trim()) {

        errors.phone =
          "Please enter your phone number.";

      } else if (
        !/^[0-9+\-\s()]{8,18}$/
          .test(
            formData.phone.trim()
          )
      ) {

        errors.phone =
          "Please enter a valid phone number.";

      }


      if (!formData.service) {

        errors.service =
          "Please select a service.";

      }


      if (!formData.message.trim()) {

        errors.message =
          "Please tell us something about your shoot.";

      }


      return errors;

    };


  /* =======================================================
     WHATSAPP MESSAGE
  ======================================================= */

  const createWhatsAppMessage =
    () => {

      const eventDate =
        formData.eventDate
          ? formatEventDate(
              formData.eventDate
            )
          : "Not decided";


      const location =
        formData.location.trim()
          ? formData.location.trim()
          : "Not specified";


      return [
        `Hello ${BRAND_NAME},`,
        "",
        "I would like to enquire about a photography shoot.",
        "",
        `Name: ${formData.name.trim()}`,
        `Phone: ${formData.phone.trim()}`,
        `Email: ${formData.email.trim()}`,
        `Service: ${formData.service}`,
        `Event Date: ${eventDate}`,
        `Location: ${location}`,
        "",
        "Shoot Details:",
        formData.message.trim(),
        "",
        "Please share availability and further details.",
      ].join("\n");

    };


  const handleBookingSubmit =
    (event) => {

      event.preventDefault();


      if (isSubmitting) {
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
      setFormStatus("");
      setIsSubmitting(true);


      const message =
        createWhatsAppMessage();


      const whatsappUrl =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          message
        )}`;


      /*
        Window लगेच open करतो.
        त्यामुळे browser popup blocker
        कमी problem देतो.
      */

      const whatsappWindow =
        window.open(
          "",
          "_blank",
          "noopener,noreferrer"
        );


      window.setTimeout(
        () => {

          if (whatsappWindow) {

            whatsappWindow.location.href =
              whatsappUrl;

          } else {

            window.location.href =
              whatsappUrl;

          }


          setIsSubmitting(false);

          setFormStatus(
            "success"
          );


          setFormData(
            initialFormData
          );

        },
        350
      );

    };


  /* =======================================================
     LIGHTBOX
  ======================================================= */

  const openPhoto =
    (index) => {
      setSelectedIndex(index);
    };


  const closePhoto =
    () => {
      setSelectedIndex(null);
    };


  const previousPhoto =
    () => {

      setSelectedIndex(
        (current) => {

          if (
            current === null
          ) {
            return null;
          }


          return (
            current -
            1 +
            photos.length
          ) %
          photos.length;

        }
      );

    };


  const nextPhoto =
    () => {

      setSelectedIndex(
        (current) => {

          if (
            current === null
          ) {
            return null;
          }


          return (
            current + 1
          ) %
          photos.length;

        }
      );

    };


  const closeMobileMenu =
    () => {
      setMobileMenuOpen(false);
    };


  /* =======================================================
     UI
  ======================================================= */

  return (
    <>

      {/* PRELOADER */}

      {isLoading && (

        <div
          className={
            loadingProgress >= 100
              ? "site-preloader complete"
              : "site-preloader"
          }
        >

          <div className="preloader-center">

            <div className="preloader-logo">

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


            <div className="preloader-track">

              <span
                style={{
                  width:
                    `${loadingProgress}%`,
                }}
              />

            </div>


            <div className="preloader-bottom">

              <small>
                LOADING EXPERIENCE
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

      )}


      <main
        className="website"
        ref={appRef}
      >

        {/* NAVBAR */}

        <header
          className="navbar"
          ref={navbarRef}
        >

          <a
            className="logo brand-logo"
            href="#home"
            onClick={
              closeMobileMenu
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

            {navItems.map(
              (item) => (

                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={
                    activeSection ===
                    item.id
                      ? "active"
                      : ""
                  }
                >
                  {item.label}
                </a>

              )
            )}

          </nav>


          <button
            type="button"
            className={
              mobileMenuOpen
                ? "menu-toggle open"
                : "menu-toggle"
            }
            onClick={() => {

              setMobileMenuOpen(
                (current) =>
                  !current
              );

            }}
            aria-label="Open navigation"
            aria-expanded={
              mobileMenuOpen
            }
          >

            <span />
            <span />
            <span />

          </button>

        </header>


        {/* MOBILE MENU */}

        <div
          className={
            mobileMenuOpen
              ? "mobile-menu open"
              : "mobile-menu"
          }
        >

          <div className="mobile-menu-bg-word">
            SC
          </div>


          <div className="mobile-menu-inner">

            <p>
              NAVIGATION
            </p>


            <nav>

              {navItems.map(
                (
                  item,
                  index
                ) => (

                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={
                      activeSection ===
                      item.id
                        ? "active"
                        : ""
                    }
                    onClick={
                      closeMobileMenu
                    }
                  >

                    <small>
                      0{index + 1}
                    </small>

                    <span>
                      {item.label}
                    </span>

                    <b>
                      ↗
                    </b>

                  </a>

                )
              )}

            </nav>


            <div className="mobile-menu-footer">

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

              <Suspense fallback={null}>

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


          <div className="dark-overlay" />


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


            <h1 ref={titleRef}>

              Capturing

              <br />

              <span>
                Timeless Stories
              </span>

            </h1>


            <p
              className="categories"
              ref={categoriesRef}
            >

              WEDDING

              <b>•</b>

              PORTRAIT

              <b>•</b>

              EVENTS

              <b>•</b>

              NATURE

              <b>•</b>

              FASHION

            </p>


            <p
              className="description"
              ref={descriptionRef}
            >

              Every photograph tells a story.

              <br />

              Capturing emotions,
              moments and memories
              that deserve to live forever.

            </p>


            <div
              className="buttons"
              ref={buttonsRef}
            >

              <button
                className="portfolio-button"
                onClick={() => {

                  document
                    .getElementById(
                      "portfolio"
                    )
                    ?.scrollIntoView({
                      behavior:
                        "smooth",
                    });

                }}
              >
                Explore Portfolio →
              </button>


              <button
                className="showreel"
              >
                ▶ &nbsp;
                Watch Showreel
              </button>

            </div>

          </div>


          <div
            className="mouse-info"
            ref={mouseInfoRef}
          >

            <span>
              INTERACTIVE GALLERY
            </span>

            <strong>
              HOVER • CLICK • SCROLL
            </strong>

          </div>


          <div className="hero-scroll">

            <span />

            <small>
              SCROLL TO DISCOVER
            </small>

          </div>

        </section>


        {/* ABOUT */}

        <section
          className="about-section"
          id="about"
          ref={aboutRef}
        >

          <div className="about-noise" />


          <div
            className="about-visual"
            ref={aboutVisualRef}
          >

            <div className="about-gold-frame">

              <img
                src="/images-optimized/portrait.webp"
                alt="Photography visual"
              />

            </div>


            <div className="about-photo-number">
              01
            </div>


            <div className="about-photo-label">

              <span>
                PHOTOGRAPHER
              </span>

              <strong>
                STORIES THROUGH LIGHT
              </strong>

            </div>

          </div>


          <div
            className="about-content"
            ref={aboutTextRef}
          >

            <p className="section-eyebrow">

              <span />

              ABOUT THE PHOTOGRAPHER

            </p>


            <h2>

              Capturing Emotion,

              <br />

              <em>
                Not Just Images.
              </em>

            </h2>


            <p className="about-lead">
              Photography is more than
              pressing a shutter.
            </p>


            <p className="about-copy">

              It is about noticing the
              smallest moments — a glance,
              a smile, a movement and an
              emotion that may exist only
              for a second.

              <br />
              <br />

              My goal is to transform those
              moments into photographs that
              still feel alive years later.

            </p>


            <div className="about-signature">

              SC

              <span>
                Photographer
              </span>

            </div>


            <div
              className="stats"
              ref={statsRef}
            >

              <div className="stat">

                <strong>
                  5+
                </strong>

                <span>
                  YEARS
                  <br />
                  EXPERIENCE
                </span>

              </div>


              <div className="stat">

                <strong>
                  200+
                </strong>

                <span>
                  PHOTO
                  <br />
                  SHOOTS
                </span>

              </div>


              <div className="stat">

                <strong>
                  100+
                </strong>

                <span>
                  HAPPY
                  <br />
                  CLIENTS
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

          <div className="portfolio-background-text">
            STORIES
          </div>


          <div
            className="portfolio-heading"
            ref={portfolioHeadingRef}
          >

            <div>

              <p className="section-eyebrow">
                <span />
                SELECTED WORK
              </p>


              <h2>

                Stories Through

                <br />

                <em>
                  My Lens.
                </em>

              </h2>

            </div>


            <p className="portfolio-intro">

              A collection of moments,
              emotions and stories captured
              across weddings, portraits
              and special events.

            </p>

          </div>


          <div className="portfolio-filters">

            {filters.map(
              (filter) => (

                <button
                  key={filter}
                  className={
                    activeFilter ===
                    filter
                      ? "filter-button active"
                      : "filter-button"
                  }
                  onClick={() => {
                    setActiveFilter(
                      filter
                    );
                  }}
                >
                  {filter}
                </button>

              )
            )}

          </div>


          <div
            className={
              activeFilter === "All"
                ? "portfolio-grid"
                : "portfolio-grid filtered"
            }
            ref={portfolioGridRef}
          >

            {filteredPhotos.map(
              (photo) => (

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
                  onClick={() => {
                    openPhoto(
                      photo.id
                    );
                  }}
                >

                  <div className="portfolio-card-inner">

                    <img
                      src={photo.src}
                      alt={photo.title}
                    />


                    <div className="portfolio-card-shade" />


                    <div className="portfolio-index">
                      0{photo.id + 1}
                    </div>


                    <div className="portfolio-card-content">

                      <span>
                        {photo.categoryLabel}
                      </span>

                      <h3>
                        {photo.shortTitle}
                      </h3>

                      <p>
                        View Story
                        <b>→</b>
                      </p>

                    </div>


                    <div className="portfolio-corner portfolio-corner-one" />

                    <div className="portfolio-corner portfolio-corner-two" />

                  </div>

                </button>

              )
            )}

          </div>


          <div className="portfolio-footer">

            <span>
              03 SELECTED STORIES
            </span>

            <div />

            <p>
              MORE STORIES COMING SOON
            </p>

          </div>

        </section>


        {/* SERVICES */}

        <section
          className="services-section"
          id="services"
          ref={servicesRef}
        >

          <div className="services-bg-word">
            SERVICES
          </div>


          <div
            className="services-heading"
            ref={servicesHeadingRef}
          >

            <div>

              <p className="section-eyebrow">
                <span />
                WHAT I CAPTURE
              </p>


              <h2>

                Photography Crafted

                <br />

                <em>
                  Around Your Story.
                </em>

              </h2>

            </div>


            <p className="services-heading-copy">

              Every assignment is approached
              differently — with attention to
              emotion, personality, atmosphere
              and the story behind the moment.

            </p>

          </div>


          <div
            className="services-grid"
            ref={servicesGridRef}
          >

            {services.map(
              (
                service,
                index
              ) => (

                <article
                  className={
                    index === 0
                      ? "service-card service-card-featured"
                      : "service-card"
                  }
                  key={service.number}
                  onMouseMove={
                    handleServiceMove
                  }
                  onMouseLeave={
                    resetServiceTilt
                  }
                >

                  <div className="service-card-inner">

                    <img
                      src={service.image}
                      alt={service.title}
                    />


                    <div className="service-shade" />


                    <span className="service-number">
                      {service.number}
                    </span>


                    <div className="service-content">

                      <p className="service-subtitle">
                        {service.subtitle}
                      </p>

                      <h3>
                        {service.title}
                      </h3>

                      <p className="service-description">
                        {service.description}
                      </p>


                      <div className="service-link">

                        <span>
                          EXPLORE SERVICE
                        </span>

                        <b>
                          →
                        </b>

                      </div>

                    </div>


                    <div className="service-line" />

                    <div className="service-gold-corner service-gold-corner-one" />

                    <div className="service-gold-corner service-gold-corner-two" />

                  </div>

                </article>

              )
            )}

          </div>


          <div className="services-bottom">

            <div className="services-bottom-line" />

            <p>
              <span>“</span>
              The best photograph is the one
              that makes you feel the moment
              again.
              <span>”</span>
            </p>

            <div className="services-bottom-line" />

          </div>

        </section>


        {/* TESTIMONIALS */}

        <section
          className="testimonials-section"
          ref={testimonialsRef}
        >

          <div className="testimonials-bg-word">
            LOVE
          </div>


          <div
            className="testimonials-heading"
            ref={testimonialsHeadingRef}
          >

            <div>

              <p className="section-eyebrow">
                <span />
                CLIENT STORIES
              </p>


              <h2>

                What They Felt,

                <br />

                <em>
                  In Their Words.
                </em>

              </h2>

            </div>


            <p className="testimonials-intro">

              The photographs matter,
              but the experience of creating
              them matters just as much.

            </p>

          </div>


          <div
            className="testimonial-shell"
            ref={testimonialShellRef}
            onMouseEnter={() => {
              setTestimonialPaused(
                true
              );
            }}
            onMouseLeave={() => {
              setTestimonialPaused(
                false
              );
            }}
          >

            <div className="testimonial-side">

              <span className="testimonial-big-number">
                {activeTestimonial.number}
              </span>

              <div className="testimonial-vertical-text">
                CLIENT EXPERIENCE
              </div>

            </div>


            <div
              className="testimonial-card"
              ref={testimonialCardRef}
            >

              <span
                className="testimonial-quote-mark"
                data-testimonial-animate
              >
                “
              </span>


              <blockquote data-testimonial-animate>
                {activeTestimonial.quote}
              </blockquote>


              <div
                className="testimonial-client"
                data-testimonial-animate
              >

                <div className="testimonial-avatar">
                  {activeTestimonial
                    .name
                    .charAt(0)}
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


            <div className="testimonial-controls">

              <button
                onClick={
                  previousTestimonial
                }
                aria-label="Previous testimonial"
              >
                ←
              </button>


              <div className="testimonial-counter">

                <strong>
                  {String(
                    testimonialIndex + 1
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
                onClick={
                  nextTestimonial
                }
                aria-label="Next testimonial"
              >
                →
              </button>

            </div>


            <div className="testimonial-progress">

              {testimonials.map(
                (
                  testimonial,
                  index
                ) => (

                  <button
                    key={
                      testimonial.number
                    }
                    className={
                      index ===
                      testimonialIndex
                        ? "testimonial-progress-item active"
                        : "testimonial-progress-item"
                    }
                    onClick={() => {
                      setTestimonialIndex(
                        index
                      );
                    }}
                  >

                    <span className="testimonial-progress-track">

                      {index ===
                        testimonialIndex && (

                        <span
                          className="testimonial-progress-fill"
                          style={{
                            animationPlayState:
                              testimonialPaused
                                ? "paused"
                                : "running",
                          }}
                        />

                      )}

                    </span>

                    <small>
                      0{index + 1}
                    </small>

                  </button>

                )
              )}

            </div>

          </div>

        </section>


        {/* CONTACT */}

        <section
          className="contact-section"
          id="contact"
          ref={contactRef}
        >

          <div className="contact-bg-word">
            CONNECT
          </div>


          <div
            className="contact-heading"
            ref={contactHeadingRef}
          >

            <p className="section-eyebrow">

              <span />

              START A CONVERSATION

            </p>


            <h2>

              Let's Create Something

              <br />

              <em>
                Timeless Together.
              </em>

            </h2>


            <p>

              Tell me about your story,
              your event and the moments
              you want to remember.

            </p>

          </div>


          <div
            className="contact-grid"
            ref={contactGridRef}
          >

            <aside className="contact-info-panel">

              <div>

                <p className="contact-small-title">
                  GET IN TOUCH
                </p>


                <h3>
                  Have a story
                  <br />
                  worth capturing?
                </h3>


                <p className="contact-info-copy">

                  Whether you're planning a
                  wedding, portrait session,
                  event or commercial shoot,
                  send the details and let's
                  create something meaningful.

                </p>

              </div>


              <div className="contact-detail-list">

                <a
                  href={
                    `tel:${CONTACT_PHONE.replace(
                      /\s/g,
                      ""
                    )}`
                  }
                >

                  <span>
                    PHONE
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
                    EMAIL
                  </span>

                  <strong>
                    {CONTACT_EMAIL}
                  </strong>

                </a>


                <div>

                  <span>
                    LOCATION
                  </span>

                  <strong>
                    Maharashtra, India
                  </strong>

                </div>


                <div>

                  <span>
                    AVAILABILITY
                  </span>

                  <strong>
                    Available for Travel
                  </strong>

                </div>

              </div>


              <a
                className="whatsapp-button"
                href={
                  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `Hello ${BRAND_NAME}, I would like to enquire about a photography shoot.`
                  )}`
                }
                target="_blank"
                rel="noreferrer"
              >

                <span className="whatsapp-icon">
                  ↗
                </span>


                <div>

                  <small>
                    QUICK ENQUIRY
                  </small>

                  <strong>
                    Chat on WhatsApp
                  </strong>

                </div>

              </a>


              <p className="contact-demo-note">
                Replace demo phone, WhatsApp
                and email before publishing.
              </p>

            </aside>


            {/* BOOKING FORM */}

            <div className="booking-panel">

              <div className="booking-panel-head">

                <span>
                  BOOK YOUR SHOOT
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

                {/* NAME + PHONE */}

                <div className="booking-row">

                  <label
                    className={
                      formErrors.name
                        ? "booking-field has-error"
                        : "booking-field"
                    }
                  >

                    <span>
                      YOUR NAME *
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
                      placeholder="Enter your name"
                      disabled={
                        isSubmitting
                      }
                    />

                    {formErrors.name && (
                      <small>
                        {formErrors.name}
                      </small>
                    )}

                  </label>


                  <label
                    className={
                      formErrors.phone
                        ? "booking-field has-error"
                        : "booking-field"
                    }
                  >

                    <span>
                      PHONE *
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
                      disabled={
                        isSubmitting
                      }
                    />

                    {formErrors.phone && (
                      <small>
                        {formErrors.phone}
                      </small>
                    )}

                  </label>

                </div>


                {/* EMAIL + SERVICE */}

                <div className="booking-row">

                  <label
                    className={
                      formErrors.email
                        ? "booking-field has-error"
                        : "booking-field"
                    }
                  >

                    <span>
                      EMAIL *
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
                      placeholder="you@example.com"
                      disabled={
                        isSubmitting
                      }
                    />

                    {formErrors.email && (
                      <small>
                        {formErrors.email}
                      </small>
                    )}

                  </label>


                  <label
                    className={
                      formErrors.service
                        ? "booking-field has-error"
                        : "booking-field"
                    }
                  >

                    <span>
                      SERVICE *
                    </span>

                    <select
                      name="service"
                      value={
                        formData.service
                      }
                      onChange={
                        handleFormChange
                      }
                      disabled={
                        isSubmitting
                      }
                    >

                      <option value="">
                        Select service
                      </option>

                      {bookingServices.map(
                        (service) => (

                          <option
                            value={service}
                            key={service}
                          >
                            {service}
                          </option>

                        )
                      )}

                    </select>


                    {formErrors.service && (
                      <small>
                        {formErrors.service}
                      </small>
                    )}

                  </label>

                </div>


                {/* DATE + LOCATION */}

                <div className="booking-row">

                  <label className="booking-field">

                    <span>
                      EVENT DATE
                    </span>


                    <div className="custom-date-field">

                      <input
                        type="text"
                        value={
                          formatEventDate(
                            formData.eventDate
                          )
                        }
                        placeholder="DD-MM-YYYY"
                        readOnly
                        disabled={
                          isSubmitting
                        }
                        onClick={() => {

                          eventDatePickerRef
                            .current
                            ?.showPicker?.();

                        }}
                      />


                      <button
                        type="button"
                        className="calendar-button"
                        disabled={
                          isSubmitting
                        }
                        onClick={() => {

                          eventDatePickerRef
                            .current
                            ?.showPicker?.();

                        }}
                        aria-label="Choose event date"
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
                        disabled={
                          isSubmitting
                        }
                        tabIndex="-1"
                      />

                    </div>

                  </label>


                  <label className="booking-field">

                    <span>
                      LOCATION
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
                      placeholder="City / Venue"
                      disabled={
                        isSubmitting
                      }
                    />

                  </label>

                </div>


                {/* MESSAGE */}

                <label
                  className={
                    formErrors.message
                      ? "booking-field booking-message has-error"
                      : "booking-field booking-message"
                  }
                >

                  <span>
                    TELL ME ABOUT YOUR SHOOT *
                  </span>


                  <textarea
                    name="message"
                    value={
                      formData.message
                    }
                    onChange={
                      handleFormChange
                    }
                    placeholder="Tell me about your event, ideas, venue, preferred style..."
                    rows="5"
                    disabled={
                      isSubmitting
                    }
                  />


                  {formErrors.message && (
                    <small>
                      {formErrors.message}
                    </small>
                  )}

                </label>


                {/* STATUS */}

                {formStatus ===
                  "success" && (

                  <div className="form-message success">

                    ✓ WhatsApp enquiry opened successfully.
                    Review the message in WhatsApp and tap Send.

                  </div>

                )}


                {formStatus ===
                  "error" && (

                  <div className="form-message error">

                    Please check the highlighted
                    fields before continuing.

                  </div>

                )}


                {/* SUBMIT */}

                <div className="booking-submit-row">

                  <button
                    type="submit"
                    className="booking-submit"
                    disabled={
                      isSubmitting
                    }
                    style={{
                      opacity:
                        isSubmitting
                          ? 0.65
                          : 1,

                      cursor:
                        isSubmitting
                          ? "wait"
                          : "pointer",
                    }}
                  >

                    <span>
                      {isSubmitting
                        ? "OPENING WHATSAPP..."
                        : "SEND ON WHATSAPP"}
                    </span>

                    <b>
                      {isSubmitting
                        ? "•••"
                        : "→"}
                    </b>

                  </button>


                  <p>
                    Enquiry opens directly
                    <br />
                    in WhatsApp
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

          <div className="footer-top">

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
              Capturing moments that deserve
              <br />
              to live forever.
            </p>

          </div>


          <div className="footer-middle">

            <div>

              <span>
                EXPLORE
              </span>

              <a href="#home">
                Home
              </a>

              <a href="#about">
                About
              </a>

              <a href="#portfolio">
                Portfolio
              </a>

              <a href="#services">
                Services
              </a>

            </div>


            <div>

              <span>
                SERVICES
              </span>

              <a href="#services">
                Weddings
              </a>

              <a href="#services">
                Portraits
              </a>

              <a href="#services">
                Events
              </a>

              <a href="#services">
                Commercial
              </a>

            </div>


            <div>

              <span>
                CONTACT
              </span>

              <a
                href={
                  `mailto:${CONTACT_EMAIL}`
                }
              >
                Email
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
                Booking
              </a>

            </div>


            <div className="footer-big-cta">

              <span>
                HAVE A STORY?
              </span>

              <a href="#contact">

                Let's create

                <br />

                something timeless

                <b>
                  ↗
                </b>

              </a>

            </div>

          </div>


          <div className="footer-bottom">

            <p>
              © {new Date().getFullYear()} Shubham Chingude Photofilms.
              All Rights Reserved.
            </p>

            <p>
              MADE WITH LIGHT,
              EMOTION & STORIES.
            </p>

            <a href="#home">
              BACK TO TOP ↑
            </a>

          </div>

        </footer>


        {/* LIGHTBOX */}

        {selectedIndex !== null && (

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
              aria-label="Close photo"
            >
              ×
            </button>


            <button
              className="lightbox-arrow lightbox-prev"
              onClick={(event) => {

                event.stopPropagation();

                previousPhoto();

              }}
              aria-label="Previous photo"
            >
              ‹
            </button>


            <div
              className="lightbox-content"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >

              <img
                src={
                  photos[
                    selectedIndex
                  ].src
                }
                alt={
                  photos[
                    selectedIndex
                  ].title
                }
              />


              <div className="lightbox-info">

                <span>
                  {
                    photos[
                      selectedIndex
                    ].categoryLabel
                  }
                </span>

                <h2>
                  {
                    photos[
                      selectedIndex
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
              onClick={(event) => {

                event.stopPropagation();

                nextPhoto();

              }}
              aria-label="Next photo"
            >
              ›
            </button>

          </div>

        )}

      </main>

    </>
  );
}


export default App;