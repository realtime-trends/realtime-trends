const loadOpenmain = (callback: Function) => {
  const existingScript = document.getElementById('openmain');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = 'https://openmain.pstatic.net/js/openmain.js';
    script.id = 'openmain';
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
};
export default loadOpenmain;
