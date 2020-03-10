export default  class StringHelpers
{
    static snakeToCamel(str){
        let strArr = str.split("_")
        strArr = strArr.map(val => {
            let sr = val.split('') 
            sr[0] = sr[0].toUpperCase()
            sr = sr.join("")
            return sr
        })
        let newStr = strArr.join(' ')
        return newStr
    }
}