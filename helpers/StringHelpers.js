export default  class StringHelpers
{
    static snakeToCamel(str){
        let strArr = str.split("_")
        let newStr = strArr.join(' ')
        return newStr
    }
}