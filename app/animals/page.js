import PublicAnimalList from "../components/PublicAnimalList";

async function getData() {
  const res = await fetch("http://localhost:3000/api/animals", {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
}

const page = async () => {
  const animals = await getData();
  return (
    <main className="flex min-h-screen flex-col justify-start p-24 bg-gradient-to-br from-green-100 to-green-300">
      <PublicAnimalList animal={animals} />
    </main>
  );
};

export default page;
