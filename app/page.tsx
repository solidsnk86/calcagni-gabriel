import { Footer } from "@/components/Footer";
import { GetLocation } from "@/components/GetLocation";
import Header from "@/components/Header";
import Main from "@/components/Main";
import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  const ip = await GetLocation.ip();
  const city = await GetLocation.city();
  const country = await GetLocation.country();
  const flag = await GetLocation.flag();
  const latitude = await GetLocation.latitude();
  const longitude = await GetLocation.longitude();

  const supabse = createClient();

  const dataLocation = {
    ip: ip,
    city: city,
    country: country,
    flag: flag,
  };

  const sendDataLocation = async () => {
    const { data, error } = await supabse
      .from("profile_visits")
      .insert(dataLocation)
      .select("id")
      .order("id", { ascending: false })
      .limit(1);

    if (error) {
      console.error("Data cannot send properly.", error);
    }
    return data;
  };

  const data: any = await sendDataLocation();

  return (
    <main className="w-full">
      <section className="flex flex-col flex-1 max-w-4xl justify-center mx-auto px-3 md:pt-0 pt-12">
        <div className="px-3 py-3">
          <Header visits={data[0]?.id} />
          <Main
            city={city}
            country={country}
            flag={flag}
            latitude={latitude}
            longitude={longitude}
          />
        </div>
      </section>
      <Footer />
    </main>
  );
}
