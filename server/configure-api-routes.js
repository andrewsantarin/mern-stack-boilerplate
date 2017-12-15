const fs = require('fs');
const path = require('path');

// How to retrieve folders only:
// https://stackoverflow.com/a/24594123/1933636

/**
 * Determines whether the given path is a directory.
 *
 * @param {string} pathName - the path.
 * @returns {Boolean} whether the buffer is a directory (true) or not (false).
 */
const isDirectory = (pathName) => fs.lstatSync(pathName).isDirectory();


/**
 * Generates an endpoint route file path string from the domain directory provided.
 *
 * @param {string} domain folder - the folder of the domain containing an endpoint file.
 * @param {string} endpoints file - the file containing all domain-specific routes.
 *
 * @returns {string} the path to the endpoint file.
 */
const mapDomainToEndpointFiles = (domainFolder, endpointsFile) => `./${domainFolder}${endpointsFile}`;


/**
 * Concatenates the endpoint route with a generic route prefix.
 *
 * @param {string} domain route - the main route of the domain for all nested endpoints.
 * @param {string} route prefix - the prefix of the route, if necessary.
 *
 * @returns {string} the domain's main endpoint route.
 */
const mapDomainToRoutes = (domainRoute, routePrefix) => `${routePrefix}/${domainRoute}`;


/**
 * Lists all domain subfolders located in the path.
 *
 * @param {string} rootPathName - the parent path of the domain subfolders.
 * @param {string[]} excludePathNames - subfolder paths which do not count as a 'domain'.
 *
 * @returns {string[]} the list of domain subfolders.
 */
const getDomainPathNames = (rootPathName, excludePathNames) =>
  fs.readdirSync(rootPathName)
    .filter(pathName => 
      isDirectory(path.join(rootPathName, pathName)) && excludePathNames.indexOf(pathName) === -1
    );


// Defaults.
const ENDPOINTS_PATH_NAME = '/routes'; // The endpoint file every domain should have.
const API_PATH_NAME = '/api';        // The '/api' prefix for each endpoint.

/**
 * Configures the route 'mini-apps' to the app.
 * Each domain subfolder is hooked up to an endpoint route and an endpoint file.
 * e.g. Route: '/api/comments', File: '/comments/urls.js'
 */
const configureRoutes = ({
  routePrefix = API_PATH_NAME,
  endpointsFileName = ENDPOINTS_PATH_NAME,
  excludePathNames = []
}) => (app) => {
  const domainPathNames = getDomainPathNames(__dirname, excludePathNames);
  domainPathNames.forEach(domainPathName => {
    // Creates paths to the endpoint modules, e.g. './users/urls', './orders/urls', './cart/urls'.
    const endpointsFilePath = mapDomainToEndpointFiles(domainPathName, endpointsFileName);

    // Creates endpoint route strings, e.g. '/api/users/', '/api/orders/', '/api/cart/'.
    // If an alternate domain route has been provided, use it instead.
    // e.g. The folder name is singular 'user', but the route, which may include listing, is plural '/api/users'.
    const altDomainPathName = require(endpointsFilePath).ROUTE;
    const prefixedRoutePath = mapDomainToRoutes(altDomainPathName || domainPathName, routePrefix);

    // Connects the route path to the endpoint modules, e.g. app.use('/api/users/', require('./users/urls')).
    app.use(prefixedRoutePath, require(endpointsFilePath));
  }); 
}

module.exports = configureRoutes;
