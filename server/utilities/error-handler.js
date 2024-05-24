module.exports = {
  handleMongooseError: (err) => {
    const firstKey = Object.keys(err.errors)[0];
    const message = err.errors[firstKey].message;
    return message;
  },
};
