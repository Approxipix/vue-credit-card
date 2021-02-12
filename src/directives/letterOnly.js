export default {
  beforeMount: element => {
    element.addEventListener('keypress', e => {
      const char = String.fromCharCode(e.keyCode);
      if (/^[a-zA-Z\s]*$/.test(char)) return true;
      e.preventDefault();
    });
    element.addEventListener('paste', e => {
      const paste = e.clipboardData.getData('text').trim();
      if (/^[a-zA-Z\s]*$/.test(paste)) return true;
      e.preventDefault();
    });
  },
};