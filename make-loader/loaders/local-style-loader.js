module.exports = function (source) {
  const res = `
    const e = document.createElement('style');
    e.innerHTML = ${source};
    document.head.appendChild(e)
  `;
  return res;
};
