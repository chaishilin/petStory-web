import { domain } from "../api/baseUrl"
console.log(domain)
let baseWsUrl = "ws://" + domain + ":8080/story"
export default baseWsUrl