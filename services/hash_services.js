import bcrypt from "bcryptjs"

const salt = bcrypt.genSaltSync(10)

export const hash_password = (pass)=>{
    return bcrypt.hashSync(pass, salt)
}

export const compare_password = (pass, hash)=>{
    return bcrypt.compareSync(pass, hash)
}

