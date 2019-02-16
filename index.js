/**
 * Map an object of default state properties into a new object
 *
 * @private
 *
 * @param {Object} stateProps
 * @param {Function} fn
 * @return {Object}
 */
let mapStateProps = (stateProps, fn) => {
  return Object.entries(stateProps).reduce((obj, [
    stateProp,
    { mutation, defaultValue }
  ]) => {
    return Object.assign(obj, fn(stateProp, mutation, defaultValue || null));
  }, {});
};

/**
 * Map an object of default state properties to properties that can be assigned
 * to a new store instance. A mutation for setting each property is added with
 * the provided mutation name, as well as an action that will only commit the
 * mutation if the value has not changed.
 *
 * @param {Object} stateProps
 * @return {Object} { state, mutations, actions }
 */
let mapVuexStateProps = stateProps => {
  return {
    state: mapStateProps(stateProps, (stateProp, mutation, defaultValue) => {
      return { [stateProp]: defaultValue };
    }),

    mutations: mapStateProps(stateProps, (stateProp, mutation) => {
      return {
        [mutation](state, value) {
          state[stateProp] = value;
        }
      };
    }),

    actions: mapStateProps(stateProps, (stateProp, mutation, defaultValue) => {
      return {
        [mutation](context, value = defaultValue) {
          if (value !== context.state[stateProp]) {
            context.commit(mutation, value);
          }
        }
      };
    })
  };
};

module.exports = mapVuexStateProps;
