export function calculateMaxCards(
  containerWidth: number,
  cardWidth = 324,
  gap = 24,
  maxCards = 3,
  horizontalPadding = 36
): number {
  const availableWidth = containerWidth - 2 * horizontalPadding;
  return Math.min(
    maxCards,
    Math.floor((availableWidth + gap) / (cardWidth + gap))
  );
}
