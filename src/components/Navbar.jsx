import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { FaSearch, FaPowerOff } from 'react-icons/fa'
import { signOut } from 'firebase/auth'
import { firebaseAuth } from '../utils/firebase-config'
import logo from '../assets/logo.png'
import linksData from '../fixtures/navbar.json'

const Navbar = ({ isScroll }) => {
    const [isShowSearch, setIsShowSearch] = useState(false)
    const [inputHover, setInputHover] = useState(false)

    const navigate = useNavigate()
    const handleSignOut = async () => {
        await signOut(firebaseAuth)
        localStorage.clear()
        navigate('/login')
    }


    return (
        <Container>
            <nav className={`flex a-center j-between ${isScroll ? 'scroll' : ''}`}>
                <div className="left flex a-center">
                    <Link to={'/home'}>
                    <div className="brand flex a-center j-center">
                        <img src={logo} alt="netflix vn" />
                    </div>
                    </Link>
                    <ul className="links flex">
                        { linksData.map(({ name, link }) => (
                            <Link to={link} key={name}>
                                <li >
                                    {name}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
                <div className="right flex a-center">
                    <div className={`search flex a-center ${isShowSearch ? 'show' : ''}`}>
                        <button onClick={() => {setIsShowSearch(true)}}
                            onBlur={() => {
                                if(!inputHover) setIsShowSearch(false)
                            }}
                        >
                            <FaSearch/>
                        </button>
                        <input type="text" placeholder='Nhập tên phim, thể loại,...' 
                            onMouseEnter={() => setInputHover(true)}
                            onMouseLeave={() => setInputHover(false)}
                            onBlur={() => {
                                setIsShowSearch(false)
                                setInputHover(false)
                                        }}
                        />
                    </div>
                    <button onClick={handleSignOut}>
                        <FaPowerOff/>
                    </button>
                </div>
            </nav>
        </Container>
    )
}

export default Navbar

const Container = styled.div`
    nav.scroll {
        background-color: rgba(0, 0, 0, 0.4);
    }
    nav {
        position: fixed;
        z-index: 10;
        top: 0;
        left: 0;
        right: 0;
        height: 6.5rem;
        padding: 0 4rem;
        .left {
            gap: 2rem;
            .brand {
                img {
                    height: 4rem;
                }
            }
            .links {
                gap: 2rem;
                margin: 3rem 0;
                a {
                    color: #fff;
                    li {
                        padding: 12px 14px;
                        border-radius: 6px;
                        font-size: 20px;
                    } 
                    li:hover {
                        background-color: rgba(0, 0, 0, 0.6)
                    }
                }
            }
        }
        .right {
            gap: 2rem;
            .search {
                gap: .5rem;
                input {
                    width: 0;
                    opacity: 0;
                    visibility: hidden;
                    background: #333;
                    color: #999;
                    font-size: 16px;
                    transition: 0.3s ease-in-out;
                }
                input::placeholder {
                    font-size: 14px;
                }
                button {
                    svg {
                        color: #fff;
                        font-size: 1.2rem;
                    }
                }
                button:hover>svg {
                    color: #f34242;
                }
            }
            button {
                background-color: transparent;
                svg {
                    color: #f34242;
                    font-size: 1.2rem;
                }
            }
            button:hover>svg {
                color: #fff;
            }
            .show {
                input {
                    opacity: 1;
                    visibility: visible;
                    padding: 10px 12px;
                    width: 480px;
                }
            }
        }
    }
`