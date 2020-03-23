const JAHIA_URL = process.env.REACT_APP_JAHIA_HOST;

const environment = {
  graphQLEndpoint: `${JAHIA_URL}/modules/graphql`,
  mediaBasePath: `${JAHIA_URL}/files/live`
}

export default environment;