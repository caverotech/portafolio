# -*- coding: utf-8 -*-
"""Genera la tarjeta Open Graph a 1200x630 desde el retrato.

POR QUE
og:image apuntaba a Foto-2026.jpeg, que es cuadrada (1254x1254) y pesa
222 KB. Con twitter:card summary_large_image, LinkedIn y WhatsApp
recortan a 1.91:1 por el centro, y en un retrato cuadrado eso corta la
frente y la barbilla.

QUE HACE
Compone el retrato completo sobre el fondo del sitio (#0A0B0D), sin
recortar la cara: la foto se escala a la altura del lienzo y se coloca a
la derecha, con un degradado que la funde con el fondo. Queda el hueco
izquierdo que las plataformas nunca recortan.

NO modifica Foto-2026.jpeg: escribe un archivo nuevo, og-2026.jpg.
No dibuja texto: las plataformas ya muestran title y description al lado
de la imagen, y un texto quemado se vería desactualizado al cambiarlo.
"""

import os
from PIL import Image

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ORIGEN = os.path.join(RAIZ, "public", "Foto-2026.jpeg")
DESTINO = os.path.join(RAIZ, "public", "og-2026.jpg")

ANCHO, ALTO = 1200, 630
FONDO = (10, 11, 13)  # #0A0B0D, el mismo del sitio


def main():
    retrato = Image.open(ORIGEN).convert("RGB")

    lienzo = Image.new("RGB", (ANCHO, ALTO), FONDO)

    # El retrato se escala por altura y se recorta solo a lo ancho, que en
    # un cuadrado sobra: así la cara entra completa.
    escala = ALTO / retrato.height
    nuevo_ancho = int(retrato.width * escala)
    retrato = retrato.resize((nuevo_ancho, ALTO), Image.LANCZOS)

    # Ocupa poco más de la mitad derecha.
    ancho_visible = int(ANCHO * 0.52)
    if nuevo_ancho > ancho_visible:
        sobra = (nuevo_ancho - ancho_visible) // 2
        retrato = retrato.crop((sobra, 0, sobra + ancho_visible, ALTO))

    x = ANCHO - retrato.width
    lienzo.paste(retrato, (x, 0))

    # Degradado de fusión en el borde izquierdo del retrato: evita el
    # corte duro entre foto y fondo.
    ancho_fundido = 420
    fundido = Image.new("L", (ancho_fundido, ALTO))
    for i in range(ancho_fundido):
        # 255 = fondo opaco a la izquierda, 0 = foto visible a la derecha
        valor = int(255 * (1 - i / ancho_fundido) ** 1.35)
        fundido.paste(valor, (i, 0, i + 1, ALTO))
    capa = Image.new("RGB", (ancho_fundido, ALTO), FONDO)
    lienzo.paste(capa, (x, 0), fundido)

    lienzo.save(DESTINO, "JPEG", quality=84, optimize=True, progressive=True)

    peso = os.path.getsize(DESTINO) / 1024
    print(f"og-2026.jpg  {ANCHO}x{ALTO}  {peso:.0f} KB")


if __name__ == "__main__":
    main()
