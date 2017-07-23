function pick(o, ...fields) {
  return fields.reduce((a, x) => {
    if (o[x]) a[x] = o[x];
    return a;
  }, {});
}

export default { pick };
