import axios from './config'

class Actions
{
    constructor(base_url) {
        this.response = null
        this.base_url = base_url
    }
    getErrors(){
        if (this.response.data==null) {
            return this.response.message
        }
        return this.response.data.errors
    }
    getRspCode(){
        return this.response.code
    }
    getData(){
        return this.response.data
    }
    async get(){
        try {
            const {data} = await axios.get(this.base_url)
            this.response = data
            return true
        } catch (error) {
            let rsp = error.response.data
            this.response = rsp
            return false
        }
    } 
    async insert(toBeInserted){
        try {
            const {data} = await axios.post(this.base_url, toBeInserted)
            this.response = data
            return true
        } catch (error) {
            let rsp = error.response.data
            this.response = rsp
            return false
        }
    }    
}

export default Actions