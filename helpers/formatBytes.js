export const formatBytes = (bytes) => {
  const unitsDecimal = {
    b_to_kb: (bytes) => Math.round(bytes * 0.001) + ' kb',
    b_to_mb: (bytes) => (bytes * 0.000001).toFixed(1) + ' mb',
  }

  if (bytes >= 100_000 && bytes < 1_000_000) return unitsDecimal.b_to_kb(bytes)

  if (bytes >= 1_000_000) return unitsDecimal.b_to_mb(bytes)

  return '?'
}
