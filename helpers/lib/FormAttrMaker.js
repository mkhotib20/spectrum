export default (data) => {
    let obj = {}
    data.map(val => {
        obj[val] = ''
    })
    return obj
    // return {... data}
}