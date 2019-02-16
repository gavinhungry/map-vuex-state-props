map-vuex-state-props
====================
Creates default [Vuex](https://vuex.vuejs.org) `state`, `mutations` and
`actions` objects.

This module sets all default values in `state` (use a getter function as
`defaultValue` for non-primitive default values), creates a mutation in
`mutations` for setting to an explicit value and creates an action in `actions`
(the name of the action is the same as the mutation name) that will only commit
the underlying mutation if the new value differs from the current value.

Usage
-----

```js
import mapVuexStateProps from 'map-vuex-state-props';
```

```js
let { state, mutations, actions } = mapVuexStateProps({
 name: {
   mutation: 'set-name',
   defaultValue: 'Foo'
 },

 // ...
});
```

```js
let store = new Vuex.Store({
  state,
  mutations,
  actions
});
```

License
-------
This software is released under the terms of the **MIT license**. See `LICENSE`.
