export default async function getTodos() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);

  if (!res) {
    throw new Error("Failed to fetch todos");
  }
  return res.json();
}
