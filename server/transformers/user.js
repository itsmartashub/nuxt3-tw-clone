//nije export default jer zelimo eksplicitno koristiti ovo ime. Ovu f-ju koristimo za excludovanje password field-a iz Prisma odgovora. Da sensitive data ne bi bili exposedovani. Mozda sada Prisma ima exclude field funcionallity pa ne mora ovako.
export const userTransformer = user => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        profileImage: user.profileImage
    }
}
