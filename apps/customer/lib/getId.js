const getId = function(id) {
  const tempId = 100000000 + id;
  let strId = tempId.toString();
  strId = strId.slice(1);

  return strId;
};

module.exports = {
  getId
};
