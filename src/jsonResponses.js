const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const respondJSON = (request, response, status, object, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(object);
  response.end();
};

// success
const success = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'This is a successful response',
    id: 'success',
  };

  // xml
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `
        <response>
          <message>${responseJSON.message}</message>
          <id>${responseJSON.id}</id>
        </response>
        `;
    return respondJSON(request, response, 200, responseXML, 'text/xml');
  }

  // json
  const string = JSON.stringify(responseJSON);
  return respondJSON(request, response, 200, string, 'application/json');
};

// bad request
const badRequest = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set equal to true';
    responseJSON.id = 'badRequest';

    // xml
    if (acceptedTypes[0] === 'text/xml') {
      const responseXML = `
            <response>
                <message>${responseJSON.message}</message>
                <id>${responseJSON.id}</id>
            </response>
            `;
      return respondJSON(request, response, 401, responseXML, 'text/xml');
    }

    // json
    const string = JSON.stringify(responseJSON);
    return respondJSON(request, response, 400, string, 'application/json');
  }

  // xml
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `
            <response>
                <message>${responseJSON.message}</message>
                <id>${responseJSON.id}</id>
            </response>
            `;
    return respondJSON(request, response, 401, responseXML, 'text/xml');
  }

  // json
  const string = JSON.stringify(responseJSON);
  return respondJSON(request, response, 200, string, 'application/json');
};

// unauthorized
const unauthorized = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'You have successfully viewed the content',
  };

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    responseJSON.id = 'unauthorized';

    // xml
    if (acceptedTypes[0] === 'text/xml') {
      const responseXML = `
            <response>
                <message>${responseJSON.message}</message>
                <id>${responseJSON.id}</id>
            </response>
            `;
      return respondJSON(request, response, 401, responseXML, 'text/xml');
    }

    // json
    const string = JSON.stringify(responseJSON);
    return respondJSON(request, response, 401, string, 'application/json');
  }

  // xml
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `
        <response>
          <message>${responseJSON.message}</message>
          <id>${responseJSON.id}</id>
        </response>
        `;
    return respondJSON(request, response, 200, responseXML, 'text/xml');
  }

  // json
  const string = JSON.stringify(responseJSON);
  return respondJSON(request, response, 200, string, 'application/json');
};

// forbidden
const forbidden = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  // xml
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `
        <response>
          <message>${responseJSON.message}</message>
          <id>${responseJSON.id}</id>
        </response>
        `;
    return respondJSON(request, response, 403, responseXML, 'text/xml');
  }

  // json
  const string = JSON.stringify(responseJSON);
  return respondJSON(request, response, 403, string, 'application/json');
};

// internal
const internal = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };

  // xml
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `
        <response>
          <message>${responseJSON.message}</message>
          <id>${responseJSON.id}</id>
        </response>
        `;
    return respondJSON(request, response, 500, responseXML, 'text/xml');
  }

  // json
  const string = JSON.stringify(responseJSON);
  return respondJSON(request, response, 500, string, 'application/json');
};

// not implemented
const notImplemented = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  // xml
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `
        <response>
          <message>${responseJSON.message}</message>
          <id>${responseJSON.id}</id>
        </response>
        `;
    return respondJSON(request, response, 501, responseXML, 'text/xml');
  }

  // json
  const string = JSON.stringify(responseJSON);
  return respondJSON(request, response, 501, string, 'application/json');
};

// not found
const notFound = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // xml
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `
        <response>
          <message>${responseJSON.message}</message>
          <id>${responseJSON.id}</id>
        </response>
        `;
    return respondJSON(request, response, 404, responseXML, 'text/xml');
  }

  // json
  const string = JSON.stringify(responseJSON);
  return respondJSON(request, response, 404, string, 'application/json');
};

module.exports = {
  getIndex,
  getCSS,
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
