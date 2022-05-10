import {useReducer} from 'react'
import Table from './components/table'
import reducer from './reducers/axiosReducer'

import dataStateContext from './context/dataContext'

const initialState = {
	data: [],
	isLoading:true,
	error:""
}
function App(){
	const [state,dispatch] = useReducer(reducer,initialState)
	return(
		<div className="App">
			<dataStateContext.Provider value={{state ,dispatch}}>
				<Table/>
				<div style={{height:"30px",backgroundColor:"blue",width:"100%",
				width:"95%",marginLeft:"25px"}}>
				</div>
			</dataStateContext.Provider>
		</div>
		)
}


export default App
