import * as UserApi from "../api/UserRequest.js";


export const unfollowUser=(id,data)=>async(dispatch)=>{
    dispatch({ type: "UNFOLLOW_USER" })
    UserApi.unfollowUser(id,data);
}