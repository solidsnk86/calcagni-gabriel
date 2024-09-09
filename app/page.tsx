import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";

export default async function Index() {
  return (
    <main className="w-full">
      <section className="flex flex-col flex-1 max-w-4xl justify-center mx-auto px-3 md:pt-0 pt-16">
        <div className="px-3 py-3">
          <Header />
          <Main />
        </div>
      </section>
      <Footer />
    </main>
  );
}
