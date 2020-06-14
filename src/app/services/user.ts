import { Role } from './role';

export class User {
    constructor(
        public name: string,
        public roles: Role[]
    ){ }
}
