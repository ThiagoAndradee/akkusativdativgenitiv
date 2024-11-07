"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import mascotImage from "@/public/logo.png";
import hintIcon from "@/public/hint-icon.svg";
import showHintIcon from "@/public/showhint-icon.svg";

type Sentence = {
  frase: string;
  respostas_certas: string[][];
  nominativo: string;
  caso: string;
  explicacao: string;
};

const allSentences: Sentence[] = [
  {
    frase: "Ich kenne ___ ___ (alt) Lehrer aus der Schule.",
    respostas_certas: [["den", "alten"], ["einen", "alten"]],
    nominativo: "der alte Lehrer",
    caso: "Akkusativ",
    explicacao: `"Kennen" exige o caso acusativo e "Lehrer" é masculino (der Lehrer), portanto usamos "den alten" ou "einen alten".`
  },
  {
    frase: "Das Buch ___ ___ (jung) Schülers ist interessant.",
    respostas_certas: [["des", "jungen"]],
    nominativo: "der junge Schüler",
    caso: "Genitiv",
    explicacao: `"Das Buch des jungen Schülers" está no genitivo porque estamos indicando posse e "Schüler" é masculino. Usamos "des jungen" para a declinação correta.`
  },
  {
    frase: "___ ___ (klein) Mädchen spielt draußen.",
    respostas_certas: [["Das", "kleine"], ["Ein", "kleines"]],
    nominativo: "das kleine Mädchen",
    caso: "Nominativ",
    explicacao: `"Mädchen" é neutro, e a frase está no nominativo, então usamos "das kleine" ou "ein kleines".`
  },
  {
    frase: "Ich gebe ___ ___ (nett) Frau ein schönes Geschenk.",
    respostas_certas: [["der", "netten"], ["einer", "netten"]],
    nominativo: "die nette Frau",
    caso: "Dativ",
    explicacao: `"Geben" exige dativo, e "Frau" é feminino (die Frau), então usamos "der netten" ou "einer netten".`
  },
  {
    frase: "___ ___ (neu) Auto steht auf dem Parkplatz.",
    respostas_certas: [["Das", "neue"], ["Ein", "neues"]],
    nominativo: "das neue Auto",
    caso: "Nominativ",
    explicacao: `"Auto" é neutro e a frase está no nominativo. Portanto, usamos "das neue" ou "ein neues".`
  },
  {
    frase: "Wir helfen ___ ___ (klein) Kind bei den Hausaufgaben.",
    respostas_certas: [["dem", "kleinen"], ["einem", "kleinen"]],
    nominativo: "das kleine Kind",
    caso: "Dativ",
    explicacao: `"Helfen" exige o dativo e "Kind" é neutro (das Kind), por isso usamos "dem kleinen" ou "einem kleinen".`
  },
  {
    frase: "Die Mutter ___ ___ (lieb) Jungen ist da.",
    respostas_certas: [["des", "lieben"]],
    nominativo: "der liebe Junge",
    caso: "Genitiv",
    explicacao: `"Die Mutter des lieben Jungen" está no genitivo para indicar posse, e "Junge" é masculino (der Junge). Usamos "des lieben".`
  },
  {
    frase: "___ ___ (schön) Blume steht auf dem Tisch.",
    respostas_certas: [["Die", "schöne"], ["Eine", "schöne"]],
    nominativo: "die schöne Blume",
    caso: "Nominativ",
    explicacao: `"Blume" é feminino (die Blume) e a frase está no nominativo, então usamos "die schöne" ou "eine schöne".`
  },
  {
    frase: "Er besucht ___ ___ (alt) Freunde in der Stadt.",
    respostas_certas: [["die", "alten"], ["seine", "alten"]],
    nominativo: "die alten Freunde",
    caso: "Akkusativ",
    explicacao: `"Besuchen" exige o acusativo e "Freunde" é plural. Assim, usamos "die alten" ou "seine alten".`
  },
  {
    frase: "Ich spreche mit ___ ___ (interessant) Professor über das Thema.",
    respostas_certas: [["dem", "interessanten"], ["einem", "interessanten"]],
    nominativo: "der interessante Professor",
    caso: "Dativ",
    explicacao: `"Sprechen mit" exige o dativo e "Professor" é masculino (der Professor), por isso usamos "dem interessanten" ou "einem interessanten".`
  },
  {
    frase: "___ ___ (neu) Bücher liegen auf dem Tisch.",
    respostas_certas: [["Die", "neuen"], ["Meine", "neuen"]],
    nominativo: "die neuen Bücher",
    caso: "Nominativ",
    explicacao: `"Bücher" é plural, e a frase está no nominativo, então usamos "die neuen" ou "meine neuen".`
  },
  {
    frase: "Das Haus ___ ___ (reich) Mannes ist sehr groß.",
    respostas_certas: [["des", "reichen"]],
    nominativo: "der reiche Mann",
    caso: "Genitiv",
    explicacao: `"Das Haus des reichen Mannes" está no genitivo para indicar posse e "Mann" é masculino. Usamos "des reichen".`
  },
  {
    frase: "Er schenkt ___ ___ (schön) Frau Blumen.",
    respostas_certas: [["der", "schönen"], ["einer", "schönen"]],
    nominativo: "die schöne Frau",
    caso: "Dativ",
    explicacao: `"Schenken" exige o dativo e "Frau" é feminino, então usamos "der schönen" ou "einer schönen".`
  },
  {
    frase: "___ ___ (groß) Park ist sehr schön im Frühling.",
    respostas_certas: [["Der", "große"], ["Ein", "großer"]],
    nominativo: "der große Park",
    caso: "Nominativ",
    explicacao: `"Park" é masculino (der Park) e a frase está no nominativo, então usamos "der große" ou "ein großer".`
  },
  {
    frase: "Ich habe ___ ___ (teuer) Laptop verloren.",
    respostas_certas: [["den", "teuren"], ["einen", "teuren"]],
    nominativo: "der teure Laptop",
    caso: "Akkusativ",
    explicacao: `"Haben" exige o acusativo e "Laptop" é masculino, então usamos "den teuren" ou "einen teuren".`
  },
  {
    frase: "Sie sitzt auf ___ ___ (klein) Stuhl.",
    respostas_certas: [["dem", "kleinen"], ["einem", "kleinen"]],
    nominativo: "der kleine Stuhl",
    caso: "Dativ",
    explicacao: `"Sitzen auf" com localização estática exige o dativo e "Stuhl" é masculino, por isso usamos "dem kleinen" ou "einem kleinen".`
  },
  {
    frase: "Die Farbe ___ ___ (neu) Autos ist auffällig.",
    respostas_certas: [["des", "neuen"]],
    nominativo: "das neue Auto",
    caso: "Genitiv",
    explicacao: `"Die Farbe des neuen Autos" está no genitivo para indicar posse e "Auto" é neutro, então usamos "des neuen".`
  },
  {
    frase: "Er liest ___ ___ (interessant) Buch über Geschichte.",
    respostas_certas: [["das", "interessante"], ["ein", "interessantes"]],
    nominativo: "das interessante Buch",
    caso: "Akkusativ",
    explicacao: `"Lesen" exige o acusativo e "Buch" é neutro, então usamos "das interessante" ou "ein interessantes".`
  },
  {
    frase: "___ ___ (alt) Mann arbeitet immer noch hart.",
    respostas_certas: [["Der", "alte"], ["Ein", "alter"]],
    nominativo: "der alte Mann",
    caso: "Nominativ",
    explicacao: `"Mann" é masculino e a frase está no nominativo, então usamos "der alte" ou "ein alter".`
  },
  {
    frase: "Ich kenne ___ ___ (alt) Lehrer aus der Schule.",
    respostas_certas: [["den", "alten"], ["einen", "alten"]],
    nominativo: "der alte Lehrer",
    caso: "Akkusativ",
    explicacao: `"Kennen" exige o caso acusativo e "Lehrer" é masculino (der Lehrer), portanto usamos "den alten" ou "einen alten".`
  },
  {
    frase: "Das Buch ___ ___ (jung) Schülers ist interessant.",
    respostas_certas: [["des", "jungen"]],
    nominativo: "der junge Schüler",
    caso: "Genitiv",
    explicacao: `"Das Buch des jungen Schülers" está no genitivo porque estamos indicando posse e "Schüler" é masculino. Usamos "des jungen" para a declinação correta.`
  },
  {
    frase: "___ ___ (klein) Mädchen spielt draußen.",
    respostas_certas: [["Das", "kleine"], ["Ein", "kleines"]],
    nominativo: "das kleine Mädchen",
    caso: "Nominativ",
    explicacao: `"Mädchen" é neutro, e a frase está no nominativo, então usamos "das kleine" ou "ein kleines".`
  },
  {
    frase: "Ich gebe ___ ___ (nett) Frau ein schönes Geschenk.",
    respostas_certas: [["der", "netten"], ["einer", "netten"]],
    nominativo: "die nette Frau",
    caso: "Dativ",
    explicacao: `"Geben" exige dativo, e "Frau" é feminino (die Frau), então usamos "der netten" ou "einer netten".`
  },
  {
    frase: "___ ___ (neu) Auto steht auf dem Parkplatz.",
    respostas_certas: [["Das", "neue"], ["Ein", "neues"]],
    nominativo: "das neue Auto",
    caso: "Nominativ",
    explicacao: `"Auto" é neutro e a frase está no nominativo. Portanto, usamos "das neue" ou "ein neues".`
  },
  {
    frase: "Wir helfen ___ ___ (klein) Kind bei den Hausaufgaben.",
    respostas_certas: [["dem", "kleinen"], ["einem", "kleinen"]],
    nominativo: "das kleine Kind",
    caso: "Dativ",
    explicacao: `"Helfen" exige o dativo e "Kind" é neutro (das Kind), por isso usamos "dem kleinen" ou "einem kleinen".`
  },
  {
    frase: "Die Mutter ___ ___ (lieb) Jungen ist da.",
    respostas_certas: [["des", "lieben"]],
    nominativo: "der liebe Junge",
    caso: "Genitiv",
    explicacao: `"Die Mutter des lieben Jungen" está no genitivo para indicar posse, e "Junge" é masculino (der Junge). Usamos "des lieben".`
  },
  {
    frase: "___ ___ (schön) Blume steht auf dem Tisch.",
    respostas_certas: [["Die", "schöne"], ["Eine", "schöne"]],
    nominativo: "die schöne Blume",
    caso: "Nominativ",
    explicacao: `"Blume" é feminino (die Blume) e a frase está no nominativo, então usamos "die schöne" ou "eine schöne".`
  },
  {
    frase: "Er besucht ___ ___ (alt) Freunde in der Stadt.",
    respostas_certas: [["die", "alten"], ["seine", "alten"]],
    nominativo: "die alten Freunde",
    caso: "Akkusativ",
    explicacao: `"Besuchen" exige o acusativo e "Freunde" é plural. Assim, usamos "die alten" ou "seine alten".`
  },
  {
    frase: "Ich spreche mit ___ ___ (interessant) Professor über das Thema.",
    respostas_certas: [["dem", "interessanten"], ["einem", "interessanten"]],
    nominativo: "der interessante Professor",
    caso: "Dativ",
    explicacao: `"Sprechen mit" exige o dativo e "Professor" é masculino (der Professor), por isso usamos "dem interessanten" ou "einem interessanten".`
  },
  {
    frase: "___ ___ (neu) Bücher liegen auf dem Tisch.",
    respostas_certas: [["Die", "neuen"], ["Meine", "neuen"]],
    nominativo: "die neuen Bücher",
    caso: "Nominativ",
    explicacao: `"Bücher" é plural, e a frase está no nominativo, então usamos "die neuen" ou "meine neuen".`
  },
  {
    frase: "Das Haus ___ ___ (reich) Mannes ist sehr groß.",
    respostas_certas: [["des", "reichen"]],
    nominativo: "der reiche Mann",
    caso: "Genitiv",
    explicacao: `"Das Haus des reichen Mannes" está no genitivo para indicar posse e "Mann" é masculino. Usamos "des reichen".`
  },
  {
    frase: "Er schenkt ___ ___ (schön) Frau Blumen.",
    respostas_certas: [["der", "schönen"], ["einer", "schönen"]],
    nominativo: "die schöne Frau",
    caso: "Dativ",
    explicacao: `"Schenken" exige o dativo e "Frau" é feminino, então usamos "der schönen" ou "einer schönen".`
  },
  {
    frase: "___ ___ (groß) Park ist sehr schön im Frühling.",
    respostas_certas: [["Der", "große"], ["Ein", "großer"]],
    nominativo: "der große Park",
    caso: "Nominativ",
    explicacao: `"Park" é masculino (der Park) e a frase está no nominativo, então usamos "der große" ou "ein großer".`
  },
  {
    frase: "Ich habe ___ ___ (teuer) Laptop verloren.",
    respostas_certas: [["den", "teuren"], ["einen", "teuren"]],
    nominativo: "der teure Laptop",
    caso: "Akkusativ",
    explicacao: `"Haben" exige o acusativo e "Laptop" é masculino, então usamos "den teuren" ou "einen teuren".`
  },
  {
    frase: "Sie sitzt auf ___ ___ (klein) Stuhl.",
    respostas_certas: [["dem", "kleinen"], ["einem", "kleinen"]],
    nominativo: "der kleine Stuhl",
    caso: "Dativ",
    explicacao: `"Sitzen auf" com localização estática exige o dativo e "Stuhl" é masculino, por isso usamos "dem kleinen" ou "einem kleinen".`
  },
  {
    frase: "Die Farbe ___ ___ (neu) Autos ist auffällig.",
    respostas_certas: [["des", "neuen"]],
    nominativo: "das neue Auto",
    caso: "Genitiv",
    explicacao: `"Die Farbe des neuen Autos" está no genitivo para indicar posse e "Auto" é neutro, então usamos "des neuen".`
  },
  {
    frase: "Er liest ___ ___ (interessant) Buch über Geschichte.",
    respostas_certas: [["das", "interessante"], ["ein", "interessantes"]],
    nominativo: "das interessante Buch",
    caso: "Akkusativ",
    explicacao: `"Lesen" exige o acusativo e "Buch" é neutro, então usamos "das interessante" ou "ein interessantes".`
  },
  {
    frase: "___ ___ (alt) Mann arbeitet immer noch hart.",
    respostas_certas: [["Der", "alte"], ["Ein", "alter"]],
    nominativo: "der alte Mann",
    caso: "Nominativ",
    explicacao: `"Mann" é masculino e a frase está no nominativo, então usamos "der alte" ou "ein alter".`
  },
  {
    frase: "Er gibt ___ ___ (klein) Hund zu seiner Schwester.",
    respostas_certas: [["den", "kleinen"], ["einen", "kleinen"]],
    nominativo: "der kleine Hund",
    caso: "Akkusativ",
    explicacao: `"Geben" exige o acusativo e "Hund" é masculino, então usamos "den kleinen" ou "einen kleinen".`
  },
  {
    frase: "Wir schauen ___ ___ (alt) Fotoalben von früher an.",
    respostas_certas: [["die", "alten"], ["unsere", "alten"]],
    nominativo: "die alten Fotoalben",
    caso: "Akkusativ",
    explicacao: `"Anschauen" exige o acusativo e "Fotoalben" é plural, então usamos "die alten" ou "unsere alten".`
  },
  {
    frase: "Die Geschichte ___ ___ (berühmt) Schriftstellers ist spannend.",
    respostas_certas: [["des", "berühmten"]],
    nominativo: "der berühmte Schriftsteller",
    caso: "Genitiv",
    explicacao: `"Die Geschichte des berühmten Schriftstellers" usa genitivo para indicar posse, e "Schriftsteller" é masculino, então usamos "des berühmten".`
  },
  {
    frase: "___ ___ (jung) Kinder spielen auf der Wiese.",
    respostas_certas: [["Die", "jungen"]],
    nominativo: "die jungen Kinder",
    caso: "Nominativ",
    explicacao: `"Kinder" é plural e a frase está no nominativo, então usamos "die jungen".`
  },
  {
    frase: "Er hilft ___ ___ (schön) Frau mit den Einkäufen.",
    respostas_certas: [["der", "schönen"], ["einer", "schönen"]],
    nominativo: "die schöne Frau",
    caso: "Dativ",
    explicacao: `"Helfen" exige o dativo e "Frau" é feminino, então usamos "der schönen" ou "einer schönen".`
  },
  {
    frase: "Er gibt ___ ___ (nett) Kindern ein Geschenk.",
    respostas_certas: [["den", "netten"]],
    nominativo: "die netten Kinder",
    caso: "Dativ",
    explicacao: `"Geben" exige o dativo e "Kinder" é plural, então usamos "den netten".`
  },
  {
    frase: "___ ___ (freundlich) Lehrer hilft mir immer.",
    respostas_certas: [["Der", "freundliche"], ["Ein", "freundlicher"]],
    nominativo: "der freundliche Lehrer",
    caso: "Nominativ",
    explicacao: `"Lehrer" é masculino e está no nominativo, então usamos "der freundliche" ou "ein freundlicher".`
  },
  {
    frase: "Ich höre ___ ___ (leise) Musik.",
    respostas_certas: [["die", "leise"], ["eine", "leise"]],
    nominativo: "die leise Musik",
    caso: "Akkusativ",
    explicacao: `"Hören" exige o acusativo e "Musik" é feminino, então usamos "die leise" ou "eine leise".`
  },
  {
    frase: "Die Blumen ___ ___ (freundlich) Frau sind schön.",
    respostas_certas: [["der", "freundlichen"]],
    nominativo: "die freundliche Frau",
    caso: "Genitiv",
    explicacao: `"Die Blumen der freundlichen Frau" usa o genitivo para indicar posse, e "Frau" é feminino, então usamos "der freundlichen".`
  },
  {
    frase: "Er spricht mit ___ ___ (alt) Lehrer.",
    respostas_certas: [["dem", "alten"], ["einem", "alten"]],
    nominativo: "der alte Lehrer",
    caso: "Dativ",
    explicacao: `"Sprechen mit" exige o dativo e "Lehrer" é masculino, então usamos "dem alten" ou "einem alten".`
  },
  {
    frase: "___ ___ (neu) Schule ist sehr groß.",
    respostas_certas: [["Die", "neue"], ["Eine", "neue"]],
    nominativo: "die neue Schule",
    caso: "Nominativ",
    explicacao: `"Schule" é feminino (die Schule) e a frase está no nominativo, então usamos "die neue" ou "eine neue".`
  },
  {
    frase: "Wir feiern den Geburtstag ___ ___ (gut) Freundes.",
    respostas_certas: [["des", "guten"]],
    nominativo: "der gute Freund",
    caso: "Genitiv",
    explicacao: `"Feiern des guten Freundes" usa o genitivo para posse, e "Freund" é masculino, então usamos "des guten".`
  },
  {
    frase: "___ ___ (interessant) Idee wurde besprochen.",
    respostas_certas: [["Die", "interessante"], ["Eine", "interessante"]],
    nominativo: "die interessante Idee",
    caso: "Nominativ",
    explicacao: `"Idee" é feminino e está no nominativo, então usamos "die interessante" ou "eine interessante".`
  },
  {
    frase: "Er wohnt bei ___ ___ (alt) Freundin.",
    respostas_certas: [["der", "alten"], ["einer", "alten"]],
    nominativo: "die alte Freundin",
    caso: "Dativ",
    explicacao: `"Wohnen bei" exige o dativo e "Freundin" é feminino, então usamos "der alten" ou "einer alten".`
  },
  {
    frase: "Das Auto ___ ___ (alt) Mannes ist neu.",
    respostas_certas: [["des", "alten"]],
    nominativo: "der alte Mann",
    caso: "Genitiv",
    explicacao: `"Das Auto des alten Mannes" usa genitivo para posse e "Mann" é masculino, então usamos "des alten".`
  },
  {
    frase: "___ ___ (groß) Stadt hat viele Einwohner.",
    respostas_certas: [["Die", "große"], ["Eine", "große"]],
    nominativo: "die große Stadt",
    caso: "Nominativ",
    explicacao: `"Stadt" é feminino e está no nominativo, então usamos "die große" ou "eine große".`
  },
  {
    frase: "Ich lese ___ ___ (spannend) Buch.",
    respostas_certas: [["das", "spannende"], ["ein", "spannendes"]],
    nominativo: "das spannende Buch",
    caso: "Akkusativ",
    explicacao: `"Lesen" exige o acusativo e "Buch" é neutro, então usamos "das spannende" ou "ein spannendes".`
  },
  {
    frase: "Wir helfen ___ ___ (jung) Mann.",
    respostas_certas: [["dem", "jungen"], ["einem", "jungen"]],
    nominativo: "der junge Mann",
    caso: "Dativ",
    explicacao: `"Helfen" exige o dativo e "Mann" é masculino, então usamos "dem jungen" ou "einem jungen".`
  },
  {
    frase: "Die Katze ___ ___ (klein) Mädchens ist süß.",
    respostas_certas: [["des", "kleinen"]],
    nominativo: "das kleine Mädchen",
    caso: "Genitiv",
    explicacao: `"Die Katze des kleinen Mädchens" está no genitivo para posse e "Mädchen" é neutro, então usamos "des kleinen".`
  },
  {
    frase: "Er schenkt ___ ___ (alt) Frau Blumen.",
    respostas_certas: [["der", "alten"], ["einer", "alten"]],
    nominativo: "die alte Frau",
    caso: "Dativ",
    explicacao: `"Schenken" exige o dativo e "Frau" é feminino, então usamos "der alten" ou "einer alten".`
  },
  {
    frase: "Die Kinder ___ ___ (nett) Frau spielen im Garten.",
    respostas_certas: [["der", "netten"]],
    nominativo: "die nette Frau",
    caso: "Genitiv",
    explicacao: `"Die Kinder der netten Frau" usa genitivo para posse e "Frau" é feminino, então usamos "der netten".`
  },
  {
    frase: "Ich sehe ___ ___ (blau) Himmel.",
    respostas_certas: [["den", "blauen"]],
    nominativo: "der blaue Himmel",
    caso: "Akkusativ",
    explicacao: `"Sehen" exige o acusativo e "Himmel" é masculino, então usamos "den blauen".`
  },
  {
    frase: "___ ___ (klein) Dorf liegt am Fluss.",
    respostas_certas: [["Das", "kleine"], ["Ein", "kleines"]],
    nominativo: "das kleine Dorf",
    caso: "Nominativ",
    explicacao: `"Dorf" é neutro e está no nominativo, então usamos "das kleine" ou "ein kleines".`
  },
  {
    frase: "Wir gedenken ___ ___ (verstorben) Großeltern.",
    respostas_certas: [["der", "verstorbenen"]],
    nominativo: "die verstorbenen Großeltern",
    caso: "Genitiv",
    explicacao: `"Gedenken" exige genitivo e "Großeltern" é plural, então usamos "der verstorbenen".`
  },
  {
    frase: "Ich gebe ___ ___ (jung) Frau ein Geschenk.",
    respostas_certas: [["der", "jungen"], ["einer", "jungen"]],
    nominativo: "die junge Frau",
    caso: "Dativ",
    explicacao: `"Geben" exige o dativo e "Frau" é feminino, então usamos "der jungen" ou "einer jungen".`
  },
  {
    frase: "Die Blätter ___ ___ (alt) Baumes sind gefallen.",
    respostas_certas: [["des", "alten"]],
    nominativo: "der alte Baum",
    caso: "Genitiv",
    explicacao: `"Die Blätter des alten Baumes" usa o genitivo para posse e "Baum" é masculino, então usamos "des alten".`
  },
  {
    frase: "Er gibt ___ ___ (klein) Hund Wasser.",
    respostas_certas: [["dem", "kleinen"], ["einem", "kleinen"]],
    nominativo: "der kleine Hund",
    caso: "Dativ",
    explicacao: `"Geben" exige o dativo e "Hund" é masculino, então usamos "dem kleinen" ou "einem kleinen".`
  },
  {
    frase: "___ ___ (spannend) Filme laufen im Kino.",
    respostas_certas: [["Die", "spannenden"]],
    nominativo: "die spannenden Filme",
    caso: "Nominativ",
    explicacao: `"Filme" é plural e está no nominativo, então usamos "die spannenden".`
  },
  {
    frase: "Das Haus ___ ___ (reich) Frau ist schön.",
    respostas_certas: [["der", "reichen"]],
    nominativo: "die reiche Frau",
    caso: "Genitiv",
    explicacao: `"Das Haus der reichen Frau" usa o genitivo para posse e "Frau" é feminino, então usamos "der reichen".`
  },
  {
    frase: "Ich finde ___ ___ (alt) Buch interessant.",
    respostas_certas: [["das", "alte"], ["ein", "altes"]],
    nominativo: "das alte Buch",
    caso: "Akkusativ",
    explicacao: `"Finden" exige o acusativo e "Buch" é neutro, então usamos "das alte" ou "ein altes".`
  },
  {
    frase: "Wir gratulieren ___ ___ (jung) Paar.",
    respostas_certas: [["dem", "jungen"]],
    nominativo: "das junge Paar",
    caso: "Dativ",
    explicacao: `"Gratulieren" exige o dativo e "Paar" é neutro, então usamos "dem jungen".`
  },
  {
    frase: "Die Häuser ___ ___ (reich) Familie sind groß.",
    respostas_certas: [["der", "reichen"]],
    nominativo: "die reiche Familie",
    caso: "Genitiv",
    explicacao: `"Die Häuser der reichen Familie" usa o genitivo para posse e "Familie" é feminino, então usamos "der reichen".`
  },
  {
    frase: "Ich schreibe ___ ___ (gut) Freund eine Nachricht.",
    respostas_certas: [["dem", "guten"], ["einem", "guten"]],
    nominativo: "der gute Freund",
    caso: "Dativ",
    explicacao: `"Schreiben" exige o dativo e "Freund" é masculino, então usamos "dem guten" ou "einem guten".`
  },
  {
    frase: "Wir warten auf ___ ___ (neu) Lehrer.",
    respostas_certas: [["den", "neuen"]],
    nominativo: "der neue Lehrer",
    caso: "Akkusativ",
    explicacao: `"Warten auf" exige o acusativo e "Lehrer" é masculino, então usamos "den neuen".`
  },
  {
    frase: "Die Farben ___ ___ (alt) Autos sind verblasst.",
    respostas_certas: [["des", "alten"]],
    nominativo: "das alte Auto",
    caso: "Genitiv",
    explicacao: `"Die Farben des alten Autos" usa genitivo para posse e "Auto" é neutro, então usamos "des alten".`
  },
  {
    frase: "___ ___ (neu) Computer funktioniert gut.",
    respostas_certas: [["Der", "neue"], ["Ein", "neuer"]],
    nominativo: "der neue Computer",
    caso: "Nominativ",
    explicacao: `"Computer" é masculino e está no nominativo, então usamos "der neue" ou "ein neuer".`
  },
  {
    frase: "Er spricht über ___ ___ (alt) Film.",
    respostas_certas: [["den", "alten"]],
    nominativo: "der alte Film",
    caso: "Akkusativ",
    explicacao: `"Sprechen über" exige o acusativo e "Film" é masculino, então usamos "den alten".`
  },
  {
    frase: "Die Mutter ___ ___ (klein) Kindes ist besorgt.",
    respostas_certas: [["des", "kleinen"]],
    nominativo: "das kleine Kind",
    caso: "Genitiv",
    explicacao: `"Die Mutter des kleinen Kindes" usa o genitivo para posse e "Kind" é neutro, então usamos "des kleinen".`
  },
  {
    frase: "Ich schenke ___ ___ (alt) Lehrer ein Buch.",
    respostas_certas: [["dem", "alten"], ["einem", "alten"]],
    nominativo: "der alte Lehrer",
    caso: "Dativ",
    explicacao: `"Schenken" exige o dativo e "Lehrer" é masculino, então usamos "dem alten" ou "einem alten".`
  },
  {
    frase: "Das Zimmer ___ ___ (jung) Frau ist ordentlich.",
    respostas_certas: [["der", "jungen"]],
    nominativo: "die junge Frau",
    caso: "Genitiv",
    explicacao: `"Das Zimmer der jungen Frau" usa o genitivo para posse e "Frau" é feminino, então usamos "der jungen".`
  },
  {
    frase: "Ich trinke ___ ___ (kalt) Wasser.",
    respostas_certas: [["das", "kalte"], ["ein", "kaltes"]],
    nominativo: "das kalte Wasser",
    caso: "Akkusativ",
    explicacao: `"Trinken" exige o acusativo e "Wasser" é neutro (das Wasser), por isso usamos "das kalte" ou "ein kaltes".`
  },
  {
    frase: "Die Farbe ___ ___ (grün) Blattes ist schön.",
    respostas_certas: [["des", "grünen"]],
    nominativo: "das grüne Blatt",
    caso: "Genitiv",
    explicacao: `"Blattes" no genitivo indica posse e "Blatt" é neutro, então usamos "des grünen".`
  },
  {
    frase: "___ ___ (schnell) Auto fährt vorbei.",
    respostas_certas: [["Das", "schnelle"], ["Ein", "schnelles"]],
    nominativo: "das schnelle Auto",
    caso: "Nominativ",
    explicacao: `"Auto" é neutro (das Auto) e a frase está no nominativo, então usamos "das schnelle" ou "ein schnelles".`
  }
];


