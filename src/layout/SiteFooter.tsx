/**
 * Renders the persistent site footer.
 *
 * @returns The application footer.
 */
const SiteFooter = () => {
  return (
    <footer className="mx-auto flex w-full max-w-7xl flex-col gap-4 border-t border-[var(--line)] px-6 py-8 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between lg:px-10">
      <span>Barbakahn / archive</span>
      <span>Built for looking closer.</span>
    </footer>
  );
};

export default SiteFooter;
