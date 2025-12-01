import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background pt-16 md:pt-24 lg:pt-32 pb-16">
          <div className="container px-4 md:px-6 max-w-screen-2xl">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  Vos fichiers Excel,{" "}
                  <span className="text-primary">prêts à l'emploi</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Gagnez du temps avec nos modèles professionnels. Budgets,
                  plannings, facturation : téléchargez et utilisez
                  immédiatement.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 min-w-[200px]">
                <Link href="/catalogue">
                  <Button size="lg" className="w-full sm:w-auto gap-2">
                    Voir le catalogue <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    En savoir plus
                  </Button>
                </Link>
              </div>

              {/* Trust badges / Features */}
              <div className="pt-8 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Téléchargement immédiat</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Paiement sécurisé</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Support inclus</span>
                </div>
              </div>
            </div>
          </div>

          {/* Abstract Background Element */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[1000px] h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
        </section>

        {/* Featured Categories (Placeholder) */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 max-w-screen-2xl">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Catégories populaires
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "Finance",
                "Gestion de projet",
                "Ressources Humaines",
                "Marketing",
              ].map((cat) => (
                <div
                  key={cat}
                  className="group relative overflow-hidden rounded-xl bg-card border p-6 hover:shadow-lg transition-all cursor-pointer"
                >
                  <h3 className="font-semibold text-lg mb-2">{cat}</h3>
                  <p className="text-sm text-muted-foreground">
                    Découvrir les modèles
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
