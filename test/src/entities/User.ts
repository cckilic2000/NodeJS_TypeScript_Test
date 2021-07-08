export interface IUser {
    id: number|null;
    name: string;
    email: string;
}

class User implements IUser {

    public id: number|null;
    public name: string;
    public email: string;

    constructor(nameOrUser: string | IUser, email?: string, id?: number) {
        if (typeof nameOrUser === 'string') {
            this.name = nameOrUser;
            this.email = email || '';
            this.id = id || -1;
        } else {
            this.name = nameOrUser.name;
            this.email = nameOrUser.email;
            this.id = nameOrUser.id;
        }
    }
}

export default User;
