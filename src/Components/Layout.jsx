import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet } from "react-router"

export default function Layout({ onReset, onSearch }) {

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar onReset={onReset} onSearch={onSearch}/>
            <main style={{ flex: 1}}>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}