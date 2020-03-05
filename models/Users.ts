class Users {
    _name: string
    constructor(public name: string){
        this._name = name
    }
    getName = (): string => {
        return this._name
    }
}

export default Users