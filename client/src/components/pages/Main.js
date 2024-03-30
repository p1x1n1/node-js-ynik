import logo from "../../base_img/logo.jpg";
function Main() {
	return (
		<>
			<div className='main-page'>
				<img src={logo} alt='logo'/>
				<div className='self-info-wrapper'>
					<h2>Это веб-приложение на тему о котиках разработано</h2>
					<h1>Базиной Анастасией</h1>
					<h5>студент 3 курса направления МОАИС</h5>
				</div>
			</div>
		</>
	)
}

export default Main
