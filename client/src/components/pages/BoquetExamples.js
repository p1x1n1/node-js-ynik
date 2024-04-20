import { Form, Button, Input, Table, Modal, Select } from 'antd'
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
	{
		title: 'Состав',
		dataIndex: 'boquet_composition',
		key: 'boquet_composition',
		render: (boquet_composition, record) => (
		  <Table
			dataSource={boquet_composition}
			columns={[
			  {
				title: 'Название цветка',
				dataIndex: 'flowers_name',
				key: 'flowers_name'
			  },
			  {
				title: 'Количество',
				dataIndex: 'count_',
				key: 'count_'
			  }
			]}
			/*onRow={rec => {//поведение для строчки
				return {
					onClick: () => showBoquetItem(rec.arc_boquets,rec.id_type_flowers)
				}
			}}*/
		  />
		)
	  },
	{
		title: 'Упаковка',
		dataIndex: 'wrapper_name',
		key: 'wrapper_name'
	},
	{
			title: 'Изображение',
			dataIndex: 'img',
			key: 'img'
	}
]


function BoquetExample() {
	const [boquets, setBoquets] = useState([])
	const [wrapper,setWrapper] = useState([])
	const [flower,setFlower] = useState([])
	//const [boquets_compositions, setBoquetsCompositions] = useState([])
	const [arc_composition,setComposition] = useState([]);

	function fetchDataWrapper() {
		apiService.get('/wrapper').then(res => {
			setWrapper(res);
			//fetchData();
		})
		console.log('wrapper',wrapper)
	}
	function fetchDataFlower() {
		apiService.get('/flower').then(res => {
			setFlower(res)
		})
		console.log('flower',flower)
	}
	function find(mass,id){
		for (let i = 0; i < mass.length; i++) {
            if (mass[i].id_type === id) {
                return i;
            }
        }
	}
	function fetchData() {
		apiService.get('/flower').then(res => {
			setFlower(res)
		})
		console.log('flower',flower)
	apiService.get('/wrapper').then(res1 => {
		setWrapper(res1);
		console.log('wrapper',wrapper)
	}).then(res1=>
	{apiService.get('/boquet').then(res => {
			// Добавляем информацию о обертках к букетам
			const updatedBoquets = res.map(boquet => {
				apiService.get('/boquetcomposition/'+boquet.arc).then(res => {
					setComposition(res)
				})
				const wrapperId = boquet.wrapper_;
				const wrapperName = wrapper[find(wrapper,wrapperId)].name_type || 'Unknown Wrapper'; // Защита от случая, если wrapper еще не загружен
				console.log('arc_composition',arc_composition)
				const boquetComposition = arc_composition.map(composition =>{
					const flowers = flower[find(flower,composition.id_type_flowers)];
					return{
						...composition,
						flowers_name: flowers.name_type,
						flowers_img: flowers.img,
					}
					}
				)
				 || 'Unknown Composition';
				console.log('boquetComposition',boquetComposition);
				return {
					...boquet,
					wrapper_name: wrapperName,
					boquet_composition: boquetComposition
				};
			});
			setBoquets(updatedBoquets);
			console.log(updatedBoquets);
		});
		console.log('boquets',boquets);}
	)
	}
	useEffect(() => {
		//const timer = setTimeout(() => {
		//if(wrapper.length > 0 && flower.length > 0)
		fetchData();
		//console.log('boquets',boquets);
		//}, 5000);
		
	}, [])
	const [modalVisible, setModalVisible] = useState(false)
	const [boquetRecord, setBoquetRecord] = useState({})
	const [boquetCompositionRecord, setBoquetCompositionRecord] = useState({})
	function showItem(recId) {
		recId
			? apiService.get('/boquet/' + recId).then(res => {//promise - then catch
					setBoquetRecord(res)
					apiService.get('/boquetcomposition/' + recId).then(res => {
						setComposition(res)
					});
					setModalVisible(true)
			  })
			: setModalVisible(true)
	}
	function showBoquetItem(recId,recIdFlower) {
		recId
			? apiService.get('/boquetcomposition/' + recId+'/'+recIdFlower).then(res => {//promise - then catch
					setBoquetCompositionRecord(res)
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
			<Modal
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
				]
			}
			>
				{console.log('boquetRec',boquetRecord)}
				{console.log('boquetComposition',boquetCompositionRecord)}
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
					<Form.Item label='Упаковка'>
						<Select 
						onChange={v =>
							setBoquetRecord(prevState => {
								return { ...prevState, wrapper_: v}
							})
						}
						value={boquetRecord.wrapper_}>
							{wrapper.map(wrapper => (
                                <Select.Option key={wrapper.id_type} value={wrapper.id_type}>
                                    {wrapper.name_type}
                                </Select.Option>
                            ))}
                        </Select>
					</Form.Item>
					{boquetRecord.arc ?  
					<Form.Item label='Состав'>
						{arc_composition.map(composition=>(
							<>
								<Select 
								    onChange={v =>{
										composition.id_type_flowers = v;
										setBoquetCompositionRecord(composition)
	                                   /* setComposition(prevState => {
											{console.log(v)};
	                                        return { ...prevState, id_type_flowers: v}
	                                    })*/
										console.log('arc_composition',arc_composition)
										//console.log('arc_composition',arc_composition)
									}
	                                }
									value={composition.id_type_flowers}>
									{flower.map(fw => (
										<Select.Option key={fw.id_type} value={fw.id_type}>
											{fw.name_type}
										</Select.Option>
									))}

								</Select>
							</>
						))}
					</Form.Item>
					:<></>
					}
				</Form>
			</Modal>
		</>
	)
}
export default BoquetExample;
/**
 * //{console.log('boquetRecord',boquetRecord)}
 * 						onChange={v =>
							setBoquetRecord(prevState => {
								return { ...prevState, wrapper_: v}//значение из key
							})
						}
						onChange={v =>
							setBoquetRecord(prevState => {
								return { ...prevState, wrapper_: v.target.value}//знаачение введеное выбранное в select
							})
						}
 */