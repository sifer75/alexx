import { Button } from "@/components/ui/button";
import Header from "../components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header></Header>
      <h1>Home</h1>
      <Link href="/workspaces">
        <Button>aller vers le workspace</Button>
      </Link>
    </>
  );
}
