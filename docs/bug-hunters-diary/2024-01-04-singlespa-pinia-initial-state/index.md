---
title:
   Initialize Pinia Store with Single-SPA Props
---

# How to Initialize Pinia Store State with Single-SPA Props & Single-SPA Vue

## Context

We're developing a platform using [Single-SPA](https://single-spa.js.org/) as the micro-frontend framework. This
platform integrates multiple applications, and it's common to share state between the App Shell (root-config) and these
applications since it enhances re-usability and maintains clean code.

## Problem

However, we encountered the challenge of sharing state between the App Shell (root-config) and a top-level Single-SPA
Vue application (Header app) utilizing [Pinia](https://pinia.vuejs.org/) for state management.

A typical example is `countries`. Being a food delivery platform operating in numerous countries, many of our
applications require access to country information. We initially fetch this "country" data from the
backend/authorization during the App Shell initialization and aim to
share it with top-level apps.

We identified two main methods to pass this data from the App Shell to the Header app:

1. Using `window.xxx` as a global variable to pass props;

2. Utilizing [Single-SPA Props](https://single-spa.js.org/docs/api/#props) to pass props to the application.

Here's an example using the global variable `window._$jetms.availableCountries` within the store definition:

```typescript title="header/store/countryStore.ts"
// Original store code snippet
export const useCountryStore = defineStore("country", () => {
   // highlight-next-line
   const countries = ref<Country[]>([...window._$jetms.availableCountries].sort((a, b) => a.name.localeCompare(b.name)));
   const activeCountry = ref<Country>(JETMS.activeCountry);

   return {countries, activeCountry};
});
```

However, I decided against using `window.xxx` due to its lack of type safety and instead opted for the more reliable
Single-SPA Props. Here's how I configured it in `root-config` and read it in the
Header/main.ts.

```typescript
const singleSpaGlobalProps = {
    ...app,
   // highlight-next-line
   // customProps is the key to pass props to the application
    customProps: {
        ...legacyFrameIntegration,
       countries,
    },
}
```

```typescript title="header/main.ts"
import {createApp, h} from 'vue';
import singleSpaVue from 'single-spa-vue';
import App from './App.vue';
import {createPinia} from "pinia";

const pinia = createPinia();

const vueLifecycles = singleSpaVue({
   createApp,
   appOptions: {
      render() {
         return h(App, {
            // ...other props
            // highlight-next-line
            countries: this.countries,
         });
      },
   },
   handleInstance(app: any) {
      app.use(pinia)
   }
});
````

The challenge then became initializing the Pinia store state with these custom props from Single-SPA.

## Initial Attempt

Initially, I attempted to initialize the state with a high-order function `useCountryStoreWithDefault `, accepting "
countries" as a parameter. This method
ensured a single store instance but required repetitive calls in every component using the store, leading to
inefficiency and somewhat hacky.

```typescript title=" stores/CountryStore.ts"
// High-order function definition
// highlight-next-line
export const useCountryStoreWithDefault = (cs: Country[]) => defineStore("country", () => {
   const countries = ref<Country[]>(cs.sort((a, b) => a.name.localeCompare(b.name)));
   const activeCountry = ref<Country>(JETMS.activeCountry);

   return {countries, activeCountry};
});
```

```vue title="header/Control.vue"

<script setup lang="ts">
   import {defineProps} from "vue";
   import {useCountryStoreWithDefault} from "../stores/CountryStore";

   const props = defineProps<{
      countries: Country[];
   }>();

   // TODO: extending country store with props.countries is a hack, need to find a better solution
   // highlight-next-line
   const countryStore = useCountryStoreWithDefault(props.countries)();
</script> 
```

`App.vue` setup:

```vue title="App.vue"

<script setup lang="ts">
   import {defineProps} from "vue";

   interface Props {
      menuItems: { [path: string]: MenuItem };
      activeLegacyMenuId: string;
      countries: Country[];
   }

   const props = defineProps<Props>();
</script>
<template>
   <header class="font-bold relative z-10 bg-white flex items-center shadow-md">
      <LogoIcon :countries="props.countries" class="my-[12px] mx-[24px]"/>
      <NavigationBar
              :menu-items="props.menuItems"
              :active-legacy-menu-id="props.activeLegacyMenuId"
      />
      <Controls :countries="props.countries"/>
   </header>
</template>
```

This approach, however, had several drawbacks:

- **Creation Complexity**: It changed the store's creation process.
- **Usage Redundancy**: Modifying every component using the store was repetitive and not in line with DRY principles.
- **Exhaustion**: Propagating props layer by layer was cumbersome, especially for deeply nested components.

## Refined Solution

I then sought a better solution that involved setting the store's initial state directly after app creation, I suddenly
realized the problem resembled
handling state in SSR -- the way that Single-SPA framework provides data from the App Shell to the application is just
like an SSR process.

After consulting the [Pinia SSR](https://pinia.vuejs.org/ssr/#State-hydration)
and [SingleSpaVue](https://single-spa.js.org/docs/ecosystem-vue) documentation, and after several attempts, I discovered
a solution.

Pinia SSR documentation, thankfully, provided a method to initialize the Pinia store state:

```typescript
pinia.state.value = initialState || {}
```

My Pinia store's state was defined as follows, with states default values set to be empty:

```typescript title=" stores/CountryStore.ts"
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

Then, utilizing the SingleSpa Vue documentation, I accessed the _custom props_ we pass to the app
in the `handleInstance(app, props)` function. Actually, we also use `pinia` here `app.use(pinia)`, so this was the ideal
place to initialize the store state.

So after combining these two approaches, I applied this method in the `handleInstance` function of the SingleSpaVue.

```typescript title="header/main.ts"
import {Country, JETMS} from "@jet/jetms-client-sdk";
import {createPinia} from "pinia";
import singleSpaVue from "single-spa-vue";
import {createApp, h} from "vue";
import App from "./App.vue";

const vueLifecycles = singleSpaVue({
    createApp,
    appOptions: {
        render() {
            return h(App, {
                // custom props
            });
        },
    },
   // highlight-start
    handleInstance(app, props: { countries: Country[] }) {
        const pinia = createPinia();
        app.use(pinia);
        // All states in a store need initial values.
        pinia.state.value = {
            country: {
                activeCountry: SDK.activeCountry,
                countries: props.countries.sort((a, b) => a.name.localeCompare(b.name)),
            }
        };
    },
   // highlight-end
});
```

After launching the application, we can see that Pinia successfully initialized the store state with the custom props
passed. (TODO:
add screenshot)
This solution seamlessly merged the initial state with the default state without altering the standard store creation
and usage methods.

Key Takeaways:

1. **Initialization**: Setting the initial state in the `handleInstance` function after `app.use(pinia)` is crucial.
2. **Completeness**: If we set initial state using `pinia.state.value`, all other initial state setting in the store
   definition will be ignored. It means if no other setting function is called, these state will be `undefined`.
3. **Client-Side Hydration**: Ensure to hydrate Pinia's state before any `useStore()` function call on the client side.

## Conclusion

This streamlined approach effectively initializes the Pinia store state with custom props from Single-SPA, ensuring
efficiency and code cleanliness. I hope this article can help you if you encounter a similar problem.

## References

- [State serialization](https://github.com/antfu/vite-ssg/blob/main/README.md#state-serialization)

- An alternative method found on GitHub issue:

```typescript

export default function makeSeparatedStore<
        T extends (storeKey: string, props: any) => any,
        K extends T extends (storeKey: string) => infer StoreDef ? StoreDef : never,
>(defineStore: T) {
   const definedStores = new Map<string, K>();

   return (
           storeKey: string,
           props: any = {},
   ): K => {
      if (!definedStores.has(storeKey)) {
         definedStores.set(storeKey, defineStore(storeKey, props));
      }

      // @ts-expect-error
      return definedStores.get(storeKey)();
   };
}
export const useCountryStore = makeSeparatedStore(
        (key: string, props: any) => defineStore(key, () => {
           const countries = ref<Country[]>(props.countries.sort((a, b) => a.name.localeCompare(b.name)));
           const activeCountry = ref<Country>(JETMS.activeCountry);

           return {countries, activeCountry};
        })
)
```
