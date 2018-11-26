/*
 *  Take a query string and converts it into an object of key value pairs
 *  returns the final object.
 *
 *  NOTE: Although this splits up multiple values it currently only accounts for
 *        query strings like `id` whose value is a simple number or string.
 *        Values with spaces or other special characters will have "%"-style
 *        http encodings. It will have to be enhanced if these cases need to be
 *        handled.
 */
function parseQueryString(queryString) {
  // Chop off the leading "$" and split the queries into an array
  const queryArr = queryString.slice(1).split("&");
  const queryObj = {}; // we will return this

  // split the queries into key/value and add them to the queryObj
  queryArr.forEach(query => {
    query = query.split("=");
    queryObj[query[0]] = query[1];
  });

  return queryObj;
}

module.exports = { parseQueryString };
