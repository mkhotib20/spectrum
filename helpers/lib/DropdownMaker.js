export default (data, label, value) => {
    return data.map(val=>{
        return {
            value: val[value ? value : 'id'],
            label: val[label]
        }
    })
}