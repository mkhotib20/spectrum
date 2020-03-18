export default (data, value) => {
    let obj = {}
    if (value) {
        data.map(val => {
            obj[val] = value[val]
        })
        return obj
    }
    data.map(val => {
        obj[val] = ''
    })
    return obj
    // return {... data}
}