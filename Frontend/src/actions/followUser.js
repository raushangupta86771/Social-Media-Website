import * as UserApi from "../api/UserRequest.js";


export const followUser=(id,data)=>async(dispatch)=>{
    dispatch({ type: "FOLLOW_USER" })
    UserApi.followUser(id,data);
}