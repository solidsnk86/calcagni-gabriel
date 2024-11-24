import AnimatedLayout from "@/components/AnimatedLayouts";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";
import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  const supabse = createClient();

  const {
    data: { user },
  } = await supabse.auth.getUser();

  return (
    <AnimatedLayout>
      <main className="w-full">
        <section className="flex flex-col  max-w-4xl justify-center mx-auto md:px-3 md:pt-0 pt-16">
          <div className="px-3 py-3">
            <Header />
            <Main userId={user?.id} />
          </div>
        </section>
        <Footer />
      </main>
    </AnimatedLayout>
  );
}
