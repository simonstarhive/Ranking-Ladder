/*import API_BASE_URL from "..";

export const api={
    get: async (endpoint: string)=>{
        const res = await fetch('${}')
    }
}*/

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://starhivehydra.ddns.net/ladderback";
export default API_BASE_URL;

