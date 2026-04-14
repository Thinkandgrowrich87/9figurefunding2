declare global {
  interface Window {
    Calendly?: {
      showPopupWidget: (url: string) => void;
    };
  }
}

export const openCalendly = () => {
  if (window.Calendly) {
    window.Calendly.showPopupWidget("https://calendly.com/9figurefunding");
  }
};
