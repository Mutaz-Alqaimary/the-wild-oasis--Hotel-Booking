import { auth } from "@/app/_lib/auth";
import NavigationMenu from "@/app/_components/NavigationMenu";

export default async function Navigation() {
  const session = await auth();

  return (
    <NavigationMenu
      userImage={session?.user?.image ?? null}
      userName={session?.user?.name ?? null}
    />
  );
}
