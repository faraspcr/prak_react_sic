/**
 * Helper untuk menentukan tier dan diskon member berdasarkan total poin.
 *
 * Aturan:
 * - Bronze   : 0 - 999 poin     -> diskon 0%
 * - Silver   : 1.000 - 4.999    -> diskon 5%
 * - Gold     : 5.000 - 9.999    -> diskon 10%
 * - Platinum : 10.000+          -> diskon 15%
 *
 * @param {number} points - total_points member
 * @returns {{ tier: string, discount: number }}
 */
export function getTierInfo(points) {
  if (points >= 10000) {
    return { tier: "Platinum", discount: 15 };
  }
  if (points >= 5000) {
    return { tier: "Gold", discount: 10 };
  }
  if (points >= 1000) {
    return { tier: "Silver", discount: 5 };
  }
  return { tier: "Bronze", discount: 0 };
}


/**
 * Helper untuk styling badge warna sesuai tier.
 * Bisa langsung dipakai di className komponen Badge/GenericTable.
 *
 * @param {string} tier
 * @returns {string} - kombinasi class Tailwind
 */
export function getTierBadgeColor(tier) {
  const colors = {
    Bronze: "bg-amber-100 text-amber-700 border border-amber-300",
    Silver: "bg-gray-100 text-gray-700 border border-gray-300",
    Gold: "bg-yellow-100 text-yellow-700 border border-yellow-400",
    Platinum: "bg-purple-100 text-purple-700 border border-purple-300",
  };
  return colors[tier] || colors.Bronze;
}


/**
 * Helper untuk menghitung poin yang didapat dari sebuah transaksi.
 * Aturan: Rp 1.000 = 1 poin (dibulatkan ke bawah)
 *
 * @param {number} totalPrice
 * @returns {number}
 */
export function calculatePoints(totalPrice) {
  return Math.floor(totalPrice / 1000);
}

