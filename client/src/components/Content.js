import { Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import SandBox from './pages/Sandbox'
import CrudExample from './pages/CrudExamples'
import BoquetExample from './pages/BoquetExamples'
import FlowerWrapperExample from './pages/FlowerWrapperExamples'
function Content(props) {
	return (
		<>
			<div className='content-wrapper'>
				<div className='content'>
        			<Routes>
						<Route path='/' element={<Main />} />
						<Route path='/sandbox' element={<SandBox />} />
						<Route path='/crud-example' element={<CrudExample currentUserInfo={props.currentUserInfo}/>} />
						<Route path='/boquet-example' element={<BoquetExample/>} />
						<Route path='/flower-wrapper' element={<FlowerWrapperExample/>} />
					</Routes>
				</div>
			</div>
		</>
	)
}

export default Content