type PracticePageProps = {
  totalQuestions: number;
  onComplete: (score: number) => void;
};

export function PracticePage({ totalQuestions, onComplete }: PracticePageProps) {
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [userAnswer1, setUserAnswer1] = useState("");
  const [userAnswer2, setUserAnswer2] = useState("");
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  const [showFeedbackPanel, setShowFeedbackPanel] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [streak, setStreak] = useState(0);
  const [confirmSubmit, setConfirmSubmit] = useState(false); // Estado para confirmação de envio

  useEffect(() => {
    const shuffled = [...allSentences].sort(() => Math.random() - 0.5).slice(0, totalQuestions);
    setSentences(shuffled);
  }, [totalQuestions]);

  const currentSentence = sentences[currentSentenceIndex];

  const checkAnswer = () => {
    if (!currentSentence || hasAnswered) return;

    const userAnswers = [userAnswer1.trim().toLowerCase(), userAnswer2.trim().toLowerCase()];

    const isCorrect = currentSentence.respostas_certas.some(
      (respostas) =>
        respostas[0].toLowerCase() === userAnswers[0] && respostas[1].toLowerCase() === userAnswers[1]
    );

    setFeedback({
      correct: isCorrect,
      message: isCorrect
        ? `Richtige Antwort(en): ${currentSentence.respostas_certas
          .map((respostas) => `"${respostas.join(" ")}"`)
          .join(", ")}. ${currentSentence.explicacao}`
        : `Richtige Antwort(en): ${currentSentence.respostas_certas
            .map((respostas) => `"${respostas.join(" ")}"`)
            .join(", ")}. ${currentSentence.explicacao}`,
    });
    setShowFeedbackPanel(true);
    setHasAnswered(true);
    setShowHint(false);

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }

    setAnsweredQuestions((prev) => prev + 1);

    if (answeredQuestions + 1 >= totalQuestions) {
      onComplete(correctAnswers + (isCorrect ? 1 : 0));
    }
  };

  const handleSubmitClick = () => {
    if (confirmSubmit) {
      checkAnswer();
      setConfirmSubmit(false);
    } else {
      setConfirmSubmit(true); // Solicitar a confirmação de envio
    }
  };

  const nextSentence = () => {
    setShowFeedbackPanel(false);

    if (currentSentenceIndex < sentences.length - 1) {
      setCurrentSentenceIndex((prev) => prev + 1);
      setUserAnswer1("");
      setUserAnswer2("");
      setFeedback(null);
      setHasAnswered(false);
      setConfirmSubmit(false); // Reiniciar a confirmação de envio
    } else {
      onComplete(correctAnswers);
    }
  };

  const handleInputChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer1(e.target.value);
  };

  const handleInputChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer2(e.target.value);
  };

  if (!currentSentence) {
    return <div>Loading...</div>;
  }

  const progressPercentage = ((answeredQuestions + (hasAnswered ? 1 : 0)) / totalQuestions) * 100;

  const parts = currentSentence.frase.split("___");

  return (
    <div className="h-screen flex flex-col bg-[#f5f9ff] relative">
      {/* Header com progresso e vidas */}
      <div className="bg-[#A7EBFE] p-6 pt-56 flex flex-col items-center justify-center rounded-b-4xl relative">
        <Image src={mascotImage} alt="Mascote" width={140} height={140} className="absolute" />
      </div>
      <div className="flex flex-col items-center justify-center px-8 pt-16">
        <Progress value={progressPercentage} className="w-full h-4 mt-4 bg-[#D0EFFF]" />

        {/* Vidas, Dica e Streak */}
        <div className="flex justify-between items-center w-full mt-4">
          <div className="flex flex-row items-center space-x-1 bg-[#FFE3E3] px-4 rounded-full">
            <svg
              width="24"
              height="24"
              viewBox="0 0 96 96"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.5"
                d="M51.3299 87.2037C63.8339 84.6997 80.0019 75.7037 80.0019 52.4437C80.0019 31.2797 64.5099 17.1837 53.3699 10.7077C50.8939 9.26772 48.0019 11.1597 48.0019 14.0197V21.3317C48.0019 27.0997 45.5779 37.6277 38.842 42.0077C35.402 44.2437 31.682 40.8957 31.266 36.8157L30.922 33.4637C30.522 29.5677 26.554 27.2037 23.442 29.5797C17.846 33.8397 12.002 41.3197 12.002 52.4397C12.002 80.8837 33.1579 87.9997 43.7339 87.9997C44.3526 87.9997 44.9979 87.9797 45.6699 87.9397C47.4539 87.7157 45.6699 88.3357 51.3299 87.1997"
                fill="#FF0000"
              />
              <path
                d="M32.001 73.7762C32.001 84.2562 40.445 87.4962 45.669 87.9442C47.453 87.7202 45.669 88.3402 51.329 87.2042C55.485 85.7362 60.001 81.9682 60.001 73.7762C60.001 68.5882 56.725 65.3842 54.161 63.8842C53.377 63.4242 52.465 64.0042 52.397 64.9082C52.173 67.7802 49.413 70.0682 47.537 67.8842C45.877 65.9562 45.177 63.1362 45.177 61.3322V58.9722C45.177 57.5562 43.749 56.6122 42.525 57.3402C37.981 60.0322 32.001 65.5762 32.001 73.7762Z"
                fill="white"
              />
            </svg>
            <span className="ml-4 text-black py-1 font-semibold">Streak: {streak}</span>
          </div>

          <button
            onClick={() => setShowHint(true)}
            className="bg-[#FFF59D] text-[#b98e22] px-5 py-1 rounded-full font-semibold flex items-center"
          >
            <Image src={hintIcon} alt="Hint Icon" width={16} height={16} className="mr-1" />
            Hint
          </button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex flex-col items-center px-6 text-center mt-4 flex-grow">
        <div className="w-full max-w-lg p-4 my-6 rounded-lg border border-gray-300 bg-white flex flex-col items-center">
          <p className="text-lg font-medium mb-2 flex flex-wrap justify-center items-center">
            {parts.map((part, index) => (
              <span key={index}>
                {part}
                {index < parts.length - 1 && (
                  <Input
                    type="text"
                    value={index === 0 ? userAnswer1 : userAnswer2}
                    onChange={index === 0 ? handleInputChange1 : handleInputChange2}
                    className="inline-block mx-1 p-1 text-center text-md border border-blue-300 rounded-md"
                    placeholder={index === 0 ? "Artikel" : "Adjektivendung"}
                    disabled={hasAnswered}
                  />
                )}
              </span>
            ))}
          </p>
        </div>
        {showHint && (
          <div className="w-full px-4 py-4 mt-6 bg-[#DBE9FE] text-[#1D40B0] rounded-lg flex flex-row items-start">
            <Image
              src={showHintIcon}
              alt="Show Hint Icon"
              width={32}
              height={32}
              className="mr-2 mb-2"
            />
            <div className="text-left">
              <p>
                <strong>Fall:</strong> {currentSentence.caso}
              </p>
              <p>
                <strong>Nominativ:</strong> {currentSentence.nominativo}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Botão de submissão fixo próximo ao bottom-0 */}
      <div className="p-6 fixed bottom-0 w-full bg-[#f5f9ff]">
        <Button
          onClick={hasAnswered ? nextSentence : handleSubmitClick}
          className={`w-full py-4 text-lg font-semibold rounded-8 ${
            confirmSubmit ? "bg-yellow-500" : "bg-[#31CD9E]"
          } text-white hover:bg-[#196951]`}
        >
          {hasAnswered ? "Next" : confirmSubmit ? "Confirm Submit" : "Submit"}
        </Button>
      </div>

      {/* Painel de Feedback Animado */}
      {showFeedbackPanel && (
        <div
          className={`fixed bottom-0 left-0 w-full p-6 rounded-t-3xl shadow-lg transition-transform transform ${
            feedback?.correct ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
          } ${showFeedbackPanel ? "translate-y-0" : "translate-y-full"}`}
          style={{ transition: "transform 0.4s ease-in-out" }}
        >
          <h2 className="text-xl font-bold">
            {feedback?.correct ? "Awesome!" : "Not really..."}
          </h2>
          <p className="mt-2">{feedback?.message}</p>
          <Button
            onClick={nextSentence}
            className={`w-full mt-4 py-2 rounded-full ${
              feedback?.correct ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            Continue
            <svg
              width="24"
              height="24"
              viewBox="0 0 72 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M48.525 39H12V33H48.525L31.725 16.2L36 12L60 36L36 60L31.725 55.8L48.525 39Z" fill="white" />
            </svg>
          </Button>
        </div>
      )}
    </div>
  );
}
