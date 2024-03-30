export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <section className="mx-auto px-6 sm:max-w-2xl md:max-w-3xl  lg:px-8">
      {children}
    </section>
  );
}
