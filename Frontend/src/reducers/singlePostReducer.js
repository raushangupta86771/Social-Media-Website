const singlePostReducer=(
    state={
        post:[]
    }, 
    action
)=>{
    switch (action.type) {
        case "RETREIVING_START":
            return{...state}
        case "RETREIVING_SUCCESS":
            localStorage.setItem("likesArray",JSON.stringify({post:[action.data, ...state.post]}));
            return{...state,post:[action.data, ...state.post]}
        case "RETREIVING_FAIL":
            return{...state}
        default:
            return state
    }
}

export default singlePostReducer