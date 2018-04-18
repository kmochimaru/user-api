export class User {
    constructor(
        public id?: number,
        public first_name?: string,
        public last_name?: string,
        public email?: string,
        public password?: string
    ) { }
}
// export interface User {
//     id: number;
//     first_name: string;
//     last_name: string;
//     email: string;
//     password: string;
// }