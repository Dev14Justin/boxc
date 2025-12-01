import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container flex flex-col gap-8 py-8 md:py-12 max-w-screen-2xl px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">BoxExcel</h3>
            <p className="text-sm text-muted-foreground">
              La marketplace de référence pour vos modèles Excel professionnels.
              Gagnez du temps, soyez plus productif.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Plateforme</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/catalogue" className="hover:text-foreground">
                  Catalogue
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-foreground">
                  Vendre un modèle
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/faq" className="hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground">
                  CGV / CGU
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Légal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/legal" className="hover:text-foreground">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BoxExcel. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
