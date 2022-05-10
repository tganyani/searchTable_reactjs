const SUCCESS = "SUCCESS"
const ERROR = "ERROR"

const reducer = (state,action)=>{
	switch(action.type){
		case SUCCESS:
			return {
				isLoading:false,
				data:action.payload
			}
		case ERROR:
			return {
				data:[],
				error:"Error occurred while fetching data"
			}
		default:
			return state
	}
}

export default reducer