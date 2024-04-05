import { Form, Button, Input, Table, Modal } from 'antd'
import { ApiService } from '../../services/api.service'
import { useEffect, useState } from 'react'

const apiService = new ApiService()

const boquet_columns = [
	{
		title: 'Артикул',
		dataIndex: 'arc',
		key: 'arc'
	},
	{
		title: 'Название',
		dataIndex: 'name_',
		key: 'name_'
	},
	/*
	{
		title: 'Состав',
        dataIndex: 'arc',
        key: 'arc_composition'
	},*/
	{
		title: 'Упаковка',
		dataIndex: 'wrapper_',
		key: 'wrapper_'
	},
	{
			title: 'Изображение',
			dataIndex: 'img',
			key: 'img'
	}
]
const dataSource = [
	{
	  key: '1',
	  name: 'Mike',
	  age: 32,
	  address: '10 Downing Street',
	},
	{
	  key: '2',
	  name: 'John',
	  age: 42,
	  address: '10 Downing Street',
	},
  ];

function BoquetExample() {
	const [boquets, setBoquets] = useState([])

	const [modalVisible, setModalVisible] = useState(false)
	const [boquetRecord, setBoquetRecord] = useState({})

	function showItem(recId) {
		recId
			? apiService.get('/boquet/' + recId).then(res => {//promise - then catch
					setBoquetRecord(res)
					setModalVisible(true)
			  })
			: setModalVisible(true)
	}

	function saveItem() {
		apiService.post('/boquet', boquetRecord).then(() => {
			close()
			fetchData()
		})
	}

	function removeItem(recId) {
		apiService.delete('/boquet/' + recId).then(() => {
			close()
			fetchData()
		})
	}

	function close() {
		setBoquetRecord({})
		setModalVisible(false)
	}

	function fetchData() {
		apiService.get('/boquet').then(res => {
			//console.log(res)
			
			for ( let i in res){
				res[i].wrapper_ = apiService.get('/wrapper/'+res[i].wrapper_);
				console.log(res[i].wrapper_);
			}
			setBoquets(res)
		})
	}
	const [wrapper,setWrapper] = useState({})
	function fetchDataWrapper() {
		apiService.get('/wrapper/'+1).then(res => {
			setWrapper(res)
		})
	}
	useEffect(() => {
		fetchData()
		fetchDataWrapper()
	}, [])
	console.log(boquets) 
	console.log(wrapper) 
	return (
		<>
			<Button type='primary' onClick={() => showItem()}>
				Добавить
			</Button>
			<Table
				pagination={{ position: ['topRight'] }}
				dataSource={boquets}
				columns={boquet_columns}
				onRow={rec => {//поведение для строчки
					return {
						onClick: () => showItem(rec.arc)
					}
				}}
			></Table>

		</>
	)
}
			/*<Modal
				title={boquetRecord.arc ? 'Изменение сущности с arc=' + boquetRecord.arc : 'Добавление новой сущности'}
				open={modalVisible}
				okText='Сохранить'
				cancelText='Отмена'
				onCancel={() => close()}
				centered
				footer={[
					<Button type='primary' onClick={() => saveItem()} disabled={!boquetRecord.name_ || !boquetRecord.wrapper_}>
						Сохранить
					</Button>,
					boquetRecord.arc ? (
						<Button danger onClick={() => removeItem(boquetRecord.arc)}>
							Удалить
						</Button>
					) : null,
					<Button onClick={() => close()}>Отмена</Button>
				]}
			>
				<Form labelAlign='left' labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
					<Form.Item label='Название'>
						<Input
							onChange={v =>
								setBoquetRecord(prevState => {
									return { ...prevState, name_: v.target.value }//... - operator spret - ...
								})
							}
							value={boquetRecord.name_}
						/>
					</Form.Item>
					<Form.Item label='Описание'>
						<Input
							onChange={v =>
								setBoquetRecord(prevState => {
									return { ...prevState, description: v.target.value }
								})
							}
							value={boquetRecord.description}
						/>
					</Form.Item>
				</Form>
			</Modal>*/
export default BoquetExample;
