const files = import.meta.globEager('./**/*.js');
const modules = {};
Object.keys(files).forEach(key => {
    const item = files[key].default;
    modules[item.$id] = item;
});

export default modules;
