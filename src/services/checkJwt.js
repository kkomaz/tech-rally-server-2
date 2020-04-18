const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-aofuofag.auth0.com/.well-known/jwks.json`
  }),
  
  // Validate the audience and the issuer.
  audience: 'https://api/blogs',
  issuer: `https://dev-aofuofag.auth0.com/`,
  algorithms: ['RS256']
});

module.exports = checkJwt;
