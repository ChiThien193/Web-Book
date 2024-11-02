import LoginRedirectButton from "@/app/components/LoginRedirectButton";
import Link from "next/link";


export default function Home() {
  return <main>
    <ul>
      <li>
        <Link href={'/login'}>
          Login
        </Link>
      </li>
      <li>
      <Link href={'/register'}>
          Register
        </Link>
      </li>
    </ul>
    <LoginRedirectButton/>
  </main>
}
