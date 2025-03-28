import {getServerSession} from "next-auth";
import {authOptions} from "../../lib/auth";
import {redirect} from "next/navigation";

export default function Dashboard() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/login")
    }

    return (
        <div className="p-4">
            <h1>Bienvenue {session.user?.name || session.user?.email}</h1>
        </div>
    )
}