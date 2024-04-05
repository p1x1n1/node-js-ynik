import { Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import SandBox from './pages/Sandbox'
import CrudExample from './pages/CrudExamples'
import BoquetExample from './pages/BoquetExamples'
function Content() {
	return (
		<>
			<div className='content-wrapper'>
				<div className='content'>
        <Routes>
						<Route path='/' element={<Main />} />
						<Route path='/sandbox' element={<SandBox />} />
						<Route path='/crud-example' element={<CrudExample/>} />
						<Route path='/boquet-example' element={<BoquetExample/>} />
					</Routes>
				</div>
			</div>
		</>
	)
}

export default Content
