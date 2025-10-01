// Animate sections on scroll
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".section").forEach(section => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
    },
    opacity: 0,
    y: 50,
    duration: 1
  });
});
