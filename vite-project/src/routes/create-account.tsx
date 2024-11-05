import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useState } from "react"
import styled from "styled-components"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    padding: 50px 0px;
`

const Title = styled.h1`
    font-size: 42px;
    color: white;
`

const Form = styled.form`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`

const Input = styled.input`
    padding: 10px 20px;
    border-radius: 50px;
    border: none;
    width: 100%;
    font-size: 16px;
    &[type="submit"] {
        cursor: pointer;
        &:hover {
            opacity: 0.8;
        }
    }
`

const Error = styled.span`
    font-weight: 600;
    color: tomato;
`

export default function CreateAccount() {
    const navigate = useNavigate() // redirect
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {target: {name, value}} = e
        if (name === "name") {
            setName(value)
        } else if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        }
    }
    // firebase로 데이터 전송
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isLoading || !name || !email || !password) {
            alert('필수 데이터가 비어있습니다. \n제대로 입력하세요.')
            return
        }
        try {
            setIsLoading(true)
            console.log(name, email, password)
            /*
            계정생성
            계정이 생성되면 자동으로 로그인 처리를 한다.
            */
            const creadentials = await createUserWithEmailAndPassword(auth, email, password) // 생성결과 자격증명 리턴
            // 계정이 생성되면 이름 업데이트
            console.log(creadentials.user)
            await updateProfile(creadentials.user, {
                displayName: name
            })
            navigate("/") // 홈으로 이동
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }
    }
    return <Wrapper>
        <Title>Join Twitter</Title>
        <Form onSubmit={onSubmit}>
            <Input name="name" value={name} placeholder="name" type="text" required onChange={onChange}/>
            <Input name="email" value={email} placeholder="email" type="email" required onChange={onChange}/>
            <Input name="password" value={password} placeholder="password" type="password" required onChange={onChange}/>
            <Input type="submit" value="계정 생성"/>
        </Form>
        {error ? <Error>{error}</Error> : null}
    </Wrapper>
}