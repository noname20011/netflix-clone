import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { BackgroundImg, Faqs, Header, Jumbotron } from '../components'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../utils/firebase-config'

const SignUp = () => {
    const [formData, setFormData] = useState({ email: '', password: ''})
    const [isShowPassword, setIsShowPassword] = useState(false)
    const navigate = useNavigate()

    const handleSignUp = async () => {
        try {
            const { email, password } = formData
            if( email && password)
            await createUserWithEmailAndPassword(firebaseAuth, email, password)
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
        <>
            <Container>
                <BackgroundImg/>
                <div className="content">
                    <Header isShowButton={true}/>
                    <div className="body flex column a-center j-center">
                        <div className="text flex column a-center">
                            <h1>Chương trình truyền hình, phim không giới hạn và nhiều nội dung khác.</h1>
                            <h4>Xem ở mọi nơi. Hủy bất kỳ lúc nào.</h4>
                            <h6>Bạn đã sẵn sàng xem chưa? Nhập email để tạo hoặc kích hoạt lại tư cách thành viên của bạn.</h6>
                            <form className="form flex" onSubmit={(e) => e.preventDefault()}>
                            { !isShowPassword
                            ? <input type="email" required
                                placeholder='Địa chỉ Email' name='email'
                                value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value})}/>
                            :<input type="password" required
                                placeholder='Mật khẩu mới' name='password'
                                value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value})}/> 
                            }
                            { !isShowPassword
                            ? <button onClick={() => setIsShowPassword(true)}>Bắt đầu</button>
                            : <button onClick={handleSignUp}>Đăng kí</button> 
                            }
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
            <Jumbotron/>
            <Faqs/>
        </>
    )
}

export default SignUp

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
            gap: 1rem;
            .text {
                gap: 1rem;
                h1 {
                    text-align: center;
                    font-size: 3.3rem;
                    font-weight: 600;
                    max-width: 700px;
                }
                h4 {
                    font-size: 1.8rem;
                    font-weight: 400;
                }
                h6 {
                    font-size: 1.6rem;
                    font-weight: 400;
                }
                .form {
                    width: 80%;
                    input {
                        flex: 5;
                        padding: 24px 20px;
                        border-top-right-radius: 0px;
                        border-bottom-right-radius: 0px;
                        &:focus: {
                            border: 1px solid blue;
                        }
                    }
                    button {
                        border-left: 1px solid #333;
                        border-top-left-radius: 0px;
                        border-bottom-left-radius: 0px;
                        background-color: #e50914;
                        color: #fff;
                        font-size: 1.625rem;
                        flex: 2;
                    }
                }
            }
        }
    }
`