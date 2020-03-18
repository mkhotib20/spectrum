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
    async getAttributes(useTimeStamp, usePk){
        
        try {
            const {data} = await axios.get(`${this.base_url}/get/attr`)
            let attr = data.data
            if (!useTimeStamp) {
                attr = attr.filter(val => {
                    return val!='createdAt' && val!="updatedAt"
                })
            }
            if (!usePk) {
                attr = attr.filter(val => {
                    return val!='id'
                })
            }
            return attr
        } catch (error) {
            console.log(error)
        }
    }
    getRspCode(){
        return this.response.code
    }
    getCount(){
        return this.response.data.count ? this.response.data.count : null
    }
    getData(withCount){
        if (withCount) {
            return this.response.data.rows
        }
        return this.response.data
    }
    async get(config){        
        try {
            const {data} = await axios.post(`${this.base_url}/get`, config)
            this.response = data
            return true
        } catch (error) {
            let rsp = error.response.data || error
            this.response = rsp
            return false
        }
        
        // let cof = {
        //     offset: config.offset.toString(),
        //     limit: config.limit.toString(),
        //     orderBy: `${config.order.orderBy} ${config.order.type}`
        // }
        // try {
        //     const data = await axios.post(`${this.base_url}`, cof)
        //     console.log(data, cof);

        //     this.response = data
        // } catch (error) {
        //     console.log(error);
        // }
        // return true
    } 
    async getById(id){ 
        try {
            const {data} = await axios.get(`${this.base_url}/${id}`)
            this.response = data
            return true
        } catch (error) {
            let rsp = error.response.data || error
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
    async update(id, toBeUpdated){
        try {
            const {data} = await axios.put(this.base_url, {
                key: id,
                toBeUpdated: toBeUpdated
            })
            this.response = data
            return true
        } catch (error) {
            let rsp = error.response.data
            this.response = rsp
            return false
        }
    }    
    async softDelete(id, toBeUpdated){
        try {
            const {data} = await axios.put(this.base_url, {
                key: id,
                toBeUpdated: {
                    status: 0
                }
            })
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