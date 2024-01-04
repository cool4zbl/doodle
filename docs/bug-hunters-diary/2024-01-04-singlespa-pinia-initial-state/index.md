# How to Initialize Pinia Store State with Single-SPA Props & Single-SPA Vue

## Problem

We're developing a platform using [Single-SPA](https://single-spa.js.org/) as the micro-frontend framework. This
platform comprises multiple applications, and it's common to share state between the App Shell (root-config) and these
applications. This approach enhances reusability and maintains clean code.

A typical example is `countries`. Being a food delivery platform operating in numerous countries, many of our
applications require access to country information. There are several ways to implement this.

For instance, in a Single-SPA Vue application with [Pinia](https://pinia.vuejs.org/) for state management(business
application), we initially
fetch country data from the backend/authorization at the App Shell. Then, there are two ways to pass this data to this
application:

1. The first method involves using `window.xxx` as a global variable to pass the props. However, this is not type-safe
   and is not recommended by Single-SPA.

2. The second method is to use [Single-SPA Props](https://single-spa.js.org/docs/api/#props) to pass the props to the
   application.

I opted for the second method. Here's how I configured it:

```typescript
const singleSpaGlobalProps = {
    ...app,
    customProps: {
        ...legacyFrameIntegration,
        countries,
    },
}
```

The challenge was to initialize the state of the Pinia store with these custom props from Single-SPA.

After consulting the [Pinia SSR](https://pinia.vuejs.org/ssr/#State-hydration)
and [SingleSpaVue](https://single-spa.js.org/docs/ecosystem-vue) documentation, and after several attempts, I discovered
a solution.

## Solution

According to the Pinia SSR documentation, we can initialize the Pinia store state as follows:

```typescript
pinia.state.value = initialState || {}
```

I have a Pinia store with a state defined like this:

```typescript
export const useCountryStore = defineStore("country", () => {
    const countries = ref<Country[]>([]);
    const activeCountry = ref<Country>(null);
    // ...
    return {
        countries,
        activeCountry,
    };
});
```

To initialize the store's state, I used this approach:

```typescript
import {Country, JETMS} from "@jet/jetms-client-sdk";
import {createPinia} from "pinia";
import singleSpaVue from "single-spa-vue";
import {createApp, h} from "vue";
import App from "./App.vue";

const pinia = createPinia();

const vueLifecycles = singleSpaVue({
    createApp,
    appOptions: {
        render() {
            return h(App, {
                // custom props
            });
        },
    },
    handleInstance(app, props: { countries: Country[] }) {
        app.use(pinia);
        // All states in a store need initial values.
        pinia.state.value = {
            country: {
                activeCountry: SDK.activeCountry,
                countries: props.countries.sort((a, b) => a.name.localeCompare(b.name)),
            }
        };
    },
});
```

After launching the application, we can see that Pinia initializes the store state with the custom props passed. It
seems to merge the initial state with the default state.

Key points to note:

1. The initial state must be set in the `handleInstance` function after `app.use(pinia)`. Otherwise, it will not
   function correctly.

2. All states in a store need initial values. States without initial values will be `undefined`, potentially causing the
   application to crash.

