import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({children}: {
    children: React.ReactNode
}) {
    /**
     * 로그인 상태인 경우 유저 정보 리턴
     */
    const user = auth.currentUser
    console.log(user)
    if (!user) { // 유저 정보가 없으면 login 화면으로
        return <Navigate to="/login" />
    }
    return children // 유저 정보가 있으면 children 리턴
}