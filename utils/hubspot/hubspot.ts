let initialized: boolean = false;

export const initHubspot = () => {
  if (!initialized) {
    console.log('Hubspot init')
    const script = document.createElement('script');
    script.src = 'https://js.hs-scripts.com/5061743.js';
    document.body.appendChild(script);
  }
  initialized = true
  return;
};
