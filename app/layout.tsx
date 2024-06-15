import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "Mestre dos Códigos",
   description: "Jogo de digitação de codigos",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="pt-br">
         <body className={`${inter.className} bg-bgFundo bg-cover`}>
            {children}
         </body>
      </html>
   );
}
