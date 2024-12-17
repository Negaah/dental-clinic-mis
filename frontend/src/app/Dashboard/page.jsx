import AuthGuard from '@/components/authGuard';
const Dashboard = () => {
    return (
        <AuthGuard>
            <main className="col-span-7 bg-white">
                <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
                    <h1>Dashbord</h1>
                </div>
            </main>
        </AuthGuard>
    );
}

export default Dashboard;