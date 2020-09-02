export default class AuthShared{
    public static getRedirectRoute(routes:string[]) {
        let filteredRoutes = routes.filter(r => !r.includes('login') && !r.includes('register'))
        if(filteredRoutes.length) {
            return filteredRoutes.shift()
        }
        return ''
    }
}