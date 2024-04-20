import { Button, Form, Input } from 'antd'
import { useState } from 'react'
import { AuthService } from './services/auth.service';

const validateMessages = {
	required: 'Обязательное поле!'//при правиле валидации requered
}
const authService = new AuthService();
function LoginForm(props) {
	const [isLogin, setIsLogin] = useState(true)
	const [authErrorMessage, setAuthErrorMessage] = useState('')
	const [form] = Form.useForm()//посмотреть справочную инфу из antd

	async function auth() {
		form
			.validateFields()
			.then(async () => {
				if (form.getFieldsValue().passwordRepeat) {
					const res = await authService.register(form.getFieldsValue())
					if (res.success) {
						props.setCurrentUserInfo(res.userInfo)
						props.setIsLoggedIn()
					} else {
						setAuthErrorMessage('Такой логин уже есть!')
					}
				} else {
					const res = await authService.login(form.getFieldsValue())
					if (res.success) {
						props.setCurrentUserInfo(res.userInfo)
						props.setIsLoggedIn()
					} else {
						setAuthErrorMessage('Не верные логин или пароль!')
					}
				}
			})
			.catch(err => {
				console.log('error', err)
			})
	}
	
	function changeAuthType() {
		setAuthErrorMessage('')
		setIsLogin(!isLogin)
		form.resetFields()
	}

	async function repeatPasswordFieldValidation(formRecord) {//кастомная валидация
		const passwordField = formRecord.getFieldValue('password')//получение значений из формы
		const passwordRepeatField = formRecord.getFieldValue('passwordRepeat')//проверка авторизация или регистрация
		if (passwordRepeatField && passwordField !== passwordRepeatField) {
			throw Error('Пароли не совпадают!')
		}
	}
	function checkPasswordStrength(rule, value) {
		if (value && value.length >= 6 && value.match(/[a-zA-Z]/)) {
		  return Promise.resolve();
		}
		return Promise.reject('Пароль должен состоять минимум из 6 символов и содержать хотя бы 1 букву!');
	  }
	return (
		<div className='login-page-img'>
			<div className='login-page'>
				<div className='login-form-wrapper'>
					<h1>{isLogin ? 'Авторизация' : 'Регистрация'}</h1>
					<Form
						labelAlign='left'
						labelCol={{ span: 7 }}
						wrapperCol={{ span: 18 }}
						form={form}//здесь мы закрепляем форму
						validateMessages={validateMessages}//здесь закрепляется
                        //а если что-то disabled
					>
						<Form.Item
							label='Логин'
							name='login'
							rules={[
								{
									required: true
								}
							]}
						>
							<Input allowClear />
						</Form.Item>
						<Form.Item
							label='Пароль'
							name='password'
							rules={[
								{
									required: true,
									validator: checkPasswordStrength
								}
							]}
						>
							<Input.Password allowClear />
						</Form.Item>
						{!isLogin ? (
							<Form.Item
								label='Повтор'
								name='passwordRepeat'
								rules={[//отвечает за валидацию полей 
									{
										required: true//обязательное поле
									},
									form => ({
										validator() {
											return repeatPasswordFieldValidation(form)
										}
									})
								]}
							>
								<Input.Password allowClear />
							</Form.Item>
						) : (
							<></>
						)}
					</Form>
					{authErrorMessage ? <div className='auth-error-message'>{authErrorMessage}</div> : <></>}
					<Button type='primary' onClick={auth} style={{ width: 200 }}>
						{isLogin ? 'Войти' : 'Зарегистрироваться'}
					</Button>
					<p>
						{isLogin ? 'Еще не зарегистрированы?🤨' : 'Если есть аккаунт, можете в него войти🤓👉'}
						<Button type='link' onClick={changeAuthType}>
							{isLogin ? 'Зарегистрироваться' : 'Авторизоваться'}
						</Button>
					</p>
				</div>
			</div>
		</div>
	)
}

export default LoginForm
