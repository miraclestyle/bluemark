const requestHandler = (query, argsFormater) => {
  return (req, res) => {
    query(...argsFormater(req))
      .then((data) => {
        console.log(`${query.name} data:`, data);
        res.status(200).json(data);
      })
      .catch((error) => {
        console.log(`${query.name} error:`, error);
        res.status(500).end('Something went wrong. Please try again later.');
      });
  };
};

module.exports = requestHandler;
