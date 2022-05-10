import {useEffect,useContext,useState} from 'react'
import axios from 'axios' 

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

import dataStateContext from '../context/dataContext'
import  '../styles/Table.scss'
const baseUrl = 'http://localhost:4000'




function Table(){
	const {state,dispatch} = useContext(dataStateContext)
	const [searchTerm,setSearchTerm] = useState("")
	const [searchMode,setSearchMode] = useState("")
	const [id,setId] = useState("")
	const [idToDelete,setIdToDelete] = useState("")
	const [isInEditMode,setIsInEditMode] = useState(false)
	const [page, setPage] =useState(1)
	const [postData,setPostData] = useState({
		name:"",
		quantity:"",
		distance:""
	})
	const [editData,setEditData] = useState({
		name:"",
		quantity:"",
		distance:""
	})
	
	useEffect(()=>{
		axios.get(`${baseUrl}/tables?searchMode=${searchMode}&searchTerm=${searchTerm}&page=${page}`)
		.then(res=>{
			dispatch({type:"SUCCESS",payload:res.data})
		})
		.catch(err=>{
			dispatch({type:"ERROR"})
		})
	
	}
	,  [searchTerm,searchMode,idToDelete,page])

	useEffect(()=>{
		axios.delete(`${baseUrl}/deletetable?${idToDelete}`)
		.then((res)=>{
			console.log(res.data)
		}).catch(err=>{
			console.log(err)
		})
	},[idToDelete])
	
	const handleSubmit = (e)=>{
		e.preventDefault()
		axios.post(`${baseUrl}/newtable`,postData)
		.then(res=>{
			console.log(res.data)
		}).catch(err=>{
			console.log('error occurred while posting data')
		})
	}

	const handleEditSubmit = (e)=>{
		e.preventDefault()
		axios.patch(`${baseUrl}/update`,editData)
		.then(res=>{
			console.log(res.data)
			setIsInEditMode(false)
		}).catch(err=>{
			console.log('error occurred while posting data')
		})
	}

	const handleClick = (e)=>{
		setId(e.currentTarget.id)
		let itemToEdit = state.data.filter(item=>Number(item.id)===Number(id))
		if(itemToEdit.length > 0){
			setEditData({...itemToEdit[0]})
			setIsInEditMode(true)
		}
	}
	const handleNext =()=>{
		if(page<=Math.floor((state.data.length)/8)+1){
			setPage(page+1)
		}else{
			setPage(1)
		}
	}
	const handlePrev = ()=>{
		if(page>=2){
			setPage(page-1)
		}else{
			setPage(1)
		}
	}
	return(
		<div  id="tb">
		
			<div className="col-1">
				<div className="select">
					<select name="search" id="search"  onChange = {e=>setSearchMode(e.target.value)} >
					    <option value="INCLUDES" > содержит</option>
					    <option value="EQUAL" >равно</option>
					    <option value="GREATER" >больше</option>
					    <option value="LESSER" >меньше</option>
					 </select>
					<input type="text" placeholder="search" value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} />
					<SearchIcon/>
				</div>
				<div>
					{
						!isInEditMode?(
						<form onSubmit={(e)=>handleSubmit(e)}>
							<label>name</label>
							<input type="text" value={postData.name} onChange={(e)=>setPostData({...postData,name:e.target.value})}/>
							<label>quantity</label>
							<input type="number" value={postData.quantity} onChange={(e)=>setPostData({...postData,quantity:e.target.value})}/>
							<label>distance</label>
							<input type="number" value={postData.distance} onChange={(e)=>setPostData({...postData,distance:e.target.value})}/>
							<button type="submit">Submit</button>
						</form>)
						:(
						<div>
							<form onSubmit={e=>handleEditSubmit(e)}>
								<label>name</label>
								<input type="text" value = {editData.name} onChange={(e)=>setEditData({...editData,name:e.target.value})}/>
								<label>quantity</label>
								<input type="number" value = {editData.quantity} onChange={(e)=>setEditData({...editData,quantity:e.target.value})}/>
								<label>distance</label>
								<input type="number" value={editData.distance} onChange={(e)=>setEditData({...editData,distance:e.target.value})}/>
								<button type="submit">Edit</button>
							</form>
							<button style={{width:"40%"}} onClick={()=>setIsInEditMode(!isInEditMode)}>Cancel</button>
						</div>
					)
					}
				</div>
				<div className="pagination">
					<button onClick={()=>handlePrev()}>{page}{"<<"}prev</button>
					<button onClick={()=>handleNext()}>next{">>"}{page+1}</button>
				</div>
			</div>
			<table className="col-2">
				<thead>
					<tr>
						<th>Название</th>
						<th>Количество</th>
						<th>Расстояние</th>
						<th>Дата</th>
					</tr>
				</thead>
				<tbody>
					{
					state.data.map(d=>(
					<tr key={d.id}   >
						<td>{d.name}</td>
						<td>{d.quantity}</td>
						<td>{d.distance}</td>
						<td>{d.date.split('T')[0]}</td>
						<td><EditIcon style={{color:"yellow"}} id={d.id} onClick={e=>handleClick(e)}/> <DeleteIcon style={{color:"red"}} id={d.id} onClick = {e=>setIdToDelete(e.currentTarget.id)}/></td>
					</tr>
					))
				}
				</tbody>
			</table>
			
		</div>
		)
}


export default Table