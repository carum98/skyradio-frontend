enum Role {
    ADMIN = 'admin',
    USER = 'user',
    SELLER = 'seller',
    GUEST = 'guest'
}

interface IRole {
    name: string
    value: string
}