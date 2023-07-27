const files = import.meta.globEager('./*.js');
const prenv = {};

Object.keys(files).forEach(key => {
    if (key === './index.js') return;
    const item = files[key].default;
    const newKey = key.substring(2, key.lastIndexOf('.'));
    prenv[newKey] = item;
});

if (prenv.hasOwnProperty('development.local')) {
    prenv['development'] = prenv['development.local'];
    delete prenv['development.local'];
}

prenv['build_env'] = import.meta.env.MODE;

export default prenv;
