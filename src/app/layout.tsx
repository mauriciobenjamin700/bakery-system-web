import "./globals.css";

export const metadata = {
  title: "Login - Jasson Chef",
  description: "Tela de login da padaria",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
