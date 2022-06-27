import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../utils/firebase-config'
import { BackgroundImg, Header } from '../components'

const LogIn = () => {
    const [formData, setFormData] = useState({ email: '', password: ''})
    const navigate = useNavigate()

    const handleLogIn = async () => {
        try {
            const { email, password } = formData
            if( email && password)
            await signInWithEmailAndPassword(firebaseAuth, email, password)
            console.log(email, password);
        } catch (error) {
            console.log(error);
        }
    }

    onAuthStateChanged(firebaseAuth, (currUser) => {
        if(currUser) {
            const { providerData, ...data } = currUser
            localStorage.setItem('user',  JSON.stringify(data))
            navigate('/home')
        }
    })


    return (
        <Container>
            <BackgroundImg/>
            <div className="content">
                <Header isShowButton={false}/>
                <div className="body flex column a-center j-center">
                        <div className="text flex column">
                            <h1>Đăng nhập</h1>
                            <form className="form flex column" onSubmit={(e) => e.preventDefault()}>
                                <input type="email" required
                                    placeholder='Địa chỉ Email' name='email'
                                    value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value})}/>
                                <input type="password" required
                                    placeholder='Mật khẩu mới' name='password'
                                    value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value})}/> 
                                
                                <button onClick={handleLogIn}>Đăng nhập</button> 
                            </form>
                            <div className='remember flex a-center j-between'>
                                <div className='flex a-center'>
                                    <input type="checkbox" value="lsRememberMe" id="rememberMe"/>
                                    <label htmlFor="rememberMe">Remember me</label>
                                </div>
                                <a href="##">Bạn cần trợ giúp?</a>
                            </div>
                        </div>
                        <div className='support'>
                            <div>
                                Bạn mới tham gia Netflix? <Link to={'/'}>Đăng ký ngay</Link>.
                            </div>
                            <p>Trang này được Google reCAPTCHA bảo vệ để đảm bảo bạn không phải là robot. <button>Tìm hiểu thêm.</button></p>
                        </div>
                    </div>
            </div>
        </Container>
    )
}

export default LogIn

const Container = styled.div`
    position: relative;
    .content {
        position: absolute;
        padding: 0 6rem;
        left: 50%;
        top: 50%;
        width: 100%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, .4);
        display: grid;
        grid-template-rows: 15vh 85vh;
        .body {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 460px;
            transform: translate(-50%, -50%);
            padding: 60px 68px 40px;
            background-color: rgba(0, 0, 0, .7);
            border-radius: 6px;
            .text {
                gap: 1rem;
                width: 90%;
                height: 400px;
                h1 {
                    text-align: left;
                    font-size: 2rem;
                    font-weight: 600;
                    margin-bottom: 30px;
                }
                .form {
                    width: 100%;
                    input {
                        width: inherit;
                        padding: 16px 20px;
                        border-radius: 4px;
                        background: #333;
                        margin-bottom: 12px;
                        color: #fff;
                        &:focus: {
                            border: 1px solid blue;
                        }
                    }
                    button {
                        background-color: #e50914;
                        color: #fff;
                        font-weight: bold;
                        padding: 16px 2em;
                        font-size: 1rem;
                        margin-top: 30px;
                    }
                }
                .remember {
                    font-weight: 100;
                    font-size: 12px;
                    color: #b3b3b3;
                    a {
                        color: #b3b3b3;
                        cursor: pointer; 
                        
                    }
                    a:hover {
                        text-decoration: underline;
                    }
                }
            }
            .support {
                padding: 0 12px;
                margin-bottom: 40px;
                div {
                    color: #b3b3b3;
                    margin-bottom: 20px;
                    a {
                        color: #fff;
                    }
                    a:hover {
                        text-decoration: underline;
                    }
                }
                p {
                    font-size: 12px;
                    color: #b3b3b3;
                    button {
                        font-size: 12px;
                        background: transparent;
                        color: #0071eb;
                    }
                    button:hover {
                        text-decoration: underline;
                    }
                } 
            }
        }
    }
`