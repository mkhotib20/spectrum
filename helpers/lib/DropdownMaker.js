export default (data, label, value, noObject) => {
    if (noObject) {
        return data.map(val => {
            return {
                value: val,
                label: val
            }
        })
    }
    return data.map(val=>{
        return {
            value: val[value ? value : 'id'],
            label: val[label]
        }
    })
}