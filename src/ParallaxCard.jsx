import React from "react";
import { motion } from "framer-motion";

/**
 * Carte avec effet de parallaxe simple.
 *
 * Props :
 * - title: titre de la carte
 * - description : texte descriptif (facultatif)
 * - image : URL ou import d’une image de fond
 * - link : URL de destination (par défaut "#")
 * - className : classes additionnelles
 */
export default function ParallaxCard({
  title,
  description = "",
  image,
  link = "#",
  className = "",
}) {
  return (
    <motion.a
      href={link}
      className={`relative block overflow-hidden rounded-xl shadow-lg ${className}`}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Fond image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      {/* Overlay sombre pour lisibilité */}
      <div className="absolute inset-0 bg-black/30" />
      {/* Contenu */}
      <div className="relative p-6 text-white">
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        {description && (
          <p className="text-sm opacity-90">{description}</p>
        )}
      </div>
    </motion.a>
  );
}
