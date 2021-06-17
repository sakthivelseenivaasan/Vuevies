import Vue from "vue";
import VueApollo from "vue-apollo";
import {
  createApolloClient
} from "vue-cli-plugin-apollo/graphql-client";

// Install the vue plugin
Vue.use(VueApollo);

// Name of the localStorage item
const AUTH_TOKEN = "user_apolo_token";

// Http endpoint
//const httpEndpoint = "https://tmdb.apps.quintero.io/";
 // process.env.VUE_APP_GRAPHQL_HTTP || "https://tmdb.apps.quintero.io/";
 const clientLocalOptions = {
  // You can use `https` for secure connection (recommended in production)
  httpEndpoint: 'http://localhost:4000/graphql',
}

const clientMovieOptions = {
httpEndpoint: 'https://tmdb.apps.quintero.io/',
}

// Config
const defaultOptions = {
  // LocalStorage token
  tokenName: AUTH_TOKEN,
  // Enable Automatic Query persisting with Apollo Engine
  persisting: false,
  // Use websockets for everything (no HTTP)
  // You need to pass a `wsEndpoint` for this to work
  websocketsOnly: false,
  // Is being rendered on the server?
  ssr: false,
};

// Call this in the Vue app file
export function createProvider() {
  // Create apollo client
  const createLocal= createApolloClient({
    ...defaultOptions,
    ...clientLocalOptions,
  });

  const createMovie = createApolloClient({
    ...defaultOptions,
    ...clientMovieOptions,
  });

  const localServer = createLocal.apolloClient;
  const movieServer = createMovie.apolloClient;
  // Create vue apollo provider
  const apolloProvider = new VueApollo({
    clients: {
      localServer,
      movieServer
    },
    defaultClient: localServer,
    defaultOptions: {
      $query: {
         fetchPolicy: 'cache-and-network',
         cache:'no-cache'
      },
    },
    errorHandler(error) {
      // eslint-disable-next-line no-console
      console.log(
        "%cError",
        "background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;",
        error.message
      );
    },
  });

  return apolloProvider;
}
