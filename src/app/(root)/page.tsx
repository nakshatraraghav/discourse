import { Greet } from "@/components/greet";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";

export default function Home() {
  return (
    <div>
      <div>hello, world</div>
      <ThemeSwitcher />
      <Greet />
    </div>
  );
}
