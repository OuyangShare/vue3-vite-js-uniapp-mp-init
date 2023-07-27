const files = import.meta.globEager('./**/*.js');
const modules = [];
Object.keys(files).forEach(key => {
    const item = files[key].default;
    const gatewayName = key.split('/')[1];
    item.map(v => {
        v.gatewayName = gatewayName;
        modules.push(v);
    });
});

export default modules;
