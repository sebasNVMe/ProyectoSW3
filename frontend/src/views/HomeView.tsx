import Header from "../components/Header";

export default function HomeView() {
    return (

        <>
            <Header />
            <main className="bg-custom-blue py-10 min-h-screen bg-no-repeat bg-right-top lg:bg-home lg:bg-home-xl">
                <div className=" max-w-5xl mx-auto mt-10">
                    <div className="lg:w-1/2 px-10 lg:p-0 space-y-6">
                        <h1 className="text-6xl font-bold text-white font-sans">
                            Tus salud en manos expertas, a un click de distancia
                        </h1>
                        <p className="text-xl text-white font-sans">Unete a la comunidad de piedrazul. Regístrate hoy para gestionar tus citas de forma rápida, autónoma y segura</p>
                    </div>
                </div>
            </main >
        </>
    )
}