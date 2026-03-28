import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <main className="flex-1 flex flex-col relative w-full">{children}</main>
            <Footer />
        </>
    );
}
