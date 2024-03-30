export default function Footer() {
  const currentYear = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
  }).format(new Date());

  return (
    <footer className="py-12 text-center text-sm">
      {" "}
      <p>Copyright © Cashwise {currentYear}. All rights reserved.</p>
    </footer>
  );
}
