export default {
  beforeMount: element => {
    element.addEventListener('keypress', e => {
      const char = String.fromCharCode(e.keyCode);
      if (/^[0-9]*$/.test(char)) return true;
      e.preventDefault();
    });
    element.addEventListener('paste', e => {
      const paste = e.clipboardData.getData('text').trim();
      if (/^[0-9]+/.test(paste)) return true;
      e.preventDefault();
    });
  },
};