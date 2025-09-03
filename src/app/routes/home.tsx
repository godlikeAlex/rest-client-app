import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Rest client" },
    { name: "description", content: "Welcome to rest client!" },
  ];
}

export default function Home() {
  return (
    <main>
      <h1>Home Page</h1>
    </main>
  );
}
