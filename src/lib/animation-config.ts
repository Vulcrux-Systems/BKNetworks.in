export const animationConfig = {
  easing: {
    smooth: [0.4, 0, 0.2, 1],
    snappy: [0.34, 1.56, 0.64, 1],
    ease: [0.25, 0.46, 0.45, 0.94],
    sharp: [0.25, 0.25, 0.75, 0.75],
  },

  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    verySlow: 0.8,
    epic: 1.2,
  },

  variants: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },

    slideInUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },

    slideInDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },

    slideInLeft: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
    },

    slideInRight: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 20 },
    },

    scaleIn: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.9 },
    },

    blurIn: {
      initial: { opacity: 0, filter: "blur(10px)" },
      animate: { opacity: 1, filter: "blur(0px)" },
      exit: { opacity: 0, filter: "blur(10px)" },
    },

    stagger: {
      container: {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
          },
        },
      },
      item: {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 },
      },
    },

    float: {
      animate: {
        y: [0, -10, 0],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    },

    pulse: {
      animate: {
        scale: [1, 1.05, 1],
        opacity: [1, 0.9, 1],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    },

    glow: {
      animate: {
        boxShadow: [
          "0 0 5px rgba(244, 196, 48, 0.3)",
          "0 0 20px rgba(244, 196, 48, 0.6), 0 0 30px rgba(244, 196, 48, 0.4)",
          "0 0 5px rgba(244, 196, 48, 0.3)",
        ],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    },
  },

  whileInView: {
    initial: "initial",
    whileInView: "animate",
    viewport: { once: false, amount: 0.3 },
  },

  transition: {
    default: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
    smooth: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
    snappy: {
      duration: 0.3,
      ease: [0.34, 1.56, 0.64, 1],
    },
    spring: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 1,
    },
  },
};

export const getStaggerConfig = (itemCount: number, delayPerItem = 0.1) => ({
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delayPerItem,
        delayChildren: 0.2,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  },
});

export const getScrollConfig = (threshold = 0.2) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: {
    once: false,
    amount: threshold,
  },
  transition: {
    duration: 0.5,
    ease: [0.4, 0, 0.2, 1],
  },
});
