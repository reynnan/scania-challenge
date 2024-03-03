import Icon from "./Icon";

export default function Footer() {
  return (
    <footer className="footer items-center p-4 bg-neutral text-neutral-content">
      <aside className="flex items-center">
        <Icon icon="hash" />
        <p>
          Project Created by Reynnan © 2024 - For a Scania Fullstack Challenge
        </p>
      </aside>
    </footer>
  );
}
